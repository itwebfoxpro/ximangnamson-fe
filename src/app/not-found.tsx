"use client";

import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.code}>404</div>
        <h2 className={styles.title}>Trang không tồn tại</h2>
        <p className={styles.desc}>
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link href="/" className={styles.homeBtn}>
          ← Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
