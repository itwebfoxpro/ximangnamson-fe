// app/bao-gia/layout.tsx
import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection/ContactSection";
import HeaderBlog from "@/components/Header/HeaderBlog";

export const metadata: Metadata = {
  title: "Báo giá xi măng mới nhất | Xi măng Bình Dương",
  description:
    "Cập nhật bảng giá xi măng mới nhất hôm nay. Giá xi măng Vicem, Hà Tiên, Fico chính hãng.",
};

export default function PriceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="price-layout">
      <HeaderBlog />
      {children}
      <ContactSection />
    </section>
  );
}
