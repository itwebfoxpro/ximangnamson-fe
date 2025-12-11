import Link from "next/link";
import type { PostSummary } from "@/data/posts";
import styles from "./RelatedPosts.module.scss";

type RelatedPostsProps = {
  posts: PostSummary[];
  title?: string;
};

export default function RelatedPosts({
  posts,
  title = "Bài viết liên quan",
}: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className={styles.wrapper}>

        <div className={styles.sectionTitle}>
          <h2>{title}</h2>
          <Link href="/tin-tuc" className={styles.moreLink}>
            Xem thêm →
          </Link>
      
      </div>

      <div className={styles.list}>
        {posts.map((post) => {
          const thumb = post.thumbnail || post.img;

          return (
            <div key={post.id} className={styles.card}>
              {/* Ảnh */}
              <div className={styles.thumb}>
                <img src={thumb} alt={post.title} />
              </div>

              {/* Nội dung */}
              <div className={styles.content}>
                <div className={styles.title}>{post.title}</div>

                {post.createdAt && (
                  <div className={styles.meta}>
                    {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                )}

                {/* Nút xem bài viết chi tiết */}
                <Link
                  href={`/tin-tuc/${post.slug}`}
                  className={styles.readMore}
                >
                  Xem thêm →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
