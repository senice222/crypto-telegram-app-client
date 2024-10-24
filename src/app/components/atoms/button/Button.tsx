import React from "react";
import styles from "./Button.module.scss";
import { IButton } from "@/types/ui";
import { variantToClassname } from "@/utils";

export default function Button({ label, variant, handleOnClick }: IButton) {
  const variantClass = variantToClassname(variant, styles);
  const buttonClass = `${styles.button} ${variantClass}`;

  return (
    <button onClick={handleOnClick} className={buttonClass}>
      {label}
    </button>
  );
}
