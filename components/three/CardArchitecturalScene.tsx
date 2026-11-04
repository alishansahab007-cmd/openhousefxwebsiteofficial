"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { BuildingMassing } from "./BuildingMassing";
import { SceneLighting } from "./SceneLighting";

/**
 * Card-scale companion to ArchitecturalScene: same procedural massing model
 * and lighting, but with drag-to-orbit controls instead of CameraRig's
 * autonomous drift/parallax. CameraRig is deliberately not reused here — it
 * is tuned for the full-width main Interactive Experience section's ambient
 * feel, whereas this card's whole purpose is letting a visitor grab the
 * model and turn it, so the interaction needs to be direct manipulation
 * rather than passive drift. Hotspots are intentionally left out too: their
 * DOM-overlay labels are sized for the full section and would clutter (and
 * fight for pointer events with) a card this small.
 */
export function CardArchitecturalScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#071b29"]} />
      <SceneLighting />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
      />
      <Suspense fallback={null}>
        <BuildingMassing />
      </Suspense>
    </Canvas>
  );
}
