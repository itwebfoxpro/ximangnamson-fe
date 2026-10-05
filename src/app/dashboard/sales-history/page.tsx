"use client";

import { useEffect, useState } from "react";
import { useHistory } from "../history/useHistory";
import { HistoryTable } from "../history/HistoryTable";
import styles from "../history/Page.module.scss";

export default function SalesHistoryPage() {
  const { items, loading, error, fetchPeriod } = useHistory();
  const now = new Date();
  const [period, setPeriod] = useState<"month" | "quarter" | "year">("month");
  const [year, setYear] = useState(now.getFullYear());
  const [value, setValue] = useState(now.getMonth() + 1);

  useEffect(() => {
    fetchPeriod(period, year, period === "year" ? undefined : value);
  }, [period, year, value]);

  if (loading) return <div>Đang tải lịch sử bán hàng…</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div><h2>Lịch sử bán hàng</h2><p className={styles.subtitle}>Tra cứu record trực tiếp từ cơ sở dữ liệu theo thời gian</p></div>
      </div>
      <div className={styles.periodBar}>
        <strong>Thời gian</strong>
        <select value={period} onChange={(e) => {
          const p = e.target.value as "month" | "quarter" | "year";
          setPeriod(p);
          setValue(p === "quarter" ? Math.floor(now.getMonth() / 3) + 1 : now.getMonth() + 1);
        }}>
          <option value="month">Tháng</option><option value="quarter">Quý</option><option value="year">Năm</option>
        </select>
        {period === "month" && <select value={value} onChange={(e) => setValue(Number(e.target.value))}>{Array.from({length:12},(_,i)=><option key={i+1} value={i+1}>Tháng {i+1}</option>)}</select>}
        {period === "quarter" && <select value={value} onChange={(e) => setValue(Number(e.target.value))}>{[1,2,3,4].map(q=><option key={q} value={q}>Quý {q}</option>)}</select>}
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>{Array.from({length:7},(_,i)=>now.getFullYear()-i).map(y=><option key={y} value={y}>{y}</option>)}</select>
        <span>{items.length} record</span>
      </div>
      <HistoryTable items={items} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
