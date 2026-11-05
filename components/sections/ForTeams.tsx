import Image from "next/image";
import { FOR_TEAMS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ForTeams() {
  return (
    <section className="border-t border-line bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-14">
        <Reveal className="max-w-2xl">
          <SectionLabel>Agents, Teams &amp; Brokerages</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-ink md:text-4xl">
            One media partner, however you&apos;re structured.
          </h2>
        </Reveal>

        <Reveal
          stagger={0.08}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {FOR_TEAMS.map((row) => (
            <div
              key={row.segment}
              className="glass-panel overflow-hidden rounded-md"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={row.image}
                  alt={row.segment}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-6 py-8">
                <p className="font-display text-lg font-semibold text-ink">{row.segment}</p>
                <p className="label mt-3 !text-gold-500">{row.flow} → OpenHouseFX</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-dim">
                  {row.description}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
