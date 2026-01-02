// src/app/tin-tuc/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "@/data/posts";
import ClientContent from "./ClientContent";
import Script from "next/script";
import { articleSchema } from "@/lib/schema/article";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";

// BẮT BUỘC khi dùng output: "export"
export const dynamic = "force-static";
export const dynamicParams = false;

// Tạo danh sách route tĩnh
export async function generateStaticParams() {
  return posts
    .filter((post) => post.slug !== "xi-mang-binh-duong")
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Bài viết không tồn tại",
    };
  }

  const url = `https://namsonjsc.vn/tin-tuc/${post.slug}`;
  const imageUrl = post.img.startsWith("http")
    ? post.img
    : `https://namsonjsc.vn${post.img}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      siteName: "Xi Măng Nam Sơn",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  if (params.slug === "xi-mang-binh-duong") {
    notFound();
  }
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) notFound();

  const articleJson = articleSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    publishedAt: post.publishedAt,
    image: post.img,
  });

  const breadcrumbJson = breadcrumbSchema([
    { name: "Trang chủ", url: "https://namsonjsc.vn" },
    { name: "Tin tức", url: "https://namsonjsc.vn/tin-tuc" },
    { name: post.title, url: `https://namsonjsc.vn/tin-tuc/${post.slug}` },
  ]);

  return (
    <>
      {/* SEO Schema */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }}
      />

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      {/* Content */}
      <ClientContent post={post} />
    </>
  );
}
