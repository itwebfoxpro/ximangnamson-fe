// src/app/page.tsx
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProductsSection from "@/components/ProductsSection/ProductsSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import ZaloBubble from "@/components/ZaloBubble/ZaloBubble";
import RelatedPosts from "@/components/RelatedPosts/RelatedPosts";
import { sampleRelatedPosts } from "@/data/posts";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutSection />
      <ProductsSection />
      <RelatedPosts posts={sampleRelatedPosts} />
      <ContactSection />
    </main>
  );
}
