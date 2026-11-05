"use client";

import { useEffect, type ReactNode } from "react";
import { useAnimate } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  stiffness?: number;
}

export function Reveal({ children, className, delay = 0, stagger, y = 20, stiffness = 100 }: RevealProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    const wrapper = scope.current;
    if (!wrapper || typeof IntersectionObserver === "undefined") return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = stagger ? Array.from(wrapper.children) : [wrapper];

    // Server HTML stays visible. Only play an entrance when a target scrolls into view.
    const observer = new IntersectionObserver((entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => targets.indexOf(a.target) - targets.indexOf(b.target));

      entering.forEach(({ target }, index) => {
        observer.unobserve(target);
        if (preference.matches) return;
        animate(
          target,
          { opacity: [0, 1], y: [y, 0] },
          {
            type: "spring",
            stiffness,
            damping: 20,
            delay: delay + index * (stagger ?? 0),
          }
        );
      });
    });

    for (const target of targets) {
      const { top, bottom } = target.getBoundingClientRect();
      if (top >= window.innerHeight || bottom <= 0) observer.observe(target);
    }

    return () => observer.disconnect();
  }, [animate, delay, scope, stagger, stiffness, y]);

  return <div ref={scope} className={className}>{children}</div>;
}
