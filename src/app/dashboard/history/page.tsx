"use client";

import { useState, useEffect } from "react";
import { useHistory } from "./useHistory";
import { HistoryTable } from "./HistoryTable";
import HistoryModal from "./HistoryModal";
import { HistoryItem } from "./types";
import styles from "./Page.module.scss";
import { useAuth } from "@/context/AuthContext";
import PieChart from "../pieChart/PaymentPieChart";

export default function DashboardHistoryPage() {
  const {
    items,
    paymentSummary,
    profitByCategory,
    monthlyCategory,
    categories,
    loading,
    error,
    fetchMonthlyCategory,
    fetchProfitByCategory,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    saving,
  } = useHistory();
  const { user, loading: authLoading } = useAuth(); // 👈 lấy user

  useEffect(() => {
    const now = new Date();
    fetchMonthlyCategory(now.getMonth() + 1, now.getFullYear());
    fetchProfitByCategory(now.getMonth() + 1, now.getFullYear());
  }, []);

  // ===== FILTER STATE =====
  const [showFilter, setShowFilter] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterFromDate, setFilterFromDate] = useState("");
  const [filterToDate, setFilterToDate] = useState("");
  const [filterPaid, setFilterPaid] = useState<"" | "paid" | "unpaid">("");
  const [filterQuantity, setFilterQuantity] = useState<number | "">("");
  const isFiltering =
    filterName ||
    filterFromDate ||
    filterToDate ||
    filterQuantity !== "" ||
    filterPaid !== "";


  // ===== MODAL STATE =====
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<HistoryItem | undefined>(
    undefined
  );
  const [showChart, setShowChart] = useState(true);

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

  const handlePaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterPaid(e.target.value as "paid" | "unpaid");
  };

  const filteredItems = items.filter((it) => {
    // Tên khách hàng
    if (
      filterName &&
      !it.user.toLowerCase().includes(filterName.toLowerCase())
    ) {
      return false;
    }

    // Tình trạng thanh toán
    if (filterPaid === "paid" && it.paid !== true) return false;
    if (filterPaid === "unpaid" && it.paid !== false) return false;

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
          <button
            className={styles.filterBtn}
            onClick={() => setShowChart((v) => !v)}
          >
            {showChart ? "Ẩn biểu đồ" : "Hiện biểu đồ"}
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
            <label>Tình trạng thanh toán</label>
            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <label>
                <input
                  type="radio"
                  name="paid"
                  value="paid"
                  checked={filterPaid === "paid"}
                  onChange={handlePaidChange}
                />
                Đã thanh toán
              </label>

              <label>
                <input
                  type="radio"
                  name="paid"
                  value="unpaid"
                  checked={filterPaid === "unpaid"}
                  onChange={handlePaidChange}
                />
                Chưa thanh toán
              </label>
            </div>
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
              setFilterPaid("");
            }}
          >
            Xoá lọc
          </button>
        </div>
      )}
      {showChart && (
        <div className={styles.chartGroup}>
          {paymentSummary && (
            <PieChart
              title="Tình trạng thanh toán"
              labels={["Đã thanh toán", "Chưa thanh toán"]}
              values={[
                paymentSummary.da_thanh_toan,
                paymentSummary.chua_thanh_toan,
              ]}
              total={paymentSummary.tong_cong}
              unit="đ"
            />
          )}
          {monthlyCategory.length > 0 && (
            <PieChart
              title="Cơ cấu xi măng bán trong tháng"
              labels={monthlyCategory.map((i) =>
                i["Category.name"]
                  .replace(/xi măng\s*/i, "")
                  .trim()
                  .toUpperCase(),
              )}
              values={monthlyCategory.map((i) => Number(i.total_quantity))}
              total={monthlyCategory.reduce(
                (s, i) => s + Number(i.total_quantity),
                0,
              )}
              unit=""
            />
          )}
          {profitByCategory.length > 0 && (
            <PieChart
              title="Cơ cấu lợi nhuận theo danh mục"
              labels={profitByCategory.map((i) =>
                i["Category.name"].replace(/xi măng\s*/i, "").toUpperCase(),
              )}
              values={profitByCategory.map((i) => Number(i.profit))}
              total={profitByCategory.reduce((s, i) => s + Number(i.profit), 0)}
              unit="đ"
            />
          )}
        </div>
      )}

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
