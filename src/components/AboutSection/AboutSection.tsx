import styles from "./AboutSection.module.scss";
import Image from "next/image";

const images = [
  "/chungnhan1.avif",
  "/chungnhan2.avif",
  "/chungnhan3.avif",
  "/chungnhan4.avif",
  "/chungnhan5.avif",
  "/chungnhan6.avif",
  "/chungnhan7.avif",
  "/chungnhan8.avif",
  "/chungnhan9.avif",
  "/chungnhan10.avif",
];

interface AboutSectionProps {
  onBack: () => void;
}
export default function AboutSection({ onBack }: AboutSectionProps) {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.sectionTitle}>
        <h2>Về NPP Xi măng Nam Sơn</h2>
        <button className={styles.backBtn} onClick={onBack}>
          ← Sản phẩm
        </button>
      </div>
      <p className={styles.sectionText}>
        Nhà phân phối xi măng Nam Sơn là nhà phân phối chính thức tại Bình Dương
        của các nhãn hàng:
        <br />
        1/ XI MĂNG VICEM HÀ TIÊN <br />
        2/ XI MĂNG FICO -YTL <br />
        3/ XI MĂNG SCG <br />
        4/ XI MĂNG TÂY ĐÔ
      </p>
      <div className={styles.imageGrid}>
        {images.map((img, i) => (
          <div key={i} className={styles.imageItem}>
            <Image
              src={img}
              alt={`Chứng nhận ${i + 1}`}
              width={1200}
              height={630}
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
}
