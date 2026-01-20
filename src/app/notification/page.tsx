"use client";

import { useEffect, useState } from "react";
import styles from "./Note.module.scss";
import Sidebar from "@/components/Dashboard/Sidebar";
import BottomBar from "@/components/Dashboard/BottomBar/BottomBar";
import { useIsMobile } from "@/hooks/useIsMobile";

type Note = {
  id: number;
  title: string;
  content: string;
  device: string;
  createdAt: string;
  is_read: boolean;
};

export default function NotificationPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetch("https://api.namsonjsc.vn/api/notes")
      .then((res) => res.json())
      .then((res) => {
        setNotes(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function markAsRead(id: number) {
    await fetch(`https://api.namsonjsc.vn/api/notes/${id}/read`, {
      method: "PUT",
    });

    // update state local
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );
  }

  if (loading)
    return <div className={styles.loading}>Đang tải thông báo...</div>;

  return (
    <div className={styles.container}>
      {isMobile ? <BottomBar /> : <Sidebar />}
      <div className={styles.wrapper}>
        <h1 className={styles.title}>📢 Thông báo liên hệ khách hàng</h1>

        {notes.length === 0 && (
          <div className={styles.empty}>Chưa có thông báo nào.</div>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            className={`${styles.card} ${!note.is_read ? styles.unread : ""}`}
            onClick={() => {
              if (!note.is_read) markAsRead(note.id);
            }}
          >
            <div className={styles.header}>
              <h3>{note.title}</h3>

              <div className={styles.right}>
                {!note.is_read && (
                  <span className={styles.badge}>Chưa đọc</span>
                )}
                <span className={styles.time}>
                  {new Date(note.createdAt).toLocaleString("vi-VN")}
                </span>
              </div>
            </div>

            <p className={styles.content}>{note.content}</p>

            {note.device && (
              <div className={styles.device}>📱 Thiết bị: {note.device}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
