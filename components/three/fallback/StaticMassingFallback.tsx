"use client";

import { useEffect, useRef } from "react";

/**
 * Shown when WebGL is unavailable. A static architectural composition with
 * a lightweight CSS pointer-parallax (no WebGL) so it isn't completely
 * inert, while costing nothing on the main thread otherwise.
 */
export function StaticMassingFallback() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;

    function onMove(e: PointerEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      el!.style.transform = `translate(${x}px, ${y}px)`;
    }

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-bg">
      <div
        ref={layerRef}
        className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
      >
        <div className="flex flex-col-reverse items-center">
          {[1, 0.94, 0.88, 0.82, 0.76, 0.7].map((scale, i) => (
            <div
              key={i}
              className="h-8 border border-gold-500/60"
              style={{ width: `${scale * 220}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
