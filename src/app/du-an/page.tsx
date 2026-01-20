import type { Metadata } from "next";
import styles from "./page.module.scss";
import HeaderBlog from "@/components/Header/HeaderBlog";
import ContactSection from "@/components/ContactSection/ContactSection";
import TableOfContents from "@/components/TOC/TableOfContents";
import BackToHome from "@/components/BackToHome/BackToHome";
import Image from "next/image";

// ===== METADATA (KHÔNG SEO) =====
export const metadata: Metadata = {
  title: "Dự án tiêu biểu của Nam Sơn JSC",
  description:
    "Giới thiệu một số dự án tiêu biểu mà Công ty Cổ phần Nam Sơn (Nam Sơn JSC) đã tham gia cung ứng vật liệu xây dựng.",
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
          <h1>Dự án tiêu biểu của Nam Sơn JSC</h1>

          <TableOfContents />

          <p>
            Trong quá trình hoạt động, Công ty Cổ phần Nam Sơn (Nam Sơn JSC) đã
            tham gia cung ứng vật liệu xây dựng cho nhiều loại hình công trình
            khác nhau. Các dự án dưới đây thể hiện kinh nghiệm thực tế và khả
            năng phối hợp của công ty trong quá trình triển khai.
          </p>

          <h2 id="du-an-dan-dung">Dự án dân dụng</h2>
          <p>
            Các dự án được triển khai theo từng giai đoạn trong quá trình hoạt
            động của Nam Sơn JSC, phù hợp với yêu cầu thực tế của từng công
            trình.
          </p>
          <p>
            Nam Sơn JSC tham gia cung ứng vật liệu cho các công trình nhà ở dân
            dụng và khu dân cư, đảm bảo tiến độ giao hàng và sự ổn định trong
            suốt quá trình thi công.
          </p>
          <Image
            src="/du-an-1.avif"
            alt="Dự án dân dụng Nam Sơn JSC cung ứng vật liệu"
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />

          <h2 id="du-an-cong-nghiep">Dự án công nghiệp</h2>
          <p>
            Đối với các dự án nhà xưởng và công trình công nghiệp, Nam Sơn JSC
            tập trung vào việc đáp ứng yêu cầu tiến độ và phối hợp chặt chẽ với
            các đơn vị thi công nhằm hạn chế ảnh hưởng đến kế hoạch tổng thể của
            dự án.
          </p>
          <Image
            src="/du-an-2.avif"
            alt="Dự án công nghiệp Nam Sơn JSC tham gia cung ứng"
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
            alt="Dự án hạ tầng Nam Sơn JSC triển khai theo giai đoạn"
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />

          <h2 id="cam-ket-du-an">Cam kết trong triển khai dự án</h2>
          <p>
            Nam Sơn JSC cam kết phối hợp chặt chẽ với khách hàng và đối tác
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
