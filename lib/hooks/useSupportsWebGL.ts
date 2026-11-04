"use client";

import { useSyncExternalStore } from "react";
import { detectWebGL } from "@/lib/three/detectWebGL";

// WebGL support doesn't change mid-session, so there's nothing to subscribe
// to — this just gives a render-safe (no effect/setState) one-time read.
function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return false;
}

export function useSupportsWebGL() {
  return useSyncExternalStore(subscribe, detectWebGL, getServerSnapshot);
}
