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
  const [isVisible, setIsVisible] = useState(false);
  const supportsWebGL = useSupportsWebGL();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !supportsWebGL || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
      if (entry.isIntersecting) setShouldMount(true);
    });
    observer.observe(el);
    return () => observer.disconnect();
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
        <ArchitecturalScene active={isVisible} />
      ) : null}
    </div>
  );
}
