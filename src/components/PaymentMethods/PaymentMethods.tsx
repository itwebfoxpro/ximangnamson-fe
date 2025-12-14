"use client";

import { useState } from "react";
import styles from "./PaymentMethods.module.scss";

export type PaymentMethod = "cod" | "bank" | "momo" | "zalo";

interface PaymentMethodsProps {
  value?: PaymentMethod;
  onChange?: (method: PaymentMethod) => void;
}

const METHODS = [
  {
    id: "cod",
    title: "Thanh toán khi nhận hàng",
    desc: "Trả tiền mặt cho nhân viên giao hàng",
    icon: "fa-solid fa-truck",
  },
  {
    id: "bank",
    title: "Chuyển khoản ngân hàng",
    desc: "Chuyển khoản qua Internet Banking",
    icon: "fa-solid fa-building-columns",
  },
  {
    id: "momo",
    title: "Ví MoMo",
    desc: "Thanh toán nhanh qua MoMo",
    icon: "fa-solid fa-wallet",
  },
  {
    id: "zalo",
    title: "ZaloPay",
    desc: "Thanh toán qua ZaloPay",
    icon: "fa-solid fa-qrcode",
  },
];

export default function PaymentMethods({
  value,
  onChange,
}: PaymentMethodsProps) {
  const [selected, setSelected] = useState<PaymentMethod>(value || "cod");

  function handleSelect(id: PaymentMethod) {
    setSelected(id);
    onChange?.(id);
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Phương thức thanh toán</h2>

      <div className={styles.list}>
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`${styles.item} ${
              selected === m.id ? styles.active : ""
            }`}
            onClick={() => handleSelect(m.id as PaymentMethod)}
          >
            <i className={m.icon}></i>

            <div className={styles.content}>
              <span className={styles.itemTitle}>{m.title}</span>
              <span className={styles.desc}>{m.desc}</span>
            </div>

            <span className={styles.radio}>
              {selected === m.id && <i className="fa-solid fa-check"></i>}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
