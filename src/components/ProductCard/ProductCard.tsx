"use client";

import { Product } from "@/data/products";
import { useState, useRef } from "react";
import styles from "./ProductCard.module.scss";
import Link from "next/link";
import Image from "next/image";

type Props = {
  product: Product;
};

/* Resolve image src from various path types */
function resolveSrc(path?: string) {
  if (!path) return "";
  const p = path.trim();
  if (/^https?:\/\//i.test(p)) return p;
  if (p.startsWith("/")) return p;
  return `/${p}`;
}

/* Simple carousel */
function MiniCarousel({
  items,
  onImageClick,
}: {
  items: string[];
  onImageClick: (src: string) => void;
}) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  if (!items.length) {
    return <div className={styles.productImage}>Hình bao xi măng</div>;
  }

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div className={styles.carouselWrap}>
      <div
        ref={trackRef}
        className={styles.carouselTrack}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((src, i) => (
          <div key={i} className={styles.carouselSlide}>
            <Image
              src={src}
              alt={`product-${i}`}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className={styles.productImage}
            />
            {/* <Image
              src={resolveSrc(src)}
              alt={`product-${i}`}
              width={304}
              height={356}
              sizes="152px"
              quality={70}
              className={styles.productImageImg}
              onClick={() => onImageClick(resolveSrc(src))}
            /> */}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button
            className={`${styles.carouselBtn} ${styles.prev}`}
            onClick={prev}
            type="button"
            aria-label="Ảnh trước"
          >
            ‹
          </button>

          <button
            className={`${styles.carouselBtn} ${styles.next}`}
            onClick={next}
            type="button"
            aria-label="Ảnh tiếp theo"
          >
            ›
          </button>

          <div className={styles.carouselDots}>
            {items.map((_, i) => (
              <button
                key={i}
                className={
                  i === index ? `${styles.dot} ${styles.dotActive}` : styles.dot
                }
                onClick={() => setIndex(i)}
                type="button"
                aria-label={`Chuyển đến ảnh ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProductCard({ product }: Props) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const images = product.images ?? [];

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageWrap}>
        {images.length > 0 ? (
          <MiniCarousel
            items={images}
            onImageClick={(src) => setActiveImage(src)}
          />
        ) : (
          <div className={styles.noImage}>No image</div>
        )}
      </div>

      <Link href={`/bao-gia/${product.slug}`} className={styles.productName}>
        {product.name}
      </Link>
      <p className={styles.productDesc}>{product.shortDescription}</p>

      <div className={styles.productMeta}>
        <span className={styles.price}>
          Giá: <strong className={styles.priceColor}>{product.price}</strong>
        </span>
        <a href="tel:0932687219">Liên hệ để được giá tốt</a>
      </div>

      {activeImage && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setActiveImage(null)}
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setActiveImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <Image
              src={activeImage}
              alt="Preview"
              width={600}
              height={600}
              sizes="(max-width: 768px) 90vw, 600px"
              className={styles.productImageImg}
            />
          </div>
        </div>
      )}
    </div>
  );
}
