"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let pluginRegistered = false;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Starting vertical offset in px. */
  y?: number;
  duration?: number;
  delay?: number;
  /** If set, animates direct children individually with this stagger (seconds). */
  stagger?: number;
  /** ScrollTrigger `start` value. */
  start?: string;
}

/**
 * Standard scroll-reveal wrapper: fades + slides content up once it enters
 * the viewport. Respects prefers-reduced-motion by rendering the final state
 * immediately with no animation. Pass `stagger` to animate a grid's direct
 * children individually instead of the wrapper as one block.
 *
 * Sets the hidden state with `gsap.set()` and plays the reveal explicitly
 * from a `once: true` ScrollTrigger `onEnter` callback, rather than handing
 * GSAP a `.from()` tween with an attached `scrollTrigger` shorthand — the
 * shorthand form was intermittently leaving elements' `progress()` reported
 * as complete while the DOM never actually received the rendered (opacity:1)
 * values, even across an explicit `invalidate()` + re-seek. Driving the
 * animation from an explicit callback avoids whatever internal state that
 * shorthand was getting stuck in and is easy to reason about.
 */
export function Reveal({
  children,
  className,
  y = 28,
  duration = 0.6,
  delay = 0,
  stagger,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const targets: Element | Element[] = stagger
        ? Array.from(el.children)
        : el;

      if (prefersReduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      if (!pluginRegistered) {
        gsap.registerPlugin(ScrollTrigger);
        pluginRegistered = true;
      }

      gsap.set(targets, { opacity: 0, y });

      ScrollTrigger.create({
        trigger: el,
        start,
        end: "bottom top",
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    },
    { scope: ref, dependencies: [y, duration, delay, stagger, start] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
