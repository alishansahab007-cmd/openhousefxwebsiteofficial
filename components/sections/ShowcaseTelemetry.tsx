"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const panel: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 20 } },
};

export function ShowcaseTelemetry() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="showcase-telemetry pointer-events-none absolute inset-0"
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <span className="telemetry-corner top-3 left-3 border-t border-l sm:top-5 sm:left-5" />
      <span className="telemetry-corner top-3 right-3 border-t border-r sm:top-5 sm:right-5" />
      <span className="telemetry-corner right-3 bottom-3 border-r border-b sm:right-5 sm:bottom-5" />

      <motion.div variants={panel} className="absolute top-5 left-5 sm:top-9 sm:left-9">
        <div className="telemetry-radar">
          <span className="telemetry-sweep absolute inset-0 rounded-full" />
          <span className="telemetry-dot absolute top-[25%] left-[66%]" />
        </div>
        <p className="mt-2 text-gold-300">Tracking motion</p>
        <p className="hidden sm:block">Cinematic render</p>
        <p className="hidden sm:block">Color grading active</p>
      </motion.div>

      <motion.div variants={panel} className="absolute top-5 right-5 text-right sm:top-9 sm:right-9">
        <p className="text-gold-300">Demo telemetry</p>
        <p className="mt-2">4K pans</p>
        <p className="hidden sm:block">Stabilization active</p>
        <p className="hidden sm:block">24 FPS · ISO 400</p>
      </motion.div>

      <motion.div variants={panel} className="telemetry-wave absolute bottom-3.5 left-1/2 hidden -translate-x-1/2 items-center gap-2 sm:bottom-6 sm:flex">
        <span className="telemetry-dot" />
        <svg viewBox="0 0 110 18" width="110" height="18" fill="none">
          <path d="M0 9h19l5-3 6 6 5-3h8l6-8 6 16 6-13 6 8 5-3h8l5-3 5 3h20" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span className="telemetry-dot" />
      </motion.div>

      <motion.div variants={panel} className="absolute right-5 bottom-5 hidden text-right sm:right-9 sm:bottom-8 sm:block">
        <p className="text-gold-300">+35% engagement <span className="text-white/65">/ sample</span></p>
        <p>Smooth tracking</p>
      </motion.div>

      <span className="telemetry-dot absolute top-[43%] left-[51%] hidden sm:block" />
      <span className="telemetry-dot absolute top-[55%] left-[65%] hidden sm:block" />
    </motion.div>
  );
}
