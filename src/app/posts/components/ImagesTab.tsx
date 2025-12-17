"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./imagesTab.module.scss";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

type ImageItem = {
  filename: string;
  url: string;
};

export default function ImagesTab() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<ImageItem[]>([]);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* ================= FETCH ALL IMAGES ================= */
  const fetchImages = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/uploads/posts/images`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setImages(data.data || []);
    } catch (err) {
      console.error("Fetch images failed", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  /* =================================================== */

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setPreviewUrls((prev) => [
      ...prev,
      ...newFiles.map((f) => URL.createObjectURL(f)),
    ]);

    setShowModal(true);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);

    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    setShowModal(false);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/uploads/posts/images`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Upload thất bại");
      }

      setSuccess(`Upload thành công ${selectedFiles.length} hình ảnh`);
      handleCancel();
      fetchImages(); // 🔥 reload gallery
    } catch (err: any) {
      setError(err.message || "Có lỗi khi upload");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm("Bạn có chắc muốn xoá hình ảnh này?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_BASE}/api/uploads/posts/images/${filename}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Xoá thất bại");
      }

      fetchImages(); // 🔥 reload gallery
    } catch (err: any) {
      alert(err.message || "Có lỗi khi xoá ảnh");
    }
  };
  

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>Hình ảnh</h2>
          <p>Quản lý hình ảnh bài viết</p>

          {/* ========================= */}
        </div>

        <button className={styles.uploadBtn} onClick={openFileDialog}>
          Chọn hình ảnh
        </button>
      </div>
      <div className={styles.gallery}>
        {images.length === 0 ? (
          <div className={styles.emptyState}>
            Chưa có hình ảnh nào trong thư viện
          </div>
        ) : (
          images.map((img) => (
            <div key={img.filename} className={styles.galleryItem}>
              <img src={`${API_BASE}${img.url}`} alt={img.filename} />

              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(img.filename)}
                title="Xoá hình ảnh"
              >
                −
              </button>
            </div>
          ))
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
      />

      {success && <div className={styles.success}>✅ {success}</div>}
      {error && <div className={styles.error}>❌ {error}</div>}

      {/* Modal upload giữ nguyên */}
      {showModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Hình ảnh đã chọn ({selectedFiles.length})</h3>

              <button
                className={styles.addMoreBtn}
                onClick={openFileDialog}
                disabled={loading}
              >
                + Chọn thêm hình ảnh
              </button>
            </div>

            <div className={styles.imageGrid}>
              {previewUrls.map((url, index) => (
                <div key={index} className={styles.imageItem}>
                  <img src={url} alt={`preview-${index}`} />

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeImage(index)}
                    type="button"
                  >
                    −
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <button
                className={styles.cancelBtn}
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className={styles.confirmBtn}
                onClick={handleUpload}
                disabled={loading || selectedFiles.length === 0}
              >
                {loading ? "Đang upload..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
