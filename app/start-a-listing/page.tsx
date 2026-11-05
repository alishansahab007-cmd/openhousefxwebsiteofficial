import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StartAListingForm } from "@/components/start-a-listing/StartAListingForm";

export const metadata: Metadata = {
  title: "Start a Listing — OpenHouseFX",
  description:
    "Tell us a little about the property and what you need. We'll take it from there.",
};

export default function StartAListingPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-6 md:px-14">
          <Reveal>
            <SectionLabel className="editorial-label">Request a quotation</SectionLabel>
            <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-ink md:text-5xl">
              Let&apos;s talk about your listing.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-dim md:text-base">
              Tell us what your listing needs. We&apos;ll confirm the scope and send
              a tailored quotation before production begins.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <StartAListingForm />
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
