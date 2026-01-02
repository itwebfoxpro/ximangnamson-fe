"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Dashboard/Sidebar";
import BottomBar from "@/components/Dashboard/BottomBar/BottomBar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAuth } from "@/context/AuthContext";

import styles from "./category.module.scss";

type Category = {
  id: number;
  name: string;
  price: number;
  description?: string;
};

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE || "https://api.namsonjsc.vn"
).replace(/\/+$/, "");

export default function CategoriesPage() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { user, loading } = useAuth();

  // =====================
  // AUTH GUARD
  // =====================
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/account");
    }
  }, [user, loading, router]);

  // Trong lúc check auth hoặc chưa login → không render UI
  if (loading || !user) {
    return null;
  }

  // =====================
  // STATE
  // =====================
  const [items, setItems] = useState<Category[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // modal + form create
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  // modal edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState<number | "">("");
  const [editDescription, setEditDescription] = useState("");

  // =====================
  // FETCH CATEGORIES
  // =====================
  async function fetchCategories() {
    setPageLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/categories`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || `Server error ${res.status}`);
      }

      const json = await res.json();
      setItems(Array.isArray(json) ? json : json.data ?? []);
    } catch (err: any) {
      setError(err.message || "Lỗi khi tải dữ liệu");
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // =====================
  // CREATE
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
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
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

      setShowModal(false);
      setName("");
      setPrice("");
      setDescription("");
      fetchCategories();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  // =====================
  // EDIT
  // =====================
  function openEditModal(c: Category) {
    setEditingId(c.id);
    setEditName(c.name);
    setEditPrice(c.price);
    setEditDescription(c.description || "");
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
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
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
    }
  }

  // =====================
  // RENDER
  // =====================
  return (
    <div className={styles.layout}>
      {isMobile ? <BottomBar /> : <Sidebar />}

      <main className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <h2>Danh mục sản phẩm</h2>
            <p className={styles.subtitle}>
              Danh sách các sản phẩm hiện có trong hệ thống
            </p>
          </div>

          <button className={styles.addBtn} onClick={() => setShowModal(true)}>
            + Thêm sản phẩm
          </button>
        </div>

        <div className={styles.box}>
          {pageLoading && <div className={styles.info}>Đang tải…</div>}
          {error && <div className={styles.error}>Lỗi: {error}</div>}

          {!pageLoading && !error && items.length === 0 && (
            <div className={styles.info}>Chưa có sản phẩm nào</div>
          )}

          {!pageLoading && !error && items.length > 0 && (
            <div className={styles.grid}>
              {items.map((c) => (
                <div key={c.id} className={styles.card}>
                  <h3>{c.name}</h3>
                  <p>{c.description || "Chưa có mô tả"}</p>
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
              ))}
            </div>
          )}
        </div>

        {/* MODAL CREATE */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Thêm sản phẩm</h2>

              <input
                placeholder="Tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                placeholder="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                placeholder="Giá"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value === "" ? "" : Number(e.target.value))
                }
              />

              <div className={styles.modalActions}>
                <button onClick={() => setShowModal(false)}>Hủy</button>
                <button onClick={handleCreate} disabled={saving}>
                  {saving ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL EDIT */}
        {showEditModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Sửa sản phẩm</h2>

              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <input
                type="number"
                value={editPrice}
                onChange={(e) =>
                  setEditPrice(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />

              <div className={styles.modalActions}>
                <button onClick={() => setShowEditModal(false)}>Hủy</button>
                <button onClick={handleUpdate} disabled={saving}>
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
