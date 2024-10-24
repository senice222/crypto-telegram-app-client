import React from "react";
import styles from "./Information.module.scss";
import Box from "@/components/atoms/box/Box";
import informationIcon from "@/assets/icons/information.svg";
import Image from "next/image";
import Label from "@/components/atoms/label/Label";
import NumberedText, { INumberedText } from "../numberedText/NumberedText";

export interface IInformation {
  items: INumberedText[];
}

export default function Information({ items }: IInformation) {
  return (
    <Box
      variant="light-gray"
      borderRadius={14}
      padding="16px"
      direction="flex-column"
      gap={14}
    >
      <div className={styles.information__heading}>
        <Image
          src={informationIcon.src}
          alt=""
          width={20}
          height={20}
          unoptimized
        />
        <Label variant="small" text="Information" color="gray" />
      </div>
      <div className={styles.information__content}>
        <div className={styles.content__separator}>
          <div className={styles.separator__inner} />
        </div>
        <div className={styles.content__list}>
          {items.map((item, index) => (
            <NumberedText key={index} {...item} />
          ))}
        </div>
      </div>
    </Box>
  );
}
