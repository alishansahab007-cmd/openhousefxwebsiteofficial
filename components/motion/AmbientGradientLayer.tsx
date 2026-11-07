"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { WELCOME } from "@/lib/welcome";
import styles from "./ambient.module.css";

// Share two lifecycle listeners across all layers. No render occurs on scroll.
const subscribers = new Set<() => void>();
function notify() { subscribers.forEach((callback) => callback()); }
function subscribe(callback: () => void) {
  if (!subscribers.size) {
    document.addEventListener("visibilitychange", notify);
    window.addEventListener(WELCOME.event, notify);
    document.fonts?.addEventListener("loading", notify);
    document.fonts?.addEventListener("loadingdone", notify);
    document.fonts?.addEventListener("loadingerror", notify);
  }
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
    if (!subscribers.size) {
      document.removeEventListener("visibilitychange", notify);
      window.removeEventListener(WELCOME.event, notify);
      document.fonts?.removeEventListener("loading", notify);
      document.fonts?.removeEventListener("loadingdone", notify);
      document.fonts?.removeEventListener("loadingerror", notify);
    }
  };
}
function getSnapshot() {
  return !document.hidden && document.documentElement.dataset.welcome !== "active"
    && (!document.fonts || document.fonts.status === "loaded");
}
function getServerSnapshot() { return false; }

// Keep observation in the small initial chunk. Motion's scroll helpers stay lazy.
const visibilitySubscribers = new Map<Element, (visible: boolean) => void>();
let visibilityObserver: IntersectionObserver | undefined;

function LightFields() {
  return <><span className={styles.blue} /><span className={styles.gold} /><span className={styles.slate} /></>;
}

const ScrollLight = dynamic(() => import("./ScrollLight").then((module) => module.ScrollLight), {
  ssr: false,
  loading: () => <div className={styles.field}><LightFields /></div>,
});

/** Decorative sibling of content; never wraps or transforms media or controls. */
export function AmbientGradientLayer({ variant = "section" }: { variant?: "section" | "media" | "orbit" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const available = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const reduced = useReducedMotion();
  const active = visible && available && !reduced;

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    visibilityObserver ??= new IntersectionObserver((entries) => {
      entries.forEach((entry) => visibilitySubscribers.get(entry.target)?.(entry.isIntersecting && entry.intersectionRatio >= 0.01));
    }, { threshold: [0, 0.01] });
    visibilitySubscribers.set(element, setVisible);
    visibilityObserver.observe(element);
    return () => {
      visibilityObserver?.unobserve(element);
      visibilitySubscribers.delete(element);
      if (!visibilitySubscribers.size) { visibilityObserver?.disconnect(); visibilityObserver = undefined; }
    };
  }, []);

  return (
    <div ref={ref} className={styles.layer} data-ambient-layer={variant} data-ambient-active={active} data-ambient-reduced={reduced} aria-hidden="true">
      {active ? <ScrollLight target={ref} /> : <div className={styles.field}><LightFields /></div>}
    </div>
  );
}
