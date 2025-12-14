"use client";

import { useEffect, useState } from "react";
import styles from "./Carousel.module.scss";

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  slidesPerView?: number; // 👈 số ảnh hiển thị cùng lúc
  gap?: number; // 👈 khoảng cách giữa ảnh (px)
}

export default function Carousel({
  images,
  autoPlay = true,
  interval = 3000,
  showDots = true,
  slidesPerView = 4,
  gap = 16,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const maxIndex = images.length - slidesPerView;

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, maxIndex]);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.track}
        style={{
          transform: `translateX(-${index * (100 / slidesPerView)}%)`,
          gap: `${gap}px`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={styles.slide}
            style={{ flex: `0 0 calc(100% / ${slidesPerView})` }}
          >
            <img src={img} alt="" />
          </div>
        ))}
      </div>

      {showDots && (
        <div className={styles.dots}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === index ? styles.active : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
