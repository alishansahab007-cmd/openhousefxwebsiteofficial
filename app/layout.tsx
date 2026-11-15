import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CinematicWelcome } from "@/components/welcome/CinematicWelcome";
import { AmbientGradient } from "@/components/effects/AmbientGradient";
import { GlassPointerLight } from "@/components/effects/GlassPointerLight";
import { WELCOME_BOOTSTRAP } from "@/lib/welcome";
import { SITE_URL } from "@/lib/site";
import { HERO_VIDEO_POSTER } from "@/lib/config/hero";
import { FOOTER } from "@/lib/content";
import { MEDIA } from "@/lib/media";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: "italic",
  display: "swap",
});

const description =
  "OpenHouseFX turns one listing into a complete digital marketing system — enhanced photography, cinematic film, social reels, virtual staging, and interactive property experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "OpenHouseFX — Real Estate Media & Technology",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "OpenHouseFX",
    title: "OpenHouseFX — Real Estate Media & Technology",
    description,
    url: "/",
    images: [{ url: HERO_VIDEO_POSTER, alt: "A property at twilight from the OpenHouseFX showreel" }],
  },
  twitter: { card: "summary_large_image" },
};

// Only facts already published on the site: no address, ratings or reviews.
const ORGANIZATION_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OpenHouseFX",
  url: SITE_URL,
  logo: `${SITE_URL}${MEDIA.logoIcon}`,
  email: FOOTER.email,
  telephone: FOOTER.telephone,
  sameAs: ["https://www.instagram.com/openhousefx_", "https://www.facebook.com/openhousefx"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full bg-bg font-sans antialiased`}
    >
      <head><script dangerouslySetInnerHTML={{ __html: WELCOME_BOOTSTRAP }} /></head>
      <body className="min-h-full bg-bg text-ink">
        <CinematicWelcome />
        <AmbientGradient />
        <GlassPointerLight />
        <div id="site-content">{children}</div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ORGANIZATION_JSON_LD }} />
      </body>
    </html>
  );
}
