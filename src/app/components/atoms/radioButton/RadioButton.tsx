import React from "react";
import styles from "./RadioButton.module.scss";
import Image from "next/image";
import Label from "../label/Label";
import Checkbox from "../checkbox/Checkbox";

export interface IRadionButton {
  readonly media: string;
  readonly label: string;
  readonly selected: boolean;
  readonly handleOnClick: () => void;
}

export default function RadioButton({
  media,
  label,
  selected,
  handleOnClick,
}: IRadionButton) {
  const selectedClass = selected ? styles.selected : "";
  const radioButtonClass = `${styles.radio_button} ${selectedClass}`;

  return (
    <div className={radioButtonClass} onClick={handleOnClick}>
      <div className={styles.radio_button__info}>
        <Image
          src={media}
          alt=""
          width={24}
          height={24}
          unoptimized
          className={styles.info__img}
        />
        <Label text={label} variant="small" color="white" />
      </div>
      <Checkbox checked={selected} />
    </div>
  );
}
