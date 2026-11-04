import { PACKAGES } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

export function Packages() {
  return (
    <section id="packages" className="border-t border-line bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <SectionLabel>Packages</SectionLabel>
            <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-ink md:text-5xl">
              The right collection.
              <br />
              <span className="italic text-gold-500">For every listing.</span>
            </h2>
          </Reveal>
          <Reveal className="max-w-sm">
            <p className="text-sm leading-relaxed text-ink-dim md:text-base">
              Every property has its own requirements. Contact us to confirm
              scope, availability, and pricing for your listing.
            </p>
          </Reveal>
        </div>

        <Reveal
          stagger={0.08}
          start="top 85%"
          className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={
                pkg.featured
                  ? "packages-card flex flex-col rounded-sm border border-gold-500 bg-bg-raised px-6 py-8 md:-translate-y-3"
                  : "packages-card flex flex-col rounded-sm border border-line bg-bg px-6 py-8 hover:border-gold-500/70 hover:bg-bg-raised"
              }
            >
              {pkg.featured && <p className="label mb-4">Most Popular</p>}
              <h3 className="font-display text-lg font-semibold text-ink">
                {pkg.name}
              </h3>
              <p className="mt-4 font-display text-xl font-semibold text-gold-300">
                Contact for pricing
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                {pkg.description}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-ink">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                href="/start-a-listing"
                variant={pkg.featured ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                Request a Quote
              </Button>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
