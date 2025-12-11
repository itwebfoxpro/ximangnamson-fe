"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";

export default function Header() {
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
            <div className={styles.brandTextMain}>XI MĂNG NAM SƠN</div>
            <div className={styles.brandTextSub}>
              Vững bền cùng công trình Việt
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className={styles.nav}>
          <a href="#about" className={styles.navLink}>
            <i className="fa-solid fa-lightbulb"></i>Giới thiệu
          </a>
          <a href="#products" className={styles.navLink}>
            <i className="fa-solid fa-basket-shopping"></i>Sản phẩm nổi bật
          </a>
          <a href="#projects" className={styles.navLink}>
            <i className="fa-solid fa-city"></i>Công trình
          </a>
          <a href="#contact" className={styles.navLink}>
            <i className="fa-solid fa-phone"></i>Liên hệ
          </a>

          {/* CART DROPDOWN */}
          <div className={styles.cartWrapper} ref={dropdownRef}>
            <button
              className={styles.cartBtn}
              onClick={() => setOpen((p) => !p)}
            >
              <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
              {totalQty > 0 && (
                <span className={styles.cartBadge}>{totalQty}</span>
              )}
            </button>

            <div
              className={`${styles.cartDropdown} ${
                open ? styles.open : styles.closed
              }`}
            >
              {items.length === 0 ? (
                <div className={styles.empty}>Giỏ hàng trống</div>
              ) : (
                <>
                  <div className={styles.cartList}>
                    {items.slice(0, 3).map((item) => (
                      <div key={item.id} className={styles.cartItem}>
                        <div className={styles.itemName}>{item.name}</div>
                        <div className={styles.itemMeta}>
                          x{item.quantity} –{" "}
                          {(item.price * item.quantity).toLocaleString("vi-VN")}
                          đ
                        </div>
                      </div>
                    ))}

                    {items.length > 3 && (
                      <div className={styles.more}>
                        + {items.length - 3} sản phẩm khác...
                      </div>
                    )}
                  </div>

                  <div className={styles.cartFooter}>
                    <div className={styles.subtotal}>
                      Tạm tính: {subtotal.toLocaleString("vi-VN")}đ
                    </div>
                    <Link href="/cart" className={styles.viewCartBtn}>
                      Xem giỏ hàng
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
