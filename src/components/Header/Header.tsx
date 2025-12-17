"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import { useIsMobile } from "@/hooks/useIsMobile";

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
          <div className={styles.logo}><img src="/logo.jpg" alt="" /></div>
          <div>
            <div className={styles.brandTextMain}>
              nhà phân phối xi măng nam sơn
            </div>
            <div className={styles.brandTextSub}>
              Vững bền cùng công trình Việt
            </div>
          </div>
        </div>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <nav className={styles.nav}>
            <button
              className={`${styles.navLink} ${
                activeSection === "about" ? styles.navActive : ""
              }`}
              onClick={() => onChangeSection("about")}
            >
              <i className="fa-solid fa-lightbulb" />
              Giới thiệu
            </button>

            <button
              className={`${styles.navLink} ${
                activeSection === "products" ? styles.navActive : ""
              }`}
              onClick={() => onChangeSection("products")}
            >
              <i className="fa-solid fa-basket-shopping" />
              Sản phẩm nổi bật
            </button>

            <a href="#projects" className={styles.navLink}>
              <i className="fa-solid fa-city" />
              Công trình
            </a>

            <a href="tel:0932687219" className={styles.navLink}>
              <div className={styles.phoneGroup}>
                <div>
                  <i className="fa-solid fa-phone" /> Liên hệ
                </div>
                <div>0932.687.219</div>
              </div>
            </a>
          </nav>
        )}

        {/* MOBILE MENU */}
        {isMobile && (
          <div className={styles.mobileMenu} ref={dropdownRef}>
            <button
              className={`${styles.hamburger} ${
                open ? styles.hamburgerActive : styles.hamburgerDeactive
              }`}
              onClick={toggleMenu}
            >
              <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`} />
            </button>

            {open && (
              <div className={styles.mobileDropdown}>
                <a
                  href="#about"
                  className={
                    mobileActive === "about" ? styles.mobileActive : ""
                  }
                  onClick={() => handleChangeSection("about")}
                >
                  Giới thiệu
                </a>

                <a
                  href="#products"
                  className={
                    mobileActive === "products" ? styles.mobileActive : ""
                  }
                  onClick={() => handleChangeSection("products")}
                >
                  Sản phẩm nổi bật
                </a>

                <a href="#projects" onClick={() => setOpen(false)}>
                  Công trình
                </a>

                <a
                  className={styles.aContact}
                  href="tel:0932687219"
                  onClick={() => setOpen(false)}
                >
                  Liên hệ: 0932.687.219
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
