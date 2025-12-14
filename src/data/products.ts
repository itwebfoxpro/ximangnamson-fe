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
    name: "XI MĂNG VICEM HÀ TIÊN PCB40",
    description: "Phù hợp cho bê tông và vữa xây dựng dân dụng.",
    price: 92000,
    unit: "bao 50kg",
    images: ["/hatienpcb401.jpg", "/hatienpcb402.jpg"],
  },
  {
    id: 2,
    name: "XI MĂNG VICEM HÀ TIÊN XÂY TÔ",
    description: "Chuyên dụng cho công tác xây, tô trát tường, bề mặt mịn.",
    price: 88000,
    unit: "bao 50kg",
    image_url: "/hatienxayto01.jpg",
  },
  {
    id: 3,
    name: "XI MĂNG HÀ TIÊN 2 PCB40",
    description: "Cường độ cao, thích hợp cho móng, dầm và sàn.",
    price: 105000,
    unit: "bao 50kg",
    image_url: "/hatien2-1.jpg",
  },
  {
    id: 4,
    name: "XI MĂNG VICEM HÀ TIÊN POWER CEMENT",
    description: "Đa ứng dụng, dùng cho nhiều loại công trình xây dựng.",
    price: 98000,
    unit: "bao 50kg",
    image_url: "/powercement.jpg",
  },
  {
    id: 5,
    name: "XI MĂNG HÀ TIÊN ĐA DỤNG",
    description: "Đa ứng dụng, dùng cho nhiều loại công trình xây dựng.",
    price: 98000,
    unit: "bao 50kg",
    image_url: "/hatiendadung.jpg",
  },
  {
    id: 6,
    name: "XI MĂNG BÌNH DƯƠNG",
    description: "Xi măng chất lượng cao, phù hợp xây dựng dân dụng.",
    price: 90000,
    unit: "bao 50kg",
    image_url: "/ximangbinhduong.jpg",
  },
  {
    id: 7,
    name: "XI MĂNG HÀ TIÊN MĐ",
    description: "Loại xi măng có độ bền cao và ổn định.",
    price: 95000,
    unit: "bao 50kg",
    images: ["/hatien-md-1.jpg", "/hatien-md-2.jpg"],
  },
  {
    id: 8,
    name: "XI MĂNG STARMAX",
    description: "Công nghệ hiện đại, độ kết dính cao, bền vững.",
    price: 89000,
    unit: "bao 50kg",
    image_url: "starmax-1.jpg",
  },
];
