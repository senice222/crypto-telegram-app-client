import React from "react";
import styles from "./Separator.module.scss";
import { variantToClassname } from "@/utils";

export type TSeparatorVariants = "vertical" | "horizontal";
export interface ISeparator {
  readonly padding?: string;
  readonly variant?: TSeparatorVariants;
  readonly width?: number;
  readonly height?: number;
}

export default function Separator({
  padding,
  variant = "horizontal",
  width,
  height,
}: ISeparator) {
  const variantClass = variantToClassname(variant, styles);
  const separatorClass = `${styles.separator} ${variantClass}`;

  const separatorStyles: React.CSSProperties = {
    padding,
    width,
    height,
  };

  return (
    <div style={separatorStyles} className={separatorClass}>
      <div className={styles.separator__inner} />
    </div>
  );
}
