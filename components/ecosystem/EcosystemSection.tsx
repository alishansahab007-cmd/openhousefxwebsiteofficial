import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { EcosystemShowcase } from "./EcosystemShowcase";
import styles from "./ecosystem.module.css";

export function EcosystemSection() {
  return (
    <section id="technology" className={styles.section} aria-labelledby="technology-heading">
      <div className="site-shell">
        <EcosystemShowcase />
        <Reveal className={`${styles.closing} glass-track`}>
          <div>
            <p className={styles.micro}>OpenHouseFX today and tomorrow</p>
            <h2>Great listings today. <em className="editorial-accent">Smarter real estate tomorrow.</em></h2>
            <p>Explore our real estate technology vision while discovering the property media services already available through OpenHouseFX.</p>
          </div>
          <div className={styles.closingActions}>
            <Button href="/#services">Explore Our Media Services</Button>
            <Button href="/ecosystem#technology-products" variant="secondary">Discover the Ecosystem</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
