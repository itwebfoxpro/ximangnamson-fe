"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./sidebar.module.scss";
import { useAuth } from "@/context/AuthContext";
import ChangePasswordModal from "@/components/ChangePasswordModal/ChangePasswordModal";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const [showChangePass, setShowChangePass] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  function handleLogout() {
    logout();
    router.replace("/account");
  }

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.logo}>Admin Panel</div>
        </div>

        <nav className={styles.nav}>
          <Link
            href="/dashboard"
            className={`${styles.navItem} ${
              isActive("/dashboard") ? styles.active : ""
            }`}
          >
            <i className="fa-solid fa-chart-line"></i>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/category"
            className={`${styles.navItem} ${
              isActive("/category") ? styles.active : ""
            }`}
          >
            <i className="fa-solid fa-box-open"></i>
            <span>Quản lý sản phẩm</span>
          </Link>

          {/* ===== CHANGE PASSWORD ===== */}
          <button
            className={`${styles.navItem} ${styles.changePass}`}
            onClick={() => setShowChangePass(true)}
          >
            <i className="fa-solid fa-key"></i>
            <span>Đổi mật khẩu</span>
          </button>

          {/* ===== LOGOUT ===== */}
          <button
            className={`${styles.navItem} ${styles.logout}`}
            onClick={handleLogout}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Thoát</span>
          </button>
        </nav>
      </aside>

      <ChangePasswordModal
        open={showChangePass}
        onClose={() => setShowChangePass(false)}
      />
    </>
  );
}
