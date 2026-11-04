"use client";

import { useSyncExternalStore } from "react";
import { HERO_MOBILE_MEDIA_QUERY } from "@/lib/config/hero";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(HERO_MOBILE_MEDIA_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(HERO_MOBILE_MEDIA_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Same viewport width HeroVideoScrub's <source media> split already uses to
 * choose a video encode — here it picks the hero's rendering *architecture*
 * instead: the frame-canvas branch below this width, the video-scrub branch
 * above it. Mirrors useReducedMotion's SSR-safe matchMedia pattern so the
 * correct branch is already known by the first client render, no flash of
 * the wrong one.
 */
export function useIsMobileViewport() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
