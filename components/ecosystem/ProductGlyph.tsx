import type { ProductIcon } from "@/lib/ecosystem";

const PATHS: Record<ProductIcon, string> = {
  operations: "M3 7h18v13H3zM8 7V4h8v3M3 12a20 20 0 0 0 18 0M10 13h4v3h-4z",
  production: "M3 6h13v12H3zM16 10l5-3v10l-5-3",
  verification: "M3 5h18v14H3zM3 6l9 7 9-7M13 17l2 2 4-4",
  research: "M4 6c0-2 16-2 16 0s-16 2-16 0zM4 6v12c0 2 16 2 16 0V6M4 12c0 2 16 2 16 0",
};

export function ProductGlyph({ icon }: { icon: ProductIcon }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[icon]} />
    </svg>
  );
}
