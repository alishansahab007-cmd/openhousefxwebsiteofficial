"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { BEFORE_AFTER } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HoverVideoCard } from "@/components/services/HoverVideoCard";

interface SliderProps {
  label: string;
  description: string;
  before: string;
  after: string;
}

function BeforeAfterSlider({ label, description, before, after }: SliderProps) {
  const [position, setPosition] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  function setFromClientX(clientX: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }

  function step(delta: number) {
    setPosition((p) => Math.min(100, Math.max(0, p + delta)));
  }

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    setFromClientX(e.clientX);
  }
  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  }
  function handlePointerUp(e: PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        step(-5);
        break;
      case "ArrowRight":
      case "ArrowUp":
        step(5);
        break;
      case "Home":
        setPosition(0);
        break;
      case "End":
        setPosition(100);
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="comparison-frame relative aspect-[16/10] w-full touch-pan-y select-none overflow-hidden rounded-sm border border-line"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={() => { draggingRef.current = false; }}
      >
        <Image
          src={after}
          alt={`${label} — after`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
        <span className="label absolute top-4 right-4 z-10 !text-gold-300">Enhanced</span>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt={`${label} — before`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
          <span className="label absolute top-4 left-4 !text-ink-dim">Raw</span>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/45 via-transparent to-transparent" />

        <div className="absolute inset-y-0 bg-gold-500" style={{ left: `${position}%`, width: 1 }}>
          <div
            role="slider"
            tabIndex={0}
            aria-label={`${label} comparison position`}
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={handleKeyDown}
            className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold-500 bg-bg before:absolute before:-inset-1 before:content-[''] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <span className="text-[10px] text-gold-500">⟷</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink">{label}</p>
          <p className="mt-1 text-xs text-ink-dim">{description}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => step(-10)}
            aria-label="Move comparison divider left"
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-line text-ink transition before:absolute before:-inset-1 before:content-[''] hover:border-gold-500"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => step(10)}
            aria-label="Move comparison divider right"
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-line text-ink transition before:absolute before:-inset-1 before:content-[''] hover:border-gold-500"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

interface VideoRevealProps {
  label: string;
  description: string;
  poster: string;
  videoSrc: string;
}

/**
 * The "Static Image → Cinematic Film" pair is a motion deliverable, not a
 * before/after still comparison, so its media box reuses the Services
 * grid's existing hover-video treatment (poster at rest, plays once on
 * activation, holds its last frame, restarts fresh next activation) instead
 * of the drag slider above. Same border/shape/label/description shell as
 * the other two cards; the arrow-step buttons are omitted since there's no
 * drag position for this card.
 */
function BeforeAfterVideoReveal({ label, description, poster, videoSrc }: VideoRevealProps) {
  return (
    <div>
      <div className="comparison-frame relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-line">
        <HoverVideoCard poster={poster} videoSrc={videoSrc} label={label} variant="landscape" />
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="mt-1 text-xs text-ink-dim">{description}</p>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section className="border-t border-line bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-14">
        <Reveal className="max-w-2xl">
          <SectionLabel>{BEFORE_AFTER.kicker}</SectionLabel>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-ink md:text-4xl">
            {BEFORE_AFTER.headline}
          </h2>
        </Reveal>

        <Reveal
          stagger={0.1}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {BEFORE_AFTER.pairs.map((pair) =>
            pair.kind === "video" ? (
              <BeforeAfterVideoReveal
                key={pair.label}
                label={pair.label}
                description={pair.description}
                poster={pair.poster}
                videoSrc={pair.videoSrc}
              />
            ) : (
              <BeforeAfterSlider
                key={pair.label}
                label={pair.label}
                description={pair.description}
                before={pair.before}
                after={pair.after}
              />
            )
          )}
        </Reveal>
      </div>
    </section>
  );
}
