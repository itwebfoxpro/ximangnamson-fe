export type Post = {
  id: string; // Dùng slug làm ID duy nhất
  slug: string;

  title: string;
  description: string; // Meta description (SEO)
  excerpt: string; // Mô tả ngắn hiển thị trong danh sách
  content?: string; // Nội dung chi tiết (nếu có)

  img: string; // Ảnh đại diện (OpenGraph)
  publishedAt: string;
  updatedAt?: string;

  author: {
    name: string;
    url?: string;
  };

  category: string;
  tags?: string[];
  keywords?: string[];
  readingTime?: string;
};

export const posts: Post[] = [
  {
    id: "xi-mang-binh-duong",
    slug: "xi-mang-binh-duong",
    title: "Xi Măng Bình Dương | Nhà Phân Phối Xi Măng Nam Sơn Uy Tín",
    description:
      "Xi măng Bình Dương – Nhà phân phối xi măng Nam Sơn chuyên cung cấp xi măng Vicem, Fico chính hãng, giá tốt, giao hàng nhanh toàn tỉnh.",
    excerpt:
      "Xi măng Bình Dương do Nam Sơn phân phối, cam kết chất lượng, giá tốt, phục vụ nhanh chóng cho mọi công trình dân dụng và công nghiệp.",
    img: "/post/xi-mang-binh-duong-1.avif",
    publishedAt: "2025-12-25",
    updatedAt: "2025-12-31T10:09:38.532Z",
    author: {
      name: "Nam Sơn",
      url: "https://namsonjsc.vn",
    },
    category: "Doanh nghiệp",
    tags: [
      "xi măng bình dương",
    ],
    keywords: [
      "xi măng bình dương",
    ],
    readingTime: "5 phút đọc",
  },
  {
    id: "nha-phan-phoi-xi-mang-nam-son",
    slug: "nha-phan-phoi-xi-mang-nam-son",
    title:
      "CÔNG TY CỔ PHẦN NAM SƠN - NHÀ PHÂN PHỐI XI MĂNG VICEM HÀ TIÊN, FICO-YTL LỚN NHẤT TẠI BÌNH DƯƠNG",
    description:
      "Nhà phân phối xi măng Nam Sơn – đơn vị cung cấp xi măng Vicem, Fico chính hãng, giá tốt, giao hàng nhanh tại Bình Dương.",
    excerpt:
      "Nhà phân phối xi măng Nam Sơn – đơn vị cung cấp xi măng Vicem, Fico chính hãng với giá tốt nhất Bình Dương.",
    img: "/post/xi-mang-nam-son.avif",
    publishedAt: "2025-12-25",
    updatedAt: "2025-12-29T14:34:08.166Z",
    author: {
      name: "Nam Sơn",
      url: "https://namsonjsc.vn",
    },
    category: "Tin doanh nghiệp",
    tags: ["xi măng", "vicem", "vật liệu xây dựng"],
    keywords: ["xi măng nam sơn", "xi măng vicem", "nhà phân phối xi măng"],
    readingTime: "4 phút đọc",
  },
  {
    id: "vicem-ha-tien-ra-mat-bao-bi-moi",
    slug: "vicem-ha-tien-ra-mat-bao-bi-moi",
    title: "Vicem Hà Tiên ra mắt bao bì mới, tái định vị thương hiệu",
    description:
      "Vicem Hà Tiên chính thức giới thiệu bộ nhận diện bao bì mới nhằm nâng cao hình ảnh thương hiệu trên thị trường.",
    excerpt:
      "Vicem Hà Tiên chính thức giới thiệu hệ thống bao bì mới, đánh dấu bước chuyển mình chiến lược.",
    img: "/post/bao-bi-moi-vicem-ha-tien-v2.avif",
    publishedAt: "2025-12-26",
    author: {
      name: "Nam Sơn",
      url: "https://namsonjsc.vn",
    },
    category: "Tin doanh nghiệp",
    tags: ["vicem", "xi măng", "thương hiệu"],
    keywords: ["vicem", "bao bì xi măng", "thương hiệu xi măng"],
    readingTime: "3 phút đọc",
  },
  {
    id: "kinh-nghiem-chon-xi-mang-binh-duong",
    slug: "kinh-nghiem-chon-xi-mang-binh-duong",
    title: "Kinh nghiệm chọn xi măng cho công trình dân dụng tại Bình Dương",
    description:
      "Chia sẻ kinh nghiệm thực tế giúp lựa chọn xi măng phù hợp cho công trình dân dụng tại Bình Dương, đảm bảo chất lượng và độ bền lâu dài.",
    excerpt:
      "Từ kinh nghiệm thi công thực tế, bài viết chia sẻ cách lựa chọn xi măng phù hợp, giúp công trình bền vững và tiết kiệm chi phí.",
    img: "/post/xi-mang-cong-trinh.avif",
    publishedAt: "2025-12-27",
    author: {
      name: "Nam Sơn",
      url: "https://namsonjsc.vn",
    },
    category: "Kiến thức xây dựng",
    tags: [
      "xi măng",
      "kinh nghiệm xây dựng",
      "xi măng Bình Dương",
      "vật liệu xây dựng",
    ],
    keywords: [
      "chọn xi măng",
      "kinh nghiệm xây dựng",
      "xi măng Bình Dương",
      "vật liệu xây dựng",
    ],
    readingTime: "4 phút đọc",
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
