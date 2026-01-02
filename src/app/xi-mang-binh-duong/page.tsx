import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "@/data/posts";
import ClientContent from "@/app/tin-tuc/[slug]/ClientContent";
import HeaderBlog from "@/components/Header/HeaderBlog";
import ContactSection from "@/components/ContactSection/ContactSection";

/* =============================
   STATIC GENERATION
============================= */
export const dynamic = "force-static";

/* =============================
   METADATA (SEO + SCHEMA)
============================= */
export async function generateMetadata(): Promise<Metadata> {
  const post = posts.find((p) => p.slug === "xi-mang-binh-duong");

  if (!post) return {};

  const url = "https://namsonjsc.vn/xi-mang-binh-duong";

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      images: [
        {
          url: post.img,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.img],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        image: post.img,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
          "@type": "Organization",
          name: "Nam Sơn",
          url: "https://namsonjsc.vn",
        },
        publisher: {
          "@type": "Organization",
          name: "Nam Sơn",
          logo: {
            "@type": "ImageObject",
            url: "https://namsonjsc.vn/logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
      }),
    },
  };
}

/* =============================
   PAGE COMPONENT
============================= */
export default function Page() {
  const post = posts.find((p) => p.slug === "xi-mang-binh-duong");
  if (!post) return notFound();

  return (
    <>
      <HeaderBlog />

      <main>
        <ClientContent post={post} />
      </main>
      <ContactSection />
    </>
  );
}
