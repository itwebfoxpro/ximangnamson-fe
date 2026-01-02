"use client";

import { useEffect, useState } from "react";
import styles from "./HistoryModal.module.scss";
import { Category, HistoryItem } from "./types";

type FormData = {
  user: string;
  category_id: number;
  quantity: number;
  price: number;
  paid: boolean;
  address: string;
  note?: string;
};

type Props = {
  open: boolean;
  initialData?: HistoryItem;
  categories: Category[];
  saving: boolean;
  onCancel: () => void;
  onSubmit: (data: FormData) => void;
};

export default function HistoryModal({
  open,
  initialData,
  categories,
  saving,
  onCancel,
  onSubmit,
}: Props) {
  /* =====================
     LOCAL STATE (FORM)
  ===================== */
  const [user, setUser] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [paid, setPaid] = useState(false);
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  /* =====================
     FILL DATA WHEN EDIT
  ===================== */
  useEffect(() => {
    if (!initialData) {
      // CREATE MODE
      setUser("");
      setCategoryId("");
      setQuantity(1);
      setPrice(0);
      setPaid(false);
      setAddress("");
      setNote("");
      return;
    }

    // EDIT MODE
    setUser(initialData.user);
    setCategoryId(initialData.Category?.id ?? "");
    setQuantity(initialData.quantity);
    setPrice(initialData.price);
    setPaid(initialData.paid);
    setAddress(initialData.address);
    setNote(initialData.note || "");
  }, [initialData]);

  if (!open) return null;

  /* =====================
     SUBMIT
  ===================== */
  function handleSubmit() {
    if (!user || !categoryId || quantity <= 0 || price <= 0) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    onSubmit({
      user,
      category_id: Number(categoryId),
      quantity,
      price,
      paid,
      address,
      note,
    });
  }

  /* =====================
     RENDER
  ===================== */
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{initialData ? "Sửa bản ghi" : "Thêm bản ghi"}</h3>

        <label>Khách hàng</label>
        <input value={user} onChange={(e) => setUser(e.target.value)} />

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

        <label>Số lượng</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <label>Giá (1 đơn vị)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label>Địa chỉ</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Ghi chú</label>
        <input value={note} onChange={(e) => setNote(e.target.value)} />

        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={paid}
            onChange={(e) => setPaid(e.target.checked)}
          />{" "}
          Đã thanh toán
        </label>

        <div className={styles.modalActions}>
          <button onClick={onCancel} disabled={saving}>
            Huỷ
          </button>
          <button onClick={handleSubmit} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
