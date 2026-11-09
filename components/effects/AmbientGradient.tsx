"use client";

import { useEffect, useRef } from "react";

export function AmbientGradient() {
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, previous = 0, lastY = window.scrollY, velocity = 0, energy = 0;
    function allowed() { return !document.hidden && !preference.matches; }
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
      const strength = window.innerWidth < 768 ? 0.45 : 1;
      el!.style.transform = `translate3d(${Math.sin(y / 1100) * (14 + energy * 26) * strength}px, ${Math.cos(y / 1600) * (18 + energy * 30) * strength}px, 0)`;
      el!.style.opacity = String(0.8 + energy * 0.2);
      if (energy > 0.002 || velocity > 0.002) raf = requestAnimationFrame(tick);
    }
    function start() {
      if (!allowed() || raf) return;
      // Retain the previous sample time during an active scroll burst.
      if (!previous) previous = performance.now() - 16;
      raf = requestAnimationFrame(tick);
    }
    function reset() {
      cancelAnimationFrame(raf);
      raf = previous = velocity = energy = 0;
      lastY = window.scrollY;
      el!.dataset.paused = String(!allowed());
      el!.style.transform = "none";
      el!.style.opacity = "0.8";
      if (allowed()) start();
    }
    reset();
    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("resize", reset);
    document.addEventListener("visibilitychange", reset);
    preference.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", start);
      window.removeEventListener("resize", reset);
      document.removeEventListener("visibilitychange", reset);
      preference.removeEventListener("change", reset);
    };
  }, []);
  return <div ref={layer} className="ambient-gradient" aria-hidden="true"><i /><i /><i /></div>;
}
