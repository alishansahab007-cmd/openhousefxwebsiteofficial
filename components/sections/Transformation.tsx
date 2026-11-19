"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { SERVICES, TRANSFORMATION } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceMedia } from "@/components/services/ServiceMedia";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const ShowcaseTelemetry = dynamic(
  () => import("./ShowcaseTelemetry").then((module) => module.ShowcaseTelemetry),
  { ssr: false }
);

const FEATURED_SERVICE = "02";
const SHOWCASE_SIZES = "(min-width: 1024px) 896px, 90vw";
const OUTPUT_NOTES = [
  "Image enhancement",
  "Motion study",
  "Vertical edit",
  "Interior styling",
  "Day to dusk",
  "Spatial detail",
  "Spatial preview",
  "Listing microsite",
];

export function Transformation() {
  const [selectedNumber, setSelectedNumber] = useState<string | null>(FEATURED_SERVICE);
  const [displayNumber, setDisplayNumber] = useState<string | null>(FEATURED_SERVICE);
  const [previewFailed, setPreviewFailed] = useState(false);
  const [featuredPoster, setFeaturedPoster] = useState(true);
  const reducedMotion = useReducedMotion();
  const pendingRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const frameInView = useInView(frameRef, { amount: "some" });

  const switching = selectedNumber !== displayNumber;
  useEffect(() => {
    const layer = pendingRef.current;
    if (!switching || !layer) return;
    let cancelled = false;
    let fade: Animation | undefined;

    async function showWhenReady(frame: HTMLDivElement) {
      // Decode the actual responsive image in its final box. For a comparison
      // both stills must be ready; for the mock website only its hero is needed.
      const service = SERVICES.find((item) => item.number === selectedNumber);
      const images = Array.from(frame.querySelectorAll("img")).slice(0, service?.kind === "before-after" ? 2 : 1);
      try {
        await Promise.all(images.map((img) => {
          img.loading = "eager";
          return img.decode();
        }));
      } catch {
        if (!cancelled) {
          setSelectedNumber(displayNumber);
          setPreviewFailed(true);
        }
        return;
      }
      if (cancelled) return;
      if (!reducedMotion && typeof frame.animate === "function") {
        fade = frame.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "ease-out", fill: "forwards" });
        try { await fade.finished; } catch { return; }
      }
      if (!cancelled) {
        setFeaturedPoster(false);
        setDisplayNumber(selectedNumber);
      }
    }

    void showWhenReady(layer);
    return () => { cancelled = true; fade?.cancel(); };
  }, [selectedNumber, displayNumber, switching, reducedMotion]);

  function selectOutput(serviceNumber: string) {
    const next = selectedNumber === serviceNumber ? null : serviceNumber;
    setSelectedNumber(next);
    setPreviewFailed(false);

    const frame = frameRef.current;
    if (frame && frame.getBoundingClientRect().bottom < 80) {
      frame.scrollIntoView({ block: "start" });
    }
  }

  const activeService = SERVICES.find((service) => service.number === displayNumber);
  const selectedLabel = TRANSFORMATION.outputs.find((output) => output.serviceNumber === displayNumber)?.label;
  const isFilm = displayNumber === FEATURED_SERVICE;
  const showCaption = activeService?.kind !== "interactive-3d" && activeService?.kind !== "scroll-mock";

  return (
    <section id="deliverables" data-frame-visible={frameInView || undefined} className="showcase-section relative isolate overflow-hidden border-t border-line py-24" aria-labelledby="deliverables-heading">
      <div className="showcase-ambient pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="site-shell relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel className="editorial-label justify-center">{TRANSFORMATION.kicker}</SectionLabel>
          <h2 id="deliverables-heading" className="editorial-heading mt-5">
            One listing. <em className="editorial-accent">Eight ways to show it.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-dim sm:text-base">
            Choose a deliverable to see how the same listing can look across formats.
          </p>
        </Reveal>

        <div id="showcase-preview" ref={frameRef} className="glass-liquid-crystal mx-auto mt-12 max-w-4xl rounded-xl p-1.5 sm:p-2">
          <div className="showcase-frame relative isolate aspect-video overflow-hidden rounded-lg bg-bg">
            {(switching ? [displayNumber, selectedNumber] : [displayNumber]).map((number) => {
              const pending = number !== displayNumber;
              const service = SERVICES.find((item) => item.number === number);
              return (
                <div key={number ?? "input"} ref={pending ? pendingRef : undefined} inert={pending}
                  aria-hidden={pending || undefined} className={`absolute inset-0 ${pending ? "opacity-0" : ""}`}>
                  {service ? (
                    <ServiceMedia service={service} forceActive={frameInView && !pending} sizes={SHOWCASE_SIZES} preload={featuredPoster && !pending} />
                  ) : (
                    <Image src={TRANSFORMATION.inputImage} alt="Exterior property photograph before enhancement" fill sizes={SHOWCASE_SIZES} className="object-cover" />
                  )}
                </div>
              );
            })}
            {previewFailed && <p role="status" className="absolute end-3 top-3 z-10 rounded-sm bg-bg px-3 py-2 text-sm text-ink">Preview unavailable. Select it to retry.</p>}
            <span className="sr-only" aria-live="polite">{selectedLabel ?? TRANSFORMATION.input} preview</span>
            {showCaption ? (
              <>
                <div className="showcase-scrim pointer-events-none absolute inset-0" />
                <div className="pointer-events-none absolute bottom-3.5 left-4 sm:bottom-6 sm:left-6">
                  <p className="label">{activeService ? "Output" : "Input"}</p>
                  <p className="mt-1 text-sm font-medium text-white sm:text-xl">{selectedLabel ?? TRANSFORMATION.input}</p>
                  {activeService ? (
                    <p className="mt-1 hidden max-w-md text-sm leading-relaxed text-white/80 md:block">{activeService.description}</p>
                  ) : null}
                </div>
              </>
            ) : null}
            {frameInView && !switching && isFilm ? <ShowcaseTelemetry /> : null}
          </div>
        </div>

        <Reveal stagger={0.1} className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TRANSFORMATION.outputs.map((output, index) => {
            const isSelected = selectedNumber === output.serviceNumber;
            return (
              <button
                key={output.serviceNumber}
                type="button"
                aria-pressed={isSelected}
                aria-controls="showcase-preview"
                onClick={() => selectOutput(output.serviceNumber)}
                className="glass-liquid-crystal showcase-choice relative flex min-h-25 cursor-pointer flex-col items-start gap-2 rounded-lg p-4 text-left"
              >
                <span className="flex w-full items-center justify-between gap-3 text-[0.625rem] font-semibold uppercase tracking-[0.15em]">
                  <span className="text-gold-500">{output.serviceNumber}</span>
                  <span className="text-ink-dim">{OUTPUT_NOTES[index]}</span>
                </span>
                <span className="text-sm font-semibold text-ink">{output.label}</span>
                <span className="choice-indicator" aria-hidden="true">
                  <i /><i /><i /><i /><i />
                </span>
              </button>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
