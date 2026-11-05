"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore, type AnimationEvent } from "react";
import { usePathname } from "next/navigation";
import { MEDIA } from "@/lib/media";
import { FOOTER } from "@/lib/content";
import { WELCOME } from "@/lib/welcome";
import styles from "./welcome.module.css";

function subscribe(callback: () => void) {
  window.addEventListener(WELCOME.event, callback);
  return () => window.removeEventListener(WELCOME.event, callback);
}

function getSnapshot() {
  return document.documentElement.dataset.welcome === "active";
}

function getServerSnapshot() {
  return true;
}

function finishWelcome() {
  const root = document.documentElement;
  if (root.dataset.welcome !== "active") return;
  window.clearTimeout(Number(root.dataset.welcomeTimer));
  root.removeAttribute("data-welcome");
  root.removeAttribute("data-welcome-timer");
  root.removeAttribute("data-welcome-started");
  const page = document.getElementById("site-content");
  if (page) page.inert = false;
  try { sessionStorage.setItem(WELCOME.storageKey, "completed"); } catch {}
  window.dispatchEvent(new Event(WELCOME.event));
}

export function CinematicWelcome() {
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pathname = usePathname();
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !getSnapshot()) return;
    const started = Number(document.documentElement.dataset.welcomeStarted);
    if (pathname !== "/" || document.hidden || Date.now() - started >= WELCOME.sequenceDuration) {
      finishWelcome();
      return;
    }

    const page = document.getElementById("site-content");
    const previouslyInert = page?.inert ?? false;
    if (page) page.inert = true;

    function skip() {
      const focusWasInWelcome = scope.current?.contains(document.activeElement);
      finishWelcome();
      if (focusWasInWelcome) page?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        skip();
      }
    }

    function onVisibilityChange() {
      if (document.hidden) skip();
    }

    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) skip();
    }

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onMotionChange() {
      if (preference.matches) skip();
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibilityChange);
    preference.addEventListener("change", onMotionChange);
    return () => {
      if (page) page.inert = previouslyInert;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      preference.removeEventListener("change", onMotionChange);
    };
  }, [active, pathname]);

  function skipIntro() {
    const focusWasInWelcome = scope.current?.contains(document.activeElement);
    finishWelcome();
    if (focusWasInWelcome) document.querySelector<HTMLAnchorElement>("#site-content a")?.focus({ preventScroll: true });
  }

  function onCurtainComplete(event: AnimationEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) finishWelcome();
  }

  if (!active) return null;

  return (
    <div ref={scope} data-welcome-overlay className={styles.overlay} role="dialog" aria-modal="true" aria-label="Welcome to OpenHouseFX">
      <div data-welcome-left className={`${styles.panel} ${styles.left}`} aria-hidden="true">
        <span className={styles.seam}><i /></span>
      </div>
      <div data-welcome-right className={`${styles.panel} ${styles.right}`} onAnimationEnd={onCurtainComplete} aria-hidden="true">
        <span className={styles.seam}><i /></span>
      </div>
      <div data-welcome-brand className={styles.brand}>
        <Image src={MEDIA.logoLockup} alt="OpenHouseFX" width={960} height={458} unoptimized loading="eager" fetchPriority="low" className={styles.logo} />
        <p data-welcome-tagline className={styles.tagline}>{FOOTER.tagline}</p>
      </div>
      <button type="button" onClick={skipIntro} className={styles.skip}>Skip Intro <span aria-hidden="true">↗</span></button>
    </div>
  );
}
