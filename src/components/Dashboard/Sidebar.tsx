"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.scss";

export default function Sidebar() {
  const pathname = usePathname();

  const items = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <i className="fa-solid fa-chart-line"></i>,
    },
    {
      href: "/posts",
      label: "Quản lý bài viết",
      icon: <i className="fa-solid fa-pencil"></i>,
    },
    {
      href: "/products",
      label: "Quản lý sản phẩm",
      icon: <i className="fa-solid fa-box-open"></i>,
    },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>Admin Panel</div>
      </div>

      <nav className={styles.nav}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${
              isActive(item.href) ? styles.active : ""
            }`}
          >
            <span className={styles.icon}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

