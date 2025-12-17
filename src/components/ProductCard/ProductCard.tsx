"use client";

import { Product } from "@/data/products";
import { useState, useRef } from "react";
import styles from "./ProductCard.module.scss";

type ProductCardProps = {
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.productImageImg}
              src={resolveSrc(src)}
              alt={`product-${i}`}
              onClick={() => onImageClick(resolveSrc(src))}
              style={{ cursor: "zoom-in" }}
            />
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button
            className={`${styles.carouselBtn} ${styles.prev}`}
            onClick={prev}
            type="button"
          >
            ‹
          </button>
          <button
            className={`${styles.carouselBtn} ${styles.next}`}
            onClick={next}
            type="button"
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
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const openLightbox = (src: string) => {
    setActiveImage(src);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setActiveImage(null);
  };

  const imagesList =
    Array.isArray(product.images) && product.images.length
      ? product.images.map(resolveSrc)
      : undefined;

  const singleSrc =
    !imagesList && product.image_url
      ? resolveSrc(product.image_url)
      : undefined;

  return (
    <div className={styles.productCard}>
      {/* IMAGE */}
      <div className={styles.productImageWrap}>
        {imagesList ? (
          <MiniCarousel items={imagesList} onImageClick={openLightbox} />
        ) : singleSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.productImageImg}
            src={singleSrc}
            alt={product.name}
            onClick={() => openLightbox(singleSrc)}
            style={{ cursor: "zoom-in" }}
          />
        ) : (
          <div className={styles.productImage}>Hình bao xi măng</div>
        )}
      </div>

      {/* INFO */}
      <div className={styles.productName}>{product.name}</div>
      <div className={styles.productDesc}>{product.description}</div>

      <div className={styles.productMeta}>
        <div>
          <span className={styles.productPrice}>GIÁ:</span>
          <span className={styles.productUnit}> Liên hệ</span>
        </div>
      </div>

      {/* LIGHTBOX */}
      {isLightboxOpen && activeImage && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.lightboxClose}
              onClick={closeLightbox}
              type="button"
            >
              ×
            </button>
            <div className={styles.previewWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeImage} alt="Preview" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
