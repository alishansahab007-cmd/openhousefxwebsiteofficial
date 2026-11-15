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
import { Problem } from "@/components/sections/Problem";
import { Services } from "@/components/sections/Services";
import { Distribution } from "@/components/sections/Distribution";
import { ForTeams } from "@/components/sections/ForTeams";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top" className="overflow-x-clip">
        <CinematicHero />
        <TrustStrip />
        <Problem />
        <BeforeAfter />
        <Transformation />
        <Services />
        <InteractiveExperience />
        <Distribution />
        <Packages />
        <Testimonials />
        <HowItWorks />
        <ForTeams />
        <EcosystemPreview />
        <FounderMessage />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
