"use client";

import { useState } from "react";
import ImagesTab from "./components/ImagesTab";
import ArticlesTab from "./components/ArticlesTab";
import Sidebar from "@/components/Dashboard/Sidebar";
import styles from "./page.module.scss";

export default function PostsPage() {
  const [tab, setTab] = useState<"images" | "articles">("articles");

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.container}>
        <h1>Quản lý bài viết</h1>
        <p>Danh sách bài viết và hình ảnh</p>

        <div className={styles.tabs}>
          <button
            onClick={() => setTab("articles")}
            className={`${styles.tabButton} ${
              tab === "articles" ? styles.activeTab : ""
            }`}
          >
            Bài viết
          </button>

          <button
            onClick={() => setTab("images")}
            className={`${styles.tabButton} ${
              tab === "images" ? styles.activeTab : ""
            }`}
          >
            Hình ảnh
          </button>
        </div>

        <div className={styles.content}>
          {tab === "articles" && <ArticlesTab />}
          {tab === "images" && <ImagesTab />}
        </div>
      </main>
    </div>
  );
}
