"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function Reveal({ children, className, delay = 0, stagger }: RevealProps) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = scope.current;
    if (!wrapper || typeof IntersectionObserver === "undefined") return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = stagger ? Array.from(wrapper.children) : [wrapper];

    // Server HTML stays visible. Only play an entrance when a target scrolls into view.
    const observer = new IntersectionObserver((entries) => {
      const entering = entries.filter((entry) => entry.isIntersecting);
      entering.forEach(({ target }, index) => {
        observer.unobserve(target);
        if (preference.matches || !(target instanceof HTMLElement)) return;
        const wait = Math.min(0.16, delay + index * Math.min(stagger ?? 0, 0.055));
        target.style.setProperty("--reveal-delay", `${wait}s`);
        target.dataset.reveal = stagger ? "item" : "section";
      });
    });

    for (const target of targets) {
      const { top, bottom } = target.getBoundingClientRect();
      if (top >= window.innerHeight || bottom <= 0) observer.observe(target);
    }

    return () => observer.disconnect();
  }, [delay, stagger]);

  return (
    <div
      ref={scope}
      className={className}
      onAnimationEnd={({ animationName, target }) => {
        if (animationName === "section-reveal" && target instanceof HTMLElement) {
          delete target.dataset.reveal;
          target.style.removeProperty("--reveal-delay");
        }
      }}
    >
      {children}
    </div>
  );
}
