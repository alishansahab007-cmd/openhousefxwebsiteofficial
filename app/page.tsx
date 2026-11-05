import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CinematicHero } from "@/components/hero/CinematicHero";
import { Problem } from "@/components/sections/Problem";
import { Transformation } from "@/components/sections/Transformation";
import { Services } from "@/components/sections/Services";
import { InteractiveExperience } from "@/components/sections/InteractiveExperience";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Distribution } from "@/components/sections/Distribution";
import { Packages } from "@/components/sections/Packages";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ForTeams } from "@/components/sections/ForTeams";
import { EcosystemSection } from "@/components/ecosystem/EcosystemSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top" className="overflow-x-clip">
        <CinematicHero />
        <Problem />
        <Transformation />
        <Services />
        <InteractiveExperience />
        <BeforeAfter />
        <Distribution />
        <Packages />
        <HowItWorks />
        <ForTeams />
        <EcosystemSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
