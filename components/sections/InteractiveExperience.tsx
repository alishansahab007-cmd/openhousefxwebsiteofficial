import { INTERACTIVE_EXPERIENCE } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CanvasGate } from "@/components/three/CanvasGate";

export function InteractiveExperience() {
  return (
    <section className="border-t border-line bg-bg-raised py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center md:gap-16 md:px-14">
        <Reveal>
          <SectionLabel>{INTERACTIVE_EXPERIENCE.kicker}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-ink md:text-4xl">
            {INTERACTIVE_EXPERIENCE.headline}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-dim md:text-base">
            {INTERACTIVE_EXPERIENCE.body}
          </p>
        </Reveal>

        <Reveal>
          <CanvasGate className="w-full overflow-hidden rounded-sm border border-line" />
        </Reveal>
      </div>
    </section>
  );
}
