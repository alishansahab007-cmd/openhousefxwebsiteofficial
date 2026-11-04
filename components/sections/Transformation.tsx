"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { SERVICES, TRANSFORMATION } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceMedia } from "@/components/services/ServiceMedia";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const SWAP_FADE_MS = 250;

/**
 * The central media doubles as a live demo of "one listing becomes
 * everything you need": selecting an output button below drives the exact
 * same treatment component that service's own Services-grid card uses
 * (BeforeAfterHover, HoverVideoCard, InteractivePreviewCard, PanZoomImage,
 * ScrollMockCard, dispatched through the existing ServiceMedia router) via
 * `forceActive`, rather than a hover-only reveal — clicking a button is the
 * activation here, not hovering the media box itself. Deselecting (or a
 * fresh page load) returns to the static "One Listing" input photo.
 */
export function Transformation() {
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [displayNumber, setDisplayNumber] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  const reducedMotion = useReducedMotion();
  const swapTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function selectOutput(serviceNumber: string) {
    const next = selectedNumber === serviceNumber ? null : serviceNumber;
    setSelectedNumber(next);
    clearTimeout(swapTimer.current);

    if (reducedMotion) {
      setDisplayNumber(next);
      return;
    }

    setFading(true);
    swapTimer.current = setTimeout(() => {
      setDisplayNumber(next);
      setFading(false);
    }, SWAP_FADE_MS);
  }

  const activeService = SERVICES.find((service) => service.number === displayNumber) ?? null;
  // Interactive Experiences ("Drag to Explore") and Property Websites (its
  // own mini-site copy) already carry their own on-screen text — layering
  // the persistent Input/Output caption on top of those would double up and
  // clash, so it's only shown for treatments with no text of their own.
  const showCaption =
    !activeService || (activeService.kind !== "interactive-3d" && activeService.kind !== "scroll-mock");

  return (
    <section id="work" className="border-t border-line bg-bg-raised py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-14">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">{TRANSFORMATION.kicker}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-ink md:text-4xl">
            {TRANSFORMATION.headline}
          </h2>
        </Reveal>

        <Reveal className="mt-16 flex justify-center">
          <div className="relative w-full max-w-sm overflow-hidden rounded-sm border border-gold-500">
            <div
              className={`relative aspect-[4/3] w-full transition-opacity ease-out ${
                fading ? "opacity-0" : "opacity-100"
              }`}
              style={{ transitionDuration: `${SWAP_FADE_MS}ms` }}
            >
              {activeService ? (
                <ServiceMedia service={activeService} forceActive />
              ) : (
                <Image
                  src={TRANSFORMATION.inputImage}
                  alt="A listing's property photo, before OpenHouseFX"
                  fill
                  sizes="(min-width: 768px) 384px, 90vw"
                  className="object-cover"
                />
              )}
              {showCaption ? (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent" />
              ) : null}
            </div>
            {showCaption ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 py-4">
                <p className="label !text-ink-dim">{activeService ? "Output" : "Input"}</p>
                <p className="font-display mt-1 text-xl font-semibold text-ink md:text-2xl">
                  {activeService ? activeService.name : TRANSFORMATION.input}
                </p>
              </div>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-8 flex justify-center">
          <div className="h-10 w-px bg-line" />
        </div>

        <Reveal
          stagger={0.06}
          start="top 90%"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4"
        >
          {TRANSFORMATION.outputs.map((output) => {
            const isSelected = selectedNumber === output.serviceNumber;
            return (
              <button
                key={output.serviceNumber}
                type="button"
                aria-pressed={isSelected}
                onClick={() => selectOutput(output.serviceNumber)}
                className={`rounded-sm border px-4 py-8 text-center text-sm transition ${
                  isSelected
                    ? "border-gold-500 bg-bg text-gold-300"
                    : "border-line bg-bg text-ink hover:border-gold-500"
                }`}
              >
                {output.label}
              </button>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
