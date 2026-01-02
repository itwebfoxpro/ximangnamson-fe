import Link from "next/link";
import Image from "next/image";
import styles from "./RelatedPosts.module.scss";

export type RelatedPost = {
  slug: string;
  title: string;
  excerpt?: string;
  img?: string;
};

type Props = {
  currentSlug: string;
  posts: RelatedPost[];
};

export default function RelatedPosts({ currentSlug, posts }: Props) {
  const related = posts.filter((p) => p.slug !== currentSlug);

  if (!related.length) return null;

  return (
    <section className={styles.related}>
      <h2 className={styles.heading}>Tin tức khác</h2>

      <ul className={styles.list}>
        {related.map((post) => (
          <li key={post.slug} className={styles.item}>
            <Link href={`/tin-tuc/${post.slug}`} className={styles.link}>
              {post.img && (
                <Image
                  src={post.img}
                  alt={post.title}
                  width={120}
                  height={80}
                  className={styles.thumb}
                />
              )}

              <div className={styles.content}>
                <h3>{post.title}</h3>
                {post.excerpt && <p>{post.excerpt}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
