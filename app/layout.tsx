import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CinematicWelcome } from "@/components/welcome/CinematicWelcome";
import { AmbientGradient } from "@/components/effects/AmbientGradient";
import { WELCOME_BOOTSTRAP } from "@/lib/welcome";
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

export const metadata: Metadata = {
  title: "OpenHouseFX — Real Estate. Higher Standards.",
  description:
    "OpenHouseFX turns one listing into a complete digital marketing system — enhanced photography, cinematic film, social reels, virtual staging, and interactive property experiences.",
};

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
        <div id="site-content">{children}</div>
      </body>
    </html>
  );
}
