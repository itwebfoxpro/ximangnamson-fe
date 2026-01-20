import { products } from "@/data/products";
import { notFound } from "next/navigation";
import styles from "./ProductDetail.module.scss";
import { productSchema } from "@/lib/schema/product";
import { faqSchema } from "@/lib/schema/faq";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import Image from "next/image";
import Link from "next/link"

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại",
    };
  }

  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: {
      canonical: `https://namsonjsc.vn/bao-gia/${product.slug}`,
    },
    openGraph: {
      type: "website",
      title: product.seo.title,
      description: product.seo.description,
      url: `https://namsonjsc.vn/bao-gia/${product.slug}`,
      images: [
        {
          url: `https://namsonjsc.vn${product.images[0]}`,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.seo.title,
      description: product.seo.description,
      images: [`https://namsonjsc.vn${product.images[0]}`],
    },
  };
}


export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  const faqData = [
    {
      q: "Xi măng Vicem Hà Tiên PCB40 dùng cho công trình nào?",
      a: "Phù hợp cho xây dựng dân dụng, nhà ở, công trình dân sinh.",
    },
    {
      q: "Xi măng Vicem Hà Tiên có bền không?",
      a: "Sản phẩm có cường độ cao, độ bền tốt, đạt tiêu chuẩn TCVN.",
    },
  ];

  const breadcrumbData = [
    { name: "Trang chủ", url: "https://namsonjsc.vn" },
    { name: "Báo giá", url: "https://namsonjsc.vn/bao-gia" },
    { name: product.name, url: `https://namsonjsc.vn/bao-gia/${product.slug}` },
  ];

  return (
    <>
      {/* Product schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema(product)),
        }}
      />

      {/* FAQ schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqData)),
        }}
      />

      {/* Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(breadcrumbData)),
        }}
      />

      <article className={styles.wrapper}>
        <nav className={styles.breadcrumb}>
          <Link href="/bao-gia">Báo giá</Link>
          <span>›</span>
          <span>{product.name}</span>
        </nav>

        <h1>{product.name}</h1>
        <p>
          Cập nhật lần cuối:{" "}
          {product.updatedAt
            ? new Date(product.updatedAt).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Chưa cập nhật"}
        </p>

        <div className={styles.top}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={400}
            priority
          />

          <div className={styles.info}>
            <p>
              <strong>Thương hiệu:</strong> {product.brand}
            </p>
            <p className={styles.price}>
              Giá: {product.price.toLocaleString()} {product.unit}
            </p>
            <p>{product.shortDescription}</p>
          </div>
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: product.content }}
        />
      </article>
    </>
  );
}

