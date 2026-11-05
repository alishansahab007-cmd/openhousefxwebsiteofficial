"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface Props {
  poster: string;
  videoSrc: string;
}

/** How long the video layer's own fade in/out takes. */
const FADE_MS = 900;
/** Start fading out this many seconds before the clip's natural end. */
const FADE_LEAD_S = FADE_MS / 1000;
/** Brief pause on black, already restarted, before fading back in. */
const BLACK_HOLD_MS = 200;

/**
 * Background visual for the closing CTA: plays once the section is near the
 * viewport, then loops indefinitely via a manual fade/restart/fade cycle
 * rather than the native `loop` attribute. The source clip's final frame (a
 * tight push-in) doesn't match its opening frame (a wide establishing
 * shot), so a raw loop would show a hard cut. Instead the video layer fades
 * to black just before it ends, the clip resets and resumes while
 * invisible, then fades back in — the cut happens while the poster is visible,
 * never on screen. Only the video's own opacity animates here: the poster
 * (which stays behind the video) and the CTA/gradient
 * above are untouched by this cycle. Falls back to a static poster under
 * prefers-reduced-motion, and the video is never even added to the DOM
 * until the section is actually relevant, so nothing loads early.
 */
export function CinematicFooterVideo({ poster, videoSrc }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [videoDimmed, setVideoDimmed] = useState(true);
  const reducedMotion = useReducedMotion();
  const playVideo = isNearViewport && !reducedMotion;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playVideo) return;
    const video = videoRef.current;
    if (!video) return;

    let restartTimer: number | undefined;
    const handleTimeUpdate = () => {
      if (video.duration && video.duration - video.currentTime <= FADE_LEAD_S) {
        setVideoDimmed(true);
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      restartTimer = window.setTimeout(() => {
        void video.play().catch(() => {});
      }, BLACK_HOLD_MS);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    return () => {
      window.clearTimeout(restartTimer);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [playVideo]);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-bg">
      <Image
        src={poster}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      {playVideo ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out ${
            videoDimmed ? "opacity-0" : "opacity-100"
          }`}
          style={{ transitionDuration: `${FADE_MS}ms` }}
          src={videoSrc}
          muted
          playsInline
          autoPlay
          onPlaying={() => setVideoDimmed(false)}
          onError={() => setVideoDimmed(true)}
          preload="metadata"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
