"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./ArticlesTab.module.scss";
import ImageLibraryModal from "./ImageLibraryModal";
import PostsListModal from "./PostsListModal";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

/**
 * CKEditor React component (client only)
 */
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((m) => m.CKEditor),
  { ssr: false }
);

export default function ArticlesTab() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [content, setContent] = useState("");
  const [Editor, setEditor] = useState<any>(null);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [showImageLibrary, setShowImageLibrary] = useState(false);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saving, setSaving] = useState(false);
  const [showPostsList, setShowPostsList] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  /**
   * Load ClassicEditor (CLIENT ONLY)
   */
  useEffect(() => {
    const ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
    setEditor(() => ClassicEditor);
  }, []);

  if (!Editor) return null;

  /**
   * Reset modal state
   */
  const closeEditorModal = () => {
    setIsOpenModal(false);
    setEditingPostId(null);
    setTitle("");
    setContent("");
    setExcerpt("");
    setThumbnail("");
    setStatus("draft");
  };
  
  /**
   * Save article (CALL API REAL)
   */
  const handleAddArticle = async () => {
    const payload = {
      title,
      content,
      excerpt,
      thumbnail,
      status,
    };

    const url = editingPostId
      ? `${API_BASE}/api/posts/${editingPostId}`
      : `${API_BASE}/api/posts`;

    const method = editingPostId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Lưu bài viết thất bại");
      return;
    }

    closeEditorModal();
    setEditingPostId(null);
  };
  

  /**
   * Insert image HTML into CKEditor
   */
  const insertImage = (filenameOrUrl: string) => {
    if (!editorInstance) return;

    const src = filenameOrUrl.startsWith("http")
      ? filenameOrUrl
      : `${API_BASE}${filenameOrUrl}`;

    const html = `<img src="${src}" alt="" />`;

    const viewFragment = editorInstance.data.processor.toView(html);
    const modelFragment = editorInstance.data.toModel(viewFragment);

    editorInstance.model.change(() => {
      editorInstance.model.insertContent(
        modelFragment,
        editorInstance.model.document.selection
      );
    });
  };
  const openEditPost = async (postId: number) => {
    const res = await fetch(`${API_BASE}/api/posts/${postId}`, {
      credentials: "include",
    });

    const post = await res.json();

    setTitle(post.title);
    setContent(post.content);
    setExcerpt(post.excerpt || "");
    setThumbnail(post.thumbnail || "");
    setStatus(post.status);

    setEditingPostId(postId);
    setIsOpenModal(true);
  };
  

  return (
    <div className={styles.container}>
      {/* ===== Header ===== */}
      <div className={styles.titleGroup}>
        <h2 className={styles.title}>Danh sách bài viết</h2>

        <button className={styles.addBtn} onClick={() => setIsOpenModal(true)}>
          + Thêm bài viết
        </button>
      </div>
      <PostsListModal onEdit={(id) => openEditPost(id)} />

      {/* ===== Modal viết bài ===== */}
      {isOpenModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Thêm bài viết mới</h3>
              <button
                className={styles.imageBtn}
                onClick={() => setShowImageLibrary(true)}
              >
                + Chèn hình ảnh
              </button>
            </div>

            {/* Title */}
            <input
              className={styles.titleInput}
              type="text"
              placeholder="Tiêu đề bài viết"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Content */}
            <CKEditor
              editor={Editor}
              data={content}
              onReady={setEditorInstance}
              onChange={(_, editor) => setContent(editor.getData())}
            />

            {/* Extra fields */}
            <div className={styles.extraFields}>
              <div className={styles.field}>
                <label>Mô tả ngắn</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Mô tả ngắn cho bài viết"
                  rows={3}
                />
              </div>

              <div className={styles.field}>
                <label>Ảnh đại diện (URL)</label>
                <input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className={styles.field}>
                <label>Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as "draft" | "published")
                  }
                >
                  <option value="draft">Nháp</option>
                  <option value="published">Xuất bản</option>
                </select>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={closeEditorModal}
                disabled={saving}
              >
                Huỷ
              </button>
              <button
                className={styles.confirmBtn}
                onClick={handleAddArticle}
                disabled={saving || !content.trim()}
              >
                {saving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Modal thư viện ảnh ===== */}
      {showImageLibrary && (
        <ImageLibraryModal
          onSelect={(url: string) => {
            insertImage(url);
            setShowImageLibrary(false);
          }}
          onClose={() => setShowImageLibrary(false)}
        />
      )}
    </div>
  );
}
