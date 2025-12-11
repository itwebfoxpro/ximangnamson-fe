"use client";

import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect, useRef } from "react";
import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  product: Product;
};

// nếu product.image_url hoặc product.images chứa các đường dẫn như:
// - absolute URL ("https://...")
// - root-relative ("/hatien-md-1.jpg" hoặc "/assets/hatien-md-1.jpg")
// - or relative ("images/hatien-md-1.jpg")
// hàm này sẽ trả src phù hợp để dùng trong <img>
function resolveSrc(path?: string) {
  if (!path) return "";
  const p = path.trim();
  if (/^https?:\/\//i.test(p)) return p;
  // nếu bắt đầu bằng / thì xem như public root (Next.js public/)
  if (p.startsWith("/")) return p;
  // fallback: thêm dấu / để lấy từ public root
  return `/${p}`;
}

/** Simple carousel used when product.images has multiple items.
 *  local state only; minimal controls (prev/next + dots)
 */
function MiniCarousel({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // focus management or other side-effects could go here
  }, []);

  if (!items || items.length === 0) {
    return <div className={styles.productImage}>Hình bao xi măng</div>;
  }

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div className={styles.carouselWrap}>
      <div
        className={styles.carouselTrack}
        ref={trackRef}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((src, i) => (
          <div key={i} className={styles.carouselSlide}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.productImageImg}
              src={resolveSrc(src)}
              alt={`product-image-${i}`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.35";
              }}
            />
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button
            className={`${styles.carouselBtn} ${styles.prev}`}
            onClick={prev}
            aria-label="Previous"
            type="button"
          >
            ‹
          </button>

          <button
            className={`${styles.carouselBtn} ${styles.next}`}
            onClick={next}
            aria-label="Next"
            type="button"
          >
            ›
          </button>

          <div className={styles.carouselDots}>
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                className={
                  i === index ? `${styles.dot} ${styles.dotActive}` : styles.dot
                }
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  // ▼ số lượng
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1)); // không giảm dưới 1

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    });
  };

  // build image sources:
  // priority: product.images (array) -> product.image_url -> undefined
  const imagesList: string[] | undefined =
    Array.isArray(product.images) && product.images.length
      ? product.images.map((p) => resolveSrc(p))
      : undefined;

  const singleSrc =
    !imagesList && product.image_url
      ? resolveSrc(product.image_url)
      : undefined;

  return (
    <div className={styles.productCard}>
      {/* Image area */}
      <div className={styles.productImageWrap}>
        {imagesList ? (
          <MiniCarousel items={imagesList} />
        ) : singleSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.productImageImg}
            src={singleSrc}
            alt={product.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0.35";
            }}
          />
        ) : (
          <div className={styles.productImage}>Hình bao xi măng</div>
        )}
      </div>

      <div className={styles.productName}>{product.name}</div>

      <div className={styles.productDesc}>{product.description}</div>

      <div className={styles.productMeta}>
        <div>
          <span className={styles.productPrice}>
            {product.price.toLocaleString("vi-VN")}đ
          </span>
          <span className={styles.productUnit}> / {product.unit}</span>
        </div>

        {/* ▼ chọn số lượng */}
        <div className={styles.qtyBox}>
          <button className={styles.qtyBtn} onClick={decrease}>
            –
          </button>

          <input
            type="number"
            className={styles.qtyInput}
            value={quantity}
            min={1}
            onChange={(e) =>
              setQuantity(Math.max(1, Number(e.target.value) || 1))
            }
          />

          <button className={styles.qtyBtn} onClick={increase}>
            +
          </button>
        </div>

        {/* nút thêm giỏ */}
        <button className={styles.addButton} onClick={handleAddToCart}>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
