// src/components/Header/Header.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import { useIsMobile } from "@/hooks/useIsMobile";
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
  const isMobile = useIsMobile();
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
              <Image
                src={open ? "/icon/close.avif" : "/icon/menu.avif"}
                alt="logo trang chủ"
                width={26}
                height={26}
              />
            </button>

            {open && (
              <div className={styles.mobileDropdown}>
                <a href="/" onClick={() => setOpen(false)}>
                  <Image
                    src="/icon/home.avif"
                    alt="logo trang chủ"
                    width={24}
                    height={24}
                  />
                  <span>Trang chủ</span>
                </a>
                <a
                  href="/ve-nha-phan-phoi-xi-mang-nam-son"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src="/icon/info.avif"
                    alt="logo giới thiệu"
                    width={24}
                    height={24}
                  />
                  <span>Giới thiệu</span>
                </a>
                <a href="/xi-mang-binh-duong" onClick={() => setOpen(false)}>
                  <Image
                    src="/icon/info.avif"
                    alt="logo xi măng bình dương"
                    width={24}
                    height={24}
                  />
                  <span>Xi măng Bình Dương</span>
                </a>
                <a href="/san-pham" onClick={() => setOpen(false)}>
                  <Image
                    src="/icon/box.avif"
                    alt="logo sản phẩm"
                    width={24}
                    height={24}
                  />
                  <span> Sản phẩm</span>
                </a>
                <a href="/bao-gia" onClick={() => setOpen(false)}>
                  <Image
                    src="/icon/list.avif"
                    alt="logo báo giá"
                    width={24}
                    height={24}
                  />
                  <span>Báo giá</span>
                </a>
                <a href="/tin-tuc" onClick={() => setOpen(false)}>
                  <Image
                    src="/icon/newspaper.avif"
                    alt="logo tin tức"
                    width={24}
                    height={24}
                  />
                  <span>Tin tức</span>
                </a>
                <a href="/ho-tro" onClick={() => setOpen(false)}>
                  <Image
                    src="/icon/help.avif"
                    alt="logo hỗ trợ"
                    width={24}
                    height={24}
                  />
                  <span>Hỗ trợ</span>
                </a>
                <a href="tel:0932687219" className={styles.aContact}>
                  Liên hệ: 0932 687 219
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
            href="/ve-nha-phan-phoi-xi-mang-nam-son"
            className={`${styles.navLink} ${
              isActive("/ve-nha-phan-phoi-xi-mang-nam-son")
                ? styles.navActive
                : ""
            }`}
          >
            Giới thiệu
          </a>
          <a
            href="/xi-mang-binh-duong"
            className={`${styles.navLink} ${
              isActive("/xi-mang-binh-duong") ? styles.navActive : ""
            }`}
          >
            Xi măng Bình Dương
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

          <a href="tel:0932687219" className={styles.navLink}>
            <div className={styles.phoneGroup}>
              <div>Liên hệ</div>
              <div>0932 687 219</div>
            </div>
          </a>
        </nav>
      </div>
    </header>
  );
}
