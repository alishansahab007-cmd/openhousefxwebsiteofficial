"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { BuildingMassing } from "./BuildingMassing";
import { CameraRig } from "./CameraRig";
import { SceneLighting } from "./SceneLighting";
import { Hotspots } from "./Hotspots";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { INTERACTIVE_EXPERIENCE } from "@/lib/content";

export function ArchitecturalScene({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotion();
  const frameloop = active ? (reducedMotion ? "demand" : "always") : "never";

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#071b29"]} />
      <SceneLighting />
      {!reducedMotion ? <CameraRig /> : null}
      <Suspense fallback={null}>
        <BuildingMassing />
        <Hotspots hotspots={INTERACTIVE_EXPERIENCE.hotspots} />
      </Suspense>
    </Canvas>
  );
}
