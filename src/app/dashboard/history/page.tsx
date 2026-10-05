"use client";

import { useState, useEffect } from "react";
import { useHistory } from "./useHistory";
import { HistoryTable } from "./HistoryTable";
import HistoryModal from "./HistoryModal";
import { HistoryItem } from "./types";
import styles from "./Page.module.scss";
import { useAuth } from "@/context/AuthContext";
import PieChart from "../pieChart/PaymentPieChart";

const money = (value: number) => `${Number(value || 0).toLocaleString("vi-VN")}₫`;

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
    fetchPeriod,
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
  const now = new Date();
  const [period, setPeriod] = useState<"month" | "quarter" | "year">("month");
  const [periodYear, setPeriodYear] = useState(now.getFullYear());
  const [periodValue, setPeriodValue] = useState(now.getMonth() + 1);
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


  useEffect(() => {
    fetchPeriod(period, periodYear, period === "year" ? undefined : periodValue);
  }, [period, periodYear, periodValue]);

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

  const totalRevenue = items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 0), 0);
  const paidRevenue = items.filter((it) => it.paid).reduce((sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 0), 0);
  const debt = totalRevenue - paidRevenue;
  const totalProfit = items.reduce((sum, it) => sum + (Number(it.price || 0) - Number(it.ori_price || 0)) * Number(it.quantity || 0), 0);

  // =====================
  // RENDER
  // =====================
  if (loading) return <div>Đang tải lịch sử bán hàng…</div>;
  if (error) return <div className={styles.error}>Lỗi: {error}</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div>
          <h2>Lịch sử bán hàng - {user?.username}</h2>
          <p className={styles.subtitle}>Tổng quan hoạt động bán hàng</p>
        </div>

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
      <div className={styles.periodBar}>
        <strong>Thống kê theo</strong>
        <select value={period} onChange={(e) => {
          const next = e.target.value as "month" | "quarter" | "year";
          setPeriod(next);
          setPeriodValue(next === "quarter" ? Math.floor(now.getMonth() / 3) + 1 : now.getMonth() + 1);
        }}>
          <option value="month">Tháng</option>
          <option value="quarter">Quý</option>
          <option value="year">Năm</option>
        </select>
        {period === "month" && <select value={periodValue} onChange={(e) => setPeriodValue(Number(e.target.value))}>{Array.from({length: 12}, (_, i) => <option key={i+1} value={i+1}>Tháng {i+1}</option>)}</select>}
        {period === "quarter" && <select value={periodValue} onChange={(e) => setPeriodValue(Number(e.target.value))}>{[1,2,3,4].map(q => <option key={q} value={q}>Quý {q}</option>)}</select>}
        <select value={periodYear} onChange={(e) => setPeriodYear(Number(e.target.value))}>{Array.from({length: 7}, (_, i) => now.getFullYear() - i).map(y => <option key={y} value={y}>{y}</option>)}</select>
      </div>

      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}><span>Tổng doanh thu</span><strong>{money(totalRevenue)}</strong><small>Tổng giá trị đơn hàng</small></div>
        <div className={styles.kpiCard}><span>Đã thanh toán</span><strong>{money(paidRevenue)}</strong><small>{totalRevenue ? Math.round((paidRevenue / totalRevenue) * 100) : 0}% doanh thu</small></div>
        <div className={styles.kpiCard}><span>Công nợ</span><strong>{money(debt)}</strong><small>Giá trị chưa thanh toán</small></div>
        <div className={styles.kpiCard}><span>Lợi nhuận dự kiến</span><strong>{money(totalProfit)}</strong><small>{items.length} đơn hàng</small></div>
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
