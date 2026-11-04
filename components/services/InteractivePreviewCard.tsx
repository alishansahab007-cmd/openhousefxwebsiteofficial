"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCardInteraction } from "@/lib/hooks/useCardInteraction";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useSupportsWebGL } from "@/lib/hooks/useSupportsWebGL";

interface Props {
  poster: string;
  label: string;
  /** Drives activation externally (e.g. a selector button), OR'd with hover/focus/touch. */
  forceActive?: boolean;
}

const SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

const CardArchitecturalScene = dynamic(
  () =>
    import("@/components/three/CardArchitecturalScene").then(
      (m) => m.CardArchitecturalScene
    ),
  { ssr: false, loading: () => null }
);

/**
 * Reuses the site's existing procedural building-massing model and lighting
 * (see CardArchitecturalScene) rather than a second, from-scratch 3D build —
 * but drives the camera with drag-to-orbit controls instead of the main
 * section's ambient CameraRig, since this card's job is to demonstrate that
 * a visitor can actually grab and turn the model, not just watch it drift.
 * The scene (and the three/R3F chunk behind it) is dynamically imported and
 * only mounted while the card is active, never on scroll-into-view — a
 * card-per-instance viewport gate would mean up to eight always-rendering
 * WebGL loops as soon as the Services grid scrolls into view. Skipped
 * entirely under prefers-reduced-motion (autoRotate is continuous motion
 * with no pause switch) and when the browser lacks WebGL support.
 */
export function InteractivePreviewCard({ poster, label, forceActive }: Props) {
  const { active, bind } = useCardInteraction(forceActive);
  const reducedMotion = useReducedMotion();
  const supportsWebGL = useSupportsWebGL();
  const showScene = active && !reducedMotion && supportsWebGL;

  return (
    <div
      {...bind}
      className="relative h-full w-full outline-none"
      role="img"
      aria-label={`${label} preview — drag to orbit`}
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes={SIZES}
        className={`object-cover transition-opacity duration-500 ${
          showScene ? "opacity-0" : "opacity-100"
        }`}
      />
      {showScene ? (
        <>
          <div className="absolute inset-0">
            <CardArchitecturalScene />
          </div>
          <p className="label pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 !text-[9px] !tracking-[0.25em] !text-ink-dim/80">
            Drag to Explore
          </p>
        </>
      ) : null}
    </div>
  );
}
