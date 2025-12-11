"use client";

import Image from "next/image";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div>
          <h1 className={styles.heroTitle}>Xi măng Nam Sơn</h1>
          <p className={styles.heroDesc}>
            Được sản xuất trên dây chuyền hiện đại, xi măng Nam Sơn mang đến
            chất lượng ổn định, độ bền cao, đáp ứng tiêu chuẩn cho mọi công
            trình xây dựng dân dụng và công nghiệp.
          </p>

          <div className={styles.heroActions}>
            <a href="#products" className={styles.btnPrimary}>
              Xem danh mục sản phẩm
            </a>
            <button className={styles.btnSecondary}>Tải catalogue</button>
          </div>
        </div>

        {/* Hero image hiển thị từ /public */}
        <div className={styles.heroImageBox}>
          <Image
            src="/hero.jpg" // ⭐ ảnh trong public
            alt="Hình ảnh nhà máy hoặc bao bì sản phẩm"
            className={styles.heroImage}
            width={800}
            height={600}
            priority
          />
        </div>
      </div>
    </section>
  );
}
