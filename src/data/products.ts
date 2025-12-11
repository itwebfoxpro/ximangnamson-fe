// src/data/products.ts

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image_url?: string;
  images?: string[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "XI MĂNG VICEM HÀ TIÊN",
    description: "Phù hợp cho bê tông và vữa xây dựng dân dụng.",
    price: 92000,
    unit: "bao 50kg",
    image_url: "/products/vicem-hatien.png",
  },
  {
    id: 2,
    name: "XI MĂNG HÀ TIÊN XÂY TÔ",
    description: "Chuyên dụng cho công tác xây, tô trát tường, bề mặt mịn.",
    price: 88000,
    unit: "bao 50kg",
    image_url: "/products/hatien-xayto.png",
  },
  {
    id: 3,
    name: "XI MĂNG HÀ TIÊN 2",
    description: "Cường độ cao, thích hợp cho móng, dầm và sàn.",
    price: 105000,
    unit: "bao 50kg",
    image_url: "hatien2-1.jpg",
  },
  {
    id: 4,
    name: "XI MĂNG HÀ TIÊN ĐA DỤNG",
    description: "Đa ứng dụng, dùng cho nhiều loại công trình xây dựng.",
    price: 98000,
    unit: "bao 50kg",
    image_url: "hatien-dd-1.jpg",
  },
  {
    id: 5,
    name: "XI MĂNG BÌNH DƯƠNG",
    description: "Xi măng chất lượng cao, phù hợp xây dựng dân dụng.",
    price: 90000,
    unit: "bao 50kg",
    image_url: "/products/binhduong.png",
  },
  {
    id: 6,
    name: "XI MĂNG HÀ TIÊN MĐ",
    description: "Loại xi măng có độ bền cao và ổn định.",
    price: 95000,
    unit: "bao 50kg",
    images: ["/hatien-md-1.jpg", "/hatien-md-2.jpg"],
  },
  {
    id: 7,
    name: "XI MĂNG STARMAX",
    description: "Công nghệ hiện đại, độ kết dính cao, bền vững.",
    price: 89000,
    unit: "bao 50kg",
    image_url: "starmax-1.jpg",
  },
];
