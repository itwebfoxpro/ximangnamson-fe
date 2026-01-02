import PriceInfo from "@/components/Price/PriceInfo";
import PriceTable from "@/components/Price/PriceTable";
import ContactCTA from "@/components/Price/ContactCTA";
import HeaderBlog from "@/components/Header/HeaderBlog";
import ContactSection from "@/components/ContactSection/ContactSection";
import styles from "./page.module.scss"
import Link from "next/link"

export default function PricePage() {
  return (
    <main className={styles.wrapper}>
      <Link href="/" className={styles.productLink}>
        🔙Trở về trang chủ
      </Link>
      <div className={styles.gap}></div>
      <PriceInfo />
      <PriceTable />
      <ContactCTA />
    </main>
  );
}
