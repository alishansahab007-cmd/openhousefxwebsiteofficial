interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "flex min-h-11 items-center justify-center rounded-sm px-6 text-xs font-medium uppercase tracking-[0.2em] transition";
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "border border-gold-500 bg-gold-500 text-bg hover:border-gold-300 hover:bg-gold-300",
    secondary: "border border-line text-ink hover:border-gold-500",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}
