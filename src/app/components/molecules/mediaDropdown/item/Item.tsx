import React from "react";
import styles from "./Item.module.scss";
import angleRightSmallIcon from "@/assets/icons/angle-right-small.svg";
import checkmarkIcon from "@/assets/icons/checkmark.svg";
import Image from "next/image";

export function isSelectableItem(
  item: Omit<TMediaDropdownItem, "selected" | "id">
): item is SelectableItem {
  return item.selectable === true;
}

interface IItemBase {
  text: string;
  icon: React.ReactElement<SVGElement>;
}

export interface SelectableItem extends IItemBase {
  readonly id: number;
  readonly selectable: true;
  readonly selected: boolean;
  readonly isArrow?: false;
  readonly handleOnClick: (id: number) => void;
}

export interface ArrowItem extends IItemBase {
  readonly id: undefined;
  readonly selectable?: false;
  readonly isArrow: true | undefined;
  readonly selected?: undefined;
  readonly handleOnClick: () => void;
}

export type TMediaDropdownItem = SelectableItem | ArrowItem;

export default function Item({
  selectable,
  selected,
  isArrow,
  icon,
  text,
  handleOnClick,
  id,
}: TMediaDropdownItem) {
  const selectedClass = `${
    selectable ? (selected ? `${styles.selected}` : "") : ""
  }`;
  const itemClass = `${styles.item} ${selectedClass}`;

  const RenderIcon = () => {
    if (selectable && selected) {
      return (
        <Image
          src={checkmarkIcon.src}
          alt="Checkmark"
          width={16}
          height={16}
          unoptimized
        />
      );
    } else if (isArrow) {
      return (
        <Image
          src={angleRightSmallIcon.src}
          alt="Arrow"
          width={24}
          height={24}
          unoptimized
        />
      );
    }
    return null;
  };

  const onClickHandler = () => {
    if (selectable && selected) {
      handleOnClick(id);
    } else if (selectable === undefined) {
      handleOnClick();
    }
  };

  return (
    <div className={itemClass} onClick={onClickHandler}>
      <div className={styles.item__info}>
        {icon}
        <span className={styles.info__text}>{text}</span>
      </div>
      <RenderIcon />
    </div>
  );
}
