"use client";

import Image from "next/image";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div>
          <h1 className={styles.heroTitle}>Nhà phân phối Xi măng Nam Sơn</h1>
          <p className={styles.heroDesc}>
            Nhà phân phối xi măng lâu đời, đứng đầu trong hệ thống phân phối tại
            Bình Dương và Bình Phước. Chiếm tỉ trọng 35% thị trường. Là nhà phân
            phối chính Vicem Hà Tiên.
          </p>

          <div className={styles.heroActions}>
            <a href="#products" className={styles.btnPrimary}>
              Xem danh mục sản phẩm
            </a>
          </div>
        </div>

        {/* Hero image hiển thị từ /public */}
        {/* <div className={styles.heroImageBox}>
          <Image
            src="/hero.jpg" // ⭐ ảnh trong public
            alt="Hình ảnh nhà máy hoặc bao bì sản phẩm"
            className={styles.heroImage}
            width={800}
            height={600}
            priority
          />
        </div> */}
      </div>
    </section>
  );
}
