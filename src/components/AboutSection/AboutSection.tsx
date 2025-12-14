import styles from "./AboutSection.module.scss";
import Image from "next/image";

interface AboutSectionProps {
  onBack: () => void;
}
export default function AboutSection({ onBack }: AboutSectionProps) {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.sectionTitle}>
        <h2>Về Xi măng Nam Sơn</h2>
        <button className={styles.backBtn} onClick={onBack}>
          ← Quay lại sản phẩm nổi bật
        </button>
      </div>
      <p className={styles.sectionText}>
        Xi măng Nam Sơn được sản xuất theo công nghệ tiên tiến, quy trình quản
        lý chất lượng nghiêm ngặt, đáp ứng các tiêu chuẩn Việt Nam và quốc tế.
        Với định hướng phát triển bền vững, chúng tôi luôn đặt chất lượng sản
        phẩm và an toàn môi trường lên hàng đầu.
        <br />
        Nhà phân phối xi măng Nam Sơn là nhà phân phối chính thức tại Bình Dương
        của các nhãn hàng:
        <br />
        1/ XI MĂNG VICEM HÀ TIÊN <br />
        2/ XI MĂNG FICO -YTL <br />
        3/ XI MĂNG SCG <br />
        4/ XI MĂNG TÂY ĐÔ
      </p>

      <Image
        src="/chungnhan.jpg" // ⭐ ảnh trong public
        alt="Hình ảnh nhà máy hoặc bao bì sản phẩm"
        className={styles.heroImage}
        width={800}
        height={600}
        priority
      />
    </section>
  );
}
