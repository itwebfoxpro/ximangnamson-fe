"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import styles from "./CartToast.module.scss";

export default function CartToast() {
  const { toastMessage, clearToast } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toastMessage) return;

    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      clearToast();
    }, 2200);

    return () => clearTimeout(timer);
  }, [toastMessage, clearToast]);

  if (!toastMessage || !visible) return null;

  return <div className={styles.toast}>{toastMessage}</div>;
}
