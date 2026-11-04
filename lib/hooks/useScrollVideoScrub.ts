"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;

interface Options {
  scrubDistanceVh?: number;
  disabled?: boolean;
}

// Mobile decoders commonly take well over one frame's worth of time to
// resolve a seek at this resolution. If 'seeked' never fires — some
// implementations skip it for a seek they consider a no-op — this bounds
// how long a stalled seek can block the next one, mirroring the decode
// watchdog in useFramePreloader.
const SEEK_WATCHDOG_MS = 250;

/**
 * Pins `sectionRef` and maps scroll progress across `scrubDistanceVh` viewport
 * heights onto `videoRef`'s currentTime (0 at the top of the pin, the clip's
 * full duration at the bottom) — the video counterpart of
 * useScrollFrameSequence's frame-index mapping. Reverse scrolling scrubs
 * backward for free since currentTime is a pure function of progress.
 *
 * Progress is written to a plain variable inside ScrollTrigger's onUpdate
 * (which can fire many times per second during a fling). Applying it to the
 * video is seek-coalesced: only one seek is ever in flight at a time — a new
 * one is issued only once the previous one's 'seeked' event has fired, and
 * always jumps straight to the *latest* requested progress rather than the
 * value that was current when the previous seek was issued. Without this,
 * assigning currentTime every animation frame aborts whatever seek the
 * decoder is mid-flight on and restarts it (per the HTML seek algorithm) —
 * invisible on a fast desktop decoder that resolves a seek within a frame or
 * two, but on slower mobile decoders the decoder never gets to finish a
 * single seek, which is what shows up as stutter/lag/skipped frames.
 */
export function useScrollVideoScrub(
  sectionRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  { scrubDistanceVh = 300, disabled = false }: Options
) {
  useEffect(() => {
    if (disabled) return;
    const section = sectionRef.current;
    const videoEl = videoRef.current;
    if (!section || !videoEl) return;
    // Closures below (tick/handleSeeked) don't retain flow-narrowing on a
    // union-typed const, so bind it once to a concretely-typed local.
    const video: HTMLVideoElement = videoEl;

    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }

    let progress = 0;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${(scrubDistanceVh / 100) * window.innerHeight}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.3,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progress = self.progress;
      },
    });

    // See useScrollFrameSequence for why this second refresh exists: the
    // pin spacer shifts every section below the hero down, and other
    // scroll-triggered animations need layout measured after that shift.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    let rafId: number;
    let lastAppliedTime = -1;
    let seekInFlight = false;
    let watchdogId: number | null = null;

    function clearWatchdog() {
      if (watchdogId !== null) {
        window.clearTimeout(watchdogId);
        watchdogId = null;
      }
    }

    function handleSeeked() {
      seekInFlight = false;
      clearWatchdog();
    }
    video.addEventListener("seeked", handleSeeked);

    function tick() {
      const duration = video.duration;
      if (!seekInFlight && Number.isFinite(duration) && video.readyState >= 1) {
        const target = Math.min(Math.max(progress, 0), 1) * duration;
        // Skip near-identical seeks (sub-frame deltas at 24fps); a real
        // change in progress still lands within the next tick or two, so
        // scrubbing stays continuous rather than stepping.
        if (Math.abs(target - lastAppliedTime) > 0.008) {
          lastAppliedTime = target;
          seekInFlight = true;
          watchdogId = window.setTimeout(() => {
            seekInFlight = false;
            watchdogId = null;
          }, SEEK_WATCHDOG_MS);
          try {
            if (typeof video.fastSeek === "function") {
              video.fastSeek(target);
            } else {
              video.currentTime = target;
            }
          } catch {
            // A rejected/invalid seek shouldn't wedge the loop — release the
            // slot so the next tick retries against the latest progress.
            seekInFlight = false;
            clearWatchdog();
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      trigger.kill();
      cancelAnimationFrame(rafId);
      clearWatchdog();
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [sectionRef, videoRef, scrubDistanceVh, disabled]);
}
