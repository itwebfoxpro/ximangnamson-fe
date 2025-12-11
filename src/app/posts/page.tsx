// app/posts/page.tsx
"use client";

import React from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import styles from "./posts.module.scss";

export default function PostsPage() {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.container}>
        <h1>Quản lý bài viết</h1>
        <p className={styles.subtitle}>
          Danh sách bài viết và thao tác quản lý
        </p>

        <div className={styles.box}>
          <p>Chức năng quản lý bài viết sẽ được hiển thị ở đây.</p>
        </div>
      </main>
    </div>
  );
}
