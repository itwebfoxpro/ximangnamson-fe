import type { Metadata } from "next";
import styles from "./page.module.scss";
import HeaderBlog from "@/components/Header/HeaderBlog";
import ContactSection from "@/components/ContactSection/ContactSection";
import TableOfContents from "@/components/TOC/TableOfContents";
import BackToHome from "@/components/BackToHome/BackToHome";
import ClientGallery from "./ClientGallery";
import Image from "next/image";

// ===== HÌNH ẢNH NĂNG LỰC / VẬN HÀNH =====
const images1 = ["/nangluc1.avif", "/nangluc2.avif"];
const images2 = ["/nangluc3.avif", "/nangluc4.avif"];

// ===== METADATA (KHÔNG SEO) =====
export const metadata: Metadata = {
  title: "Năng lực cung ứng của Nam Sơn JSC",
  description:
    "Giới thiệu năng lực cung ứng, hệ thống vận hành và khả năng đáp ứng dự án của Công ty Cổ phần Nam Sơn (Nam Sơn JSC).",
};

export default function CapacityPage() {
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
          <h1>Năng lực cung ứng của Nam Sơn JSC</h1>

          <TableOfContents />

          <p>
            Năng lực cung ứng là yếu tố cốt lõi trong hoạt động của Công ty Cổ
            phần Nam Sơn (Nam Sơn JSC). Chúng tôi xây dựng hệ thống vận hành tập
            trung vào tính ổn định, khả năng đáp ứng tiến độ và sự minh bạch
            trong quá trình hợp tác với khách hàng và đối tác.
          </p>

          <p>
            Thay vì mở rộng thiếu kiểm soát, Nam Sơn JSC chú trọng đầu tư vào
            quy trình, nhân sự và hệ thống hậu cần nhằm đảm bảo khả năng cung
            ứng bền vững cho các công trình dân dụng, công nghiệp và hạ tầng.
          </p>

          <ClientGallery images={images1} />

          <h2 id="quy-mo-cung-ung">Quy mô và phạm vi cung ứng</h2>
          <p>
            Nam Sơn JSC có khả năng cung ứng vật liệu xây dựng cho nhiều loại
            hình công trình với quy mô khác nhau, từ công trình dân dụng đến nhà
            xưởng và dự án hạ tầng. Hoạt động cung ứng được tổ chức linh hoạt
            theo từng giai đoạn thi công, giúp khách hàng chủ động về tiến độ và
            chi phí.
          </p>

          <h2 id="he-thong-van-hanh">Hệ thống vận hành</h2>
          <p>
            Công ty xây dựng hệ thống vận hành đồng bộ, bao gồm tiếp nhận nhu
            cầu, chuẩn bị nguồn hàng, tổ chức giao nhận và theo dõi tiến độ thực
            tế. Mỗi khâu đều được kiểm soát nhằm giảm thiểu rủi ro và đảm bảo sự
            nhất quán trong chất lượng cung ứng.
          </p>

          <ClientGallery images={images2} />

          <h2 id="nhan-su-va-quan-ly">Nhân sự và quản lý</h2>
          <p>
            Đội ngũ nhân sự của Nam Sơn JSC được đào tạo và phân công theo từng
            mảng công việc cụ thể, từ tư vấn giải pháp vật tư đến điều phối giao
            nhận. Công tác quản lý tập trung vào tính rõ ràng, trách nhiệm và
            khả năng phối hợp giữa các bộ phận.
          </p>

          <h2 id="kha-nang-dap-ung-du-an">Khả năng đáp ứng dự án</h2>
          <p>
            Với kinh nghiệm thực tế trong quá trình cung ứng, Nam Sơn JSC có khả
            năng đáp ứng các dự án yêu cầu tiến độ gấp hoặc triển khai theo
            nhiều giai đoạn. Công ty luôn ưu tiên sự ổn định và an toàn trong
            cung ứng, hạn chế tối đa ảnh hưởng đến quá trình thi công của khách
            hàng.
          </p>

          <h2 id="cam-ket-nang-luc">Cam kết về năng lực</h2>
          <p>
            Nam Sơn JSC cam kết duy trì và không ngừng nâng cao năng lực cung
            ứng thông qua việc hoàn thiện quy trình, đầu tư hệ thống vận hành và
            nâng cao chất lượng đội ngũ. Đây là nền tảng để công ty đồng hành
            lâu dài cùng khách hàng và đối tác trong các dự án xây dựng.
          </p>

          <Image
            src="/nangluc5.avif"
            alt="Năng lực vận hành Nam Sơn JSC"
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />

          <p className={styles.auth}>
            <em>Nội dung được biên soạn bởi Nam Sơn JSC.</em>
          </p>
        </article>
      </main>

      <ContactSection />
    </div>
  );
}
