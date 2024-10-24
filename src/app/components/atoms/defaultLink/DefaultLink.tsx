import React from "react";
import styles from "./DefaultLink.module.scss";
import Link from "next/link";
import { IDefaultLink } from "@/types/ui";
import { variantToClassname } from "@/utils";

export default function DefaultLink({
  href,
  text,
  customStyles,
  color,
  variant,
}: IDefaultLink) {
  const variantClass = variantToClassname(variant, styles);
  const colorClass = variantToClassname(color, styles);
  const defaultLinkClass = `${styles.default_link} ${variantClass} ${colorClass}`;

  return (
    <Link href={href} style={customStyles} className={defaultLinkClass}>
      {text}
    </Link>
  );
}
