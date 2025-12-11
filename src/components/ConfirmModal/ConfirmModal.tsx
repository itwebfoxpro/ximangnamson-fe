"use client";

import styles from "./ConfirmModal.module.scss";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Xác nhận",
  cancelText = "Huỷ",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>
            {cancelText}
          </button>
          <button className={styles.confirm} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
