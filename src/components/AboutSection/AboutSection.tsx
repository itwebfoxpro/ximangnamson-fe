import styles from "./AboutSection.module.scss";

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.sectionTitle}>
        <h2>Về Xi măng Nam Sơn</h2>
        </div>
      <p className={styles.sectionText}>
        Xi măng Nam Sơn được sản xuất theo công nghệ tiên tiến, quy trình quản
        lý chất lượng nghiêm ngặt, đáp ứng các tiêu chuẩn Việt Nam và quốc tế.
        Với định hướng phát triển bền vững, chúng tôi luôn đặt chất lượng sản
        phẩm và an toàn môi trường lên hàng đầu.
      </p>
    </section>
  );
}
