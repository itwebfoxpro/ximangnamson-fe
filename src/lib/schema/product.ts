import { Product } from "@/data/products";

export const productSchema = (product: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  image: product.images,
  description: product.shortDescription,
  sku: product.slug,
  brand: {
    "@type": "Brand",
    name: product.brand,
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "VND",
    price: product.price,
    availability: "https://schema.org/InStock",
    url: `https://namsonjsc.vn/bao-gia/${product.slug}`,
  },
});
