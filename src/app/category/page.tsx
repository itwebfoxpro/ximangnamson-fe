"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import styles from "./category.module.scss";

type Category = {
  id: number;
  name: string;
  price: number;
  description?: string;
};

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE || "https://api.ximangnamson.com"
).replace(/\/+$/, "");

export default function CategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // modal + form
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [saving, setSaving] = useState(false);
  const [description, setDescription] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState<number | "">("");
  const [editDescription, setEditDescription] = useState("");

  function openEditModal(category: Category) {
    setEditingId(category.id);
    setEditName(category.name);
    setEditPrice(category.price);
    setEditDescription(category.description || "");
    setShowEditModal(true);
  }

  async function handleUpdate() {
    if (!editingId || !editName.trim() || editPrice === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/categories/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName.trim(),
          price: editPrice,
          description: editDescription.trim() || null,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Cập nhật thất bại");
      }

      setShowEditModal(false);
      setEditingId(null);
      fetchCategories();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
      setEditDescription("");
    }
  }
  

  // =====================
  // FETCH CATEGORIES
  // =====================
  async function fetchCategories() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/categories`, {
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || `Server error ${res.status}`);
      }

      const json = await res.json();
      const data = Array.isArray(json) ? json : json.data ?? [];
      setItems(data);
    } catch (err: any) {
      setError(err.message || "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // =====================
  // CREATE CATEGORY
  // =====================
  async function handleCreate() {
    if (!name.trim() || price === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          price,
          description: description.trim() || null,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Tạo sản phẩm thất bại");
      }

      // reset & reload
      setShowModal(false);
      setName("");
      setPrice("");
      fetchCategories();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
      setDescription("");
    }
  }

  function formatVnd(n?: number) {
    if (n === null || n === undefined) return "-";
    return n.toLocaleString("vi-VN") + "₫";
  }

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.container}>
        {/* HEADER */}
        <div className={styles.headerRow}>
          <div>
            <h1>Danh mục sản phẩm</h1>
            <p className={styles.subtitle}>
              Danh sách các sản phẩm hiện có trong hệ thống
            </p>
          </div>

          <button className={styles.addBtn} onClick={() => setShowModal(true)}>
            + Thêm sản phẩm
          </button>
        </div>

        {/* CONTENT */}
        <div className={styles.box}>
          {loading && <div className={styles.info}>Đang tải danh mục…</div>}

          {error && <div className={styles.error}>Lỗi: {error}</div>}

          {!loading && !error && items.length === 0 && (
            <div className={styles.info}>Hiện tại chưa có sản phẩm nào</div>
          )}

          {!loading && !error && items.length > 0 && (
            <div className={styles.grid}>
              {items.map((c) => (
                <div key={c.id} className={styles.card}>
                  <div className={styles.cardBody}>
                    <h3 className={styles.title}>{c.name}</h3>
                    <p className={styles.desc}>
                      {c.description || "Chưa có mô tả"}
                    </p>
                    <div className={styles.metaRow}>
                      <div className={styles.price}>
                        <strong>{formatVnd(c.price)}</strong>
                        <div className={styles.unit}>/ bao</div>
                      </div>

                      <div className={styles.actions}>
                        <button
                          className={styles.fixBtn}
                          onClick={() => openEditModal(c)}
                        >
                          Sửa
                        </button>
                        <button className={styles.deleteBtn}>Xoá</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODAL CREATE */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Thêm sản phẩm</h2>

              <div className={styles.formGroup}>
                <label>Tên sản phẩm</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Xi măng PCB40"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mô tả</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả sản phẩm..."
                />
              </div>

              <div className={styles.formGroup}>
                <label>Giá (VNĐ)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  placeholder="92000"
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                >
                  Hủy
                </button>
                <button
                  className={styles.saveBtn}
                  onClick={handleCreate}
                  disabled={saving}
                >
                  {saving ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ===== MODAL EDIT ===== */}
        {showEditModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Sửa sản phẩm</h2>

              <div className={styles.formGroup}>
                <label>Tên sản phẩm</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mô tả</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Giá (VNĐ)</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) =>
                    setEditPrice(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setShowEditModal(false)}
                  disabled={saving}
                >
                  Hủy
                </button>
                <button
                  className={styles.saveBtn}
                  onClick={handleUpdate}
                  disabled={saving}
                >
                  {saving ? "Đang lưu..." : "Cập nhật"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
