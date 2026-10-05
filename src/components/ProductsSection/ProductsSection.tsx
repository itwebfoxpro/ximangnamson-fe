"use client";

import React from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { products as allProducts } from "@/data/products";
import styles from "./ProductsSection.module.scss";
import SideMenu from "./SideMenu";

export default function ProductsSection() {
  // prepare the 7 menu items (id + name)
  const sideItems = [
    { id: 1, name: "XM VICEM HÀ TIÊN PCB40" },
    { id: 2, name: "XM VICEM HÀ TIÊN XÂY TÔ" },
    { id: 3, name: "XM HÀ TIÊN 2 PCB40" },
    { id: 4, name: "XM POWER CEMENT" },
    { id: 5, name: "XM HÀ TIÊN ĐA DỤNG" },
    { id: 6, name: "XM BÌNH DƯƠNG" },
    { id: 7, name: "XM STARMAX" },
    // { id: 8, name: "XM HÀ TIÊN MĐ" },
  ];

  // active filter id (null = tất cả)
  // const [filterId, setFilterId] = React.useState<number | null>(null);
  const [filterId, setFilterId] = React.useState<number | null>(null);


  // filter products array based on selected id (match by id)
  const products = React.useMemo(() => {
    if (!filterId) return allProducts;
    return allProducts.filter((p) => p.id === filterId);
  }, [filterId]);

  return (
    <section id="products" className={styles.section}>
      <div className={styles.sectionTitle}>
        <h2>Sản phẩm nổi bật</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.side}>
          <SideMenu
            items={sideItems}
            activeId={filterId}
            onSelect={(id) => setFilterId(id as number | null)}
          />
        </div>

        <div className={styles.main}>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
