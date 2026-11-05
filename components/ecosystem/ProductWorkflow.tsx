"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import type { EcosystemProduct } from "@/lib/ecosystem";
import { ProductGlyph } from "./ProductGlyph";
import styles from "./ecosystem.module.css";

export function ProductWorkflow({ product }: { product: EcosystemProduct }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const { title, stages, details } = product.workflow;
  const concept = product.icon === "research";

  return (
    <div ref={ref} id={`workflow-${product.id}`} tabIndex={-1} className={styles.workflow} data-kind={product.icon} data-in-view={inView}>
      <div className={styles.workflowHeading}>
        <div>
          <p className={styles.micro}>{concept ? "Research roadmap" : "Illustrative workflow"}</p>
          <h4>{title}</h4>
        </div>
        <span className={styles.workflowGlyph}><ProductGlyph icon={product.icon} /></span>
      </div>
      <ol className={styles.stages} style={{ "--step-count": stages.length } as React.CSSProperties}>
        {stages.map((stage, index) => (
          <li key={stage} style={{ "--step-index": index } as React.CSSProperties}>
            <span className={styles.stageIndex}>{String(index + 1).padStart(2, "0")}</span>
            <span>{stage}</span>
          </li>
        ))}
      </ol>
      {details ? (
        <ul className={styles.workflowDetails}>
          {details.map((detail, index) => (
            <li key={detail} style={{ "--step-index": index } as React.CSSProperties}>
              <span className={styles.detailGlyph} aria-hidden="true" />
              {detail}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
