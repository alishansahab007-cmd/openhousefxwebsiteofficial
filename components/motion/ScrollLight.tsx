"use client";

import type { RefObject } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useIsMobileViewport } from "@/lib/hooks/useIsMobileViewport";
import styles from "./ambient.module.css";

/** Loaded only for visible, motion-enabled layers after the welcome finishes. */
export function ScrollLight({ target }: { target: RefObject<HTMLDivElement | null> }) {
  const strength = useIsMobileViewport() ? 0.4 : 1;
  const { scrollY, scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const velocity = useVelocity(scrollY);
  const bounded = useTransform(velocity, [-1600, 0, 1600], [-26 * strength, 0, 26 * strength], { clamp: true });
  const response = useSpring(bounded, { stiffness: 75, damping: 26, mass: 0.7, restDelta: 0.1 });
  const progress = useTransform(scrollYProgress, [0, 1], [-8 * strength, 8 * strength], { clamp: true });
  const position = useSpring(progress, { stiffness: 70, damping: 24, restDelta: 0.1 });
  const y = useTransform(() => response.get() + position.get());
  const x = useTransform(response, (value) => value * -0.35);

  return <motion.div className={styles.field} style={{ x, y }}><span className={styles.blue} /><span className={styles.gold} /><span className={styles.slate} /></motion.div>;
}
