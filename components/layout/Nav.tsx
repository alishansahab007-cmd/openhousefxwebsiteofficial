"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MEDIA } from "@/lib/media";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#packages", label: "Packages" },
  { href: "/#process", label: "Process" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-md">
      <div className="site-shell flex min-h-18 items-center justify-between gap-5 md:min-h-20">
        <Link href="/" className="inline-flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <Image src={MEDIA.logoIcon} alt="" width={36} height={36} className="h-9 w-9" />
          <span className="leading-none">
            <span className="block font-display text-[1.05rem] font-bold uppercase tracking-[0.13em] text-ink">
              OpenHouseFX
            </span>
            <span className="mt-2 block text-[0.58rem] font-medium uppercase tracking-[0.28em] text-gold-500">
              Property media
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 md:flex lg:gap-9" aria-label="Main navigation">
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm font-medium text-ink-dim transition hover:text-gold-500">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/start-a-listing" variant="glass">Request a quote</Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          ref={menuButton}
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-sm border border-line text-gold-500 transition duration-300 hover:border-gold-500 hover:bg-bg-raised md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d={menuOpen ? "m5 5 10 10M15 5 5 15" : "M3 7h14M3 13h14"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="glass-panel absolute inset-x-0 top-full border-x-0 px-[var(--site-gutter)] pt-3 pb-5 shadow-xl shadow-slate-950/35 md:hidden"
      >
        {LINKS.map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center text-sm font-medium text-ink-dim transition duration-300 hover:text-gold-500">
            {label}
          </Link>
        ))}
        <Button href="/start-a-listing" variant="glass" onClick={() => setMenuOpen(false)} className="mt-3">
          Request a quote
        </Button>
      </nav>
    </header>
  );
}
