import Image from "next/image";
import { DISTRIBUTION } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Distribution() {
  return (
    <section className="border-t border-line bg-bg-raised py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center md:gap-16 md:px-14">
        <Reveal>
          <SectionLabel>{DISTRIBUTION.kicker}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-ink md:text-4xl">
            {DISTRIBUTION.headline}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-dim md:text-base">
            {DISTRIBUTION.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {DISTRIBUTION.channels.map((channel) => (
              <span
                key={channel}
                className="label rounded-sm border border-line px-4 py-2 !text-ink-dim"
              >
                {channel}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-line">
            <Image
              src={DISTRIBUTION.image}
              alt="A finished listing, ready for every channel"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
