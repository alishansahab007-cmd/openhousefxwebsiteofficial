"use client";

import Image from "next/image";
import { useState } from "react";
import { useCardInteraction } from "@/lib/hooks/useCardInteraction";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface Props {
  poster: string;
  label: string;
  /** Left undefined for a service with no clip yet — the card simply rests on its poster. */
  videoSrc?: string;
  /**
   * "landscape" fills the card's existing 4:3 media slot (Cinematic Films).
   * "portrait" letterboxes a centered 9:16 block inside that same slot
   * (Social Reels) without changing the card's own footprint.
   */
  variant?: "landscape" | "portrait";
  /** Drives activation externally (e.g. a selector button), OR'd with hover/focus/touch. */
  forceActive?: boolean;
  sizes?: string;
  preload?: boolean;
}

const SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

/**
 * Poster image at rest. On hover/focus/touch, mounts a muted video over it
 * that plays once from the beginning and holds on its last frame — no
 * `loop`, so it never snaps back to frame 1 while still active. The <video>
 * element only exists in the DOM while active, so no clip is fetched until
 * someone actually engages with the card, and it's unmounted (not just
 * hidden) on leave — which is also what makes the next activation start
 * over from the beginning: a fresh <video> mount always begins at time 0.
 */
export function HoverVideoCard({ poster, videoSrc, variant = "landscape", label, forceActive, sizes = SIZES, preload = false }: Props) {
  const { active, bind } = useCardInteraction(forceActive);
  const reducedMotion = useReducedMotion();
  const playing = active && !reducedMotion && Boolean(videoSrc);

  const frameClassName =
    variant === "portrait"
      ? "relative mx-auto h-full aspect-[9/16] max-w-full"
      : "relative h-full w-full";

  return (
    <div
      {...bind}
      className="relative flex h-full w-full items-center justify-center bg-bg outline-none"
      role="img"
      aria-label={`${label} preview`}
    >
      <div className={frameClassName}>
        <Image
          src={poster}
          alt=""
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
        {playing && videoSrc ? <PreviewVideo src={videoSrc} /> : null}
      </div>
    </div>
  );
}

function PreviewVideo({ src }: { src: string }) {
  const [hasFrame, setHasFrame] = useState(false);

  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hasFrame ? "opacity-100" : "opacity-0"}`}
      src={src}
      muted
      playsInline
      autoPlay
      preload="metadata"
      onPlaying={() => setHasFrame(true)}
      onError={() => setHasFrame(false)}
    />
  );
}
