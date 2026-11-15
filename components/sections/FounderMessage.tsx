import { FOUNDER } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

/** Sits directly above the final CTA, which carries the action for both. */
export function FounderMessage() {
  return (
    <section className="founder-message border-t border-line bg-bg-raised" aria-labelledby="founder-heading">
      <Reveal className="site-shell">
        <figure className="mx-auto max-w-4xl text-center">
          <h2 id="founder-heading" className="label">{FOUNDER.heading}</h2>
          <blockquote className="founder-quote">
            <p>{FOUNDER.message}</p>
          </blockquote>
          <span className="mx-auto mt-8 block h-px w-11 bg-gold-500" aria-hidden="true" />
        </figure>
      </Reveal>
    </section>
  );
}
