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
    id: "vat-lieu-xay-dung-la-gi-bang-gia-vat-lieu-xay-dung-2026",
    slug: "vat-lieu-xay-dung-la-gi-bang-gia-vat-lieu-xay-dung-2026",
    title: "Vật Liệu Xây Dựng Là Gì? Bảng Giá Vật Liệu Xây Dựng 2026",
    description: "Vật liệu xây dựng là gì? Tìm hiểu các loại vật liệu xây dựng phổ biến, bảng giá vật liệu xây dựng 2026 và những yếu tố ảnh hưởng đến giá tại Bình Dương.",
    excerpt: "Tìm hiểu vật liệu xây dựng là gì, các loại vật liệu phổ biến như xi măng, cát, đá, gạch, sắt thép, ngói và những yếu tố ảnh hưởng đến giá vật liệu xây dựng.",
    img: "/post/vat-lieu-xay-dung-binh-duong.avif",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-04T09:00:00.000Z",
    author: { name: "Nam Sơn", url: "https://namsonjsc.vn" },
    category: "Kiến thức xây dựng",
    tags: ["vật liệu xây dựng", "vật liệu xây dựng Bình Dương", "giá vật liệu xây dựng"],
    keywords: ["vật liệu xây dựng", "vật liệu xây dựng Bình Dương", "bảng giá vật liệu xây dựng 2026", "giá vật liệu xây dựng", "xi măng Bình Dương"],
    readingTime: "8 phút đọc",
  },
  {
    id: "xi-mang-ha-tien-2",
    slug: "xi-mang-ha-tien-2",
    title:
      "Xi măng Hà Tiên 2",
    description:
      "Xi măng Hà Tiên 2 PCB40 với biểu tượng Kỳ Lân Xanh là dòng xi măng truyền thống lâu đời, chất lượng ổn định, cường độ cao, phù hợp cho nhiều công trình dân dụng và công nghiệp.",
    excerpt:
      "Xi măng Hà Tiên 2 PCB40 là sản phẩm truyền thống của Vicem Hà Tiên, nổi bật với cường độ cao, thời gian đông kết hợp lý, hạt xi măng siêu mịn, giúp công trình bền chắc theo thời gian.",
    img: "/post/xi-mang-ha-tien-2-giai-phap-xay-dung-ben-vung-chat-luong-vuot-thoi-gian-0.avif",
    publishedAt: "2026-02-03",
    updatedAt: "2026-02-03T09:00:00.000Z",
    author: {
      name: "Ban Biên Tập",
      url: "https://namsonjsc.vn",
    },
    category: "Sản phẩm xi măng",
    tags: [
      "xi măng hà tiên 2",
      "xi măng pcb40",
      "xi măng vicem hà tiên",
      "xi măng truyền thống",
    ],
    keywords: [
      "xi măng hà tiên 2",
      "xi măng hà tiên 2 pcb40",
      "xi măng vicem hà tiên",
      "xi măng kỳ lân xanh",
      "xi măng xây dựng",
      "xi măng bình dương",
    ],
    readingTime: "3 phút đọc",
  }
,  
  {
    id: "thi-truong-xi-mang-viet-nam-co-hoi-dieu-tiet-cung-cau-va-mo-rong-kenh-tieu-thu",
    slug: "thi-truong-xi-mang-viet-nam-co-hoi-dieu-tiet-cung-cau-va-mo-rong-kenh-tieu-thu",
    title:
      "Thị trường xi măng Việt Nam: Cơ hội điều tiết cung – cầu và mở rộng kênh tiêu thụ",
    description:
      "Thị trường xi măng Việt Nam tiếp tục đối mặt tình trạng dư cung, đặt ra yêu cầu điều tiết cung – cầu, cơ cấu lại sản phẩm và mở rộng kênh tiêu thụ, đặc biệt là xuất khẩu.",
    excerpt:
      "Nguồn cung xi măng trong nước dự báo vượt cầu trong thời gian tới, buộc doanh nghiệp phải linh hoạt điều hành, đẩy mạnh đầu tư công, cơ cấu sản phẩm và mở rộng thị trường xuất khẩu.",
    img: "/post/thi-truong-xi-mang-viet-nam-co-hoi-dieu-tiet-cung-cau-va-mo-rong-kenh-tieu-thu-1.avif",
    publishedAt: "2026-01-29",
    updatedAt: "2026-01-29T09:30:00.000Z",
    author: {
      name: "Ban Biên Tập",
      url: "https://namsonjsc.vn",
    },
    category: "Tin tức ngành xi măng",
    tags: ["thị trường xi măng", "cung cầu xi măng", "ngành xi măng việt nam"],
    keywords: [
      "thị trường xi măng việt nam",
      "cung cầu xi măng",
      "dư cung xi măng",
      "xuất khẩu xi măng",
      "ngành xi măng",
    ],
    readingTime: "4 phút đọc",
  },
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
    tags: ["xi măng bình dương"],
    keywords: ["xi măng bình dương"],
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
