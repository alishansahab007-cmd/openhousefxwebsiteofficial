import { TRUST_POINTS } from "@/lib/content";

/** Quiet reassurance directly under the hero. Content lives in lib/content.ts. */
export function TrustStrip() {
  return (
    <section className="border-b border-line bg-bg-raised" aria-label="Working with OpenHouseFX">
      <ul className="site-shell grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-0">
        {TRUST_POINTS.map((point) => (
          <li key={point.title} className="trust-point">
            <p className="text-[0.95rem] font-semibold tracking-tight text-ink">{point.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{point.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
