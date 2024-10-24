import React from "react";
import styles from "./Tag.module.scss";
import { ITag } from "@/types/ui";

export default function Tag({ text, customStyles }: ITag) {
  return (
    <div style={customStyles} className={styles.tag}>
      {text}
    </div>
  );
}
