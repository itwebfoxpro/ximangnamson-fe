export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BuildingMaterialsStore",
  "@id": "https://namsonjsc.vn/#business",
  name: "Nhà Phân Phối Xi Măng Nam Sơn",
  url: "https://namsonjsc.vn",
  logo: "https://namsonjsc.vn/logo.avif",
  image: "https://namsonjsc.vn/og-image.avif",
  description:
    "Nhà phân phối xi măng Vicem Hà Tiên, Fico Bình Dương chính hãng. Giao hàng nhanh, giá tốt, uy tín tại Bình Dương.",
  telephone: "+84932687219",

  priceRange: "₫70.000 - ₫120.000",

  address: {
    "@type": "PostalAddress",
    streetAddress: "830 Đại lộ Bình Dương, Khu 6, Phường Phú Lợi",
    addressLocality: "Thủ Dầu Một",
    addressRegion: "Bình Dương",
    postalCode: "75000",
    addressCountry: "VN",
  },

  areaServed: {
    "@type": "AdministrativeArea",
    name: "Bình Dương",
  },

  openingHours: ["Mo-Sa 07:00-18:00", "Su 07:00-12:00"],

  sameAs: [
    "https://www.facebook.com/ximangnamson",
    "https://zalo.me/0123456789",
    "https://www.google.com/maps/place/830+Đại+lộ+Bình+Dương",
  ],
  hasMap: "https://maps.app.goo.gl/zEXiGH3mhEGkPzaa9",
};
