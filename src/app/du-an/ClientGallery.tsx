"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/ImageLightBox/ImageLightbox";
import styles from "./page.module.scss";

type Props = {
  images: string[];
};

export default function ClientGallery({ images }: Props) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      <div className={styles.imageGrid}>
        {images.map((img, index) => (
          <div
            key={index}
            className={styles.imageItem}
            onClick={() => setActiveImage(img)}
          >
            <Image
              src={img}
              alt={`Năng lực ${index + 1}`}
              width={1200}
              height={630}
            />
          </div>
        ))}
      </div>

      {activeImage && (
        <ImageLightbox src={activeImage} onClose={() => setActiveImage(null)} />
      )}
    </>
  );
}
