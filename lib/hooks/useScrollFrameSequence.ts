"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginRegistered = false;

interface Options {
  frameCount: number;
  scrubDistanceVh?: number;
  disabled?: boolean;
  onProgress?: (progress: number) => void;
}

/**
 * Pins `sectionRef` and maps scroll progress across `scrubDistanceVh` viewport
 * heights to a discrete frame index (0..frameCount-1). Reverse scrolling falls
 * out for free since the frame index is a pure function of progress. Releases
 * the pin automatically once progress reaches 1 (GSAP `pinSpacing`).
 *
 * The frame index is written to a ref, not React state: ScrollTrigger's
 * onUpdate can fire many times per second during a fling, and routing that
 * through setState forced a full component re-render + effect cascade on
 * every tick. The canvas renderer reads this ref directly from its own
 * requestAnimationFrame loop instead, so scrolling never triggers React work.
 */
export function useScrollFrameSequence(
  sectionRef: RefObject<HTMLElement | null>,
  { frameCount, scrubDistanceVh = 300, disabled = false, onProgress }: Options
) {
  const frameIndexRef = useRef(0);
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    if (disabled || frameCount <= 1) return;
    const section = sectionRef.current;
    if (!section) return;

    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${(scrubDistanceVh / 100) * window.innerHeight}`,
      pin: true,
      pinSpacing: true,
      // Lighter smoothing than before: still rounds off raw wheel-notch
      // jerkiness, but shortens the internal catch-up tween so fewer
      // interpolation ticks (and thus frame-index changes) are generated
      // per unit of actual scroll distance.
      scrub: 0.3,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        frameIndexRef.current = Math.round(self.progress * (frameCount - 1));
        onProgressRef.current?.(self.progress);
      },
    });

    // Pinning inserts a spacer that pushes every section below the hero
    // down by the full scrub distance. Refresh once more so any other
    // scroll-triggered animation whose position was measured before this
    // pin spacer existed picks up the corrected layout (belt-and-braces —
    // frameCount is now known synchronously on first render, so this
    // should already be in place before other sections mount their own
    // triggers, but a resize/font-swap could still shift things).
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      trigger.kill();
    };
  }, [sectionRef, frameCount, scrubDistanceVh, disabled]);

  return { frameIndexRef };
}
