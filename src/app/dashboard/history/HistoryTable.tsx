import { useState, Fragment, useEffect } from "react";
import { HistoryItem } from "./types";
import styles from "./History.module.scss";

export function HistoryTable({
  items,
  onEdit,
  onDelete,
}: {
  items: HistoryItem[];
  onEdit: (item: HistoryItem) => void;
  onDelete: (id: number) => void;
}) {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  

  useEffect(() => {
    const allIds = new Set(items.map((it) => it.id));
    setExpandedIds(allIds);
  }, [items]);


  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Khách hàng</th>
        </tr>
      </thead>

      <tbody>
        {items.map((it) => {
          const isOpen = expandedIds.has(it.id);

          return (
            <Fragment key={it.id}>
              {/* Row chính */}
              <tr className={styles.customerRow}>
                <td onClick={() => toggle(it.id)}>
                  <span className={styles.customerName}>
                    {isOpen ? "▲" : "▼"} {it.user}
                  </span>
                  <span className={styles.arrow}>
                    {new Date(it.createdAt).toLocaleDateString("vi-VN")}{" "}
                    {isOpen ? "▲" : "▼"}
                  </span>
                </td>
              </tr>

              {/* Row chi tiết */}
              {isOpen && (
                <tr className={styles.detailRow}>
                  <td colSpan={1}>
                    <div className={styles.detailBox}>
                      <div>
                        <b>Sản phẩm:</b> {it.Category?.name}
                      </div>
                      <div>
                        <b>Số lượng:</b> {it.quantity}
                      </div>
                      <div>
                        <b>Giá:</b>{" "}
                        <span className={styles.price}>
                          {it.price.toLocaleString("vi-VN")}₫
                        </span>
                      </div>
                      <div>
                        <b>Tổng:</b>{" "}
                        <span className={styles.price}>
                          {(it.price * it.quantity).toLocaleString("vi-VN")}₫
                        </span>
                      </div>
                      <div>
                        <b>Địa chỉ:</b> {it.address ? it.address : ""}
                      </div>

                      <div className={it.paid ? styles.paid : styles.unpaid}>
                        {it.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                      </div>
                      <div>
                        <b>Ghi chú:</b>
                        {it.note ? it.note : ""}
                      </div>

                      <div className={styles.groupBtn}>
                        <button
                          className={styles.fixBtn}
                          onClick={() => onEdit(it)}
                        >
                          Sửa
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => onDelete(it.id)}
                        >
                          Xoá
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
