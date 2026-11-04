import { PROBLEM } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Problem() {
  return (
    <section id="problem" className="border-t border-line bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-14">
        <Reveal>
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold leading-tight text-ink md:text-4xl">
            {PROBLEM.headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <Reveal
              stagger={0.08}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2"
            >
              {PROBLEM.inputs.map((input, i) => (
                <div
                  key={input}
                  className={`rounded-sm border border-line bg-bg-raised px-4 py-6 text-center text-sm text-ink-dim ${
                    i % 2 === 0 ? "md:translate-y-3" : ""
                  }`}
                >
                  {input}
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.1}>
              <p className="label mt-6 !text-ink-dim">{PROBLEM.scatteredCaption}</p>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center border-t border-line pt-10 md:border-t-0 md:border-l md:pt-0 md:pl-16">
            <Reveal>
              <p className="font-display text-2xl font-semibold text-ink md:text-3xl">
                OpenHouse<span className="text-gold-500">FX</span>
              </p>
              <div className="mt-6 h-px w-12 bg-gold-500" />
              <p className="mt-6 max-w-sm text-lg text-ink md:text-xl">
                One partner. One listing. Every asset it needs to sell.
              </p>
              <p className="label mt-6">{PROBLEM.funnelCaption}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
