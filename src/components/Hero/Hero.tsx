"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.scss";

const heroImages = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg", "/hero.jpg"];

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
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroImages.map((img, i) => (
            <div
              key={i}
              className={styles.carouselSlide}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
      </div>

      <div className={styles.heroInner}>
        <div>
          <h1 className={styles.heroTitle}>Nhà phân phối Xi măng Nam Sơn</h1>
          <p className={styles.heroDesc}>
            Nhà phân phối xi măng lâu đời, đứng đầu trong hệ thống phân phối tại
            Bình Dương và Bình Phước. Chiếm tỉ trọng 35% thị trường. Là nhà phân
            phối chính Vicem HÀ TIÊN, FICO-YYL, SCG, TÂY ĐÔ...
          </p>

          <div className={styles.heroActions}>
            <a href="#products" className={styles.btnPrimary}>
              Xem danh mục sản phẩm
            </a>
          </div>
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
