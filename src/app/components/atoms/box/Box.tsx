import React from "react";
import styles from "./Box.module.scss";
import { IBox } from "@/types/ui";
import { variantToClassname } from "@/utils";

const scssVar = (
  variable: number | string | undefined,
  name: string
): React.CSSProperties => {
  return variable !== undefined
    ? {
        [`--${name}`]:
          typeof variable === "number" ? `${variable}px` : variable,
      }
    : {};
};

export default function Box({
  children,
  variant,
  padding,
  borderRadius,
  border,
  gap,
  direction,
  customStyles,
}: IBox) {
  const variantClass = variantToClassname(variant, styles);
  const borderClass = variantToClassname(border, styles);
  const directionClass = variantToClassname(direction, styles);

  const boxClass = [styles.box, variantClass, borderClass, directionClass]
    .filter(Boolean)
    .join(" ");

  const boxStyles: React.CSSProperties = {
    ...customStyles,
    padding,
    ...scssVar(gap, "gap"),
    ...scssVar(borderRadius, "border-radius"),
  };

  return (
    <div className={boxClass} style={boxStyles}>
      {children}
    </div>
  );
}
