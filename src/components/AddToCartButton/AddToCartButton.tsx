// src/components/AddToCartButton/AddToCartButton.tsx
"use client";

import React from "react";
import { useCart } from "@/contexts/CartContext";

type Props = {
  id: number | string; // có thể nhận cả number hoặc string (an toàn)
  name: string;
  price: number;
  initialQty?: number;
  className?: string;
};

export default function AddToCartButton({
  id,
  name,
  price,
  initialQty = 1,
  className,
}: Props) {
  const { addItem } = useCart();

  const handleAdd = () => {
    // chuyển id sang number nếu cần
    const numericId = typeof id === "number" ? id : Number(id);

    if (Number.isNaN(numericId)) {
      // nếu id không thể chuyển đổi, log và không thêm
      console.error("AddToCartButton: invalid id, cannot add to cart:", id);
      return;
    }

    addItem({
      id: numericId,
      name,
      price,
      quantity: initialQty,
    });
  };

  return (
    <button type="button" className={className} onClick={handleAdd}>
      Thêm vào giỏ
    </button>
  );
}
