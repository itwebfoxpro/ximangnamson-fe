"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import styles from "./cart.module.scss";

type ConfirmState =
  | { type: "item"; id: number; name: string }
  | { type: "all" }
  | null;

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [confirm, setConfirm] = useState<ConfirmState>(null);

  const handleConfirm = () => {
    if (!confirm) return;

    if (confirm.type === "item") {
      // confirm.id is number (type-safe)
      removeItem(confirm.id);
    } else if (confirm.type === "all") {
      clearCart();
    }
    setConfirm(null);
  };

  if (items.length === 0) {
    return (
      <div className={styles.cartWrapper}>
        <h1 className={styles.title}>Giỏ hàng</h1>
        <div className={styles.empty}>Giỏ hàng hiện đang trống</div>
      </div>
    );
  }

  return (
    <div className={styles.cartWrapper}>
      <h1 className={styles.title}>Giỏ hàng</h1>

      <div className={styles.cartList}>
        {items.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              {item.name}
              <span className={styles.price}>
                - {item.price.toLocaleString("vi-VN")}đ
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                className={styles.quantityInput}
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value) || 1)
                }
              />

              <span className={styles.itemTotal}>
                = {(item.price * item.quantity).toLocaleString("vi-VN")}đ
              </span>

              <button
                className={styles.removeButton}
                onClick={() =>
                  setConfirm({
                    type: "item",
                    id: item.id, // item.id is number
                    name: item.name,
                  })
                }
              >
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        Tạm tính: {subtotal.toLocaleString("vi-VN")}đ
      </div>

      <button
        className={styles.clearButton}
        onClick={() => setConfirm({ type: "all" })}
      >
        Xoá toàn bộ giỏ
      </button>

      <ConfirmModal
        open={!!confirm}
        title={
          confirm?.type === "all"
            ? "Xoá toàn bộ giỏ hàng?"
            : `Xoá "${(confirm as any)?.name}" khỏi giỏ?`
        }
        message={
          confirm?.type === "all"
            ? "Hành động này sẽ xoá tất cả sản phẩm trong giỏ hàng."
            : "Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?"
        }
        confirmText="Xoá"
        cancelText="Huỷ"
        onConfirm={handleConfirm}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}
