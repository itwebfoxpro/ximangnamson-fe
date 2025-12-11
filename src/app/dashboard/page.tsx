// app/dashboard/page.tsx
"use client";

import React from "react";
import DashboardSummary from "./DashboardSummary";
import UsersTable from "../../components/Dashboard/UsersTable";
import Sidebar from "@/components/Dashboard/Sidebar";
import Link from "next/link";
import styles from "./page.module.scss";

export default function DashboardPage() {
  return (
    <div className={styles.layout}>
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Nội dung Dashboard */}
      <main className={styles.container}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <p className={styles.subtitle}>
            Tổng quan hệ thống & quản lý người dùng
          </p>

          {/* Link sang trang bài viết */}
          <Link href="/posts" className={styles.linkToPosts}>
            🔗 Đi đến trang bài viết
          </Link>
        </header>

        <section className={styles.summarySection}>
          <DashboardSummary />
        </section>

        <section className={styles.tableSection}>
          <h2>Người dùng</h2>
          <UsersTable />
        </section>
      </main>
    </div>
  );
}
