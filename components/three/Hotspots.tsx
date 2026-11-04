"use client";

import { useState } from "react";
import { Html } from "@react-three/drei";

interface Hotspot {
  label: string;
  position: [number, number, number];
}

export function Hotspots({ hotspots }: { hotspots: readonly Hotspot[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      {hotspots.map((hotspot, i) => (
        <Html key={hotspot.label} position={hotspot.position} center distanceFactor={8} occlude>
          <button
            type="button"
            onClick={() => setActive((current) => (current === i ? null : i))}
            aria-label={hotspot.label}
            className="h-3 w-3 cursor-pointer rounded-full border border-gold-500 bg-bg/80"
          />
          {active === i && (
            <div className="absolute left-4 top-0 w-40 rounded-sm border border-gold-500/40 bg-bg/95 p-3 text-xs text-ink">
              {hotspot.label}
            </div>
          )}
        </Html>
      ))}
    </>
  );
}
