"use client";

import { useEffect, useRef, type RefObject } from "react";

interface Props {
  images: (HTMLImageElement | null)[];
  frameIndexRef: RefObject<number>;
  maxContiguousLoaded: number;
}

/**
 * Draws frames to a full-viewport canvas with a cover-fit crop (never
 * distorts source frames). Runs its own persistent requestAnimationFrame
 * loop for the component's whole lifetime instead of redrawing in response
 * to React renders: it reads `frameIndexRef` (mutated directly by the scroll
 * hook, no setState involved) once per browser animation frame and draws at
 * most once per frame, no matter how many scroll updates landed in between.
 * `images`/`maxContiguousLoaded` are mirrored into refs so the loop always
 * sees fresh data without needing to restart on every preload tick.
 */
export function HeroFrameCanvas({ images, frameIndexRef, maxContiguousLoaded }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef(images);
  const maxLoadedRef = useRef(maxContiguousLoaded);
  const lastDrawnRef = useRef(-1);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    maxLoadedRef.current = maxContiguousLoaded;
  }, [maxContiguousLoaded]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Sized from the canvas's own rendered CSS box (not window.innerWidth/
    // innerHeight) so the backing store always matches what's actually on
    // screen, and re-synced via ResizeObserver rather than only the window
    // "resize" event — mobile browsers don't reliably fire "resize" for
    // every layout change (address bar show/hide, orientation change) that
    // affects this element's box. Skips the write when dimensions are
    // unchanged so this doesn't do unnecessary work on every callback.
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
        lastDrawnRef.current = -1; // force a redraw at the new size
      }
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let rafId: number;

    function draw(index: number) {
      const img = imagesRef.current[index];
      const ctx = canvas!.getContext("2d");
      if (!img || !ctx) return;

      const cw = canvas!.width;
      const ch = canvas!.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;

      const scale = Math.max(cw / iw, ch / ih);
      const sw = cw / scale;
      const sh = ch / scale;
      const sx = (iw - sw) / 2;
      const sy = (ih - sh) / 2;

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      lastDrawnRef.current = index;
    }

    function tick() {
      const maxLoaded = maxLoadedRef.current;
      const target = maxLoaded >= 0 ? Math.min(frameIndexRef.current, maxLoaded) : -1;
      if (target >= 0 && target !== lastDrawnRef.current) {
        draw(target);
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [frameIndexRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
