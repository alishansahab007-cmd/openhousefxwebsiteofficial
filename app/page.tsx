import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CinematicHero } from "@/components/hero/CinematicHero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Transformation } from "@/components/sections/Transformation";
import { InteractiveExperience } from "@/components/sections/InteractiveExperience";
import { Packages } from "@/components/sections/Packages";
import { Testimonials } from "@/components/sections/Testimonials";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { EcosystemPreview } from "@/components/sections/EcosystemPreview";
import { FounderMessage } from "@/components/sections/FounderMessage";
import { FinalCta } from "@/components/sections/FinalCta";

// The Problem, Services grid, Distribution and ForTeams sections were taken
// out of this sequence in the V9 conversion pass (their components remain in
// components/sections). The full ecosystem showcase now lives at /ecosystem.
export default function Home() {
  return (
    <>
      <Nav />
      <main id="top" className="overflow-x-clip">
        <CinematicHero />
        <TrustStrip />
        <BeforeAfter />
        <Transformation />
        <InteractiveExperience />
        <Packages />
        <Testimonials />
        <HowItWorks />
        <EcosystemPreview />
        <FounderMessage />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
