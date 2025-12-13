// File: PhoneBubble.tsx
import React from "react";
import styles from "./PhoneBubble.module.scss";

export type PhoneBubbleProps = {
  phoneNumber: string; // e.g. "+84901234567" or "0901234567"
  label?: string; // optional short label like "Liên hệ"
  className?: string;
  /** position: "bottom-right" | "bottom-left" | "center-right" */
  position?: "bottom-right" | "bottom-left" | "center-right";
};

const PhoneBubble: React.FC<PhoneBubbleProps> = ({
  phoneNumber,
  label = "Gọi ngay",
  className = "",
  position = "bottom-right",
}) => {
  const telHref = `tel:${phoneNumber}`;

  return (
    <div
      className={`${styles.wrapper} ${styles.ripple} ${styles[position]} ${className}`}
      aria-hidden={false}
    >
      <div className={styles.label}>
        {phoneNumber}

        <i className={`${styles.icon} fa-solid fa-phone`}></i>
      </div>
    </div>
  );
};

export default PhoneBubble;
