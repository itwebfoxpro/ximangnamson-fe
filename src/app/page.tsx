// src/app/page.tsx
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProductsSection from "@/components/ProductsSection/ProductsSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import ZaloBubble from "@/components/ZaloBubble/ZaloBubble";
import RelatedPosts from "@/components/RelatedPosts/RelatedPosts";
import { sampleRelatedPosts } from "@/data/posts";
import FeatureGrid, {FeatureItem } from "@/components/Feature/Feature";

const items: FeatureItem[] = [
  {
    id: 1,
    title: "UY TÍN THƯƠNG HIỆU",
    description: "Hơn 20 năm xây dựng và phát triển",
    icon: <i className="fa-solid  fa-medal"></i>,
  },
  {
    id: 2,
    title: "CHẤT LƯỢNG ĐẢM BẢO",
    description: "Sản phẩm đạt tiêu chuẩn",
    icon: <i className="fa-solid fa-award"></i>,
  },
  {
    id: 3,
    title: "GIÁ CẢ TỐT NHẤT",
    description: "Chính sách giá cạnh tranh",
    icon: <i className="fa-solid fa-dollar-sign"></i>,
  },
  {
    id: 4,
    title: "CUNG ỨNG NHANH CHÓNG",
    description: "An toàn trong thi công",
    icon: <i className="fa-solid fa-bolt-lightning"></i>,
  },
];

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <FeatureGrid items={items} columns={4} />
      <ProductsSection />
      <AboutSection />
      <RelatedPosts posts={sampleRelatedPosts} />
      <ContactSection />
    </main>
  );
}
