import type { Metadata } from "next";
import styles from "./page.module.scss";
import HeaderBlog from "@/components/Header/HeaderBlog";

export const metadata: Metadata = {
  title: "Báo Giá Xi Măng Mới Nhất | Liên Hệ Nhận Giá Tốt Nhất",
  description:
    "Báo giá xi măng mới nhất tại Bình Dương. Liên hệ nhận báo giá xi măng Vicem, Fico chính hãng, giao nhanh, giá tốt.",
  keywords: [
    "báo giá xi măng",
    "giá xi măng hôm nay",
    "xi măng bình dương",
    "xi măng vicem",
    "xi măng fico",
  ],
};

export default function BaoGiaXiMangPage() {
  return (
    <>
      {/* HEADER */}
      <HeaderBlog />

      {/* SCHEMA STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Báo Giá Xi Măng",
            description:
              "Cung cấp báo giá xi măng Vicem, Fico chính hãng tại Bình Dương.",
            provider: {
              "@type": "Organization",
              name: "Nhà Phân Phối Xi Măng Nam Sơn",
              telephone: "+84932687219",
              address: {
                "@type": "PostalAddress",
                streetAddress: "830 Đại lộ Bình Dương, Phường Phú Lợi",
                addressLocality: "Thủ Dầu Một",
                addressRegion: "Bình Dương",
                addressCountry: "VN",
              },
            },
            areaServed: "Bình Dương",
          }),
        }}
      />

      {/* MAIN CONTENT */}
      <main className={styles.container}>
        <h1 className={styles.title}>Báo Giá Xi Măng Mới Nhất</h1>

        <p className={styles.lead}>
          Bạn đang cần <strong>báo giá xi măng mới nhất</strong> cho công trình?
          Chúng tôi cung cấp xi măng Vicem, Fico chính hãng, giao nhanh toàn
          Bình Dương.
        </p>

        <div className={styles.box}>
          <h2>📞 Liên hệ nhận báo giá ngay</h2>
          <p>
            <strong>Hotline:</strong> <a href="tel:0932687219">0932 687 219</a>
          </p>
          <p>
            <strong>Tư vấn:</strong> <a href="tel:0932687219">Huỳnh Kim Anh</a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:nppximangnamson@gmail.com">
              nppximangnamson@gmail.com
            </a>
          </p>
        </div>

        <h2>Vì sao nên chọn chúng tôi?</h2>
        <ul className={styles.list}>
          <li>✔ Giá tốt trực tiếp từ nhà máy</li>
          <li>✔ Giao hàng nhanh toàn Bình Dương</li>
          <li>✔ Hỗ trợ kỹ thuật tận nơi</li>
          <li>✔ Hóa đơn VAT đầy đủ</li>
        </ul>
      </main>

      {/* FOOTER / CONTACT */}
    </>
  );
}
