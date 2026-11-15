import Image from "next/image";
import { CASE_STUDIES, TESTIMONIALS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Client feedback, or documented case studies when there is none. Renders
 * nothing while both lists in lib/content.ts are empty, so no placeholder
 * or invented review can reach the page.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0 && CASE_STUDIES.length === 0) return null;
  const showTestimonials = TESTIMONIALS.length > 0;

  return (
    <section id="results" className="border-t border-line bg-bg-raised py-24" aria-labelledby="results-heading">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <SectionLabel className="editorial-label">{showTestimonials ? "From our clients" : "Recent projects"}</SectionLabel>
          <h2 id="results-heading" className="editorial-heading mt-5">
            {showTestimonials ? "In their words." : "The listing, before and after we worked on it."}
          </h2>
        </Reveal>

        {showTestimonials ? (
          <Reveal stagger={0.1} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <figure key={`${item.name}-${item.quote.slice(0, 24)}`} className="glass-panel flex flex-col rounded-md p-6 xl:p-8">
                <blockquote className="flex-1 text-base leading-relaxed text-ink">
                  <p>“{item.quote}”</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-6">
                  {item.image ? (
                    <Image src={item.image} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                  ) : null}
                  <span>
                    <span className="block text-sm font-semibold text-ink">{item.name}</span>
                    <span className="block text-xs leading-relaxed text-ink-dim">
                      {[item.organization, item.market, item.project].filter(Boolean).join(", ")}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        ) : (
          <Reveal stagger={0.1} className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {CASE_STUDIES.map((study) => (
              <article key={study.listing} className="glass-panel overflow-hidden rounded-md">
                {study.image ? (
                  <div className="relative aspect-[16/9] w-full">
                    <Image src={study.image} alt="" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
                  </div>
                ) : null}
                <dl className="grid gap-5 p-6 sm:grid-cols-2 xl:p-8">
                  {([
                    ["The listing", study.listing],
                    ["The challenge", study.challenge],
                    ["The transformation", study.transformation],
                    ["The result", study.result],
                  ] as const).map(([term, detail]) => (
                    <div key={term}>
                      <dt className="label">{term}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-ink">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
