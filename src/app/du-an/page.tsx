import type { Metadata } from "next";
import styles from "./page.module.scss";
import HeaderBlog from "@/components/Header/HeaderBlog";
import ContactSection from "@/components/ContactSection/ContactSection";
import TableOfContents from "@/components/TOC/TableOfContents";
import BackToHome from "@/components/BackToHome/BackToHome";
import Image from "next/image";

// ===== METADATA (KHÔNG SEO) =====
const SITE_URL = "https://namsonjsc.vn";
export const metadata: Metadata = {
  title: "Dự án tiêu biểu",
  description:
    "Tổng hợp các dự án tiêu biểu mà Công ty Cổ phần Nam Sơn đã tham gia cung ứng xi măng và vật liệu xây dựng cho công trình dân dụng, công nghiệp và hạ tầng.",
  alternates: {
    canonical: `${SITE_URL}/du-an`,
  },
  openGraph: {
    title: "Dự án tiêu biểu của Công ty Cổ phần Nam Sơn",
    description:
      "Các dự án tiêu biểu do Công ty Cổ phần Nam Sơn cung ứng xi măng và vật liệu xây dựng cho công trình dân dụng, công nghiệp và hạ tầng.",
    url: `${SITE_URL}/du-an`,
    siteName: "Công ty Cổ phần Nam Sơn",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.avif`,
        width: 1200,
        height: 630,
        alt: "Dự án tiêu biểu Công ty Cổ phần Nam Sơn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dự án tiêu biểu | Công ty Cổ phần Nam Sơn",
    description:
      "Danh sách các dự án tiêu biểu mà Công ty Cổ phần Nam Sơn đã tham gia cung ứng vật liệu xây dựng.",
    images: ["https://namsonjsc.vn/og-image.avif"],
  },
};


export default function ProjectPage() {
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
            }),
          }}
        />

        <article>
          <h1>Dự án tiêu biểu của Công ty Cổ phần Nam Sơn</h1>

          <TableOfContents />

          <p>
            Trong quá trình hoạt động, Công ty Cổ phần Nam Sơn (viết tắt là Nam Sơn JSC) đã
            tham gia cung ứng vật liệu xây dựng cho nhiều loại hình công trình
            khác nhau. Các dự án dưới đây thể hiện kinh nghiệm thực tế và khả
            năng phối hợp của công ty trong quá trình triển khai.
          </p>

          <h2 id="du-an-dan-dung">Dự án dân dụng</h2>
          <p>
            Các dự án được triển khai theo từng giai đoạn trong quá trình hoạt
            động của Công ty Cổ phần Nam Sơn, phù hợp với yêu cầu thực tế của từng công
            trình.
          </p>
          <p>
            Công ty Cổ phần Nam Sơn tham gia cung ứng vật liệu cho các công trình nhà ở dân
            dụng và khu dân cư, đảm bảo tiến độ giao hàng và sự ổn định trong
            suốt quá trình thi công.
          </p>
          <Image
            src="/du-an-1.avif"
            alt="Dự án dân dụng do Cổ phần Nam Sơn cung ứng vật liệu"
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />

          <h2 id="du-an-cong-nghiep">Dự án công nghiệp</h2>
          <p>
            Đối với các dự án nhà xưởng và công trình công nghiệp, Công ty Cổ phần Nam Sơn
            tập trung vào việc đáp ứng yêu cầu tiến độ và phối hợp chặt chẽ với
            các đơn vị thi công nhằm hạn chế ảnh hưởng đến kế hoạch tổng thể của
            dự án.
          </p>
          <Image
            src="/du-an-2.avif"
            alt="Dự án công nghiệp do Công ty Cổ phần Nam Sơn tham gia cung ứng"
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />

          <h2 id="du-an-ha-tang">Dự án hạ tầng</h2>
          <p>
            Nam Sơn JSC đã tham gia cung ứng vật liệu cho một số hạng mục hạ
            tầng theo từng giai đoạn thi công, ưu tiên sự an toàn, ổn định và
            tuân thủ các yêu cầu kỹ thuật của dự án.
          </p>
          <Image
            src="/du-an-3.avif"
            alt="Dự án hạ tầng Cổ phần Nam Sơn triển khai theo giai đoạn"
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />

          <h2 id="cam-ket-du-an">Cam kết trong triển khai dự án</h2>
          <p>
            Chúng tôi cam kết phối hợp chặt chẽ với khách hàng và đối tác
            trong suốt quá trình triển khai dự án, đảm bảo cung ứng vật liệu
            đúng tiêu chuẩn, đúng tiến độ và phù hợp với kế hoạch thi công đã
            thống nhất.
          </p>

          <p className={styles.auth}>
            <em>Nội dung được biên soạn bởi Nam Sơn JSC.</em>
          </p>
        </article>
      </main>

      <ContactSection />
    </div>
  );
}
