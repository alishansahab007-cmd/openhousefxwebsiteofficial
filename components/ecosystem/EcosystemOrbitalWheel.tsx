"use client";

import Image from "next/image";
import { useId, useRef, useState, type CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import { ECOSYSTEM_PRODUCTS } from "@/lib/ecosystem";
import { MEDIA } from "@/lib/media";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ProductGlyph } from "./ProductGlyph";
import styles from "./orbital.module.css";
import { AmbientGradientLayer } from "@/components/motion/AmbientGradientLayer";

const GEOMETRY = {
  size: 1000,
  center: 500,
  radius: 320,
  hubRadius: 128,
  nodeWidth: 290,
  nodeHeight: 160,
};

// The shared coordinate system keeps SVG endpoints and CSS node centers aligned.
// Stop connectors at each rectangular node's edge, accounting for its dimensions.
const POSITIONS = ECOSYSTEM_PRODUCTS.map((_, index) => {
  const angle = -Math.PI / 2 + index * (2 * Math.PI / ECOSYSTEM_PRODUCTS.length);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const nodeEdge = Math.min(
    GEOMETRY.nodeWidth / (2 * Math.abs(cos)),
    GEOMETRY.nodeHeight / (2 * Math.abs(sin))
  );
  const point = (radius: number) => ({
    x: Number((GEOMETRY.center + radius * cos).toFixed(3)),
    y: Number((GEOMETRY.center + radius * sin).toFixed(3)),
  });

  return {
    center: point(GEOMETRY.radius),
    from: point(GEOMETRY.hubRadius),
    to: point(GEOMETRY.radius - nodeEdge),
  };
});

export function EcosystemOrbitalWheel({ selected, onSelect }: { selected: number; onSelect: (index: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const introduced = useInView(ref, { once: true, amount: 0.15 });
  const visible = useInView(ref, { amount: 0.05 });
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const emphasized = hovered ?? focused ?? selected;
  const preview = ECOSYSTEM_PRODUCTS[emphasized];
  const gradientId = useId();

  const geometryStyle = {
    "--node-width": `${GEOMETRY.nodeWidth / GEOMETRY.size * 100}%`,
    "--node-height": `${GEOMETRY.nodeHeight / GEOMETRY.size * 100}%`,
    "--hub-size": `${GEOMETRY.hubRadius * 2 / GEOMETRY.size * 100}%`,
  } as CSSProperties;

  return (
    <figure
      ref={ref}
      className={styles.orbital}
      style={geometryStyle}
      data-introduced={introduced}
      data-visible={visible}
      aria-label="OpenhouseFX orbital ecosystem selector"
    >
      <AmbientGradientLayer variant="orbit" />
      <figcaption className={styles.caption}>
        <span>Technology ecosystem vision</span>
        <span className={styles.edition} aria-hidden="true">01—04</span>
      </figcaption>

      <div className={styles.arena}>
        <svg className={styles.paths} viewBox="0 0 1000 1000" aria-hidden="true">
          <defs>
            {POSITIONS.map(({ from, to }, index) => (
              <linearGradient key={index} id={`${gradientId}-${index}`} gradientUnits="userSpaceOnUse" x1={from.x} y1={from.y} x2={to.x} y2={to.y}>
                <stop stopColor="#7a6330" stopOpacity=".3" />
                <stop offset="1" stopColor="#e6c572" />
              </linearGradient>
            ))}
          </defs>
          <g className={styles.rings}>
            <circle className={styles.innerRing} cx="500" cy="500" r="180" />
            <circle className={styles.mainRing} cx="500" cy="500" r={GEOMETRY.radius} />
            <circle className={styles.outerRing} cx="500" cy="500" r="435" />
            <g className={styles.activeArc} transform={`rotate(${emphasized * 90} 500 500)`}>
              <path d="M 397.6 154.9 A 360 360 0 0 1 602.4 154.9" />
            </g>
          </g>

          {POSITIONS.map(({ from, to }, index) => {
            const active = selected === index;
            const path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

            return (
              <g key={index} style={{ "--node-index": index } as CSSProperties}>
                <path className={styles.connector} d={path} data-preview={emphasized === index} pathLength="1" />
                {active ? (
                  <motion.path
                    key={`${index}-selected`}
                    className={styles.energy}
                    d={path}
                    stroke={`url(#${gradientId}-${index})`}
                    initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: introduced ? 1 : 0, opacity: introduced ? 1 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.55 }}
                  />
                ) : null}
              </g>
            );
          })}

          {introduced && !reducedMotion ? (
            <motion.g key={selected} className={styles.pulse}>
              <motion.circle
                r="12"
                initial={{ cx: POSITIONS[selected].from.x, cy: POSITIONS[selected].from.y, opacity: 0 }}
                animate={{ cx: POSITIONS[selected].to.x, cy: POSITIONS[selected].to.y, opacity: [0, 0.15, 0] }}
                transition={{ duration: 0.7, delay: 0.25 }}
              />
              <motion.circle
                r="4"
                initial={{ cx: POSITIONS[selected].from.x, cy: POSITIONS[selected].from.y, opacity: 0 }}
                animate={{ cx: POSITIONS[selected].to.x, cy: POSITIONS[selected].to.y, opacity: [0, 0.95, 0] }}
                transition={{ duration: 0.7, delay: 0.25 }}
              />
            </motion.g>
          ) : null}
        </svg>

        <div className={styles.hubPosition}>
          <div className={styles.hub}>
            <span className={styles.hubAura} aria-hidden="true" />
            {introduced && !reducedMotion ? (
              <motion.span
                key={selected}
                className={styles.hubResponse}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.45, 0] }}
                transition={{ duration: 0.65 }}
              />
            ) : null}
            <Image src={MEDIA.logoIcon} alt="" width={36} height={36} className={styles.hubLogo} />
            <span className={styles.hubBrand}>OpenhouseFX</span>
            <strong>Ecosystem</strong>
          </div>
        </div>

        <div className={styles.nodes} role="group" aria-label="Choose an OpenhouseFX product">
          {ECOSYSTEM_PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              className={styles.nodePosition}
              data-index={index}
              style={{
                "--node-x": `${POSITIONS[index].center.x / 10}%`,
                "--node-y": `${POSITIONS[index].center.y / 10}%`,
                "--node-index": index,
              } as CSSProperties}
            >
              <button
                type="button"
                className={styles.node}
                data-preview={emphasized === index}
                data-accent={product.icon}
                aria-pressed={selected === index}
                aria-controls="technology-products"
                aria-label={`Explore ${product.name} · ${product.area}`}
                onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(index); }}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => { setFocused(index); setHovered(null); }}
                onBlur={() => setFocused(null)}
                onClick={() => onSelect(index)}
              >
                <span className={`${styles.nodeIcon} light-marker`}><ProductGlyph icon={product.icon} /></span>
                <span className={styles.nodeName}>{product.name}</span>
                <span className={styles.nodeCategory}>{product.area}</span>
                <span className={styles.nodeState}>{selected === index ? "Selected" : "Explore"} <span aria-hidden="true">↗</span></span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.preview}>
        <span className={styles.previewLabel}>{emphasized === selected ? "Selected product" : "Product preview"}</span>
        <p><strong>{preview.name}</strong> {preview.summary}</p>
        <a className={styles.detailsLink} href="#technology-products">View selected product <span aria-hidden="true">↓</span></a>
      </div>
    </figure>
  );
}
