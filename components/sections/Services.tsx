import { SERVICES } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceMedia } from "@/components/services/ServiceMedia";

export function Services() {
  return (
    <section id="services" className="border-t border-line bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-14">
        <Reveal className="max-w-2xl">
          <SectionLabel>Services</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-ink md:text-4xl">
            Every output a listing needs, produced by one team.
          </h2>
        </Reveal>

        <Reveal
          stagger={0.06}
          start="top 88%"
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="group bg-bg transition focus-within:bg-bg-raised hover:bg-bg-raised"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <ServiceMedia service={service} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
              </div>
              <div className="px-6 py-8">
                <p className="font-display text-sm text-gold-500">{service.number}</p>
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
