"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Slow autonomous drift + damped pointer-parallax — deliberately not
 * OrbitControls/free-drag, which would feel like a toy rather than an
 * architectural walkthrough. The only interaction surface is hover/pointer
 * position plus clicking hotspots.
 */
export function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 6));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const driftX = Math.sin(t * 0.15) * 0.4;
    const driftY = Math.cos(t * 0.1) * 0.15;

    const parallaxX = pointer.x * 0.6;
    const parallaxY = pointer.y * 0.3;

    target.current.set(driftX + parallaxX, driftY + parallaxY, 6);
    camera.position.lerp(target.current, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
