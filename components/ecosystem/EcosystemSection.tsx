import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { EcosystemShowcase } from "./EcosystemShowcase";
import styles from "./ecosystem.module.css";

export function EcosystemSection() {
  return (
    <section id="technology" className={styles.section} aria-labelledby="technology-heading">
      <div className="site-shell">
        <EcosystemShowcase />
        <Reveal className={styles.closing}>
          <div>
            <p className={styles.micro}>OpenhouseFX today and tomorrow</p>
            <h3>Great listings today. <em className="editorial-accent">Smarter real estate tomorrow.</em></h3>
            <p>Explore our real estate technology vision while discovering the property media services already available through OpenhouseFX.</p>
          </div>
          <div className={styles.closingActions}>
            <Button href="/#services">Explore Our Media Services</Button>
            <Button href="/#technology-products" variant="secondary">Discover the Ecosystem</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
