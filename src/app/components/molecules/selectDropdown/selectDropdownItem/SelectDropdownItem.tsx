import styles from "./SelectDropdownItem.module.scss";
import DynamicMedia from "@/components/atoms/dynamicMedia/DynamicMedia";
import { TDynamicMedia } from "@/types/ui";
import DefaultAPWrapper from "../../defaultAPWrapper/DefaultAPWrapper";
import Image from "next/image";
import checkmarkIcon from "@/assets/icons/checkmark.svg";

const mediaStyles: React.CSSProperties = {
  border: "1px solid rgba(236, 243, 255, 0.10)",
  borderRadius: "50%",
};

const checkmarkStyles: React.CSSProperties = {
  width: 16,
  height: 16,
};

export interface ISelectDropdownItemBase {
  id: number | string;
  media: TDynamicMedia;
  text: string;
  width: number;
  height: number;
}

export interface ISelectDropdownItem extends ISelectDropdownItemBase {
  selected: boolean;
  handleOnSelect: (id: number | string) => void;
}

export default function SelectDropdownItem({
  id,
  media,
  text,
  selected,
  width,
  height,
  handleOnSelect,
}: ISelectDropdownItem) {
  const selectedClass = selected ? styles.selected : "";
  const selectDropdownItemClass = `${styles.select_dropdown_item} ${selectedClass}`;
  const animationKey = `checkmark-${selected}`;

  return (
    <div className={selectDropdownItemClass} onClick={() => handleOnSelect(id)}>
      <div className={styles.select_dropdown_item__info}>
        <DynamicMedia
          media={media}
          width={width}
          height={height}
          unoptimized
          customStyles={mediaStyles}
        />
        <span className={styles.info__text}>{text}</span>
      </div>
      <DefaultAPWrapper
        animationKey={animationKey}
        customStyles={checkmarkStyles}
        animationPreset="scale"
        conditionSatisfied={selected}
      >
        <Image
          src={checkmarkIcon.src}
          alt=""
          width={16}
          height={16}
          unoptimized
        />
      </DefaultAPWrapper>
    </div>
  );
}
