"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./ChangePasswordModal.module.scss";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.namsonjsc.vn";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ChangePasswordModal({ open, onClose }: Props) {
  const { token, logout } = useAuth();
  const router = useRouter();

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

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
      onClose();
    }
  }

  return (
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

        <div className={styles.actions}>
          <button className={styles.changePass} onClick={onClose}>
            Huỷ
          </button>
          <button
            className={styles.logout}
            onClick={handleChangePassword}
            disabled={saving}
          >
            {saving ? "Đang xử lý..." : "Đổi mật khẩu"}
          </button>
        </div>
      </div>
    </div>
  );
}
