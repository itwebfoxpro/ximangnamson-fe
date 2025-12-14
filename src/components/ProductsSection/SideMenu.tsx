import React from "react";
import styles from "./SideMenu.module.scss";

export type SideMenuItem = {
  id: number | string;
  name: string;
};

type Props = {
  items: SideMenuItem[];
  activeId?: number | string | null;
  onSelect?: (id: number | string | null) => void;
  /** optional label for the menu header */
  title?: string;
};

export default function SideMenu({
  items,
  activeId = null,
  onSelect,
  title = "Danh mục sản phẩm",
}: Props) {
  const [open, setOpen] = React.useState(false);

  function handleSelect(id: number | string | null) {
    onSelect?.(id);
    // on mobile, close after select
    setOpen(false);
  }

  return (
    <aside className={styles.wrapper} aria-label={title}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        <button
          className={styles.toggle}
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-controls="side-menu-list"
          aria-label={open ? "Đóng menu" : "Mở menu"}
        >
          <span className={styles.burger} aria-hidden />
        </button>
      </div>

      <nav
        id="side-menu-list"
        className={`${styles.list} ${open ? styles.open : ""}`}
        role="navigation"
        aria-label={title}
      >
        <ul role="list">
          {items.map((it) => (
            <li key={it.id} role="listitem">
              <button
                className={`${styles.item} ${
                  activeId === it.id ? styles.active : ""
                }`}
                onClick={() => handleSelect(it.id)}
                aria-pressed={activeId === it.id}
              >
                <i className="fa-solid fa-angles-right"></i>
                {it.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
