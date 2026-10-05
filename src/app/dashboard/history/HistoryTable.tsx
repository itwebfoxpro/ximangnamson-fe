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
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>Sản phẩm</th>
            <th>SL</th>
            <th>Giá gốc</th>
            <th>Giá bán</th>
            <th>Tổng</th>
            <th>Thanh toán</th>
            <th>Ngày</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>
                <div className={styles.customerName}>{it.user}</div>
                {it.address && <div className={styles.subText}>{it.address}</div>}
              </td>
              <td>{it.Category?.name || "—"}</td>
              <td className={styles.numberCell}>{it.quantity}</td>
              <td className={styles.numberCell}>
                {Number(it.ori_price || 0).toLocaleString("vi-VN")}₫
              </td>
              <td className={styles.numberCell}>
                {Number(it.price || 0).toLocaleString("vi-VN")}₫
              </td>
              <td className={styles.totalCell}>
                {(Number(it.price || 0) * Number(it.quantity || 0)).toLocaleString("vi-VN")}₫
              </td>
              <td>
                <span className={it.paid ? styles.paidBadge : styles.unpaidBadge}>
                  {it.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                </span>
              </td>
              <td className={styles.dateCell}>
                {new Date(it.createdAt).toLocaleDateString("vi-VN")}
              </td>
              <td>
                <div className={styles.groupBtn}>
                  <button className={styles.fixBtn} onClick={() => onEdit(it)}>Sửa</button>
                  <button className={styles.deleteBtn} onClick={() => onDelete(it.id)}>Xoá</button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={9} className={styles.empty}>Không có bản ghi phù hợp.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
