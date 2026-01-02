"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import Image from "next/image";

const heroImages = [
  {
    src: "/hero0.avif",
    position: "bottom center",
  },
  {
    src: "/hero1.avif",
    position: "center center",
  },
  {
    src: "/hero2.avif",
    position: "center 45%",
  },
  {
    src: "/hero3.avif",
    position: "center 90%",
  },
  {
    src: "/hero4.avif",
    position: "center center",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // 4s / slide

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Carousel background */}
      <div className={styles.carousel}>
        {heroImages.map((img, i) =>
          i === index ? (
            <Image
              key={i}
              src={img.src}
              alt="Banner"
              fill
              priority={i === 0}
              loading="eager"
              style={{ objectFit: "cover", objectPosition: img.position }}
            />
          ) : null
        )}
        {/* </div> */}
      </div>
      {/* Dots */}
      <div className={styles.dots}>
        {heroImages.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
