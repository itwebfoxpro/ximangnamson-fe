"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./BottomBar.module.scss";
import { useAuth } from "@/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.namsonjsc.vn";

export default function BottomBar() {
  const { logout, token } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/api/notes-unread-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUnreadCount(data.total || 0))
      .catch(() => {});
  }, [token]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  async function handleLogout() {
    logout();
    router.replace("/account");
  }

  async function handleChangePassword() {
    if (!oldPass || !newPass) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (newPass !== confirmPass) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`${API_BASE}/api/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: oldPass,
          newPassword: newPass,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Đổi mật khẩu thất bại");

      alert("Đổi mật khẩu thành công. Vui lòng đăng nhập lại.");
      logout();
      router.replace("/account");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
      setShowChangePass(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        className={styles.fab}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open menu"
      >
        <i className="fa-solid fa-bars"></i>
        {unreadCount > 0 && (
          <span className={styles.badgeFloat}>{unreadCount}</span>
        )}
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}

      {open && (
        <nav className={styles.popup}>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`${styles.item} ${
              isActive("/") ? styles.active : ""
            }`}
          >
            <i className="fa-solid fa-home"></i>
            <span>Home</span>
          </Link>
          <Link
            href="/notification"
            onClick={() => setOpen(false)}
            className={`${styles.item} ${
              isActive("/notification") ? styles.active : ""
            }`}
          >
            <i className="fa-solid fa-bell"></i>
            <span>Thông báo</span>

            {unreadCount > 0 && (
              <span className={styles.badgeMenu}>{unreadCount}</span>
            )}
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className={`${styles.item} ${
              isActive("/dashboard") ? styles.active : ""
            }`}
          >
            <i className="fa-solid fa-chart-line"></i>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/category"
            onClick={() => setOpen(false)}
            className={`${styles.item} ${
              isActive("/category") ? styles.active : ""
            }`}
          >
            <i className="fa-solid fa-box-open"></i>
            <span>Sản phẩm</span>
          </Link>
          {/* ===== CHANGE PASSWORD =====*/}

          <button
            className={`${styles.item} ${styles.changePass}`}
            onClick={() => {
              setOpen(false);
              setShowChangePass(true);
            }}
          >
            <i className="fa-solid fa-key"></i>
            <span>Đổi mật khẩu</span>
          </button>

          <button
            className={`${styles.item} ${styles.logout}`}
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Thoát</span>
          </button>
        </nav>
      )}

      {/* ===== CHANGE PASSWORD MODAL ===== */}
      {showChangePass && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>Đổi mật khẩu</h3>

            {error && <div className={styles.error}>{error}</div>}

            <input
              type="password"
              placeholder="Mật khẩu hiện tại"
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />

            <div className={styles.modalActions}>
              <button onClick={() => setShowChangePass(false)}>Huỷ</button>
              <button onClick={handleChangePassword} disabled={saving}>
                {saving ? "Đang xử lý..." : "Đổi mật khẩu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
