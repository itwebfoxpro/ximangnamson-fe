"use client";

import React from "react";
import Image from "next/image";
import styles from "./MessengerBubble.module.scss";
import messengerIcon from "../../assets/messenger.png";

type Props = {
  messengerUrl?: string; // Link mở chat Messenger
  tooltipText?: string;
  badge?: number | null;
  size?: number; // tùy chỉnh kích thước icon (default 48px)
};

export default function MessengerBubble({
  messengerUrl = "https://m.me/your_page_username",
  tooltipText = "",
  badge = null,
  size = 48,
}: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(messengerUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      className={styles.messenger}
      onClick={handleClick}
      aria-label={tooltipText}
      title={tooltipText}
      type="button"
    >
      {/* Icon Messenger */}
      <Image
        src={messengerIcon}
        alt="Messenger Icon"
        width={size}
        height={size}
        className={styles.icon}
      />

      {/* Badge hiển thị nếu badge > 0 */}
      {typeof badge === "number" && badge > 0 && (
        <span className={styles.badge}>{badge}</span>
      )}
    </button>
  );
}
