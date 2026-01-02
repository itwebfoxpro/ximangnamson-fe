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
        <h1 className={styles.heroTitle}>
          Nhà Phân Phối Xi Măng Nam Sơn – Công ty cổ phần Nam Sơn
        </h1>
        <div className={styles.newsBackround}>
          <p className={styles.heroDesc}>
            <strong>Công ty cổ phần Nam Sơn</strong> là nhà phân phối xi măng Bình Dương uy tín,
            chuyên cung cấp xi măng Vicem Hà Tiên, Fico-YLT chính hãng với giá
            rẻ, giao hàng nhanh cho công trình dân dụng và công nghiệp...
             Nam Sơn là
          </p>
        </div>
        <Hero />
      </section>
      <FeatureGrid items={items} columns={4} />
      {activeSection === "products" && <ProductsSection />}
      {activeSection === "about" && (
        <AboutSection onBack={() => setActiveSection("products")} />
      )}
      {/* <PostList posts={posts} /> */}
      <PostList
        posts={posts.filter((post) => post.slug !== "xi-mang-binh-duong")}
      />
      <PaymentMethods />
      <PartnersSection />
      <ContactSection />
      <GoogleMap />
    </div>
  );
}
