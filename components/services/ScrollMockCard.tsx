"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MEDIA } from "@/lib/media";
import { useCardInteraction } from "@/lib/hooks/useCardInteraction";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface Props {
  label: string;
  /** Drives activation externally (e.g. a selector button), OR'd with hover/focus/touch. */
  forceActive?: boolean;
  sizes?: string;
}

const THUMB_SIZES = "10vw";
const SCROLL_DURATION_MS = 8000;

/**
 * A small simulated property website — real hero/gallery/features/location/
 * CTA sections, not a screenshot — clipped to the card's existing media slot
 * and auto-scrolled on activation to suggest paging through a real site.
 * Unlike the video/3D cards, this content is cheap (a handful of DOM nodes
 * plus images already fetched elsewhere on this page) so it stays mounted at
 * rest rather than being gated behind activation; only the scroll transform
 * is toggled. Travel distance is measured via ResizeObserver rather than a
 * fixed percentage, since the stacked sections are different heights.
 */
export function ScrollMockCard({ label, forceActive, sizes = THUMB_SIZES }: Props) {
  const { active, bind } = useCardInteraction(forceActive);
  const reducedMotion = useReducedMotion();
  const animate = active && !reducedMotion;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    function measure() {
      setTravel(Math.max(0, track!.scrollHeight - container!.clientHeight));
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      {...bind}
      className="relative h-full w-full overflow-hidden bg-bg outline-none"
      role="img"
      aria-label={`${label} preview`}
    >
      <div
        ref={trackRef}
        className="ease-[cubic-bezier(0.45,0,0.2,1)]"
        style={{
          transform: animate ? `translateY(-${travel}px)` : "translateY(0)",
          transitionProperty: "transform",
          transitionDuration: animate ? `${SCROLL_DURATION_MS}ms` : "400ms",
        }}
      >
        {/* Hero — sized to exactly match the card's own 4:3 box via CSS
            aspect-ratio, so it fills the visible frame at rest without
            needing a measured pixel height. */}
        <section className="relative aspect-[4/3] w-full">
          <Image
            src={MEDIA.agentListing}
            alt=""
            fill
            sizes={sizes}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-2">
            <p className="!text-[5px] font-medium uppercase tracking-[0.2em] text-gold-300">
              Featured Listing
            </p>
            <p className="font-display mt-0.5 text-[9px] font-semibold leading-tight text-ink">
              The Hallcrest Residence
            </p>
            <p className="mt-0.5 text-[6px] text-ink-dim">
              Austin, TX &middot; 4 bed · 3.5 bath
            </p>
          </div>
        </section>

        {/* Property details */}
        <section className="flex items-center justify-center gap-2 border-t border-line bg-bg-raised px-2 py-2">
          {["4 Bed", "3.5 Bath", "3,200 sqft"].map((stat, i) => (
            <span key={stat} className="flex items-center gap-2">
              {i > 0 && <span className="h-2 w-px bg-line" aria-hidden="true" />}
              <span className="text-[6px] uppercase tracking-[0.1em] text-ink-dim">
                {stat}
              </span>
            </span>
          ))}
        </section>

        {/* Gallery */}
        <section className="border-t border-line px-2 py-2">
          <p className="!text-[5px] font-medium uppercase tracking-[0.2em] text-gold-500">
            Gallery
          </p>
          <div className="mt-1.5 grid grid-cols-3 gap-1">
            {[MEDIA.architecturalInterior, MEDIA.stagedRoom, MEDIA.listingExteriorTwilight].map(
              (src) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded-[1px]">
                  <Image src={src} alt="" fill sizes={sizes === THUMB_SIZES ? THUMB_SIZES : "(min-width: 1024px) 300px, 30vw"} className="object-cover" />
                </div>
              )
            )}
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-line px-2 py-2">
          <p className="!text-[5px] font-medium uppercase tracking-[0.2em] text-gold-500">
            Features
          </p>
          <div className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-1">
            {["Chef's Kitchen", "Home Theater", "Infinity Pool", "Smart Home"].map((feature) => (
              <div key={feature} className="flex items-center gap-1">
                <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                <span className="text-[6px] text-ink-dim">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="border-t border-line px-2 py-2">
          <p className="!text-[5px] font-medium uppercase tracking-[0.2em] text-gold-500">
            Location
          </p>
          <div
            className="mt-1.5 flex h-10 items-center justify-center rounded-[1px] border border-line bg-bg-raised"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(245,244,241,0.03) 4px, rgba(245,244,241,0.03) 5px)",
            }}
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full border border-gold-500" aria-hidden="true" />
              <span className="text-[5px] text-ink-dim">Austin, TX</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center justify-center gap-1.5 border-t border-line bg-bg-raised px-2 py-4 text-center">
          <p className="font-display text-[8px] font-semibold text-ink">
            Schedule a Private Tour
          </p>
          <span className="rounded-[1px] border border-gold-500 px-2 py-1 text-[5px] uppercase tracking-[0.2em] text-gold-500">
            Contact Agent
          </span>
        </section>
      </div>
    </div>
  );
}
