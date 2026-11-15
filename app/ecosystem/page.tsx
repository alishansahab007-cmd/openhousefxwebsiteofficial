import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/site";
import { EcosystemSection } from "@/components/ecosystem/EcosystemSection";

const description =
  "The OpenHouseFX technology ecosystem: Pocket Studio, AlphaCompanion, Lead Verifier and Scraper Ultra. See what each product does and where it stands today.";

export const metadata: Metadata = pageMetadata(
  "/ecosystem",
  "The OpenHouseFX Ecosystem — Real Estate Technology",
  description
);

export default function EcosystemPage() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        <EcosystemSection />
      </main>
      <Footer />
    </>
  );
}
