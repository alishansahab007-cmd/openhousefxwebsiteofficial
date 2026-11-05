"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { EcosystemProduct } from "@/lib/ecosystem";
import { ProductGlyph } from "./ProductGlyph";
import { ProductWorkflow } from "./ProductWorkflow";
import styles from "./ecosystem.module.css";

export function ProductSpotlight({ product, active }: { product: EcosystemProduct; active: boolean }) {
  const [shotIndex, setShotIndex] = useState(0);
  const screenshot = product.screenshots[shotIndex];
  const workflowHref = `#workflow-${product.id}`;

  return (
    <div className={styles.spotlight} data-accent={product.icon}>
      <div className={styles.productCopy}>
        <div className={styles.productTopline}>
          <span className={styles.glyph}><ProductGlyph icon={product.icon} /></span>
          <span className={styles.status}>{product.status}</span>
        </div>
        <div>
          <p className={styles.micro}>{product.category}</p>
          <h3 id="ecosystem-detail-heading">OpenhouseFX {product.name}</h3>
        </div>
        <p className={styles.productHeadline}>{product.headline}</p>
        <p className={styles.productDescription}>{product.description}</p>
        <ul className={styles.features}>
          {product.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
        <p className={styles.productNote}>{product.note}</p>
        <Link className={styles.textAction} href={product.action?.href ?? workflowHref}>
          {product.action?.label ?? (screenshot ? "See the illustrative workflow" : "See the conceptual workflow")}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
      {active ? (
        <div className={styles.productVisual}>
          {screenshot ? (
            <figure className={styles.screenshot}>
              <figcaption className={styles.browserBar}>
                <span aria-hidden="true"><i /><i /><i /></span>
                <span>{screenshot.label}</span>
                <a href={screenshot.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${product.name} ${screenshot.label} at full size (new tab)`}>
                  Full size <span aria-hidden="true">↗</span>
                </a>
              </figcaption>
              <div className={styles.screenshotFrame}>
                <Image
                  key={screenshot.src}
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  sizes="(min-width: 1536px) 840px, (min-width: 1024px) 56vw, 92vw"
                  className={styles.screenshotImage}
                />
              </div>
              {product.screenshots.length > 1 ? (
                <div className={styles.galleryControls} role="group" aria-label={`${product.name} screenshots`}>
                  {product.screenshots.map((shot, index) => (
                    <button key={shot.src} type="button" aria-pressed={shotIndex === index} onClick={() => setShotIndex(index)}>
                      {shot.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </figure>
          ) : null}
          <ProductWorkflow product={product} />
        </div>
      ) : null}
    </div>
  );
}
