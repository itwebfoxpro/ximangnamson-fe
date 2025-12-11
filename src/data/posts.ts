// src/data/posts.ts
export type PostSummary = {
  id: string;
  title: string;
  slug: string;
  img: string;
  thumbnail?: string; // optional
  createdAt?: string; // ISO string hoặc định dạng hiển thị luôn
};

export const sampleRelatedPosts: PostSummary[] = [
  {
    id: "1",
    title: "Hướng dẫn lựa chọn xi măng phù hợp cho công trình dân dụng",
    slug: "huong-dan-lua-chon-xi-mang-cho-cong-trinh-dan-dung",
    img: "huongdanchonximang.jpg",
    createdAt: "2024-04-10",
  },
  {
    id: "2",
    title: "Quy trình bảo quản xi măng trong kho đúng tiêu chuẩn",
    slug: "quy-trinh-bao-quan-xi-mang-trong-kho",
    img: "huongdanbaoquanximang.jpg",
    createdAt: "2024-03-28",
  },
  {
    id: "3",
    title: "Các tiêu chuẩn chất lượng xi măng phổ biến tại Việt Nam",
    slug: "tieu-chuan-chat-luong-xi-mang-tai-viet-nam",
    img: "tieuchuanchatluong.jpg",
    createdAt: "2024-03-12",
  },
];
