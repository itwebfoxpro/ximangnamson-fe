"use client";

import { useCart } from "@/contexts/CartContext";
import styles from "./CartMiniSummary.module.scss";

export default function CartMiniSummary() {
  const { items, subtotal } = useCart();

  if (items.length === 0) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.wrapper}>
      <div>
        <span className={styles.label}>Giỏ hàng:</span>
        <span className={styles.value}>
          {totalQuantity} sản phẩm • {subtotal.toLocaleString("vi-VN")}đ
        </span>
      </div>
      <a href="/cart" className={styles.link}>
        Xem chi tiết giỏ hàng
      </a>
    </div>
  );
}
