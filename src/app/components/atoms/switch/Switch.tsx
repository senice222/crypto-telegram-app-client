import React from "react";
import styles from "./Switch.module.scss";

export interface ISwitchItem {
  readonly id: number;
  readonly text: string;
}

export interface ISwitch {
  readonly items: ISwitchItem[];
  readonly activeItem: number;
  readonly handleOnClick: (id: number) => void;
}

const getActiveClass = (id: number, activeId: number) =>
  id === activeId ? styles.active : "";

export default function Switch({ items, handleOnClick, activeItem }: ISwitch) {
  return (
    <div className={styles.switch}>
      {items.map((item) => {
        const activeClass = getActiveClass(item.id, activeItem);
        const switchItemClass = `${styles.switch__item} ${activeClass}`;

        return (
          <span
            className={switchItemClass}
            key={item.id}
            onClick={() => handleOnClick(item.id)}
          >
            {item.text}
          </span>
        );
      })}
    </div>
  );
}
