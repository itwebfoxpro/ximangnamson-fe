// src/app/tin-tuc/[slug]/ClientContent.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { postContents } from "@/data/postContents";
import styles from "./post.module.scss";
import RelatedPosts from "@/components/RelatedPosts/RelatedPosts";
import { posts } from "@/data/posts";
import TableOfContents from "@/components/TOC/TableOfContents";
import Image from "next/image";
import { formatDateTime } from "@/lib/formatDatetime";

type Post = {
  slug: string;
  title: string;
  publishedAt?: string;
  updatedAt?: string;
};

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export default function ClientContent({ post }: { post: Post }) {
  const content = postContents[post.slug];
  const [toc, setToc] = useState<TocItem[]>([]);

  /* ===== BUILD TOC FROM h2, h3 ===== */
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("article h2, article h3")
    ) as HTMLHeadingElement[];

    const items: TocItem[] = headings.map((el) => {
      if (!el.id) {
        el.id =
          el.textContent
            ?.toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-") || "";
      }

      return {
        id: el.id,
        text: el.textContent || "",
        level: Number(el.tagName.replace("H", "")),
      };
    });

    setToc(items);
  }, [post.slug]);

  return (
    <article className={styles.post}>
      {/* ===== BREADCRUMB ===== */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/tin-tuc">Tin tức</Link>
        <span className={styles.separator}>›</span>
        <span className={styles.current}>{post.title}</span>
      </nav>

      <h1>{post.title}</h1>

      {post.publishedAt && (
        <div className={styles.metaRow}>
          <time
            className={styles.date}
            dateTime={post.updatedAt || post.publishedAt}
          >
            Cập nhật: {formatDateTime(post.updatedAt || post.publishedAt)}
          </time>

          <div className={styles.share}>
            <span>Chia sẻ:</span>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chia sẻ Facebook"
            >
              <Image
                src="/fblogo.avif"
                alt="Chia sẻ Zalo"
                width={40}
                height={40}
                className={styles.zaloIcon}
              />
            </a>

            <a
              href={`https://zalo.me/share?url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chia sẻ Zalo"
            >
              <Image
                src="/zalo.avif"
                alt="Chia sẻ Zalo"
                width={40}
                height={40}
                className={styles.zaloIcon}
              />
            </a>

            <button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              aria-label="Sao chép liên kết"
            >
              <Image
                src="/icon/copy.avif"
                alt="Chia sẻ bài viết"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
      )}

      <TableOfContents />

      {/* ===== CONTENT ===== */}
      {content ? content : <p>Nội dung đang được cập nhật.</p>}
      <RelatedPosts currentSlug={post.slug} posts={posts} />
    </article>
  );
}
