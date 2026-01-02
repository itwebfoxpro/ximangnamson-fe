"use client";

import Image from "next/image";
import styles from "./ImageLightbox.module.scss";

type Props = {
  src: string;
  alt?: string;
  onClose: () => void;
};

export default function ImageLightbox({ src, alt, onClose }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <button className={styles.close} onClick={onClose}>
        ✕
      </button>

      <div className={styles.imageWrapper} onClick={(e) => e.stopPropagation()}>
        <Image
          src={src}
          alt={alt || ""}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
