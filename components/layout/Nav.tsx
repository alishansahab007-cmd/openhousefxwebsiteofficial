"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { MEDIA } from "@/lib/media";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#packages", label: "Packages" },
  { href: "/#process", label: "Process" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "https://crm.openhousefx.com/test-environment/", label: "CRM & Demo" },
];

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [section, setSection] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const topMarker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = header.current;
    const marker = topMarker.current;
    if (!bar || !marker || typeof IntersectionObserver === "undefined") return;
    const topObserver = new IntersectionObserver(([entry]) => {
      bar.dataset.scrolled = String(!entry.isIntersecting);
    });
    topObserver.observe(marker);
    return () => topObserver.disconnect();
  }, []);

  useEffect(() => {
    if (pathname !== "/" || typeof IntersectionObserver === "undefined") return;
    const sections = LINKS.filter(({ href }) => href.startsWith("/#"))
      .map(({ href }) => document.getElementById(href.slice(2)))
      .filter((element) => element !== null);
    let observer: IntersectionObserver;
    let timer: number;

    function observeSections() {
      observer?.disconnect();
      window.clearTimeout(timer);
      const height = document.documentElement.clientHeight;
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      const line = Math.min(Math.ceil(offset) + 2, height - 1);
      // Only a section crossing the line just under the header can be current.
      const intersecting = new Set<Element>();
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          const current = sections.findLast((el) => intersecting.has(el));
          setSection(current ? `/#${current.id}` : "");
        }, 100);
      }, { rootMargin: `-${line}px 0px -${height - line - 1}px 0px` });
      for (const el of sections) observer.observe(el);
    }
    observeSections();
    window.addEventListener("resize", observeSections);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("resize", observeSections);
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }

    const desktop = window.matchMedia("(min-width: 64rem)");
    function closeOnDesktop() {
      if (desktop.matches) setMenuOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  function current(href: string) {
    if (href === pathname) return "page";
    if (pathname === "/" && href === section) return "location";
    return undefined;
  }

  function followMobileLink(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // Move focus out of the closing disclosure before native link navigation.
    menuButton.current?.focus({ preventScroll: true });
    setMenuOpen(false);
  }

  return (
    <>
      <span ref={topMarker} aria-hidden="true" className="pointer-events-none absolute top-0 h-6 w-px" />
      <header
        ref={header}
        className="sticky top-0 z-50 border-b border-line bg-bg/95"
        onBlur={(event) => {
          if (menuOpen && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
        }}
      >
        <div className="site-shell flex min-h-18 items-center justify-between gap-5 md:min-h-20">
          <a href={pathname === "/" ? "#top" : "/#top"} className="inline-flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <Image src={MEDIA.logoIcon} alt="" width={36} height={36} className="h-9 w-9" />
            <span className="leading-none">
              <span className="block font-display text-[1.05rem] font-bold uppercase tracking-[0.13em] text-ink">
                OpenHouseFX
              </span>
              <span className="mt-2 block text-[0.58rem] font-medium uppercase tracking-[0.28em] text-gold-500">
                Property media
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-3 lg:flex lg:gap-7" aria-label="Main navigation">
            {LINKS.map(({ href, label }) => (
              <a key={href} href={href} aria-current={current(href)} className="nav-link text-sm font-medium text-ink-dim">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/start-a-listing" variant="glass">Enhance Your Listing</Button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            ref={menuButton}
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-sm border border-line text-gold-500 transition duration-300 hover:border-gold-500 hover:bg-bg-raised lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d={menuOpen ? "m5 5 10 10M15 5 5 15" : "M3 7h14M3 13h14"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          className="glass-panel absolute inset-x-0 top-full border-x-0 px-[var(--site-gutter)] pt-3 pb-5 shadow-xl shadow-slate-950/35 lg:hidden"
        >
          {LINKS.map(({ href, label }) => (
            <a key={href} href={href} aria-current={current(href)} onClick={followMobileLink} className="flex min-h-11 items-center text-sm font-medium text-ink-dim">
              {label}
            </a>
          ))}
          <Button href="/start-a-listing" variant="glass" onClick={followMobileLink} className="mt-3">
            Enhance Your Listing
          </Button>
        </nav>
      </header>
    </>
  );
}
