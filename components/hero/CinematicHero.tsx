"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  HERO_VIDEO_POSTER,
  HERO_VIDEO_SRC,
  HERO_VIDEO_SRC_MOBILE,
} from "@/lib/config/hero";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useIsLowPowerDevice } from "@/lib/hooks/useIsLowPowerDevice";
import { HeroVideoScrub } from "./HeroVideoScrub";
import { HeroFallbackScene } from "./HeroFallbackScene";

export function CinematicHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const isLowPowerDevice = useIsLowPowerDevice();
  const [videoUnsupported, setVideoUnsupported] = useState(false);

  const showFallback = reducedMotion || isLowPowerDevice || videoUnsupported;
  const animateFallback = !reducedMotion && !isLowPowerDevice;

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-bg">
      {showFallback ? (
        <HeroFallbackScene animated={animateFallback} />
      ) : (
        <HeroVideoScrub
          ref={videoRef}
          src={HERO_VIDEO_SRC}
          srcMobile={HERO_VIDEO_SRC_MOBILE}
          poster={HERO_VIDEO_POSTER}
          onUnsupported={() => setVideoUnsupported(true)}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg/85 via-bg/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/75 via-transparent to-bg/10"
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-20 pt-32 md:px-14 md:pb-24">
        <p className="label mb-4">OpenHouseFX · Property Media</p>
        <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.05] text-ink md:text-6xl lg:text-7xl">
          Every listing.
          <br />
          More than a photo gallery.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-dim md:text-base">
          From property photography to cinematic films, social content and
          immersive digital experiences — OpenHouseFX transforms listing
          assets into complete marketing systems.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/start-a-listing"
            className="flex min-h-11 items-center justify-center rounded-sm border border-gold-500 bg-gold-500 px-6 text-xs font-medium uppercase tracking-[0.2em] text-bg transition duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-300"
          >
            Request a Quote
          </Link>
          <Link
            href="/#services"
            className="flex min-h-11 items-center justify-center rounded-sm border border-line bg-bg/25 px-6 text-xs font-medium uppercase tracking-[0.2em] text-ink transition duration-300 hover:-translate-y-0.5 hover:border-gold-500"
          >
            Explore Services
          </Link>
        </div>
      </div>

      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="hero-scroll-cue absolute bottom-7 right-6 z-10 hidden items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-ink-dim md:flex md:right-14"
        >
          <span>Scroll to explore</span>
          <span className="hero-scroll-cue__line" />
        </div>
      )}
    </section>
  );
}
