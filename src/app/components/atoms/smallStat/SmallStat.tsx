//TODO: Refactor. Use already implemented atoms

import React from "react";
import styles from "./SmallStat.module.scss";
import { variantToClassname } from "@/utils";

export type TSmallStatVariants = "green" | "gray";
export interface ISmallStat {
  readonly title: string;
  readonly value: string;
  readonly variant: TSmallStatVariants;
}

export default function SmallStat({ title, value, variant }: ISmallStat) {
  const variantClass = variantToClassname(variant, styles);
  const smallStatClass = `${styles.small_stat} ${variantClass}`;

  return (
    <div className={smallStatClass}>
      <div className={styles.small_stat__heading}>
        <span className={styles.heading__separator}></span>
        <span className={styles.heading__title}>{title}</span>
      </div>
      <span className={styles.small_stat__value}>{value}</span>
    </div>
  );
}
