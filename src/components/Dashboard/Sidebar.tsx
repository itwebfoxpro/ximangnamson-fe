"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.scss";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>Admin Panel</div>
      </div>

      <nav className={styles.nav}>
        {/* Dashboard */}
        <Link
          href="/dashboard"
          className={`${styles.navItem} ${
            isActive("/dashboard") ? styles.active : ""
          }`}
        >
          <span className={styles.icon}>
            <i className="fa-solid fa-chart-line"></i>
          </span>
          <span>Dashboard</span>
        </Link>

        {/* Posts - parent */}
        <Link
        href="/posts"
          className={`${styles.navItem} ${
            isActive("/posts") ? styles.active : ""
          }`}
        >
          <span className={styles.icon}>
            <i className="fa-solid fa-pencil"></i>
          </span>
          <span>Quản lý bài viết</span>
        </Link>

        {/* Products */}
        <Link
          href="/category"
          className={`${styles.navItem} ${
            isActive("/category") ? styles.active : ""
          }`}
        >
          <span className={styles.icon}>
            <i className="fa-solid fa-box-open"></i>
          </span>
          <span>Quản lý sản phẩm</span>
        </Link>
      </nav>
    </aside>
  );
}
