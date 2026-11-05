"use client";

import Image from "next/image";
import { useCardInteraction } from "@/lib/hooks/useCardInteraction";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface Props {
  before: string;
  after: string;
  label: string;
  /** Drives activation externally (e.g. a selector button), OR'd with hover/focus/touch. */
  forceActive?: boolean;
  sizes?: string;
}

const SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

/**
 * Crossfades from the "before" still to the "after" still on hover, keyboard
 * focus, or touch. Reduced motion skips the fade and rests on the "after"
 * state immediately, matching how the hero/fallback scene already treats
 * prefers-reduced-motion.
 */
export function BeforeAfterHover({ before, after, label, forceActive, sizes = SIZES }: Props) {
  const { active, bind } = useCardInteraction(forceActive);
  const reducedMotion = useReducedMotion();
  const showAfter = active || reducedMotion;

  return (
    <div
      {...bind}
      className="relative h-full w-full outline-none"
      role="img"
      aria-label={`${label} — before and after preview`}
    >
      <Image src={before} alt="" fill sizes={sizes} className="object-cover" />
      <Image
        src={after}
        alt=""
        fill
        sizes={sizes}
        className={`object-cover transition-opacity duration-700 ease-out ${
          showAfter ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
