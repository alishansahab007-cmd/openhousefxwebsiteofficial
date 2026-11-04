"use client";

import { useSyncExternalStore } from "react";

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

function computeIsLowPower(): boolean {
  const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;

  const connection = (
    navigator as Navigator & { connection?: NetworkInformationLike }
  ).connection;
  const saveData = connection?.saveData === true;
  const slowNet = connection?.effectiveType
    ? ["slow-2g", "2g"].includes(connection.effectiveType)
    : false;

  return lowCores || saveData || slowNet;
}

// Device capability doesn't change mid-session, so there's nothing to
// subscribe to — this just gives us a render-safe (no effect/setState)
// one-time read via useSyncExternalStore instead of useState+useEffect.
function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return false;
}

export function useIsLowPowerDevice() {
  return useSyncExternalStore(subscribe, computeIsLowPower, getServerSnapshot);
}
