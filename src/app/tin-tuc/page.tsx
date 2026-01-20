import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/posts";

export default function NewsListPage() {
  return (
    <main className={styles.container}>
      <Link href="/" className={styles.productLink}>
        🔙Trở về trang chủ
      </Link>
      <div className={styles.gap}></div>
      <h1>Tin tức xi măng & xây dựng</h1>

      <ul className={styles.list}>
        {posts.map((post) => (
            <li key={post.id} className={styles.item}>
              <div className={styles.thumbnail}>
                <Image
                  src={post.img}
                  alt={post.title}
                  width={600}
                  height={400}
                  priority
                />
              </div>
              <div className={styles.content}>
                <Link href={`/tin-tuc/${post.slug}`} className={styles.title}>
                  {post.title}
                </Link>
                <p className={styles.excerpt}>{post.excerpt}</p>
              </div>
            </li>
          ))}
      </ul>
    </main>
  );
}
