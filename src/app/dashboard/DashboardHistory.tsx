"use client";

import React, { useEffect, useState } from "react";
import styles from "./history.module.scss";

type HistoryItem = {
  id: number;
  user: string;
  quantity: number;
  price: number;
  paid: boolean;
  address: string;
  createdAt: string;
  updatedAt: string;
  Category?: {
    id: number;
    name: string;
  };
};

type Category = {
  id: number;
  name: string;
};

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE || "https://api.ximangnamson.com"
).replace(/\/+$/, "");

export default function DashboardHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ===== MODAL STATE =====
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [user, setUser] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [paid, setPaid] = useState(false);
  const [address, setAddress] = useState("");

  // ===== EDIT MODAL =====
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [editUser, setEditUser] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | "">("");
  const [editQuantity, setEditQuantity] = useState<number | "">("");
  const [editPrice, setEditPrice] = useState<number | "">("");
  const [editPaid, setEditPaid] = useState(false);
  const [editAddress, setEditAddress] = useState("");

  function openEditModal(it: HistoryItem) {
    setEditingId(it.id);
    setEditUser(it.user);
    setEditCategoryId(it.Category?.id || "");
    setEditQuantity(it.quantity);
    setEditPrice(Number(it.price));
    setEditPaid(it.paid);
    setEditAddress(it.address || "");
    setShowEditModal(true);
  }

  async function handleUpdate() {
    if (
      !editingId ||
      !editUser ||
      !editCategoryId ||
      editQuantity === "" ||
      editQuantity <= 0 ||
      editPrice === "" ||
      editPrice <= 0
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/dashboard/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: editUser,
          category_id: editCategoryId,
          quantity: editQuantity,
          price: editPrice,
          paid: editPaid,
          address: editAddress,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Cập nhật thất bại");
      }

      setShowEditModal(false);
      setEditingId(null);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }
  
  async function handleDelete(id: number) {
    if (!confirm("Bạn có chắc muốn xoá bản ghi này?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/dashboard/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Xoá thất bại");
      }

      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  }
  
  // =====================
  // FETCH DATA
  // =====================
  async function fetchData() {
    setLoading(true);
    try {
      const [hisRes, catRes] = await Promise.all([
        fetch(`${API_BASE}/api/dashboard`),
        fetch(`${API_BASE}/api/categories`),
      ]);

      if (!hisRes.ok) throw new Error("Không thể tải lịch sử");
      if (!catRes.ok) throw new Error("Không thể tải danh mục");

      const hisJson = await hisRes.json();
      const catJson = await catRes.json();

      setItems(Array.isArray(hisJson) ? hisJson : hisJson.data ?? []);
      setCategories(Array.isArray(catJson) ? catJson : catJson.data ?? []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // =====================
  // CREATE DASHBOARD RECORD
  // =====================
  async function handleCreate() {
    if (
      !user ||
      !categoryId ||
      quantity === "" ||
      quantity <= 0 ||
      price === "" ||
      price <= 0
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/dashboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          category_id: categoryId,
          quantity,
          price,
          paid,
          address,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Tạo bản ghi thất bại");
      }

      // reset
      setShowModal(false);
      setUser("");
      setCategoryId("");
      setQuantity(1);
      setPrice(0);
      setPaid(false);
      setAddress("");

      fetchData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  function formatVnd(n: number) {
    return n.toLocaleString("vi-VN") + "₫";
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleString("vi-VN");
  }

  if (loading) return <div>Đang tải lịch sử bán hàng…</div>;
  if (error) return <div className={styles.error}>Lỗi: {error}</div>;

  return (
    <div>
      {/* HEADER */}
      <div className={styles.headerRow}>
        <h2>Lịch sử bán hàng</h2>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          + Thêm bản ghi
        </button>
      </div>

      {items.length === 0 ? (
        <div>Chưa có giao dịch bán hàng nào</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>SL</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Địa chỉ</th>
              <th>Ngày tạo</th>
              <th>Ngày sửa</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.user}</td>
                <td>{it.Category?.name || "-"}</td>
                <td>{it.quantity}</td>
                <td className={styles.price}>{formatVnd(Number(it.price))}</td>
                <td>
                  {it.paid ? (
                    <span className={styles.paid}>Đã thanh toán</span>
                  ) : (
                    <span className={styles.unpaid}>Chưa thanh toán</span>
                  )}
                </td>
                <td>{it.address}</td>
                <td>{formatDate(it.createdAt)}</td>
                <td>{formatDate(it.updatedAt)}</td>
                <td>
                  <div className={styles.groupBtn}>
                    <button
                      className={styles.fixBtn}
                      onClick={() => openEditModal(it)}
                    >
                      Sửa
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(it.id)}
                    >
                      Xoá
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ===== MODAL CREATE ===== */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Thêm bản ghi bán hàng</h3>

            <div className={styles.formGroup}>
              <label>Khách hàng</label>
              <input value={user} onChange={(e) => setUser(e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label>Sản phẩm</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
              >
                <option value="">-- Chọn sản phẩm --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Số lượng</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Tổng tiền</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Địa chỉ</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className={styles.formGroupCheckbox}>
              <input
                type="checkbox"
                checked={paid}
                onChange={(e) => setPaid(e.target.checked)}
              />
              <span>Đã thanh toán</span>
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
            <h3>Sửa bản ghi bán hàng</h3>

            <div className={styles.formGroup}>
              <label>Khách hàng</label>
              <input
                value={editUser}
                onChange={(e) => setEditUser(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Sản phẩm</label>
              <select
                value={editCategoryId}
                onChange={(e) => setEditCategoryId(Number(e.target.value))}
              >
                <option value="">-- Chọn sản phẩm --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Số lượng</label>
              <input
                type="number"
                value={editQuantity}
                onChange={(e) =>
                  setEditQuantity(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label>Tổng tiền</label>
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

            <div className={styles.formGroup}>
              <label>Địa chỉ</label>
              <input
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
              />
            </div>

            <div className={styles.formGroupCheckbox}>
              <input
                type="checkbox"
                checked={editPaid}
                onChange={(e) => setEditPaid(e.target.checked)}
              />
              <span>Đã thanh toán</span>
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
    </div>
  );
}
