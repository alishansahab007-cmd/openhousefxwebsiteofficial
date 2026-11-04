"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MEDIA } from "@/lib/media";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#packages", label: "Packages" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-14">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src={MEDIA.logoIcon}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-ink">
            OpenHouse<span className="text-gold-500">FX</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="label !text-ink-dim transition hover:!text-gold-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/start-a-listing"
          className="hidden min-h-11 items-center rounded-sm border border-gold-500 px-5 text-xs font-medium uppercase tracking-[0.2em] text-gold-500 transition hover:bg-gold-500 hover:text-bg md:inline-flex"
        >
          Request a Quote
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative flex h-11 w-11 cursor-pointer items-center justify-center md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-full bg-ink transition-transform duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-line bg-bg px-6 pb-6 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="label flex min-h-11 items-center !text-ink-dim transition hover:!text-gold-500"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/start-a-listing"
            onClick={() => setMenuOpen(false)}
            className="mt-4 flex min-h-11 items-center justify-center rounded-sm border border-gold-500 px-5 text-xs font-medium uppercase tracking-[0.2em] text-gold-500 transition hover:bg-gold-500 hover:text-bg"
          >
            Request a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
