import { products } from "@/data/products";
import styles from "./Price.module.scss";
import Link from "next/link";

export default function PriceTable() {
  return (
    <section className={styles.priceTable}>
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Đơn vị</th>
            <th>Giá</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.slug}>
              <td>
                <Link
                  href={`/bao-gia/${p.slug}`}
                  className={styles.productLink}
                >
                  {p.name}
                </Link>
              </td>
              <td>{p.unit}</td>
              <td>{p.price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
