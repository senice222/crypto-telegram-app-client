import React from "react";
import styles from "./Label.module.scss";
import { ILabel } from "@/types/ui";
import { variantToClassname } from "@/utils";

export default function Label({
  text,
  variant,
  color,
  customStyles,
  padding,
}: ILabel) {
  const variantClass = variantToClassname(variant, styles);
  const colorClass = variantToClassname(color, styles);
  const labelClass = `${styles.label} ${variantClass} ${colorClass}`;

  const labelStyles: React.CSSProperties = {
    ...customStyles,
    padding,
  };

  return (
    <label style={labelStyles} className={labelClass}>
      {text}
    </label>
  );
}
