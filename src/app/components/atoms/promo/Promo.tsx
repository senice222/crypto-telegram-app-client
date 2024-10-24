import React from "react";
import styles from "./Promo.module.scss";
import { TDynamicMedia } from "@/types/ui";
import DynamicMedia from "../dynamicMedia/DynamicMedia";

export interface IPromo {
  readonly media: TDynamicMedia;
  readonly text: string;
}

export default function Promo({ media, text }: IPromo) {
  return (
    <div className={styles.promo}>
      <DynamicMedia media={media} />
      <span className={styles.promo__text}>{text}</span>
    </div>
  );
}
