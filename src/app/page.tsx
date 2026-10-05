// src/app/page.tsx
"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProductsSection from "@/components/ProductsSection/ProductsSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import PostList from "@/components/PostList/PostList";
import { posts } from "@/data/posts";
import FeatureGrid, { FeatureItem } from "@/components/Feature/Feature";
import PaymentMethods from "@/components/PaymentMethods/PaymentMethods";
import PartnersSection from "@/components/PartnersSection/PartnersSection";
import GoogleMap from "@/components/MapsDirection/GoogleMap";
import ChatBubbleGroup from "@/components/GroupBubble/ChatBubbleGroup";
import styles from "./page.module.scss";
import Link from "next/link"

type Section = "products" | "about";

/* Feature items */
const items: FeatureItem[] = [
  {
    id: 1,
    title: "UY TÍN THƯƠNG HIỆU",
    description: "Hơn 20 năm xây dựng và phát triển",
    icon: "/icon/trophy.avif",
  },
  {
    id: 2,
    title: "CHẤT LƯỢNG ĐẢM BẢO",
    description: "Sản phẩm đạt tiêu chuẩn",
    icon: "/icon/reward.avif",
  },
  {
    id: 3,
    title: "GIÁ CẢ TỐT NHẤT",
    description: "Chính sách giá cạnh tranh",
    icon: "/icon/money.avif",
  },
  {
    id: 4,
    title: "CUNG ỨNG NHANH CHÓNG",
    description: "An toàn trong thi công",
    icon: "/icon/lightning.avif",
  },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section>("products");

  return (
    <div>
      <Header
        activeSection={activeSection}
        onChangeSection={setActiveSection}
      />
      <ChatBubbleGroup zaloPhone="0932687219" />
      <section className={styles.hero}>
        <h1>Công ty cổ phần Nam Sơn</h1>
        <h2>
          Nhà phân phối chính thức xi măng Vicem Hà Tiên, Fico YTL, SCG tại Bình
          Dương
        </h2>

        <Link href="/san-pham">
          <Hero />
        </Link>
      </section>
      <div className={styles.newsBackround}>
        <span className={styles.iconDesc}>🔊</span>

        <p className={styles.heroDesc}>
          🚛<strong>Công ty Cổ phần Nam Sơn</strong> là nhà phân phối{" "}
          <span className={styles.colorRed}>xi măng Bình Dương</span> uy tín,
          chuyên cung cấp{" "}
          <span className={styles.colorRed}>
            xi măng Vicem Hà Tiên, Fico-YTL
          </span>{" "}
          chính hãng với giá rẻ, giao hàng nhanh cho công trình dân dụng, công
          nghiệp và hạ tầng🚛
        </p>
      </div>
      <FeatureGrid items={items} columns={4} />
      {activeSection === "products" && <ProductsSection />}
      <PostList posts={posts} />
      <PaymentMethods />
      <PartnersSection />
      <ContactSection />
      <GoogleMap />
    </div>
  );
}
