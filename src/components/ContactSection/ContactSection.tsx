"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ContactSection.module.scss";

const API_BASE = "https://api.namsonjsc.vn"; // đổi nếu cần, hoặc leave as-is

export default function ContactSection() {
  // modal state + form state (hooks luôn ở top)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const modalRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  // open modal and focus first input
  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 50);
      // prevent body scroll while modal open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // click outside to close & esc to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onDocClick(e: MouseEvent) {
      if (!modalRef.current) return;
      if (!modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onDocClick);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [open]);

  const validatePhone = (v: string) => {
    // đơn giản: cho phép số, dấu + và khoảng trắng, tối thiểu 7 ký tự
    const cleaned = v.replace(/[\s()-]/g, "");
    return /^[+0-9]{7,15}$/.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim()) {
      setErrorMsg("Vui lòng nhập họ tên.");
      return;
    }
    if (!phone.trim() || !validatePhone(phone.trim())) {
      setErrorMsg("Vui lòng nhập số điện thoại hợp lệ.");
      return;
    }
    if (!address.trim()) {
      setErrorMsg("Vui lòng nhập địa chỉ.");
      return;
    }

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      // thêm fields khác nếu cần
    };

    setLoading(true);
    try {
      // Nếu bạn không dùng backend, comment phần fetch — vẫn sẽ hiển thị success local
      const res = await fetch(`${API_BASE}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // lấy message nếu server trả về json
        const json = await res.json().catch(() => null);
        const msg =
          (json && (json.message || json.error)) ||
          `Server trả về lỗi ${res.status}`;
        throw new Error(msg);
      }

      setSuccessMsg("Gửi yêu cầu thành công. Chúng tôi sẽ liên hệ sớm nhất.");
      // optionally clear form
      setName("");
      setPhone("");
      setAddress("");
      // auto close modal after short delay
      setTimeout(() => setOpen(false), 1200);
    } catch (err: any) {
      console.error("Contact submit error:", err);
      setErrorMsg(err?.message || "Không thể gửi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <h3 className={styles.footerTitle}>CÔNG TY CỔ PHẦN NAM SƠN</h3>
          <p className={styles.footerText}>Mã số thuế: 3700688651</p>
          <p className={styles.footerText}>
            Địa chỉ: Số 830 Đại lộ Bình Dương, Khu 6, Phường Phú Lợi, Tp Hồ Chí
            Minh, Việt Nam.
          </p>
          <p className={styles.footerText}>
            Hotline: <span className={styles.sdt}>0932.687.219</span> - Huỳnh
            Kim Anh
          </p>
          <p className={styles.footerText}>Email: nppximangnamson@gmail.com</p>
        </div>
        <div>
          <button
            className={styles.openBtn}
            type="button"
            onClick={() => {
              setErrorMsg(null);
              setSuccessMsg(null);
              setOpen(true);
            }}
          >
            Đăng ký tư vấn / báo giá
          </button>

          {successMsg && <div className={styles.success}>{successMsg}</div>}
        </div>
      </div>

      {/* Modal */}
      {/* Modal overlay covers screen; modalRef on inner panel to detect outside clicks */}
      {open && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalCard} ref={modalRef}>
            <div className={styles.modalHeader}>
              <h4>Đăng ký tư vấn / báo giá</h4>
              <button
                className={styles.modalClose}
                onClick={() => setOpen(false)}
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            <form className={styles.modalBody} onSubmit={handleSubmit}>
              {errorMsg && <div className={styles.formError}>{errorMsg}</div>}

              <label className={styles.field}>
                <span className={styles.label}>Họ &amp; tên</span>
                <input
                  ref={firstInputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  type="text"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Số điện thoại</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0909123456"
                  type="tel"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Địa chỉ</span>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Số nhà, đường, quận, tỉnh"
                  type="text"
                  required
                />
              </label>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setOpen(false)}
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? "Đang gửi..." : "Gửi yêu cầu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
