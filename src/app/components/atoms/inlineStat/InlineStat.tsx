import React from "react";
import styles from "./InlineStat.module.scss";

export interface IInlineStat {
  readonly label: string;
  readonly value: string;
}

export default function InlineStat({ label, value }: IInlineStat) {
  return (
    <div className={styles.inline_stat}>
      <span className={styles.inline_stat__label}>{label}</span>
      <span className={styles.inline_stat__value}>{value}</span>
    </div>
  );
}
