"use client";

import Image from "next/image";
import { useCardInteraction } from "@/lib/hooks/useCardInteraction";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface Props {
  image: string;
  label: string;
  /** Drives activation externally (e.g. a selector button), OR'd with hover/focus/touch. */
  forceActive?: boolean;
  sizes?: string;
}

const SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

/**
 * Subtle pan/zoom on hover/focus/touch — a pure CSS transform, no animation
 * loop, cheap enough to leave on for mobile/low-power devices.
 */
export function PanZoomImage({ image, label, forceActive, sizes = SIZES }: Props) {
  const { active, bind } = useCardInteraction(forceActive);
  const reducedMotion = useReducedMotion();
  const zoomed = active && !reducedMotion;

  return (
    <div
      {...bind}
      className="relative h-full w-full overflow-hidden outline-none"
      role="img"
      aria-label={label}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes={sizes}
        className={`object-cover transition-transform duration-700 ease-out ${
          zoomed ? "scale-110 -translate-y-1" : "scale-100"
        }`}
      />
    </div>
  );
}
