// src/data/products.ts

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  unit: string;
  brand: string;
  images: string[];
  content: string;
  seo: {
    title: string;
    description: string;
  };
  updatedAt: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Xi măng Vicem Hà Tiên PCB40",
    slug: "xi-mang-vicem-ha-tien-pcb40",
    description:
      "Xi măng Vicem Hà Tiên PCB40 chuyên dùng cho xây dựng dân dụng và công nghiệp, có độ bền cao, khả năng chịu lực tốt.",
    shortDescription:
      "Xi măng Vicem Hà Tiên PCB40 chất lượng cao, phù hợp cho xây dựng dân dụng.",
    price: 93000,
    unit: "bao 50kg",
    brand: "Vicem",
    images: ["/hatienpcb401.avif", "/hatienpcb402.avif"],
    updatedAt: "2025-12-31T10:09:38.532Z",
    content: `  
    <h2>HẠNG MỤC SỬ DỤNG</h2>
    <p>
      Xi măng Vicem Hà Tiên Xây Tô được sử dụng chuyên biệt cho các hạng mục hoàn thiện
      như trát tường, tô trần, xây gạch trong các công trình dân dụng và công nghiệp.
      Sản phẩm giúp bề mặt mịn, dễ thi công và tăng độ bền cho kết cấu.
    </p>
  
    <h2>ƯU ĐIỂM NỔI BẬT</h2>
    <ul>
      <li>Độ mịn cao, dễ thi công, giảm hao hụt vật liệu.</li>
      <li>Khả năng bám dính tốt, hạn chế nứt bề mặt.</li>
      <li>Thời gian đông kết hợp lý, thuận tiện thi công.</li>
      <li>Chất lượng ổn định, phù hợp nhiều điều kiện thời tiết.</li>
    </ul>
  
    <h2>HƯỚNG DẪN TỶ LỆ PHỐI TRỘN</h2>
    <table>
      <thead>
        <tr>
          <th>Hạng mục</th>
          <th>Xi măng</th>
          <th>Cát vàng</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Vữa xây tô Mác 50</td>
          <td>1</td>
          <td>5</td>
        </tr>
        <tr>
          <td>Vữa xây tô Mác 75</td>
          <td>1</td>
          <td>4</td>
        </tr>
      </tbody>
    </table>
  
    <h2>HƯỚNG DẪN BẢO QUẢN</h2>
    <ul>
      <li>Bảo quản nơi khô ráo, thoáng mát, tránh tiếp xúc trực tiếp với nước.</li>
      <li>Xếp bao xi măng cách mặt đất tối thiểu 30cm.</li>
      <li>Không xếp sát tường, tránh ẩm mốc làm giảm chất lượng sản phẩm.</li>
    </ul>
    <h2>CÂU HỎI THƯỜNG GẶP VỀ XI MĂNG VICEM HÀ TIÊN PCB40</h2>

<h3>1. Xi măng Vicem Hà Tiên PCB40 là gì?</h3>
<p>
  Xi măng Vicem Hà Tiên PCB40 là loại xi măng Poóc lăng hỗn hợp được sản xuất theo tiêu chuẩn TCVN 6260,
  có cường độ chịu nén cao, độ bền tốt và khả năng thi công linh hoạt.
  Sản phẩm được sử dụng phổ biến trong các công trình dân dụng và công nghiệp.
</p>

<h3>2. Xi măng PCB40 dùng cho những hạng mục nào?</h3>
<p>
  Xi măng PCB40 phù hợp cho nhiều hạng mục xây dựng như:
</p>
<ul>
  <li>Xây tường, trát hoàn thiện nhà ở</li>
  <li>Đổ bê tông móng, sàn, cột, dầm</li>
  <li>Các công trình dân dụng và công nghiệp vừa và nhỏ</li>
</ul>

<h3>3. Xi măng Vicem Hà Tiên PCB40 có bền không?</h3>
<p>
  Xi măng Vicem Hà Tiên PCB40 có cường độ nén cao, khả năng đông kết ổn định và độ bền lâu dài.
  Sản phẩm đáp ứng tốt các yêu cầu kỹ thuật theo tiêu chuẩn Việt Nam, giúp công trình bền chắc theo thời gian.
</p>

<h3>4. Một bao xi măng PCB40 nặng bao nhiêu kg?</h3>
<p>
  Trọng lượng tiêu chuẩn của xi măng Vicem Hà Tiên PCB40 là <strong>50kg/bao</strong>.
</p>

<h3>5. Xi măng Vicem Hà Tiên PCB40 có phù hợp cho nhà dân không?</h3>
<p>
  Có. Đây là loại xi măng được sử dụng rất phổ biến trong xây dựng nhà ở dân dụng nhờ khả năng thi công dễ,
  độ bám dính tốt và chi phí hợp lý.
</p>

<h3>6. Giá xi măng Vicem Hà Tiên PCB40 hiện nay là bao nhiêu?</h3>
<p>
  Giá xi măng Vicem Hà Tiên PCB40 có thể thay đổi theo thời điểm và khu vực.
  Để biết giá chính xác và ưu đãi mới nhất, vui lòng liên hệ trực tiếp với nhà phân phối.
</p>

<h3>7. Bảo quản xi măng Vicem Hà Tiên như thế nào để đảm bảo chất lượng?</h3>
<ul>
  <li>Bảo quản nơi khô ráo, thoáng mát.</li>
  <li>Tránh tiếp xúc trực tiếp với nước và hơi ẩm.</li>
  <li>Xếp bao xi măng cách nền tối thiểu 30cm.</li>
  <li>Sử dụng theo nguyên tắc nhập trước – xuất trước.</li>
</ul>

  `,

    seo: {
      title: "Xi măng Vicem Hà Tiên PCB40 | Giá tốt tại Bình Dương",
      description:
        "Báo giá xi măng Vicem Hà Tiên PCB40 mới nhất. Giao nhanh, chất lượng cao, uy tín tại Bình Dương.",
    },
  },

  {
    id: 2,
    name: "Xi măng Vicem Hà Tiên Xây Tô",
    slug: "xi-mang-vicem-ha-tien-xay-to",
    description:
      "Xi măng chuyên dụng cho công tác xây và tô trát, cho bề mặt mịn, dễ thi công.",
    shortDescription: "Xi măng xây tô Vicem Hà Tiên – mịn, bền, dễ thi công.",
    price: 72000,
    unit: "bao 50kg",
    brand: "Vicem",
    images: ["/hatienxayto01_v2.avif"],
    updatedAt: "2025-12-29T14:34:08.166Z",
    content: `
<h2>HẠNG MỤC SỬ DỤNG</h2>
<p>
Xi măng Vicem Hà Tiên Xây Tô được sử dụng chuyên biệt cho các công tác xây, tô trát tường trong các công trình dân dụng và công nghiệp.
Sản phẩm cho bề mặt mịn, dễ thi công và tiết kiệm vật tư.
</p>

<h2>ƯU ĐIỂM NỔI BẬT</h2>
<ul>
  <li>Độ mịn cao, dễ thi công, hạn chế nứt nẻ.</li>
  <li>Độ bám dính tốt, tăng độ bền bề mặt.</li>
  <li>Phù hợp cho xây tô hoàn thiện trong nhà và ngoài trời.</li>
  <li>Tiết kiệm chi phí vật liệu.</li>
</ul>

<h2>HƯỚNG DẪN TỶ LỆ PHỐI TRỘN</h2>
<table>
  <tr><th>Hạng mục</th><th>Xi măng</th><th>Cát</th></tr>
  <tr><td>Xây tường</td><td>1</td><td>5</td></tr>
  <tr><td>Tô trát</td><td>1</td><td>4</td></tr>
</table>

<h2>CÁCH BẢO QUẢN</h2>
<ul>
  <li>Để nơi khô ráo, tránh ẩm ướt.</li>
  <li>Không để tiếp xúc trực tiếp với nền đất.</li>
  <li>Tránh mưa nắng trực tiếp.</li>
</ul>

<h2>CÂU HỎI THƯỜNG GẶP</h2>
<h3>Xi măng xây tô khác gì xi măng đa dụng?</h3>
<p>Xi măng xây tô có độ mịn cao hơn, giúp bề mặt hoàn thiện đẹp và dễ thi công.</p>


    `,
    seo: {
      title: "Xi măng Vicem Hà Tiên xây tô | Giá tốt tại Bình Dương",
      description:
        "Xi măng Vicem Hà Tiên xây tô chính hãng, giá tốt, giao nhanh trong ngày.",
    },
  },

  {
    id: 3,
    name: "Xi măng Hà Tiên 2 PCB40",
    slug: "xi-mang-ha-tien-2-pcb40",
    description:
      "Xi măng Hà Tiên PCB40 có cường độ cao, thích hợp cho móng, sàn, kết cấu bê tông.",
    shortDescription:
      "Xi măng Hà Tiên PCB40 chất lượng cao cho công trình bền vững.",
    price: 75000,
    unit: "bao 50kg",
    brand: "Hà Tiên",
    images: ["/hatien2-1.avif"],
    updatedAt: "2025-12-29T14:34:08.166Z",
    content: `
    <h2>GIỚI THIỆU SẢN PHẨM</h2>
    <p>
    Xi măng Hà Tiên PCB40 là dòng xi măng chất lượng cao, được sử dụng phổ biến trong các công trình dân dụng và công nghiệp.
    </p>
    
    <h2>ƯU ĐIỂM NỔI BẬT</h2>
    <ul>
      <li>Cường độ chịu nén cao.</li>
      <li>Độ bền lâu dài, ổn định.</li>
      <li>Phù hợp cho móng, dầm, sàn.</li>
    </ul>
    
    <h2>ỨNG DỤNG</h2>
    <ul>
      <li>Thi công móng nhà, móng cọc.</li>
      <li>Đổ bê tông sàn, dầm, cột.</li>
      <li>Các công trình dân dụng và công nghiệp.</li>
    </ul>
    
    <h2>BẢO QUẢN</h2>
    <p>
    Bảo quản xi măng nơi khô ráo, xếp trên pallet, tránh tiếp xúc trực tiếp với độ ẩm.
    </p>
    `,
    seo: {
      title: "Xi măng Hà Tiên PCB40 | Giá tốt – Giao nhanh",
      description:
        "Báo giá xi măng Hà Tiên PCB40 mới nhất. Chất lượng cao, giao nhanh toàn khu vực.",
    },
  },

  {
    id: 4,
    name: "Xi măng Vicem Hà Tiên Power Cement",
    slug: "xi-mang-vicem-ha-tien-power-cement",
    description:
      "Dòng xi măng cao cấp, chịu lực tốt, thích hợp cho nhiều hạng mục xây dựng.",
    shortDescription: "Xi măng Vicem Power Cement – bền chắc, ổn định.",
    price: 77000,
    unit: "bao 50kg",
    brand: "Vicem",
    images: ["/powercement.avif"],
    updatedAt: "2025-12-29T14:34:08.166Z",
    content: `
<h2>GIỚI THIỆU SẢN PHẨM</h2>
<p>
Xi măng Vicem Power Cement là dòng xi măng cao cấp, có khả năng chịu lực vượt trội,
phù hợp cho các công trình yêu cầu chất lượng cao.
</p>

<h2>ƯU ĐIỂM</h2>
<ul>
  <li>Khả năng chịu lực và độ bền cao.</li>
  <li>Ổn định trong điều kiện môi trường khắc nghiệt.</li>
  <li>Giảm nứt, tăng tuổi thọ công trình.</li>
</ul>

<h2>ỨNG DỤNG</h2>
<ul>
  <li>Công trình dân dụng cao tầng.</li>
  <li>Nhà xưởng, kho bãi, kết cấu chịu lực lớn.</li>
</ul>

<h2>BẢO QUẢN</h2>
<p>Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp và ẩm ướt.</p>
`,
    seo: {
      title: "Xi măng Vicem Power Cement | Giá tốt tại Bình Dương",
      description:
        "Xi măng Vicem Power Cement chất lượng cao, sử dụng linh hoạt cho nhiều công trình.",
    },
  },

  {
    id: 5,
    name: "Xi măng Hà Tiên Đa Dụng",
    slug: "xi-mang-ha-tien-da-dung",
    description:
      "Xi măng đa dụng phù hợp cho nhiều hạng mục xây dựng dân dụng.",
    shortDescription:
      "Xi măng Hà Tiên đa dụng – giải pháp kinh tế cho mọi công trình.",
    price: 77000,
    unit: "bao 50kg",
    brand: "Hà Tiên",
    images: ["/hatiendadung.avif"],
    updatedAt: "2025-12-29T14:34:08.166Z",
    content: `
<h2>GIỚI THIỆU</h2>
<p>
Xi măng Hà Tiên Đa Dụng phù hợp cho nhiều hạng mục xây dựng khác nhau, từ xây tô đến hoàn thiện.
</p>

<h2>ƯU ĐIỂM</h2>
<ul>
  <li>Dễ thi công, độ bám dính cao.</li>
  <li>Tiết kiệm chi phí xây dựng.</li>
  <li>Phù hợp nhiều loại công trình.</li>
</ul>

<h2>ỨNG DỤNG</h2>
<ul>
  <li>Xây tường, tô trát.</li>
  <li>Sửa chữa nhà ở, công trình dân dụng.</li>
</ul>

<h2>BẢO QUẢN</h2>
<p>Đặt sản phẩm nơi khô ráo, thoáng mát, tránh ẩm ướt.</p>
`,
    seo: {
      title: "Xi măng Hà Tiên đa dụng | Giá tốt tại Bình Dương",
      description: "Xi măng Hà Tiên đa dụng, chất lượng ổn định, giá hợp lý.",
    },
  },

  {
    id: 6,
    name: "Xi măng Bình Dương",
    slug: "xi-mang-binh-duong",
    description:
      "Xi măng chất lượng cao phục vụ xây dựng dân dụng và công nghiệp.",
    shortDescription: "Xi măng Bình Dương – lựa chọn phổ biến cho công trình.",
    price: 73000,
    unit: "bao 50kg",
    brand: "Bình Dương",
    images: ["/ximangbinhduong.avif"],
    updatedAt: "2025-12-29T14:34:08.166Z",
    content: `
<h2>GIỚI THIỆU</h2>
<p>
Xi măng Bình Dương là sản phẩm được sử dụng rộng rãi trong xây dựng dân dụng nhờ chất lượng ổn định và giá thành hợp lý.
</p>

<h2>ƯU ĐIỂM</h2>
<ul>
  <li>Giá thành cạnh tranh.</li>
  <li>Dễ thi công, phù hợp nhiều công trình.</li>
  <li>Đảm bảo độ bền và tính ổn định.</li>
</ul>

<h2>ỨNG DỤNG</h2>
<ul>
  <li>Xây nhà dân dụng.</li>
  <li>Công trình nhỏ và vừa.</li>
</ul>

<h2>BẢO QUẢN</h2>
<p>Bảo quản nơi khô ráo, thoáng mát, tránh ẩm ướt.</p>
`,
    seo: {
      title: "Xi măng Bình Dương | Báo giá mới nhất",
      description:
        "Cung cấp xi măng Bình Dương chất lượng cao, giao hàng nhanh.",
    },
  },
  {
    id: 7,
    name: "Xi măng Starmax",
    slug: "xi-mang-starmax",
    description:
      "Xi măng Starmax là dòng xi măng chất lượng cao, được sử dụng phổ biến trong các công trình dân dụng và công nghiệp nhờ độ bền ổn định và khả năng thi công linh hoạt.",
    shortDescription:
      "Xi măng Starmax – chất lượng ổn định, giá thành hợp lý cho mọi công trình.",
    price: 73000,
    unit: "bao 50kg",
    brand: "Starmax",
    images: ["/starmax-1.avif"],
    updatedAt: "2025-12-29T14:34:08.166Z",
    content: `
  <h2>GIỚI THIỆU</h2>
  <p>
  Xi măng Starmax là sản phẩm được sản xuất theo tiêu chuẩn chất lượng cao, phù hợp cho nhiều hạng mục xây dựng khác nhau.
  Sản phẩm đảm bảo độ bền, độ ổn định và khả năng thi công linh hoạt.
  </p>
  
  <h2>ƯU ĐIỂM NỔI BẬT</h2>
  <ul>
    <li>Chất lượng ổn định, dễ sử dụng.</li>
    <li>Khả năng kết dính tốt, hạn chế nứt gãy.</li>
    <li>Phù hợp cho cả xây dựng dân dụng và công nghiệp.</li>
    <li>Giá thành hợp lý, tiết kiệm chi phí.</li>
  </ul>
  
  <h2>ỨNG DỤNG</h2>
  <ul>
    <li>Xây dựng nhà ở dân dụng.</li>
    <li>Thi công móng, tường, cột, sàn.</li>
    <li>Các công trình cải tạo và sửa chữa.</li>
  </ul>
  
  <h2>BẢO QUẢN</h2>
  <p>
  Bảo quản xi măng nơi khô ráo, thoáng mát, tránh tiếp xúc trực tiếp với nước.
  Xếp bao cách mặt đất tối thiểu 30cm để đảm bảo chất lượng lâu dài.
  </p>
  `,
    seo: {
      title: "Xi măng Starmax | Giá xi măng Starmax mới nhất",
      description:
        "Xi măng Starmax chất lượng cao, giá tốt, phù hợp cho xây dựng dân dụng và công nghiệp. Cập nhật giá mới nhất hôm nay.",
    },
  },
];
