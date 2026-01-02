import { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { products } from "@/data/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://namsonjsc.vn";
  const now = new Date();

  // ===== TRANG TĨNH =====
  const staticPages = [
    "",
    "/xi-mang-binh-duong",
    "/san-pham",
    "/bao-gia",
    "/tin-tuc",
    "/ve-nha-phan-phoi-xi-mang-nam-son",
    "/ho-tro",
  ];

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  // ===== SẢN PHẨM =====
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/bao-gia/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // ===== BÀI VIẾT =====
  const postUrls = posts
    .filter((post) => post.slug !== "xi-mang-binh-duong")
    .map((post) => ({
      url: `${baseUrl}/tin-tuc/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticUrls, ...productUrls, ...postUrls];
}
