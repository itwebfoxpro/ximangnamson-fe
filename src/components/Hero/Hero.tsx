"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import Image from "next/image";

const heroImages = [
  {
    src: "/co-phan-nam-son-banner-1.avif",
    position: "bottom center",
  },
  {
    src: "/co-phan-nam-son-banner-2.avif",
    position: "center center",
  },
  {
    src: "/co-phan-nam-son-banner-3.avif",
    position: "center center",
  },
  {
    src: "/co-phan-nam-son-banner-21.avif",
    position: "center center",
  },
  // {
  //   src: "/co-phan-nam-son-banner-31.avif",
  //   position: "center center",
  // },
  // {
  //   src: "/banner-xi-mang-binh-duong.jpg",
  //   position: "center bottom",
  // },
  {
    src: "/hero3.avif",
    position: "center 90%",
  },
  // {
  //   src: "/hero4.avif",
  //   position: "center center",
  // },
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
      <div className={styles.carousel}>
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroImages.map((img, i) => (
            <div key={i} className={styles.carouselSlide}>
                <Image
                  src={img.src}
                  alt={`Banner ${i + 1}`}
                  fill
                  priority={i === 0}
                  style={{
                    objectFit: "cover",
                    objectPosition: img.position,
                  }}
                />
            </div>
          ))}
        </div>
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
