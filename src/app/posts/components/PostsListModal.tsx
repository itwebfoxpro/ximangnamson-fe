"use client";

import { useEffect, useState } from "react";
import styles from "./PostsListModal.module.scss";

const API_BASE = "https://api.ximangnamson.com";

interface Post {
  id: number;
  title: string;
  status: "draft" | "published";
  created_at: string;
}

export default function PostsListModal({ onEdit }: { onEdit: (postId: number) => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/posts`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    const ok = window.confirm("Bạn có chắc muốn xoá bài viết này?");
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/api/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Xoá thất bại");
      }

      // ✅ Xoá khỏi UI ngay, không cần reload
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error: any) {
      alert(error.message || "Có lỗi xảy ra khi xoá");
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        {loading ? (
          <p>Đang tải...</p>
        ) : posts.length === 0 ? (
          <p>Chưa có bài viết nào</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <span
                      className={
                        post.status === "published"
                          ? styles.published
                          : styles.draft
                      }
                    >
                      {post.status}
                    </span>
                  </td>
                  <td>{new Date(post.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className={styles.groupButton}>
                      <button onClick={() => handleDelete(post.id)}>Xoá</button>{" "}
                      <button onClick={() => onEdit(post.id)}>Sửa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
