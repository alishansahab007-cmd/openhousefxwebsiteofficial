import { SERVICES } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceMedia } from "@/components/services/ServiceMedia";
import { AmbientGradientLayer } from "@/components/motion/AmbientGradientLayer";

export function Services() {
  return (
    <section id="services" className="ambient-section border-t border-line bg-bg py-24">
      <AmbientGradientLayer />
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <SectionLabel className="editorial-label">Studio services</SectionLabel>
          <h2 className="editorial-heading mt-5 font-display">
            Everything a listing needs.
            <em className="editorial-accent block">One creative team.</em>
          </h2>
        </Reveal>

        <Reveal
          stagger={0.06}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-8"
        >
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="glass-panel interactive-card group overflow-hidden rounded-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <ServiceMedia service={service} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/35 to-transparent" />
              </div>
              <div className="px-6 py-8">
                <p className="light-marker w-fit font-display text-sm text-gold-500">{service.number}</p>
                <h3 className="font-display mt-4 text-lg font-semibold text-ink">
                  {service.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                  {service.description}
                </p>
                <div className="mt-6 h-px w-8 bg-line transition-all duration-300 group-hover:w-12 group-hover:bg-gold-500 group-focus-within:w-12 group-focus-within:bg-gold-500" />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
