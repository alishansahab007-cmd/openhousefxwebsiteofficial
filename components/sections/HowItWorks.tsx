import { HOW_IT_WORKS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AmbientGradientLayer } from "@/components/motion/AmbientGradientLayer";

export function HowItWorks() {
  return (
    <section id="process" className="ambient-section border-t border-line bg-bg-raised py-24" aria-labelledby="process-heading">
      <AmbientGradientLayer />
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <SectionLabel className="editorial-label">How it works</SectionLabel>
          <h2 id="process-heading" className="editorial-heading mt-5">
            From listing assets <em className="editorial-accent block">to a launched campaign.</em>
          </h2>
        </Reveal>

        <Reveal stagger={0.15} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step) => (
            <article key={step.number} className="glass-panel interactive-card rounded-md p-6 xl:p-8">
              <p className="light-marker label w-fit tabular-nums">{step.number}</p>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{step.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{step.description}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
