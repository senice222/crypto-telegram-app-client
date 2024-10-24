import React from "react";
import styles from "./Info.module.scss";
import infoIcon from "@/assets/icons/info.svg";
import Image from "next/image";

export interface IInfo {
  readonly text: string;
}

export default function Info({ text }: IInfo) {
  return (
    <div className={styles.info}>
      <Image src={infoIcon.src} alt="" width={20} height={20} unoptimized />
      <span className={styles.info__text}>{text}</span>
    </div>
  );
}
