"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed, click-through atmospheric lighting. CSS keyframes provide the slow idle
 * drift; this controller only publishes scroll-derived CSS variables
 * (--ag-x, --ag-y, --ag-e) that each light field consumes at its own depth.
 * No React state, a single rAF loop that sleeps when scrolling settles, and
 * native scrolling is never altered.
 */
export function AmbientGradient() {
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, previous = 0, lastY = window.scrollY, velocity = 0, energy = 0;
    let strength = window.innerWidth < 768 ? 0.45 : 1;
    function allowed() { return !document.hidden && !preference.matches; }
    function paint(y: number) {
      el!.style.setProperty("--ag-x", `${(Math.sin(y / 1100) * (14 + energy * 26) * strength).toFixed(2)}px`);
      el!.style.setProperty("--ag-y", `${(Math.cos(y / 1600) * (18 + energy * 30) * strength).toFixed(2)}px`);
      el!.style.setProperty("--ag-e", energy.toFixed(3));
    }
    function tick(now: number) {
      raf = 0;
      if (!allowed()) return;
      const dt = Math.min(64, Math.max(1, now - previous));
      previous = now;
      const y = window.scrollY;
      velocity += (Math.abs(y - lastY) / dt - velocity) * (1 - Math.exp(-dt / 85));
      lastY = y;
      const target = Math.min(velocity / 2.5, 1);
      energy += (target - energy) * (1 - Math.exp(-dt / (target > energy ? 130 : 470)));
      paint(y);
      if (energy > 0.002 || velocity > 0.002) raf = requestAnimationFrame(tick);
      else previous = 0;
    }
    function start() {
      if (!allowed() || raf) return;
      // Retain the previous sample time during an active scroll burst.
      if (!previous) previous = performance.now() - 16;
      raf = requestAnimationFrame(tick);
    }
    // Visibility / motion-preference changes restart cleanly. The current
    // scroll-derived offset is painted immediately, so returning to the tab
    // never snaps the light to a neutral position.
    function reset() {
      cancelAnimationFrame(raf);
      raf = previous = velocity = energy = 0;
      lastY = window.scrollY;
      el!.dataset.paused = String(!allowed());
      if (preference.matches) {
        el!.style.setProperty("--ag-x", "0px");
        el!.style.setProperty("--ag-y", "0px");
        el!.style.setProperty("--ag-e", "0");
      } else paint(lastY);
    }
    // Mobile browsers fire resize while scrolling (URL bar collapse). Only the
    // viewport-dependent strength changes; the scroll animation keeps running.
    function resize() {
      strength = window.innerWidth < 768 ? 0.45 : 1;
      if (!raf && allowed()) paint(window.scrollY);
    }
    reset();
    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", reset);
    preference.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", start);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", reset);
      preference.removeEventListener("change", reset);
    };
  }, []);
  return (
    <div ref={layer} className="ambient-gradient" aria-hidden="true">
      <i /><i /><i /><i /><i />
    </div>
  );
}
