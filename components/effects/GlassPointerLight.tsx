"use client";

import { useEffect } from "react";

/**
 * One delegated, passive pointer listener for the few `.glass-track` surfaces.
 * It writes --gx / --gy on the hovered card (rAF-throttled, no React state) so
 * a CSS highlight can follow the cursor. Fine pointers only; disabled for touch
 * and reduced motion. Renders nothing and never intercepts events.
 */
export function GlassPointerLight() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, x = 0, y = 0;
    let current: HTMLElement | null = null;
    let bound = false;

    function flush() {
      raf = 0;
      if (!current) return;
      const box = current.getBoundingClientRect();
      current.style.setProperty("--gx", `${(((x - box.left) / box.width) * 100).toFixed(1)}%`);
      current.style.setProperty("--gy", `${(((y - box.top) / box.height) * 100).toFixed(1)}%`);
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const target = (event.target as Element | null)?.closest?.<HTMLElement>(".glass-track") ?? null;
      if (target !== current) {
        current?.removeAttribute("data-glass-hot");
        current = target;
        current?.setAttribute("data-glass-hot", "");
      }
      if (!current) return;
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = requestAnimationFrame(flush);
    }
    function leave() {
      current?.removeAttribute("data-glass-hot");
      current = null;
    }
    function sync() {
      const enable = fine.matches && !reduced.matches;
      if (enable === bound) return;
      bound = enable;
      if (enable) {
        document.addEventListener("pointermove", move, { passive: true });
        document.documentElement.addEventListener("pointerleave", leave);
      } else {
        document.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", leave);
        cancelAnimationFrame(raf);
        raf = 0;
        leave();
      }
    }
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
      leave();
    };
  }, []);
  return null;
}
