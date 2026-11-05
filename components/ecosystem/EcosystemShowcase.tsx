"use client";

import { useState } from "react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { ECOSYSTEM_PRODUCTS, type EcosystemProduct } from "@/lib/ecosystem";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { Reveal } from "@/components/ui/Reveal";
import { EcosystemOrbitalWheel } from "./EcosystemOrbitalWheel";
import { ProductSpotlight } from "./ProductSpotlight";
import styles from "./ecosystem.module.css";

function ProductDetails({ product }: { product: EcosystemProduct }) {
  const present = useIsPresent();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      inert={!present}
      aria-hidden={!present}
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -8, transition: { duration: reducedMotion ? 0 : 0.15 } }}
      transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
    >
      <ProductSpotlight product={product} active />
    </motion.div>
  );
}

export function EcosystemShowcase() {
  const [selected, setSelected] = useState(0);
  const product = ECOSYSTEM_PRODUCTS[selected];

  return (
    <>
      <div className={styles.intro}>
        <Reveal stagger={0.09} className={styles.introCopy}>
          <p className={`${styles.micro} ${styles.eyebrow}`}>Next-gen real estate technology by OpenhouseFX</p>
          <h2 id="technology-heading" className="editorial-heading">
            The OpenhouseFX Ecosystem.
            <em className="editorial-accent block">Built for a Better Tomorrow.</em>
          </h2>
          <span className={styles.goldRule} aria-hidden="true" />
          <p className={styles.introText}>
            Four ambitious technology products. One vision for a smarter real estate industry.
            Discover the tools we&apos;re building to connect property operations, creative production,
            lead intelligence, and prospect research.
          </p>
          <div className={styles.roadmap}>
            <span className={styles.status}>Roadmap preview</span>
            <span>The next chapter of OpenhouseFX</span>
          </div>
        </Reveal>
        <EcosystemOrbitalWheel selected={selected} onSelect={setSelected} />
      </div>

      <section id="technology-products" className={styles.productArea} aria-labelledby="ecosystem-detail-heading" tabIndex={-1}>
        <div className={styles.railHeading}>
          <p className={styles.micro}>Inside the ecosystem</p>
          <span>Select a product above to explore its workspace</span>
        </div>
        <p className="sr-only" role="status">{product.name} selected</p>
        <AnimatePresence initial={false} mode="wait">
          <ProductDetails key={product.id} product={product} />
        </AnimatePresence>
        <p className={styles.roadmapNote}>Product previews illustrate our evolving technology roadmap. Features and availability may change.</p>
      </section>
    </>
  );
}
