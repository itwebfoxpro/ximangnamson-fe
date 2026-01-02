"use client";

import Header from "./Header";

/**
 * Header dùng cho trang Tin tức / Blog
 * Không cần section, không có state
 */
export default function HeaderBlog() {
  return <Header activeSection="products" onChangeSection={() => {}} />;
}
