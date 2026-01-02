import styles from "./Price.module.scss";

export default function ContactCTA() {
  return (
    <section className={styles.contactCTA}>
      <h2>Liên hệ báo giá nhanh</h2>
      <p>Gọi ngay để nhận báo giá tốt nhất trong ngày</p>
      <a href="tel:0932687219">📞 0932 687 219</a>
    </section>
  );
}
