import React from "react";
import styles from "./Header.module.scss";
import Brand from "./brand/Brand";
import Burger from "./burger/Burger";

export default function Header() {
  return (
    <div className={styles.header}>
      <Brand />
      <Burger />
    </div>
  );
}
