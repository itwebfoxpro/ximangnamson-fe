"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./PartnersSection.module.scss";

const partners = [
  { id: 1, logo: "/doitac1.webp" },
  { id: 2, logo: "/doitac2.png" },
  { id: 3, logo: "/doitac3.svg" },
  { id: 4, logo: "/doitac4.png" },
  { id: 5, logo: "/doitac1.webp" },
  { id: 6, logo: "/doitac2.png" },
  { id: 7, logo: "/doitac3.svg" },
  { id: 8, logo: "/doitac4.png" },
];

export default function PartnersCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateWidth = () => {
      const totalWidth = track.scrollWidth / 2;
      track.style.setProperty("--scroll-width", `${totalWidth}px`);
    };

    // ⏳ đợi ảnh load xong
    const images = track.querySelectorAll("img");
    let loaded = 0;

    images.forEach((img) => {
      if (img.complete) {
        loaded++;
      } else {
        img.onload = () => {
          loaded++;
          if (loaded === images.length) updateWidth();
        };
      }
    });

    if (loaded === images.length) updateWidth();

    // 👀 resize vẫn mượt
    const ro = new ResizeObserver(updateWidth);
    ro.observe(track);

    return () => ro.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <h2>Đối tác liên kết</h2>
      <div className={styles.carousel}>
        <div ref={trackRef} className={styles.track}>
          {[...partners, ...partners].map((p, i) => (
            <div key={i} className={styles.item}>
              <Image
                src={p.logo}
                alt="Đối tác"
                width={160}
                height={80}
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
