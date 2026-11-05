"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ECOSYSTEM_PRODUCTS } from "@/lib/ecosystem";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { Reveal } from "@/components/ui/Reveal";
import { EcosystemMap } from "./EcosystemMap";
import { ProductGlyph } from "./ProductGlyph";
import { ProductSpotlight } from "./ProductSpotlight";
import styles from "./ecosystem.module.css";

export function EcosystemShowcase() {
  const [selected, setSelected] = useState(0);
  const [animatePanel, setAnimatePanel] = useState(false);
  const reducedMotion = useReducedMotion();
  const tabs = useRef<HTMLDivElement>(null);
  const tabButtons = useRef<Array<HTMLButtonElement | null>>([]);

  function select(index: number) {
    if (index === selected) return;
    setAnimatePanel(true);
    setSelected(index);
  }

  function openSpotlight(index: number) {
    select(index);
    tabButtons.current[index]?.focus({ preventScroll: true });
    tabs.current?.scrollIntoView({ block: "start" });
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = ECOSYSTEM_PRODUCTS.length;
    let next: number;

    switch (event.key) {
      case "ArrowRight": next = (index + 1) % count; break;
      case "ArrowLeft": next = (index - 1 + count) % count; break;
      case "Home": next = 0; break;
      case "End": next = count - 1; break;
      default: return;
    }

    event.preventDefault();
    select(next);
    tabButtons.current[next]?.focus();
  }

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
        <Reveal delay={0.15}>
          <EcosystemMap selected={selected} onSelect={openSpotlight} />
        </Reveal>
      </div>

      <div id="technology-products" ref={tabs} className={styles.productArea}>
        <div className={styles.railHeading}>
          <p className={styles.micro}>Explore the product roadmap</p>
          <span>Four tools for the people behind real estate</span>
        </div>
        <div className={styles.productTabs} role="tablist" aria-label="OpenhouseFX product previews">
          {ECOSYSTEM_PRODUCTS.map((product, index) => (
            <button
              key={product.id}
              ref={(element) => { tabButtons.current[index] = element; }}
              id={`ecosystem-tab-${product.id}`}
              type="button"
              role="tab"
              tabIndex={selected === index ? 0 : -1}
              aria-selected={selected === index}
              aria-controls={`ecosystem-panel-${product.id}`}
              data-accent={product.icon}
              onClick={() => select(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              <span className={styles.glyph}><ProductGlyph icon={product.icon} /></span>
              <span><strong>{product.name}</strong><small>{product.area}</small></span>
              <span className={styles.tabIndex} aria-hidden="true">0{index + 1}</span>
            </button>
          ))}
        </div>

        {ECOSYSTEM_PRODUCTS.map((product, index) => {
          const active = index === selected;

          return (
            <div
              key={product.id}
              id={`ecosystem-panel-${product.id}`}
              role="tabpanel"
              aria-labelledby={`ecosystem-tab-${product.id}`}
              tabIndex={active ? 0 : undefined}
              hidden={!active}
            >
              <motion.div
                key={active ? "active" : "inactive"}
                initial={active && animatePanel && !reducedMotion ? { opacity: 0, x: 9 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <ProductSpotlight product={product} active={active} />
              </motion.div>
            </div>
          );
        })}
        <p className={styles.roadmapNote}>Product previews illustrate our evolving technology roadmap. Features and availability may change.</p>
      </div>
    </>
  );
}
