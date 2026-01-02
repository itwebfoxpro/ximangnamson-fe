"use client";

import { useState } from "react";
import { useHistory } from "./useHistory";
import { HistoryTable } from "./HistoryTable";
import HistoryModal from "./HistoryModal";
import { HistoryItem } from "./types";
import styles from "./Page.module.scss";
import { useAuth } from "@/context/AuthContext";

export default function DashboardHistoryPage() {
  const {
    items,
    categories,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    saving,
  } = useHistory();
  const { user, loading: authLoading } = useAuth(); // 👈 lấy user

  // ===== FILTER STATE =====
  const [showFilter, setShowFilter] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterFromDate, setFilterFromDate] = useState("");
  const [filterToDate, setFilterToDate] = useState("");
  const [filterQuantity, setFilterQuantity] = useState<number | "">("");
  const isFiltering =
    filterName || filterFromDate || filterToDate || filterQuantity !== "";


  // ===== MODAL STATE =====
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<HistoryItem | undefined>(
    undefined
  );

  // =====================
  // HANDLERS
  // =====================
  function openCreate() {
    setEditingItem(undefined);
    setShowModal(true);
  }

  function openEdit(item: HistoryItem) {
    setEditingItem(item);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingItem(undefined);
  }

  async function handleSubmit(data: any) {
    if (editingItem) {
      await updateItem(editingItem.id, data);
    } else {
      await createItem(data);
    }
    closeModal();
    fetchData();
  }

  const filteredItems = items.filter((it) => {
    // Tên khách hàng
    if (
      filterName &&
      !it.user.toLowerCase().includes(filterName.toLowerCase())
    ) {
      return false;
    }

    // Số lượng
    if (filterQuantity !== "" && it.quantity < Number(filterQuantity)) {
      return false;
    }

    // Ngày tạo
    if (filterFromDate) {
      const from = new Date(filterFromDate).setHours(0, 0, 0, 0);
      if (new Date(it.createdAt).getTime() < from) return false;
    }

    if (filterToDate) {
      const to = new Date(filterToDate).setHours(23, 59, 59, 999);
      if (new Date(it.createdAt).getTime() > to) return false;
    }

    return true;
  });

  const displayItems = isFiltering ? filteredItems : items;

  // =====================
  // RENDER
  // =====================
  if (loading) return <div>Đang tải lịch sử bán hàng…</div>;
  if (error) return <div className={styles.error}>Lỗi: {error}</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h2>Lịch sử bán hàng - {user?.username}</h2>

        <div className={styles.headerActions}>
          <button
            className={styles.filterBtn}
            onClick={() => setShowFilter((v) => !v)}
          >
            <i className="fa-solid fa-magnifying-glass"></i> Bộ lọc
          </button>

          <button className={styles.addBtn} onClick={openCreate}>
            + Thêm bản ghi
          </button>
        </div>
      </div>
      {isFiltering && (
        <div style={{ fontSize: 13, marginBottom: 8 }}>
          Kết quả lọc: <b>{filteredItems.length}</b> bản ghi
        </div>
      )}
      {showFilter && (
        <div className={styles.filterBox}>
          <div>
            <label>Tên khách hàng</label>
            <input
              placeholder="Nhập tên..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>

          <div>
            <label>Từ ngày</label>
            <input
              type="date"
              value={filterFromDate}
              onChange={(e) => setFilterFromDate(e.target.value)}
            />
          </div>

          <div>
            <label>Đến ngày</label>
            <input
              type="date"
              value={filterToDate}
              onChange={(e) => setFilterToDate(e.target.value)}
            />
          </div>

          <div>
            <label>Số lượng ≥</label>
            <input
              type="number"
              value={filterQuantity}
              onChange={(e) =>
                setFilterQuantity(e.target.value ? Number(e.target.value) : "")
              }
            />
          </div>

          <button
            className={styles.clearBtn}
            onClick={() => {
              setFilterName("");
              setFilterFromDate("");
              setFilterToDate("");
              setFilterQuantity("");
            }}
          >
            Xoá lọc
          </button>
        </div>
      )}

      {/* <HistoryTable
        items={items}
        onEdit={openEdit}
        onDelete={async (id) => {
          if (!confirm("Bạn có chắc muốn xoá bản ghi này?")) return;
          await deleteItem(id);
          fetchData();
        }}
      /> */}
      <HistoryTable
        items={displayItems}
        onEdit={openEdit}
        onDelete={async (id) => {
          if (!confirm("Bạn có chắc muốn xoá bản ghi này?")) return;
          await deleteItem(id);
          fetchData();
        }}
      />

      <HistoryModal
        open={showModal}
        initialData={editingItem}
        categories={categories}
        saving={saving}
        onCancel={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
