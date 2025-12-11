// components/Dashboard/UsersTable.tsx
"use client";

import React, { useEffect, useState } from "react";
import styles from "./usersTable.module.scss";
import Pagination from "./Pagination";

const API_BASE = "https://api.ximangnamson.com";

type UserRow = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: number;
  created_at?: string;
};

export default function UsersTable() {
  const [rows, setRows] = useState<UserRow[]>([]);
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [q, setQ] = useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          ...(q ? { q } : {}),
        });
        const res = await fetch(
          `${API_BASE}/api/dashboard/users?${params.toString()}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message || `Server ${res.status}`);
        }

        const json = await res.json();
        if (!mounted) return;
        setRows(json.data || []);
        setMeta(json.meta || { page, limit, total: 0, pages: 0 });
      } catch (err: any) {
        if (mounted) setError(err.message || "Lỗi tải danh sách người dùng");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchUsers();
    return () => {
      mounted = false;
    };
  }, [page, limit, q]);

  function onPageChange(nextPage: number) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableControls}>
        <input
          placeholder="Tìm kiếm email hoặc tên..."
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <div className={styles.loading}>Đang tải...</div>
      ) : error ? (
        <div className={styles.error}>Lỗi: {error}</div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 20 }}>
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.full_name}</td>
                    <td>{r.email}</td>
                    <td>{r.role}</td>
                    <td>{r.is_active ? "Active" : "Inactive"}</td>
                    <td>
                      {r.created_at
                        ? new Date(r.created_at).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <Pagination
            page={meta.page}
            pages={meta.pages}
            onChange={onPageChange}
          />
        </>
      )}
    </div>
  );
}
