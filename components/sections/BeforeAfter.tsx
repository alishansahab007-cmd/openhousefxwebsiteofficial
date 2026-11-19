"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { BEFORE_AFTER } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HoverVideoCard } from "@/components/services/HoverVideoCard";
import { StudioFilms } from "@/components/sections/StudioFilms";

interface SliderProps {
  label: string;
  description: string;
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
}

function BeforeAfterSlider({ label, description, before, after, beforeLabel, afterLabel }: SliderProps) {
  const [position, setPosition] = useState(50);
  const drag = useRef<{ id: number; left: number; width: number } | null>(null);

  function moveDivider(e: PointerEvent<HTMLDivElement>) {
    const track = drag.current;
    if (!track || track.id !== e.pointerId) return;
    const pct = ((e.clientX - track.left) / track.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }

  function step(delta: number) {
    setPosition((p) => Math.min(100, Math.max(0, p + delta)));
  }

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    if (!e.isPrimary || e.button !== 0 || drag.current) return;
    const track = e.currentTarget;
    const width = track.clientWidth;
    if (!width) return;
    drag.current = { id: e.pointerId, left: track.getBoundingClientRect().left + track.clientLeft, width };
    track.setPointerCapture(e.pointerId);
    moveDivider(e);
  }
  function endDrag(e: PointerEvent<HTMLDivElement>) {
    if (drag.current?.id !== e.pointerId) return;
    if (e.type === "pointerup") moveDivider(e);
    drag.current = null;
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
        className="relative aspect-[16/10] w-full touch-pan-y touch-pinch-zoom select-none overflow-hidden rounded-sm border border-line"
        onPointerDown={handlePointerDown}
        onPointerMove={moveDivider}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        <Image
          src={after}
          draggable={false}
          alt={`${afterLabel} example for ${label}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
        <span className="proof-chip absolute top-3 right-3 z-10 !text-gold-300">{afterLabel}</span>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            draggable={false}
            alt={`${beforeLabel} example for ${label}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
          <span className="proof-chip absolute top-3 left-3">{beforeLabel}</span>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/45 via-transparent to-transparent" />

        <div className="pointer-events-none absolute inset-0 border-l border-gold-500" style={{ transform: `translateX(${position}%)` }}>
          <div
            role="slider"
            tabIndex={0}
            aria-label={`${label} comparison position`}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)}% ${beforeLabel}`}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={handleKeyDown}
            className="pointer-events-auto absolute top-1/2 left-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold-500 bg-bg before:absolute before:-inset-1 before:content-[''] focus-visible:ring-2 focus-visible:ring-gold-500"
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
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-line">
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
    <section id="work" className="bg-bg py-24 md:py-28" aria-labelledby="work-heading">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <SectionLabel className="editorial-label">{BEFORE_AFTER.kicker}</SectionLabel>
          <h2 id="work-heading" className="editorial-heading mt-5">
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
                beforeLabel={pair.beforeLabel}
                afterLabel={pair.afterLabel}
              />
            )
          )}
        </Reveal>
        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ink-dim">{BEFORE_AFTER.disclosure}</p>
        <StudioFilms />
      </div>
    </section>
  );
}
