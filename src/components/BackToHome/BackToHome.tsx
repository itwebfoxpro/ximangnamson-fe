"use client";

import Link from "next/link";
import styles from "./BackToHome.module.scss";

export default function BackToHome() {
  return (
    <div className={styles.wrapper}>
      <Link href="/" className={styles.button}>
        ← Quay về trang chủ
      </Link>
    </div>
  );
}
