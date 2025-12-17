"use client";

import { useEffect, useState } from "react";
import styles from "./ImageLibraryModal.module.scss";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

type ImageItem = {
  filename: string;
  url: string;
};

interface Props {
  onSelect: (imageUrl: string) => void;
  onClose: () => void;
}

export default function ImageLibraryModal({ onSelect, onClose }: Props) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ================= FETCH IMAGES ================= */
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE}/api/uploads/posts/images`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Không thể tải danh sách hình ảnh");
        }

        const data = await res.json();
        setImages(data.data || []);
      } catch (err: any) {
        setError(err.message || "Có lỗi khi tải hình ảnh");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);
  /* ================================================ */

  const handleSelect = (img: ImageItem) => {
    const fullUrl = `${API_BASE}${img.url}`;
    onSelect(fullUrl);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* ===== Header ===== */}
        <div className={styles.header}>
          <h3>Thư viện hình ảnh</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* ===== Content ===== */}
        <div className={styles.content}>
          {loading && <div className={styles.loading}>Đang tải hình ảnh…</div>}

          {error && <div className={styles.error}>❌ {error}</div>}

          {!loading && images.length === 0 && (
            <div className={styles.empty}>
              Chưa có hình ảnh nào trong thư viện
            </div>
          )}

          <div className={styles.gallery}>
            {images.map((img) => (
              <div
                key={img.filename}
                className={styles.imageItem}
                onClick={() => handleSelect(img)}
                title="Chèn hình ảnh vào bài viết"
              >
                <img
                  src={`${API_BASE}${img.url}`}
                  alt={img.filename}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ===== Footer ===== */}
        <div className={styles.footer}>
          <span>{images.length} hình ảnh</span>

          <button className={styles.cancelBtn} onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
