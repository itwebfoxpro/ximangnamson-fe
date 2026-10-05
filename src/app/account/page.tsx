// src/app/account/page.tsx
"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./account.module.scss";
import { useAuth } from "@/context/AuthContext";

type Mode = "login" | "register";

const API_BASE = "https://api.namsonjsc.vn";

export default function AccountPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { user, login } = useAuth();

  // ⛔ Đã đăng nhập → không được vào /account
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  // Trong lúc redirect → không render form
  if (user) return null;

  const switchMode = (newMode: Mode) => {
    if (mode === newMode) return;
    setError(null);
    setMode(newMode);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {};

    if (mode === "login") {
      payload.username = String(formData.get("username") ?? "");
      payload.password = String(formData.get("password") ?? "");
    } else {
      payload.full_name = String(formData.get("full_name") ?? "");
      payload.email = String(formData.get("email") ?? "");
      payload.password = String(formData.get("password") ?? "");
      payload.confirmPassword = String(formData.get("confirmPassword") ?? "");
    }

    const endpoint =
      mode === "login"
        ? `${API_BASE}/api/auth/login`
        : `${API_BASE}/api/auth/register`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      // Sai email / mật khẩu
      if (res.status === 401) {
        setError("Tài khoản hoặc mật khẩu không đúng.");
        return;
      }

      // Validation lỗi
      if (res.status === 400 || res.status === 422) {
        if (data?.message) {
          setError(String(data.message));
        } else if (data?.errors) {
          const errs =
            typeof data.errors === "string"
              ? data.errors
              : Object.values(data.errors).flat().join(" ");
          setError(errs || "Dữ liệu không hợp lệ.");
        } else {
          setError("Dữ liệu không hợp lệ.");
        }
        return;
      }

      if (!res.ok) {
        setError(data?.message || `Server trả về lỗi ${res.status}`);
        return;
      }

      // ===== THÀNH CÔNG =====
      if (data?.token && data?.user) {
        login({ token: data.token, user: data.user });
        router.replace("/dashboard");
        return;
      }

      // Trường hợp đăng ký cần verify email
      if (mode === "register") {
        router.replace("/welcome");
        return;
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Không thể kết nối tới server. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.backdrop} />

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            {/* <div className={styles.brandSmall}>XI MĂNG NAM SƠN</div> */}
            <h2 className={styles.title}>
              {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
            </h2>
            {/* <p className={styles.subtitle}>
              {mode === "login"
                ? "Đăng nhập để quản lý đơn hàng, báo giá và thông tin tài khoản."
                : "Đăng ký tài khoản để nhận báo giá, lưu giỏ hàng và nhận thông tin mới nhất."}
            </p> */}
          </div>

          {/* <div className={styles.modeToggle}>
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`${styles.modeButton} ${
                mode === "login" ? styles.modeButtonActive : ""
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`${styles.modeButton} ${
                mode === "register" ? styles.modeButtonActive : ""
              }`}
            >
              Đăng ký
            </button>
          </div> */}
        </div>

        {error && (
          <div style={{ color: "#ff6b6b", marginBottom: 12, fontSize: 14 }}>
            {error}
          </div>
        )}

        <div className={styles.formWrapper}>
          {/* REGISTER */}
          <div
            className={`${styles.formPanel} ${styles.registerPanel} ${
              mode === "register" ? styles.isActive : styles.isHidden
            }`}
          >
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label>Họ và tên</label>
                <input name="full_name" disabled={loading} required />
              </div>

              <div className={styles.field}>
                <label>Email</label>
                <input type="email" name="email" disabled={loading} required />
              </div>

              <div className={styles.field}>
                <label>Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  disabled={loading}
                  required
                  minLength={6}
                />
              </div>

              <div className={styles.field}>
                <label>Nhập lại mật khẩu</label>
                <input
                  type="password"
                  name="confirmPassword"
                  disabled={loading}
                  required
                />
              </div>

              <button className={styles.submitButton} disabled={loading}>
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </form>
          </div>

          {/* LOGIN */}
          <div
            className={`${styles.formPanel} ${styles.loginPanel} ${
              mode === "login" ? styles.isActive : styles.isHidden
            }`}
          >
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label>Tên đăng nhập</label>
                <input
                  type="text"
                  name="username"
                  disabled={loading}
                  required
                  autoComplete="username"
                />
              </div>

              <div className={styles.field}>
                <label>Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  disabled={loading}
                  required
                  minLength={6}
                />
              </div>

              <button className={styles.submitButton} disabled={loading}>
                {loading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
