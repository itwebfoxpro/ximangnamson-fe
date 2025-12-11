"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import styles from "./products.module.scss";

type Product = {
  id: number;
  name: string;
  description?: string;
  price?: number;
  unit?: string;
  image_url?: string;
  images?: string[];
};

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE || "https://api.ximangnamson.com"
).replace(/\/+$/, "");

// small base64 gray placeholder
const PLACEHOLDER_DATA_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='360'><rect width='100%' height='100%' fill='#f3f7f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#c7d2d9' font-family='Arial' font-size='20'>No image</text></svg>`
  );

/** FIXED VERSION ⭐⭐⭐
 * - Nếu path bắt đầu bằng "/" → load ảnh local trong /public
 * - Nếu path bắt đầu bằng http(s) → giữ nguyên
 * - Ngược lại → ảnh từ backend
 */
function publicUrl(path?: string) {
  if (!path) return "";
  const p = path.trim();

  // Full URL → trả nguyên
  if (/^https?:\/\//i.test(p)) return p;

  // Ảnh local trong public/
  if (p.startsWith("/")) return p;

  // Ảnh tương đối từ backend
  return `${API_BASE}/${p}`;
}

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/products`, {
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message || `Server error ${res.status}`);
        }

        const json = await res.json();
        const data = Array.isArray(json) ? json : json.data ?? [];

        const normalized: Product[] = data.map((it: any) => {
          const firstImage =
            Array.isArray(it.images) && it.images.length > 0
              ? it.images[0]
              : undefined;

          return {
            id: it.id,
            name: it.name,
            description: it.description,
            price: it.price,
            unit: it.unit,
            image_url: it.image_url ?? firstImage,
            images: it.images,
          };
        });

        if (mounted) setItems(normalized);
      } catch (err: any) {
        if (mounted) setError(err.message || "Lỗi khi tải dữ liệu");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();

    return () => {
      mounted = false;
    };
  }, []);

  function formatVnd(n?: number) {
    if (n === null || n === undefined) return "-";
    return n.toLocaleString("vi-VN") + "₫";
  }

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.container}>
        <h1>Quản lý sản phẩm</h1>
        <p className={styles.subtitle}>
          Danh sách sản phẩm và thao tác quản lý
        </p>

        <div className={styles.box}>
          {loading && <div className={styles.info}>Đang tải sản phẩm…</div>}
          {error && <div className={styles.error}>Lỗi: {error}</div>}

          {!loading && !error && items.length === 0 && (
            <div className={styles.info}>Chưa có sản phẩm nào.</div>
          )}

          {!loading && !error && items.length > 0 && (
            <div className={styles.grid}>
              {items.map((p) => {
                const imgUrl = p.image_url ? publicUrl(p.image_url) : "";

                return (
                  <div key={p.id} className={styles.card}>
                    <div className={styles.imageWrap}>
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={p.name}
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            img.src = PLACEHOLDER_DATA_URL;
                          }}
                        />
                      ) : (
                        <div className={styles.placeholder}>
                          Hình bao xi măng
                        </div>
                      )}
                    </div>

                    <div className={styles.cardBody}>
                      <h3 className={styles.title}>{p.name}</h3>
                      <p className={styles.desc}>{p.description}</p>

                      <div className={styles.metaRow}>
                        <div className={styles.price}>
                          <strong>{formatVnd(p.price)}</strong>
                          <div className={styles.unit}>
                            {p.unit ?? "bao 50kg"}
                          </div>
                        </div>

                        <div className={styles.actions}>
                          <button className={styles.qtyBtn}>−</button>
                          <span className={styles.qty}>1</span>
                          <button className={styles.qtyBtn}>+</button>
                          <button className={styles.addBtn}>
                            Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>  
      </main>
    </div>
  );
}
