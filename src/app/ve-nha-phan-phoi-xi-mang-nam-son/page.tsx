import type { Metadata } from "next";
import styles from "./page.module.scss";
import HeaderBlog from "@/components/Header/HeaderBlog";
import ContactSection from "@/components/ContactSection/ContactSection";
import Image from "next/image";
import TableOfContents from "@/components/TOC/TableOfContents";
import BackToHome from "@/components/BackToHome/BackToHome";
import ClientGallery from "./ClientGallery";

const images1 = [
  "/chungnhan1.avif",
  "/chungnhan2.avif",
  "/chungnhan3.avif",
  "/chungnhan4.avif",
];
const images2 = [
  "/chungnhan5.avif",
  "/chungnhan6.avif",
  "/chungnhan7.avif",
  "/chungnhan8.avif",
];
const images3 = ["/chungnhan9.avif", "/chungnhan10.avif"];

export const metadata: Metadata = {
  title: "Về Nhà Phân Phối Xi Măng Nam Sơn | Uy Tín – Chất Lượng – Giá Tốt",
  description:
    "Giới thiệu về Nhà Phân Phối Xi Măng Nam Sơn – đơn vị cung cấp xi măng chính hãng Vicem, Fico tại Bình Dương, uy tín và chuyên nghiệp.",
  keywords: [
    "nhà phân phối xi măng",
    "giới thiệu xi măng nam sơn",
    "xi măng bình dương",
    "đại lý xi măng uy tín",
  ],
};

export default function AboutPage() {
  return (
    <div className="layout">
      <HeaderBlog />
      <main className={styles.container}>
        <BackToHome />
        {/* ===== SCHEMA ORGANIZATION ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Nhà Phân Phối Xi Măng Nam Sơn",
              url: "https://namsonjsc.vn",
              logo: "https://namsonjsc.vn/logo.avif",
              description:
                "Nhà phân phối xi măng chính hãng tại Bình Dương, chuyên cung cấp xi măng Vicem, Fico với giá tốt và dịch vụ uy tín.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "830 Đại lộ Bình Dương",
                addressLocality: "Thủ Dầu Một",
                addressRegion: "Bình Dương",
                addressCountry: "VN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+84932687219",
                contactType: "customer service",
              },
              sameAs: [
                "https://www.facebook.com/yourpage",
                "https://zalo.me/yourzalo",
              ],
            }),
          }}
        />

        <article>
          <h1>Về Nhà Phân Phối Xi Măng Nam Sơn</h1>
          <TableOfContents />
          <p>
            <strong>Nhà Phân Phối Xi Măng Nam Sơn</strong> là đơn vị chuyên cung
            cấp các sản phẩm xi măng chất lượng cao tại Bình Dương, phục vụ cho
            công trình dân dụng, công nghiệp và hạ tầng.
          </p>

          <p>
            Với nhiều năm kinh nghiệm trong ngành vật liệu xây dựng, chúng tôi
            tự hào là đối tác phân phối chính thức của các thương hiệu uy tín
            như <strong>Xi măng Vicem</strong> và <strong>Xi măng Fico</strong>.
          </p>
          <ClientGallery images={images1} />

          <h2>Tầm nhìn & Sứ mệnh</h2>
          <ul>
            <li>Cung cấp sản phẩm chất lượng, đúng tiêu chuẩn kỹ thuật</li>
            <li>Đảm bảo giá cả minh bạch, cạnh tranh</li>
            <li>Phục vụ tận tâm – giao hàng nhanh chóng</li>
            <li>Đồng hành cùng sự phát triển của khách hàng</li>
          </ul>
          <ClientGallery images={images2} />
          <h2>Lý do khách hàng tin chọn chúng tôi</h2>
          <ul>
            <li>✔ Hàng chính hãng, có chứng nhận nguồn gốc</li>
            <li>✔ Đội ngũ tư vấn chuyên nghiệp</li>
            <li>✔ Hệ thống kho bãi lớn tại Bình Dương</li>
            <li>✔ Hỗ trợ giao hàng nhanh toàn khu vực</li>
          </ul>

          <p>
            <strong>Nhà Phân Phối Xi Măng Nam Sơn</strong> cam kết mang đến giải
            pháp vật liệu xây dựng hiệu quả – bền vững – tiết kiệm cho mọi công
            trình.
          </p>
          <ClientGallery images={images3} />
        </article>
      </main>
      <ContactSection />
    </div>
  );
}
