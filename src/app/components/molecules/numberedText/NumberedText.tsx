import React from "react";
import styles from "./NumberedText.module.scss";
import Label from "@/components/atoms/label/Label";

export interface INumberedText {
  number: number;
  text: string;
}

export default function NumberedText({ number, text }: INumberedText) {
  const formattedNumber = String(number);

  return (
    <div className={styles.numbered_text}>
      <Label color="gray" text={formattedNumber} variant="default" />
      <Label color="white" text={text} variant="default" />
    </div>
  );
}
