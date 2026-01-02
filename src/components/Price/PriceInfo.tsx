import styles from "./Price.module.scss";

export default function PriceInfo() {
  return (
    <section className={styles.priceInfo}>
      <h1>Bảng giá xi măng mới nhất</h1>
      <p>
        Cập nhật giá xi măng mới nhất hôm nay, bao gồm các dòng Vicem, Hà Tiên,
        Bình Dương. Giá có thể thay đổi theo khu vực.
      </p>
    </section>
  );
}
