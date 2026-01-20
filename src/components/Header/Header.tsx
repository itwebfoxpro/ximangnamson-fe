// src/components/Header/Header.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface HeaderProps {
  activeSection: "products" | "about";
  onChangeSection: (section: "products" | "about") => void;
}

export default function Header({
  activeSection,
  onChangeSection,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* ===== MOBILE ACTIVE (mặc định Products) ===== */
  const [mobileActive, setMobileActive] = useState<"products" | "about">(
    "products"
  );
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  /* ===== Sync active khi mở menu ===== */
  useEffect(() => {
    if (open) {
      setMobileActive(activeSection);
    }
  }, [open, activeSection]);

  /* ===== Click outside ===== */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleChangeSection = (section: "products" | "about") => {
    setMobileActive(section);
    onChangeSection(section);
    setOpen(false);
  };

  const toggleMenu = () => {
    setMobileActive(activeSection);
    setOpen((v) => !v);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* BRAND */}
        <div className={styles.brand}>
          <a href="/" className={styles.logo}>
            <Image
              src="/icon-88.avif"
              alt="logo xi măng Nam Sơn"
              width={44}
              height={44}
              priority
            />
          </a>
          <div>
            <div className={styles.brandTextMain}>
              nhà phân phối xi măng nam sơn
            </div>
            <div className={styles.brandTextSub}>
              Vững bền cùng công trình Việt
            </div>
          </div>
        </div>
        <nav className={styles.navmb}>
          <div className={styles.mobileMenu} ref={dropdownRef}>
            <button
              className={`${styles.hamburger} ${
                open ? styles.hamburgerActive : styles.hamburgerDeactive
              }`}
              onClick={toggleMenu}
            >
              <i className={`fa-solid ${open ? "fa-close" : "fa-bars"}`}></i>
            </button>

            {open && (
              <div className={styles.mobileDropdown}>
                <a href="/" onClick={() => setOpen(false)}>
                  <i className="fa-solid fa-house"></i>
                  <span>Trang chủ</span>
                </a>
                <a
                  href="/gioi-thieu"
                  onClick={() => setOpen(false)}
                >
                  <i className="fa-solid fa-id-card"></i>
                  <span>Giới thiệu</span>
                </a>
                <a href="/nang-luc" onClick={() => setOpen(false)}>
                  <i className="fa-solid fa-brain"></i>
                  <span>Năng lực</span>
                </a>
                <a href="/du-an" onClick={() => setOpen(false)}>
                  <i className="fa-solid fa-city"></i>
                  <span>Dự án</span>
                </a>
                <a href="/san-pham" onClick={() => setOpen(false)}>
                  <i className="fa-solid fa-dolly"></i>
                  <span>Sản phẩm</span>
                </a>
                <a href="/bao-gia" onClick={() => setOpen(false)}>
                  <i className="fa-solid fa-clipboard-list"></i>
                  <span>Báo giá</span>
                </a>
                <a href="/tin-tuc" onClick={() => setOpen(false)}>
                  <i className="fa-solid fa-newspaper"></i>
                  <span>Tin tức</span>
                </a>
                <a href="/ho-tro" onClick={() => setOpen(false)}>
                  <i className="fa-solid fa-person-circle-question"></i>
                  <span>Hỗ trợ</span>
                </a>
              </div>
            )}
          </div>
        </nav>
        <nav className={styles.navpc}>
          <a
            href="/"
            className={`${styles.navLink} ${
              isActive("/") ? styles.navActive : ""
            }`}
          >
            Trang chủ
          </a>

          <a
            href="/gioi-thieu"
            className={`${styles.navLink} ${
              isActive("/gioi-thieu")
                ? styles.navActive
                : ""
            }`}
          >
            Giới thiệu
          </a>
          <a
            href="/nang-luc"
            className={`${styles.navLink} ${
              isActive("/nang-luc") ? styles.navActive : ""
            }`}
          >
            Năng lực
          </a>
          <a
            href="/du-an"
            className={`${styles.navLink} ${
              isActive("/du-an") ? styles.navActive : ""
            }`}
          >
            Dự án
          </a>
          <a
            href="/san-pham"
            className={`${styles.navLink} ${
              isActive("/san-pham") ? styles.navActive : ""
            }`}
          >
            Sản phẩm
          </a>

          <a
            href="/bao-gia"
            className={`${styles.navLink} ${
              isActive("/bao-gia") ? styles.navActive : ""
            }`}
          >
            Báo giá
          </a>

          <a
            href="/tin-tuc"
            className={`${styles.navLink} ${
              isActive("/tin-tuc") ? styles.navActive : ""
            }`}
          >
            Tin tức
          </a>

          <a
            href="/ho-tro"
            className={`${styles.navLink} ${
              isActive("/ho-tro") ? styles.navActive : ""
            }`}
          >
            Hỗ trợ
          </a>
        </nav>
      </div>
    </header>
  );
}
