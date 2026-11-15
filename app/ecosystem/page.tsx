import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { EcosystemSection } from "@/components/ecosystem/EcosystemSection";

const description =
  "The OpenHouseFX technology ecosystem: Pocket Studio, AlphaCompanion, Lead Verifier and Scraper Ultra. See what each product does and where it stands today.";

export const metadata: Metadata = {
  title: "The OpenHouseFX Ecosystem — Real Estate Technology",
  description,
  alternates: { canonical: "/ecosystem" },
  openGraph: { title: "The OpenHouseFX Ecosystem", description, url: "/ecosystem" },
};

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
