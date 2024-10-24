import React from "react";
import styles from "./Guarantee.module.scss";
import greenShieldIcon from "@/assets/icons/green-shield.svg";
import Image from "next/image";
import Label from "../label/Label";

export interface IGuarantee {
  readonly icon?: string;
  readonly text: string;
  readonly description?: string;
}

export default function Guarantee({
  icon = greenShieldIcon.src,
  text,
  description,
}: IGuarantee) {
  return (
    <div className={styles.guarantee}>
      <div className={styles.guarantee__heading}>
        <Image
          src={icon}
          alt="Guarantee icon"
          width={20}
          height={20}
          unoptimized
        />
        <span className={styles.guarantee__text}>{text}</span>
      </div>
      {description && (
        <div className={styles.guarantee__description}>
          <div className={styles.description__separator}>
            <div className={styles.separator__inner} />
          </div>
          <Label text={description} variant="small" color="white" />
        </div>
      )}
    </div>
  );
}
