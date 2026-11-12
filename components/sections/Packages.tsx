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
            Tell us about the property and how you plan to market it. We&apos;ll help you
            choose the right deliverables and send a tailored quotation.
          </p>
        </Reveal>

        <Reveal stagger={0.15} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-8">
          {PACKAGES.map((pkg, index) => (
            <article
              key={pkg.name}
              className={`glass-panel interactive-card glass-track flex flex-col rounded-md p-5 xl:p-7 ${
                pkg.featured ? "package-featured border-gold-500/55 bg-gold-500/[0.045]" : ""
              }`}
            >
              <p className="label font-medium tabular-nums">0{index + 1} / Collection</p>
              <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-ink">{pkg.name}</h3>
              <p className="mt-3 min-h-12 text-sm leading-relaxed text-ink-dim">{pkg.description}</p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
                    <span className="text-gold-500" aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button href="/start-a-listing" className="mt-8 w-full text-center lg:max-xl:gap-2 lg:max-xl:px-2 lg:max-xl:text-xs">
                Request a quotation
              </Button>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
