import { HOW_IT_WORKS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function HowItWorks() {
  return (
    <section id="process" className="border-t border-line bg-bg-raised py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-14">
        <Reveal className="max-w-2xl">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-ink md:text-4xl">
            From listing assets to a launched campaign.
          </h2>
        </Reveal>

        <Reveal
          stagger={0.1}
          start="top 85%"
          className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-8"
        >
          <div
            aria-hidden="true"
            className="absolute top-6 right-0 left-0 hidden h-px bg-line md:block"
          />
          {HOW_IT_WORKS.map((step) => (
            <div key={step.number} className="relative bg-bg-raised md:pr-4">
              <p className="font-display relative z-10 inline-block bg-bg-raised pr-3 text-2xl font-semibold text-gold-500">
                {step.number}
              </p>
              <h3 className="font-display mt-4 text-lg font-semibold text-ink">
                {step.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {step.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
