import { FINAL_CTA } from "@/lib/content";
import { MEDIA } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CinematicFooterVideo } from "./CinematicFooterVideo";

export function FinalCta() {
  return (
    <section id="start" className="relative overflow-hidden border-t border-line py-28 md:py-36">
      <CinematicFooterVideo
        poster={MEDIA.listingExteriorTwilight}
        videoSrc="/media/services/cinematic-films.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg/70" />

      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-14">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold leading-tight text-ink md:text-5xl">
            {FINAL_CTA.headline}
          </h2>
          <div className="mt-10 flex justify-center">
            <Button href="/start-a-listing" variant="primary" className="px-10">
              {FINAL_CTA.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
