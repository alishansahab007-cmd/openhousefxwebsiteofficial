"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useSupportsWebGL } from "@/lib/hooks/useSupportsWebGL";
import { StaticMassingFallback } from "./fallback/StaticMassingFallback";

const ArchitecturalScene = dynamic(
  () => import("./ArchitecturalScene").then((m) => m.ArchitecturalScene),
  { ssr: false, loading: () => null }
);

export function CanvasGate({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const supportsWebGL = useSupportsWebGL();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !supportsWebGL) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [supportsWebGL]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ aspectRatio: "16 / 9" }}
    >
      {supportsWebGL === false ? (
        <StaticMassingFallback />
      ) : shouldMount ? (
        <ArchitecturalScene />
      ) : null}
    </div>
  );
}
