import React from "react";
import styles from "./H3.module.scss";
import { IH3 } from "@/types/ui";
import { variantToClassname } from "@/utils";

export default function H3({ text, customStyles, color, padding }: IH3) {
  const colorClass = variantToClassname(color, styles);
  const h3Class = `${styles.h3} ${colorClass}`;

  const h3Styles: React.CSSProperties = {
    ...customStyles,
    padding,
  };

  return (
    <h2 style={h3Styles} className={h3Class}>
      {text}
    </h2>
  );
}
