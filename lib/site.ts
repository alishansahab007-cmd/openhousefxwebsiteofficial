import type { Metadata } from "next";
import { HERO_VIDEO_POSTER } from "@/lib/config/hero";

export const SITE_URL = "https://www.openhousefx.com";

/**
 * Per-route canonical URL and Open Graph block. Next.js replaces (does not
 * merge) `alternates` and `openGraph` from a parent layout, so every page
 * states its own path and carries the share image itself.
 */
export function pageMetadata(path: string, title: string, description?: string): Metadata {
  return {
    title,
    ...(description ? { description } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "OpenHouseFX",
      title,
      ...(description ? { description } : {}),
      url: path,
      images: [{ url: HERO_VIDEO_POSTER, alt: "A property at twilight from the OpenHouseFX showreel" }],
    },
  };
}
