import Image from "next/image";
import Link from "next/link";
import { FOOTER } from "@/lib/content";
import { MEDIA } from "@/lib/media";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#packages", label: "Packages" },
  { href: "/#technology", label: "Technology" },
];

const SOCIAL_LINKS = [
  {
    label: "OpenHouseFX on Instagram",
    href: "https://www.instagram.com/openhousefx_",
    Icon: InstagramIcon,
  },
  {
    label: "OpenHouseFX on Facebook",
    href: "https://www.facebook.com/openhousefx",
    Icon: FacebookIcon,
  },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.55c0-.93.26-1.56 1.59-1.56h1.7V3.14C15.98 3.1 15.06 3 14 3c-2.24 0-3.78 1.37-3.78 3.88v2.72H7.5v3.2h2.72V21h3.28z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Image
              src={MEDIA.logoLockup}
              alt="OpenHouseFX"
              width={210}
              height={100}
              className="h-14 w-auto"
            />
            <p className="label mt-3 !text-ink-dim">{FOOTER.tagline}</p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-1">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="label flex min-h-11 items-center !text-ink-dim transition hover:!text-gold-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href={`mailto:${FOOTER.email}`}
            aria-label={`Email OpenHouseFX at ${FOOTER.email}`}
            className="label flex min-h-11 items-center !text-ink-dim transition hover:!text-gold-500"
          >
            {FOOTER.email}
          </a>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center gap-6 border-t border-line pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-ink-dim">
            © {new Date().getFullYear()} OpenHouseFX. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-sm text-ink-dim transition hover:text-gold-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
