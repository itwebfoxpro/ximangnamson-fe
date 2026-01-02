"use client";

import { useEffect, useState } from "react";
import styles from "./TableOfContents.module.scss";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("article h2, article h3")
    ) as HTMLHeadingElement[];

    const items: TocItem[] = headings.map((el) => {
      if (!el.id) {
        el.id =
          el.textContent
            ?.toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-") || "";
      }

      return {
        id: el.id,
        text: el.textContent || "",
        level: Number(el.tagName.replace("H", "")),
      };
    });

    setToc(items);
  }, []);

  if (toc.length === 0) return null;

  return (
    <aside className={styles.toc}>
      <div className={styles.title}>Mục lục bài viết</div>
      <ul>
        {toc.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? styles.sub : undefined}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
