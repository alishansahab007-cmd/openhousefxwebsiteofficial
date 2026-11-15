import { INTERACTIVE_EXPERIENCE } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CanvasGate } from "@/components/three/CanvasGate";

export function InteractiveExperience() {
  return (
    <section id="experience" className="border-t border-line bg-bg-raised py-24 md:py-28" aria-labelledby="experience-heading">
      <div className="site-shell grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal>
          <SectionLabel className="editorial-label">{INTERACTIVE_EXPERIENCE.kicker}</SectionLabel>
          <h2 id="experience-heading" className="editorial-heading mt-5">
            {INTERACTIVE_EXPERIENCE.headline}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-dim md:text-base">
            {INTERACTIVE_EXPERIENCE.body}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-ink-dim">
            A concept model. Select a marker to see how a room is labelled.
          </p>
        </Reveal>

        <Reveal>
          <CanvasGate className="w-full overflow-hidden rounded-sm border border-line" />
        </Reveal>
      </div>
    </section>
  );
}
