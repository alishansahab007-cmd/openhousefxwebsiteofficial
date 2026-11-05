"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HERO_MOBILE_MEDIA_QUERY, HERO_VIDEO_POSTER, HERO_VIDEO_SRC, HERO_VIDEO_SRC_MOBILE } from "@/lib/config/hero";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function HeroMedia() {
  const reducedMotion = useReducedMotion();
  const [useOriginalPoster, setUseOriginalPoster] = useState(false);

  return (
    <>
      <Image
        src={HERO_VIDEO_POSTER}
        alt=""
        fill
        preload={!useOriginalPoster}
        unoptimized={useOriginalPoster}
        sizes="100vw"
        className="hero-media"
        onError={() => setUseOriginalPoster(true)}
      />
      {!reducedMotion ? <FilmPlayer /> : null}
    </>
  );
}

function playFilm(video: HTMLVideoElement) {
  if (!video.hasAttribute("src")) {
    video.src = window.matchMedia(HERO_MOBILE_MEDIA_QUERY).matches
      ? HERO_VIDEO_SRC_MOBILE
      : HERO_VIDEO_SRC;
  }
  if (video.paused) void video.play().catch(() => {});
}

function FilmPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useRef(false);
  const pausedByVisitor = useRef(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (failed || !video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true;

    function syncPlayback() {
      if (!video) return;
      if (isVisible.current && !document.hidden && !pausedByVisitor.current) {
        playFilm(video);
      } else if (!video.paused) {
        video.pause();
      }
    }

    const observer = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(([entry]) => {
        isVisible.current = entry.isIntersecting;
        syncPlayback();
      });

    if (observer) {
      observer.observe(video);
    } else {
      isVisible.current = true;
      syncPlayback();
    }

    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [failed]);

  if (failed) return null;

  function toggleMotion() {
    const video = videoRef.current;
    if (!video) return;

    pausedByVisitor.current = !video.paused;
    if (pausedByVisitor.current) {
      video.pause();
    } else {
      playFilm(video);
    }
  }

  function handleError() {
    const video = videoRef.current;
    if (video?.getAttribute("src") === HERO_VIDEO_SRC_MOBILE) {
      video.src = HERO_VIDEO_SRC;
      if (isVisible.current && !document.hidden && !pausedByVisitor.current) playFilm(video);
    } else {
      setFailed(true);
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className={hasFrame ? "hero-media hero-video opacity-100" : "hero-media hero-video opacity-0"}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        onPlaying={() => {
          setHasFrame(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onError={handleError}
      />
      <button
        type="button"
        onClick={toggleMotion}
        className="hero-motion-button absolute z-20 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/25 bg-bg/80 px-4 text-xs font-medium text-ink backdrop-blur-sm transition duration-300 hover:border-gold-500 hover:text-gold-500"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          {playing ? <path d="M6 3v10m4-10v10" stroke="currentColor" strokeWidth="1.5" /> : <path d="m5 3 8 5-8 5V3Z" fill="currentColor" />}
        </svg>
        {playing ? "Pause film" : "Play film"}
      </button>
    </>
  );
}
