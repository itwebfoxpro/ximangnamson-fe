"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./GoogleMap.module.scss";

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadMap(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // load sớm trước khi người dùng thấy
      }
    );

    if (mapRef.current) observer.observe(mapRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.mapSection}>
      <div ref={mapRef} className={styles.mapWrapper}>
        {loadMap ? (
          <iframe
            title="Bản đồ Công ty Nam Sơn"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7832.900200541271!2d106.63862376592654!3d11.00481717468729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1714528bdcb%3A0xa2ca95136e905359!2zQ8OUTkcgVFkgQ-G7lCBQSOG6pk4gTkFNIFPGoE4!5e0!3m2!1svi!2s!4v1700000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className={styles.placeholder}>
            <span>Đang tải bản đồ...</span>
          </div>
        )}
      </div>
    </section>
  );
}
