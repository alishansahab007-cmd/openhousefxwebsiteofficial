import { ECOSYSTEM_PREVIEW } from "@/lib/content";
import { ECOSYSTEM_PRODUCTS } from "@/lib/ecosystem";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProductGlyph } from "@/components/ecosystem/ProductGlyph";

/**
 * Compact pointer to /ecosystem. Deliberately quieter than the media-service
 * sections: a secondary button, no screenshots, no product CTAs.
 */
export function EcosystemPreview() {
  return (
    <section id="technology" className="border-t border-line bg-bg py-20 md:py-24" aria-labelledby="technology-heading">
      <div className="site-shell grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <Reveal>
          <SectionLabel className="editorial-label">{ECOSYSTEM_PREVIEW.kicker}</SectionLabel>
          <h2 id="technology-heading" className="editorial-heading mt-5">
            {ECOSYSTEM_PREVIEW.headline}
            <em className="editorial-accent block">{ECOSYSTEM_PREVIEW.accent}</em>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-dim md:text-base">{ECOSYSTEM_PREVIEW.body}</p>
          <Button href="/ecosystem" variant="secondary" className="mt-8">{ECOSYSTEM_PREVIEW.cta}</Button>
        </Reveal>

        <Reveal>
          <ul className="glass-panel divide-y divide-line rounded-md">
            {ECOSYSTEM_PRODUCTS.map((product) => (
              <li key={product.id} className="flex items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-md border border-gold-500/25 bg-gold-500/5 text-gold-300">
                  <ProductGlyph icon={product.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.95rem] font-semibold tracking-tight text-ink">{product.name}</span>
                  <span className="block text-sm text-ink-dim">{product.area}</span>
                </span>
                <span className="flex-none rounded-full border border-line px-2.5 py-1 text-[0.6875rem] text-ink-dim sm:px-3 sm:text-xs">{product.status}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
