"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProductsSection from "@/components/ProductsSection/ProductsSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import RelatedPosts from "@/components/RelatedPosts/RelatedPosts";
import { sampleRelatedPosts } from "@/data/posts";
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
    icon: <i className="fa-solid fa-medal" />,
  },
  {
    id: 2,
    title: "CHẤT LƯỢNG ĐẢM BẢO",
    description: "Sản phẩm đạt tiêu chuẩn",
    icon: <i className="fa-solid fa-award" />,
  },
  {
    id: 3,
    title: "GIÁ CẢ TỐT NHẤT",
    description: "Chính sách giá cạnh tranh",
    icon: <i className="fa-solid fa-dollar-sign" />,
  },
  {
    id: 4,
    title: "CUNG ỨNG NHANH CHÓNG",
    description: "An toàn trong thi công",
    icon: <i className="fa-solid fa-bolt-lightning" />,
  },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section>("products");

  return (
    <main>
      <Header
        activeSection={activeSection}
        onChangeSection={setActiveSection}
      />
      <ChatBubbleGroup zaloPhone="0932687219" />
      <Hero />
      <FeatureGrid items={items} columns={4} />
      {activeSection === "products" && <ProductsSection />}
      {activeSection === "about" && (
        <AboutSection onBack={() => setActiveSection("products")} />
      )}

      <RelatedPosts posts={sampleRelatedPosts} />
      <PaymentMethods />
      <PartnersSection />
      <ContactSection />
      <GoogleMap />
    </main>
  );
}
