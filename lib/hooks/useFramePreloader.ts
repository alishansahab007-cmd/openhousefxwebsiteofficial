"use client";

import { useEffect, useState } from "react";

interface PreloadState {
  images: (HTMLImageElement | null)[];
  /** Highest frame index that is loaded with no gaps before it; -1 if none loaded yet. */
  maxContiguousLoaded: number;
}

const CONCURRENCY = 6;
const EMPTY_STATE: PreloadState = { images: [], maxContiguousLoaded: -1 };

// WebKit (iOS Safari, and Chrome-on-iOS which is WebKit underneath) has a
// known bug where decode() on a detached (not-in-DOM) image can hang
// forever — neither resolving nor rejecting. Without a timeout, that stalls
// this frame (and, for frame 0, every frame after it) indefinitely, leaving
// the canvas permanently blank. 1500ms is generous for a same-origin JPEG
// that has already fired `onload`; a real decode error surfaces near-instantly.
const DECODE_TIMEOUT_MS = 1500;

function decodeWithTimeout(img: HTMLImageElement): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve();
      }
    }, DECODE_TIMEOUT_MS);

    img
      .decode()
      .catch(() => {
        // Fall back to onload-only readiness rather than stalling the
        // queue on a decode error.
      })
      .finally(() => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
        }
        resolve();
      });
  });
}

/**
 * Preloads a sequence of frame images: frame 0 first (for immediate paint),
 * then the remainder progressively with a small concurrency cap. Exposes the
 * highest *contiguously* loaded index so a consumer can clamp playback and
 * never show a gap while later frames are still in flight.
 */
export function useFramePreloader(urls: string[]): PreloadState {
  const [state, setState] = useState<PreloadState>(EMPTY_STATE);

  useEffect(() => {
    if (urls.length === 0) return;

    let cancelled = false;
    const images: (HTMLImageElement | null)[] = new Array(urls.length).fill(null);
    const loaded: boolean[] = new Array(urls.length).fill(false);

    function contiguousLoaded(): number {
      let i = 0;
      while (i < loaded.length && loaded[i]) i++;
      return i - 1;
    }

    function loadOne(index: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = async () => {
          if (cancelled) return resolve();
          // onload only means the bytes arrived — it does not guarantee the
          // browser has decoded the JPEG into a paintable bitmap yet. If a
          // frame's first drawImage() call is what triggers that decode, it
          // happens mid-scroll and shows up as a stutter. decode() moves
          // that cost here, into the background preload phase, so every
          // frame the canvas is allowed to draw is already decode-ready.
          await decodeWithTimeout(img);
          if (cancelled) return resolve();
          images[index] = img;
          loaded[index] = true;
          setState({
            images: images.slice(),
            maxContiguousLoaded: contiguousLoaded(),
          });
          resolve();
        };
        img.onerror = () => resolve();
        img.src = urls[index];
      });
    }

    async function run() {
      await loadOne(0);
      if (cancelled) return;

      const remaining = Array.from({ length: urls.length - 1 }, (_, i) => i + 1);
      let cursor = 0;

      async function worker() {
        while (cursor < remaining.length && !cancelled) {
          const index = remaining[cursor++];
          await loadOne(index);
        }
      }

      await Promise.all(
        Array.from({ length: Math.min(CONCURRENCY, remaining.length) }, worker)
      );
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [urls]);

  return state;
}
