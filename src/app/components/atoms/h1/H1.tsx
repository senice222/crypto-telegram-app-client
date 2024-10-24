import React from "react";
import styles from "./H1.module.scss";
import { IH1 } from "@/types/ui";
import { variantToClassname } from "@/utils";

export default function H1({ text, customStyles, color }: IH1) {
  const colorClass = variantToClassname(color, styles);
  const h1Class = `${styles.h1} ${colorClass}`;

  return (
    <h1 style={customStyles} className={h1Class}>
      {text}
    </h1>
  );
}
