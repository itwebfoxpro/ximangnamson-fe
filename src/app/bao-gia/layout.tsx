// app/bao-gia/layout.tsx
import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection/ContactSection";
import HeaderBlog from "@/components/Header/HeaderBlog";

const SITE_URL = "https://namsonjsc.vn";
export const metadata: Metadata = {
  title: "Báo giá xi măng mới nhất tại Bình Dương",
  description:
    "Cập nhật bảng giá xi măng Vicem Hà Tiên, Hà Tiên 2, Fico, Starmax mới nhất hôm nay tại Bình Dương. Giao hàng nhanh – giá tốt.",
  alternates: {
    canonical: `${SITE_URL}/bao-gia`,
  },
  openGraph: {
    title: "Báo giá xi măng mới nhất tại Bình Dương | Nam Sơn",
    description:
      "Xem bảng giá xi măng Vicem, Hà Tiên, Fico chính hãng mới nhất hôm nay tại Bình Dương.",
    url: `${SITE_URL}/bao-gia`,
    siteName: "Công ty Cổ phần Nam Sơn",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.avif`,
        width: 1200,
        height: 630,
        alt: "Báo giá xi măng tại Bình Dương",
      },
    ],
  },
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
