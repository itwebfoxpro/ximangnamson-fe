import { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { products } from "@/data/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://namsonjsc.vn";
  const now = new Date();

  // ===== TRANG MONEY SITE / TRANG TĨNH QUAN TRỌNG =====
  const staticPages = [
    { path: "", priority: 1 },
    { path: "/gioi-thieu", priority: 0.9 },
    { path: "/nang-luc", priority: 0.9 },
    { path: "/du-an", priority: 0.9 },
    { path: "/san-pham", priority: 0.8 },
    { path: "/bao-gia", priority: 0.8 },
    { path: "/tin-tuc", priority: 0.7 },
    { path: "/ho-tro", priority: 0.6 },
  ];

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page.priority,
  }));

  // ===== TRANG SEO LOCAL (HẠ CẤP HOẶC CÓ THỂ LOẠI BỎ) =====
  const localSeoUrls = [
    {
      url: `${baseUrl}/tin-tuc/xi-mang-binh-duong`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5, // ⚠️ hạ thấp để tránh tranh vệ tinh
    },
  ];

  // ===== SẢN PHẨM / BÁO GIÁ =====
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/bao-gia/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // ===== TIN TỨC (KHÔNG SEO NẶNG) =====
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/tin-tuc/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...localSeoUrls, ...productUrls, ...postUrls];
}
