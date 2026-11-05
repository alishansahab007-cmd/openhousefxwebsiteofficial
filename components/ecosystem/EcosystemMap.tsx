"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ECOSYSTEM_PRODUCTS } from "@/lib/ecosystem";
import { ProductGlyph } from "./ProductGlyph";
import styles from "./ecosystem.module.css";

const PATHS = [
  "M 50 50 C 44 50, 38 21, 25 21",
  "M 50 50 C 56 50, 62 21, 75 21",
  "M 50 50 C 44 50, 38 79, 25 79",
  "M 50 50 C 56 50, 62 79, 75 79",
];

export function EcosystemMap({ selected, onSelect }: { selected: number; onSelect: (index: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const highlighted = hovered ?? focused ?? selected;
  const current = ECOSYSTEM_PRODUCTS[highlighted];

  return (
    <figure ref={ref} className={styles.map} data-in-view={inView}>
      <figcaption className={styles.mapCaption}>
        <span className={styles.micro}>Technology Ecosystem Vision</span>
        <span className={styles.mapEdition} aria-hidden="true">01—04</span>
      </figcaption>
      <div className={styles.network}>
        <svg className={styles.routes} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {PATHS.map((path, index) => (
            <path key={path} d={path} pathLength={1} data-active={index === highlighted} />
          ))}
        </svg>
        <div className={styles.hub}>
          <span aria-hidden="true" />
          OpenhouseFX <strong>Ecosystem</strong>
        </div>
        {ECOSYSTEM_PRODUCTS.map((product, index) => (
          <button
            key={product.id}
            type="button"
            className={styles.mapNode}
            data-active={highlighted === index}
            aria-current={selected === index ? true : undefined}
            data-position={index}
            data-accent={product.icon}
            aria-label={`Explore ${product.name} · ${product.area}`}
            onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(index); }}
            onPointerLeave={() => setHovered(null)}
            onFocus={() => setFocused(index)}
            onBlur={() => setFocused(null)}
            onClick={() => onSelect(index)}
          >
            <span className={styles.glyph}><ProductGlyph icon={product.icon} /></span>
            <span><strong>{product.name}</strong><small>{product.area}</small></span>
          </button>
        ))}
      </div>
      <p className={styles.mapSummary}><strong>{current.name}</strong> {current.summary}</p>
    </figure>
  );
}
