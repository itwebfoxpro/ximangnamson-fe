// src/app/page.tsx

import HeaderBlog from "@/components/Header/HeaderBlog";
import ProductsSection from "@/components/ProductsSection/ProductsSection";
import ContactSection from "@/components/ContactSection/ContactSection";

export default function HomePage() {

  return (
    <main>
      <HeaderBlog />
      <ProductsSection />
      <ContactSection />
    </main>
  );
}
