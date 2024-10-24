import React from "react";
import styles from "./H2.module.scss";
import { IH2 } from "@/types/ui";
import { variantToClassname } from "@/utils";

export default function H2({ text, customStyles, color, padding }: IH2) {
  const colorClass = variantToClassname(color, styles);
  const h2Class = `${styles.h2} ${colorClass}`;

  const h2Styles: React.CSSProperties = {
    ...customStyles,
    padding,
  };

  return (
    <h2 style={h2Styles} className={h2Class}>
      {text}
    </h2>
  );
}
