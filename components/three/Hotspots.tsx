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
        <Html key={hotspot.label} position={hotspot.position} center occlude zIndexRange={active === i ? [30, 20] : [10, 0]}>
          {/* Fixed screen size (no distance scaling): a 44px hit area around a
              small marker, and a label that opens toward the middle of the frame. */}
          <button
            type="button"
            onClick={() => setActive((current) => (current === i ? null : i))}
            onKeyDown={(event) => { if (event.key === "Escape") setActive(null); }}
            aria-label={hotspot.label}
            aria-expanded={active === i}
            className="hotspot-marker"
          >
            <span aria-hidden="true" />
          </button>
          {active === i && (
            <div role="status" className="hotspot-tooltip" data-side={hotspot.position[1] > 0 ? "below" : "above"}>
              {hotspot.label}
            </div>
          )}
        </Html>
      ))}
    </>
  );
}
