// components/Dashboard/Pagination.tsx
"use client";

import React from "react";
import styles from "./usersTable.module.scss";

type Props = {
  page: number;
  pages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, pages, onChange }: Props) {
  if (pages <= 1) return null;

  const prev = () => onChange(Math.max(1, page - 1));
  const next = () => onChange(Math.min(pages, page + 1));

  return (
    <div className={styles.pagination}>
      <button onClick={prev} disabled={page <= 1}>
        Prev
      </button>
      <span>
        Page {page} / {pages}
      </span>
      <button onClick={next} disabled={page >= pages}>
        Next
      </button>
    </div>
  );
}
