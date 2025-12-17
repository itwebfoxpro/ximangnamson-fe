"use client";

import styles from "./GoogleMap.module.scss";

const GoogleMap = () => {
  return (
    <div className={styles.mapWrapper}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7832.900200541271!2d106.63862376592654!3d11.00481717468729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1714528bdcb%3A0xa2ca95136e905359!2zQ8OUTkcgVFkgQ-G7lCBQSOG6pk4gTkFNIFPGoE4!5e0!3m2!1svi!2s!4v1765782871904!5m2!1svi!2s"
        className={styles.iframe}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
};

export default GoogleMap;
