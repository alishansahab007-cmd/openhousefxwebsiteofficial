import Link from "next/link";
import type { MouseEventHandler } from "react";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "glass";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function Button({ href, children, variant = "primary", className = "", onClick }: ButtonProps) {
  const base = "liquid-button group inline-flex min-h-12 items-center justify-center gap-3 rounded-sm border px-5 py-3 text-sm font-semibold sm:px-6";
  const styles = {
    primary: "border-gold-500 bg-gold-500 text-bg hover:brightness-110",
    secondary: "border-white/25 bg-bg/45 text-ink hover:border-gold-500 hover:bg-bg-raised",
    glass: "glass-liquid-crystal glass-quote text-gold-300",
  };

  return (
    <Link href={href} onClick={onClick} data-variant={variant} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="button-arrow shrink-0">
        <path d="M4 12 12 4m-7 0h7v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
