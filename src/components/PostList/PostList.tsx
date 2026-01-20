import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/data/posts";
import styles from "./PostList.module.scss";
import { formatDateTime } from "@/lib/formatDatetime";

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  if (!posts.length) return null;

  return (
    <section className={styles.wrapper}>
      <div className={styles.headingRow}>
        <h2 className={styles.heading}>Tin tức mới nhất</h2>

        <a href="/tin-tuc" className={styles.viewMore}>
          Xem thêm →
        </a>
      </div>

      <div className={styles.grid}>
        {posts.map((post) => (
          <article key={post.id} className={styles.card}>
            <Link href={`/tin-tuc/${post.slug}/`} className={styles.imageWrap}>
              <Image
                src={post.img}
                alt={post.title}
                width={300}
                height={180}
                className={styles.image}
              />
            </Link>
            <p className={styles.datetime}>{formatDateTime(post.updatedAt)}</p>

            <h3 className={styles.title}>
              <Link href={`/tin-tuc/${post.slug}/`}>{post.title}</Link>
            </h3>

            <p className={styles.excerpt}>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
