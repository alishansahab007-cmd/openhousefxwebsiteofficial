import { Button } from "@/components/ui/Button";
import { HERO } from "@/lib/content";
import { HeroMedia } from "./HeroMedia";

export function CinematicHero() {
  return (
    <section className="property-hero relative isolate overflow-hidden border-b border-line bg-bg" aria-labelledby="hero-heading">
      <HeroMedia />
      <div className="hero-shade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="site-shell hero-content relative z-10">
        <p className="label editorial-label">{HERO.eyebrow}</p>
        <h1 id="hero-heading" className="hero-title font-display">
          Make every listing{" "}
          <em className="editorial-accent block">worth a closer look.</em>
        </h1>
        <p className="hero-description text-ink-dim">
          {HERO.description}
        </p>
        <div className="hero-actions mt-8 flex flex-wrap gap-3 md:mt-10">
          <Button href="/start-a-listing">{HERO.primaryCta}</Button>
          <Button href="/#work" variant="secondary">{HERO.secondaryCta}</Button>
        </div>
      </div>
      <p className="label absolute right-[var(--site-gutter)] top-9 hidden items-center gap-3 lg:flex" aria-hidden="true">
        <span className="h-px w-7 bg-gold-500" /> 01 / Studio showreel
      </p>
    </section>
  );
}
