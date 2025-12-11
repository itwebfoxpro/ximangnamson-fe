// components/Dashboard/DashboardSummary.tsx
"use client";

import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.scss";

const API_BASE = "https://api.ximangnamson.com";

type Summary = {
  usersCount: number;
  activeUsers: number;
  recentUsers: Array<any>;
};

export default function DashboardSummary() {
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/dashboard/summary`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message || `Server error ${res.status}`);
        }

        const json = await res.json();
        if (mounted) setData(json);
      } catch (err: any) {
        if (mounted) setError(err.message || "Lỗi khi tải dữ liệu");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className={styles.kpiRow}>Loading summary…</div>;
  if (error) return <div className={styles.error}>Lỗi: {error}</div>;

  return (
    <div className={styles.kpiRow}>
      <div className={styles.kpiCard}>
        <div className={styles.kpiLabel}>Tổng người dùng</div>
        <div className={styles.kpiValue}>{data?.usersCount ?? 0}</div>
      </div>

      <div className={styles.kpiCard}>
        <div className={styles.kpiLabel}>Đang hoạt động</div>
        <div className={styles.kpiValue}>{data?.activeUsers ?? 0}</div>
      </div>

      <div className={styles.recentCard}>
        <div className={styles.kpiLabel}>Người dùng mới</div>
        <ul className={styles.recentList}>
          {data?.recentUsers?.length ? (
            data.recentUsers.map((u: any) => (
              <li key={u.id}>
                <strong>{u.full_name}</strong> — <small>{u.email}</small>
              </li>
            ))
          ) : (
            <li>Chưa có người dùng mới</li>
          )}
        </ul>
      </div>
    </div>
  );
}
