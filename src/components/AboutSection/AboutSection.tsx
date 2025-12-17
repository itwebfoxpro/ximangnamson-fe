import styles from "./AboutSection.module.scss";

const images = [
  "/chungnhan1.jpg",
  "/chungnhan2.jpg",
  "/chungnhan3.jpg",
  "/chungnhan4.jpg",
  "/chungnhan5.jpg",
  "/chungnhan6.jpg",
  "/chungnhan7.jpg",
  "/chungnhan8.jpg",
  "/chungnhan9.jpg",
  "/chungnhan10.webp",
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
            <img src={img} alt={`Chứng nhận ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
