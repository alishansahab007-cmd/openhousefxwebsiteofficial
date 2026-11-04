"use client";

import { useMemo } from "react";
import * as THREE from "three";

const FLOOR_COUNT = 6;
const FLOOR_HEIGHT = 0.6;
const GOLD = "#d6af58";

interface FloorConfig {
  y: number;
  w: number;
  d: number;
}

/**
 * Procedural architectural massing model — stacked, setback "floor plate"
 * volumes with gold wireframe edges over dark glass-like material. Reads as
 * an architectural study model rather than a generic 3D demo. Swap point for
 * a real GLB later: replace this component's internals with useGLTF, keep
 * the same wrapping <group> so ArchitecturalScene/Hotspots don't need to change.
 */
export function BuildingMassing() {
  const floors = useMemo<FloorConfig[]>(
    () =>
      Array.from({ length: FLOOR_COUNT }, (_, i) => {
        const scale = 1 - i * 0.06;
        return { y: i * FLOOR_HEIGHT, w: 3 * scale, d: 2 * scale };
      }),
    []
  );

  return (
    <group position={[0, -((FLOOR_COUNT * FLOOR_HEIGHT) / 2), 0]}>
      {floors.map((f, i) => (
        <FloorPlate key={i} {...f} />
      ))}
    </group>
  );
}

function FloorPlate({ y, w, d }: FloorConfig) {
  const geometry = useMemo(
    () => new THREE.BoxGeometry(w, FLOOR_HEIGHT * 0.9, d),
    [w, d]
  );
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <group position={[0, y, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#102b3b"
          metalness={0.6}
          roughness={0.25}
          transparent
          opacity={0.92}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={GOLD} />
      </lineSegments>
    </group>
  );
}
