"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  activeSection: "products" | "about";
  onChangeSection: (section: "products" | "about") => void;
}

export default function Header({
  activeSection,
  onChangeSection,
}: HeaderProps) {
  const { items, subtotal } = useCart();
  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Click-outside đóng dropdown
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

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* BRAND */}
        <div className={styles.brand}>
          <div className={styles.logo}>NS</div>
          <div>
            <div className={styles.brandTextMain}>
              nhà phân phối xi măng nam sơn
            </div>
            <div className={styles.brandTextSub}>
              Vững bền cùng công trình Việt
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className={styles.nav}>
          <button
            className={`${styles.navLink} ${
              activeSection === "about" ? styles.active : ""
            }`}
            onClick={() => onChangeSection("about")}
          >
            <i className="fa-solid fa-lightbulb"></i>
            Giới thiệu
          </button>

          <button
            className={`${styles.navLink} ${
              activeSection === "products" ? styles.active : ""
            }`}
            onClick={() => onChangeSection("products")}
          >
            <i className="fa-solid fa-basket-shopping"></i>
            Sản phẩm nổi bật
          </button>

          <a href="#projects" className={styles.navLink}>
            <i className="fa-solid fa-city"></i>Công trình
          </a>

          <a href="#contact" className={styles.navLink}>
            <div className={styles.phoneGroup}>
              <div>
                <i className="fa-solid fa-phone"></i>Liên hệ
              </div>
              <div>0932.687.219</div>
            </div>
          </a>
        </nav>
      </div>
    </header>
  );
}
