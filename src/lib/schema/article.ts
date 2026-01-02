// src/lib/schema/articles.ts
export function articleSchema({
  title,
  description,
  slug,
  publishedAt,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: publishedAt,
    inLanguage: "vi-VN",

    author: {
      "@type": "Organization",
      name: "Nhà Phân Phối Xi Măng Nam Sơn",
    },

    publisher: {
      "@type": "Organization",
      name: "Nhà Phân Phối Xi Măng Nam Sơn",
      logo: {
        "@type": "ImageObject",
        url: "https://namsonjsc.vn/logo.avif",
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://namsonjsc.vn/tin-tuc/${slug}`,
    },

    image: image
      ? [
          {
            "@type": "ImageObject",
            url: image,
          },
        ]
      : undefined,
  };
}
