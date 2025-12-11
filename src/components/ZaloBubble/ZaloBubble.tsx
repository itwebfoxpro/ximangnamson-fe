"use client";

import React from "react";
import Image from "next/image";
import styles from "./ZaloBubble.module.scss";
import zaloIcon from "../../assets/zalo.png";

type ZaloBubbleProps = {
  phone: string;
  tooltipText?: string;
  badge?: number | null;
  // tuỳ chọn: kích thước icon
  size?: number;
};

export default function ZaloBubble({
  phone,
  tooltipText = "",
  badge = null,
  size = 48,
}: ZaloBubbleProps) {
  const zaloLink = `https://zalo.me/${phone}`;

  return (
    <a href={zaloLink} className={styles.wrapper} aria-label={tooltipText}>
      <div className={styles.iconWrapper} style={{ width: size, height: size }}>
        {/* next/image chấp nhận StaticImageData */}
        <Image
          src={zaloIcon}
          alt="Zalo Icon"
          width={size}
          height={size}
          className={styles.icon}
        />

        {/* Badge hiển thị khi > 0 */}
        {badge !== null && badge > 0 && (
          <span className={styles.badge}>{badge}</span>
        )}
      </div>

      {tooltipText && <span className={styles.tooltip}>{tooltipText}</span>}
    </a>
  );
}
