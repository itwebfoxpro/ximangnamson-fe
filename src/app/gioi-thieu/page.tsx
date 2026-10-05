import type { Metadata } from "next";
import styles from "./page.module.scss";
import HeaderBlog from "@/components/Header/HeaderBlog";
import ContactSection from "@/components/ContactSection/ContactSection";
import TableOfContents from "@/components/TOC/TableOfContents";
import BackToHome from "@/components/BackToHome/BackToHome";
import ClientGallery from "./ClientGallery";

// ===== HÌNH ẢNH CHỨNG NHẬN / HOẠT ĐỘNG =====
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

// ===== METADATA (KHÔNG SEO) =====
const SITE_URL = "https://namsonjsc.vn";
export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Giới thiệu Công ty Cổ phần Nam Sơn (Nam Sơn JSC) – đơn vị phân phối và cung ứng xi măng, vật liệu xây dựng uy tín tại Bình Dương.",

  alternates: {
    canonical: `${SITE_URL}/gioi-thieu`,
  },

  openGraph: {
    type: "website",
    title: "Giới thiệu Công ty Cổ phần Nam Sơn",
    description:
      "Tổng quan về Công ty Cổ phần Nam Sơn – nhà phân phối và cung ứng xi măng, vật liệu xây dựng uy tín tại Bình Dương.",
    url: `${SITE_URL}/gioi-thieu`,
    siteName: "Công ty Cổ phần Nam Sơn",
    locale: "vi_VN",
    images: [
      {
        url: `${SITE_URL}/og-image.avif`,
        width: 1200,
        height: 630,
        alt: "Giới thiệu Công ty Cổ phần Nam Sơn",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Giới thiệu Công ty Cổ phần Nam Sơn",
    description:
      "Công ty Cổ phần Nam Sơn – đơn vị phân phối xi măng và vật liệu xây dựng uy tín tại Bình Dương.",
    images: [`${SITE_URL}/og-image.avif`],
  },
};

export default function AboutPage() {
  return (
    <div className="layout">
      <HeaderBlog />

      <main className={styles.container}>
        <BackToHome />

        {/* ===== SCHEMA ORGANIZATION (TRUST) ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Công ty Cổ phần Nam Sơn",
              alternateName: "Nam Sơn JSC",
              url: "https://namsonjsc.vn",
              logo: "https://namsonjsc.vn/favicon.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+84932687219",
                contactType: "customer service",
              },
            }),
          }}
        />

        <article>
          <h1>Giới thiệu Công ty Cổ phần Nam Sơn</h1>

          <TableOfContents />
          <p>
            Công ty Cổ phần Nam Sơn (Nam Sơn JSC) là nhà phân phối xi măng Vicem
            Hà Tiên lớn nhất tại Bình Dương, đồng thời là đối tác phân phối
            chính thức các thương hiệu xi măng uy tín như Vicem Hà Tiên, FICO
            YTL và SCG. Với hơn 19 năm kinh nghiệm trong lĩnh vực phân phối và
            cung ứng vật liệu xây dựng, Nam Sơn JSC đã và đang là lựa chọn tin
            cậy của hàng nghìn công trình dân dụng, công nghiệp và hạ tầng trên
            toàn khu vực. Uy tín hình thành từ nền tảng bền vững Thành lập từ
            tháng 02/2006, Nam Sơn JSC định hướng phát triển dựa trên uy tín –
            minh bạch – ổn định trong hợp tác. Thay vì mở rộng ồ ạt theo các đơn
            hàng ngắn hạn, công ty tập trung xây dựng năng lực cung ứng bền
            vững, đảm bảo nguồn hàng ổn định, chất lượng đồng đều và tiến độ
            giao hàng chính xác cho từng dự án.
          </p>

          <ClientGallery images={images1} />

          <h2>Lĩnh vực hoạt động</h2>
          <ul>
            <li>Phân phối và cung ứng vật liệu xây dựng cho công trình</li>
            <li>Hỗ trợ giải pháp vật tư theo quy mô và tiến độ dự án</li>
            <li>Tư vấn phương án cung ứng nhằm tối ưu chi phí thi công</li>
          </ul>

          <h2>Năng lực và kinh nghiệm</h2>
          <p>
            Với kinh nghiệm thực tế trong ngành vật liệu xây dựng, Nam Sơn JSC
            đã tham gia cung ứng cho nhiều loại hình công trình khác nhau, từ
            nhà ở dân dụng đến nhà xưởng và dự án hạ tầng. Công ty xây dựng hệ
            thống vận hành linh hoạt, đảm bảo khả năng đáp ứng tiến độ trong
            những giai đoạn thi công cao điểm.
          </p>

          <ClientGallery images={images2} />

          <h2>Giá trị cốt lõi</h2>
          <ul>
            <li>
              <strong>Uy tín:</strong> Cam kết sản phẩm đúng chất lượng, đúng
              nguồn gốc
            </li>
            <li>
              <strong>Minh bạch:</strong> Rõ ràng trong báo giá và quá trình hợp
              tác
            </li>
            <li>
              <strong>Trách nhiệm:</strong> Đồng hành cùng khách hàng trong suốt
              dự án
            </li>
            <li>
              <strong>Bền vững:</strong> Hướng đến quan hệ hợp tác lâu dài
            </li>
          </ul>

          <h2>Cam kết của Công ty Cổ phần Nam Sơn</h2>
          <p>
            Chúng tôi cam kết cung cấp sản phẩm đạt tiêu chuẩn kỹ thuật, đảm bảo
            tiến độ cung ứng theo thỏa thuận và không ngừng nâng cao chất lượng
            dịch vụ nhằm tạo ra giá trị lâu dài cho khách hàng và đối tác.
          </p>

          <ClientGallery images={images3} />
          <h2>Thông tin doanh nghiệp</h2>
          <ul>
            <li>
              <strong>Tên doanh nghiệp:</strong> Công ty Cổ phần Nam Sơn
            </li>
            <li>
              <strong>Tên giao dịch:</strong> Nam Sơn JSC
            </li>
            <li>
              <strong>Lĩnh vực:</strong> Phân phối và cung ứng xi măng
            </li>
            <li>
              <strong>Website:</strong>
              <a href="https://namsonjsc.vn"> https://namsonjsc.vn</a>
            </li>
            <li>
              <strong>Hotline:</strong>
              <a href="tel:0932687219"> 0932.687.219</a>
            </li>
          </ul>
          <p className={styles.auth}>
            <em>Nội dung được biên soạn bởi Nam Sơn JSC.</em>
          </p>
        </article>
      </main>

      <ContactSection />
    </div>
  );
}
