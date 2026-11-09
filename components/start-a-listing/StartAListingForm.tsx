"use client";

import Link from "next/link";
import { NavigationLink } from "@/components/ui/NavigationLink";
import { useId, useState, type FormEvent } from "react";
import { LEAD_SERVICE_OPTIONS } from "@/lib/lead-form";

const SERVICE_OPTIONS = LEAD_SERVICE_OPTIONS;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  listingUrl: string;
  services: string[];
  // Honeypot: real visitors never see or fill this field. Any value here
  // marks the submission as a bot and it is dropped server-side.
  website: string;
  smsConsent: boolean;
}

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  listingUrl: "",
  services: [],
  website: "",
  smsConsent: false,
};

type FieldErrors = Partial<Record<"name" | "email" | "phone", string>>;

const inputClasses =
  "w-full rounded-sm border border-line bg-bg-raised px-4 py-3 text-sm text-ink placeholder:text-ink-dim/60 transition focus:border-gold-500 focus:outline-none";

export function StartAListingForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formId = useId();

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function toggleService(service: string) {
    setValues((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!values.phone.trim()) next.phone = "Please enter your phone number.";
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus("submitting");
    setSubmitError(null);

    try {
      const res = await fetch("/api/start-a-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSubmitError(
          data.error || "Something went wrong. Please try again."
        );
        setStatus("idle");
        return;
      }

      setStatus("success");
    } catch {
      setSubmitError(
        "We couldn't reach the server. Please check your connection and try again."
      );
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="border-t border-line pt-10">
        <p className="label">Request Received</p>
        <p className="mt-4 max-w-md text-lg text-ink">
          Thanks — we&apos;ll review your listing needs and get in touch
          shortly.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center border-b border-gold-500 text-xs font-medium uppercase tracking-[0.2em] text-gold-500 transition hover:text-gold-300"
        >
          Back to OpenHouseFX
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border-t border-line pt-10">
      <fieldset disabled={status === "submitting"} className="space-y-12">
        <div className="space-y-6">
          <p className="label">Contact Details</p>

          <div>
            <label
              htmlFor={`${formId}-name`}
              className="mb-2 block text-xs text-ink-dim"
            >
              Full Name *
            </label>
            <input
              id={`${formId}-name`}
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={inputClasses}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            />
            {errors.name && (
              <p id={`${formId}-name-error`} className="mt-2 text-xs text-gold-300">
                {errors.name}
              </p>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`${formId}-email`}
                className="mb-2 block text-xs text-ink-dim"
              >
                Email *
              </label>
              <input
                id={`${formId}-email`}
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={inputClasses}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${formId}-email-error` : undefined}
              />
              {errors.email && (
                <p id={`${formId}-email-error`} className="mt-2 text-xs text-gold-300">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${formId}-phone`}
                className="mb-2 block text-xs text-ink-dim"
              >
                Phone *
              </label>
              <input
                id={`${formId}-phone`}
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={inputClasses}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
              />
              {errors.phone && (
                <p id={`${formId}-phone-error`} className="mt-2 text-xs text-gold-300">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-ink-dim"><label className="flex items-start gap-3"><input type="checkbox" checked={values.smsConsent} onChange={e=>updateField('smsConsent',e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-gold-500"/><span>I agree to receive optional, non-promotional texts from OpenHouseFX about my inquiry, quotations, project updates and support. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for assistance. Consent is not a condition of purchase.</span></label><p>Read our <NavigationLink href="/privacy-policy" className="text-gold-300 underline">Privacy Policy</NavigationLink> and <NavigationLink href="/sms-terms" className="text-gold-300 underline">SMS Terms</NavigationLink>. You may submit without SMS consent.</p></div>
        <div className="space-y-6">
          <p className="label">Property</p>

          <div>
            <label
              htmlFor={`${formId}-address`}
              className="mb-2 block text-xs text-ink-dim"
            >
              Property Address (optional)
            </label>
            <input
              id={`${formId}-address`}
              type="text"
              autoComplete="street-address"
              value={values.address}
              onChange={(e) => updateField("address", e.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor={`${formId}-listingUrl`}
              className="mb-2 block text-xs text-ink-dim"
            >
              Zillow / MLS Listing URL (optional)
            </label>
            <input
              id={`${formId}-listingUrl`}
              type="text"
              inputMode="url"
              value={values.listingUrl}
              onChange={(e) => updateField("listingUrl", e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="space-y-6">
          <p className="label">What Are You Looking For?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICE_OPTIONS.map((service) => {
              const checked = values.services.includes(service);
              return (
                <label
                  key={service}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-sm border border-line px-4 py-3 text-sm text-ink transition hover:border-gold-500"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleService(service)}
                    className="h-4 w-4 shrink-0 accent-gold-500"
                  />
                  {service}
                </label>
              );
            })}
          </div>
        </div>

        {/* Honeypot field — hidden from sighted users and assistive tech,
            excluded from tab order and autofill. Bots that fill every
            field will fill this one too, marking the submission as spam. */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor={`${formId}-website`}>Website</label>
          <input
            id={`${formId}-website`}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => updateField("website", e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="flex min-h-11 w-full items-center justify-center rounded-sm border border-gold-500 bg-gold-500 px-6 text-xs font-medium uppercase tracking-[0.2em] text-bg transition duration-300 enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting" ? "Sending…" : "Start The Conversation"}
          </button>
          <p className="mt-4 text-xs text-ink-dim">
            We&apos;ll review your request and give you a call.
          </p>
          {submitError && (
            <p role="alert" className="mt-3 text-xs text-gold-300">
              {submitError}
            </p>
          )}
        </div>
      </fieldset>
    </form>
  );
}
