import { NextResponse } from "next/server";
import { Resend } from "resend";
import { LEAD_SERVICE_OPTIONS } from "@/lib/lead-form";

export const runtime = "nodejs";

const TO_EMAIL = process.env.LEAD_TO_EMAIL || "info@openhousefx.com";
const FROM_EMAIL =
  process.env.LEAD_FROM_EMAIL || "OpenHouseFX Leads <onboarding@resend.dev>";

// Reasonably strict practical email pattern: rejects whitespace/control
// characters (including CR/LF) and requires a real-looking domain, without
// trying to be a full RFC 5322 validator.
const EMAIL_RE =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const MAX_BODY_BYTES = 10 * 1024; // ~10 KB is generous for this form.

const MAX_LENGTHS = {
  name: 200,
  email: 254, // RFC 5321 max mailbox length
  phone: 32,
  address: 300,
  listingUrl: 500,
} as const;

const MAX_SERVICES = LEAD_SERVICE_OPTIONS.length;

// --- In-memory, per-IP sliding-window rate limit -------------------------
// This form gets low, occasional traffic, so an in-process Map is enough —
// it avoids adding Redis/Upstash for what is a handful of submissions a
// day. Tradeoff: the counters live in the Node process's memory, so they
// reset on cold starts and redeploys (a restarted instance forgets who has
// already submitted). That's an acceptable gap at this volume; if traffic
// grows or the app runs across many serverless instances concurrently,
// switch to a shared store (e.g. Upstash Redis) for a durable limit.
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (!submissionsByIp.has(ip) && submissionsByIp.size >= 2048) {
    for (const [key, values] of submissionsByIp) if (values.every(time => now - time >= RATE_LIMIT_WINDOW_MS)) submissionsByIp.delete(key);
    if (submissionsByIp.size >= 2048) return true;
  }
  const recent = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  submissionsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
// ---------------------------------------------------------------------

interface LeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  listingUrl?: string;
  services?: string[];
  // Honeypot — must arrive empty. Real users never see this field; only
  // bots that fill every input end up populating it.
  website?: string;
  smsConsent?: boolean;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Request payload is too large." },
      { status: 413 }
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: LeadPayload;
  try {
    const reader = request.body?.getReader();
    if (!reader) return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); return NextResponse.json({ error: 'Request payload is too large.' }, { status: 413 }); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    body = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body) ||
      [body.name, body.email, body.phone, body.address, body.listingUrl, body.website].some(value => value !== undefined && typeof value !== "string")) {
    return NextResponse.json({ error: "Invalid field types." }, { status: 400 });
  }

  // Honeypot check — if the hidden field has any value, this is a bot.
  // Pretend success and do nothing further; no email is sent.
  const honeypot = (body.website ?? "").trim();
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  if (body.smsConsent !== undefined && typeof body.smsConsent !== 'boolean') return NextResponse.json({ error: 'Invalid SMS consent.' }, { status: 400 });
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const address = (body.address ?? "").trim();
  const listingUrl = (body.listingUrl ?? "").trim();
  const rawServices = Array.isArray(body.services)
    ? body.services.filter((s): s is string => typeof s === "string")
    : [];
  const allowedServices: readonly string[] = LEAD_SERVICE_OPTIONS;
  const services = Array.from(new Set(rawServices.map((s) => s.trim())))
    .filter((s) => allowedServices.includes(s))
    .slice(0, MAX_SERVICES);

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Name, email and phone are required." },
      { status: 400 }
    );
  }

  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    phone.length > MAX_LENGTHS.phone ||
    address.length > MAX_LENGTHS.address ||
    listingUrl.length > MAX_LENGTHS.listingUrl
  ) {
    return NextResponse.json(
      { error: "One or more fields exceed the maximum allowed length." },
      { status: 400 }
    );
  }

  if (/[\r\n]/.test(email) || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "start-a-listing: RESEND_API_KEY is not set — lead was NOT sent."
    );
    return NextResponse.json(
      {
        error:
          "This form isn't fully set up yet. Please call or email us directly at info@openhousefx.com.",
      },
      { status: 500 }
    );
  }

  const servicesList = services.length > 0 ? services.join(", ") : "—";

  const textBody = [
    "NEW OPENHOUSEFX LEAD",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Property Address: ${address || "—"}`,
    `Zillow / MLS URL: ${listingUrl || "—"}`,
    `Services Requested: ${servicesList}`,
    `SMS consent: ${body.smsConsent === true ? "Opted in" : "Not opted in"}; disclosure version 2026-11-09; received ${new Date().toISOString()}`,
  ].join("\n");

  const htmlBody = `
    <h2>NEW OPENHOUSEFX LEAD</h2>
    <p>SMS consent: ${body.smsConsent === true ? "Opted in" : "Not opted in"} (disclosure version 2026-11-09)</p>
    <p>
      <strong>Name:</strong> ${escapeHtml(name)}<br />
      <strong>Email:</strong> ${escapeHtml(email)}<br />
      <strong>Phone:</strong> ${escapeHtml(phone)}<br />
      <strong>Property Address:</strong> ${escapeHtml(address || "—")}<br />
      <strong>Zillow / MLS URL:</strong> ${escapeHtml(listingUrl || "—")}<br />
      <strong>Services Requested:</strong> ${escapeHtml(servicesList)}
    </p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New OpenHouseFX Lead — ${name}`,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("start-a-listing: Resend returned an error", error);
      return NextResponse.json(
        { error: "We couldn't send your request. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("start-a-listing: failed to send lead email", err);
    return NextResponse.json(
      { error: "We couldn't send your request. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
