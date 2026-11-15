import { PACKAGES } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Packages() {
  return (
    <section id="packages" className="border-t border-line bg-bg py-24" aria-labelledby="packages-heading">
      <div className="site-shell">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <SectionLabel className="editorial-label">Listing collections</SectionLabel>
            <h2 id="packages-heading" className="editorial-heading mt-5 font-display">
              The right collection.
              <em className="editorial-accent block">For every listing.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-dim md:pb-1 md:text-base">
            Choose a collection to start from. We confirm the scope for your property
            and send a tailored quotation before production begins.
          </p>
        </Reveal>

        <Reveal stagger={0.15} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-8">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.name}
              className={`glass-panel interactive-card glass-track flex flex-col rounded-md p-5 xl:p-7 ${
                pkg.featured ? "package-featured border-gold-500/55 bg-gold-500/[0.045]" : ""
              }`}
            >
              <p className="label font-medium lg:min-h-9">{pkg.bestFor}</p>
              <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-ink">{pkg.name}</h3>
              <p className="package-price">
                {pkg.startingPrice ? (
                  <>
                    <span className="text-sm text-ink-dim">Starting at</span>{" "}
                    <span className="text-xl font-semibold tabular-nums text-ink">{pkg.startingPrice}</span>
                  </>
                ) : (
                  <span className="text-sm text-gold-300">Tailored quotation</span>
                )}
              </p>
              <p className="mt-3 min-h-12 text-sm leading-relaxed text-ink-dim">{pkg.description}</p>
              <ul className="mt-5 flex-1 space-y-2.5 border-t border-line pt-5">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
                    <span className="text-gold-500" aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              {pkg.turnaround ? (
                <p className="mt-5 text-xs leading-relaxed text-ink-dim">Turnaround: {pkg.turnaround}</p>
              ) : null}
              <Button href="/start-a-listing" variant={pkg.featured ? "primary" : "secondary"} className="mt-7 w-full text-center">
                Get Started
              </Button>
            </article>
          ))}
        </Reveal>

        <div className="mt-10 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
            Need a different mix of deliverables, or media for several listings? We&apos;ll scope it with you.
          </p>
          <Button href="/start-a-listing" variant="secondary" className="flex-none">Request Custom Quote</Button>
        </div>
      </div>
    </section>
  );
}
