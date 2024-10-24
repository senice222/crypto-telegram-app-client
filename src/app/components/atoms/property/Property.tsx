import React from "react";
import styles from "./Property.module.scss";
import checkmarkIcon from "@/assets/icons/checkmark-20.svg";
import Image from "next/image";
import Label from "../label/Label";

export interface IProperty {
  readonly text: string;
}

export default function Property({ text }: IProperty) {
  return (
    <div className={styles.property}>
      <Image src={checkmarkIcon} alt="" width={20} height={20} unoptimized />
      <Label text={text} color="white" variant="default" />
    </div>
  );
}
