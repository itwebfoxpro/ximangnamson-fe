import ProductCard from "@/components/ProductCard/ProductCard";
import { products } from "@/data/products";
import styles from "./ProductsSection.module.scss";
import CartMiniSummary from "@/components/CartMiniSummary/CartMiniSummary";

export default function ProductsSection() {
  return (
    <section id="products" className={styles.section}>
      <div className={styles.sectionTitle}>
        <h2>Sản phẩm nổi bật</h2></div>

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <CartMiniSummary />
    </section>
  );
}
