import React from "react";
import styles from "./OlList.module.scss";

export interface IOlListItem {
  readonly text: string;
}

export interface IOlList {
  readonly items: IOlListItem[];
  readonly padding?: string;
}

export default function OlList({ items, padding }: IOlList) {
  const olListStyles: React.CSSProperties = {
    padding,
  };

  return (
    <ol className={styles.ol} style={olListStyles}>
      {items.map((item, index) => (
        <li key={index} className={styles.li}>
          {item.text}
        </li>
      ))}
    </ol>
  );
}
