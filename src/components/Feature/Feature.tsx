import React from "react";
import styles from "./Feature.module.scss";
import Image from "next/image";

export type FeatureItem = {
  id: string | number;
  title: string;
  description?: string;
  bgColor?: string; // hex or css variable, overrides default palette
  icon: string; // inline SVG or React icon component
  href?: string; // optional link
};

type Props = {
  items: FeatureItem[];
  columns?: number; // number of columns on desktop (default 4)
};

export default function FeatureGrid({ items, columns = 4 }: Props) {
  return (
    <section className={styles.wrapper} aria-label="Các tính năng nổi bật">
      <div className={styles.grid} style={{ ["--cols" as any]: columns }}>
        {items.map((it) => {
          const inner = (
            <div
              className={styles.card}
              style={it.bgColor ? { background: it.bgColor } : undefined}
              role={it.href ? "link" : "article"}
              tabIndex={0}
              aria-label={it.title}
            >
              <Image
                src={it.icon}
                alt={it.title}
                width={36}
                height={36}
              />

              <div className={styles.textWrap}>
                <h2 className={styles.title}>{it.title}</h2>
                {it.description && (
                  <p className={styles.desc}>{it.description}</p>
                )}
              </div>
            </div>
          );

          return it.href ? (
            <a
              key={it.id}
              className={styles.itemLink}
              href={it.href}
              aria-label={it.title}
            >
              {inner}
            </a>
          ) : (
            <div key={it.id} className={styles.item}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
