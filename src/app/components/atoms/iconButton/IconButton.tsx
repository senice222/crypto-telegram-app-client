import React from "react";
import styles from "./IconButton.module.scss";
import { IIconButton, TARROWS } from "@/types/ui";
import { isSvgElement, variantToClassname } from "@/utils";
import { TArrows } from "@/types/ui";

import Image from "next/image";
import {
  arrowRightIcon,
  arrowUpRightIcon,
  whiteArrowRightIcon,
  whiteArrowUpRightIcon,
} from "./presetIcons";

const arrowIconMap: Record<TArrows, React.ReactElement<SVGElement>> = {
  "up-right": arrowUpRightIcon(),
  right: arrowRightIcon(),
  "white-up-right": whiteArrowUpRightIcon(),
  "white-right": whiteArrowRightIcon(),
};

export const getArrowIcon = (
  arrow: TArrows
): React.ReactElement<SVGElement> => {
  return arrowIconMap[arrow];
};

export const isTArrows = (icon: unknown): icon is TArrows => {
  return (
    typeof icon === "string" && (TARROWS as readonly string[]).includes(icon)
  );
};

interface IIconContainer {
  readonly icon: unknown;
  readonly width?: number;
  readonly height?: number;
}

const IconContainer: React.FC<IIconContainer> = ({
  icon,
  width = 24,
  height = 24,
}) => {
  if (isSvgElement(icon)) {
    return <span className={styles.button__icon}>{icon}</span>;
  }

  if (isTArrows(icon)) {
    const arrowIcon = getArrowIcon(icon as TArrows);
    return <span className={styles.button__icon}>{arrowIcon}</span>;
  }

  if (typeof icon === "string") {
    return (
      <Image src={icon as string} alt="Icon" width={width} height={height} />
    );
  }

  return null;
};

export default function IconButton({
  label,
  variant,
  handleOnClick,
  media,
  arrow,
  arrowColor,
  width,
  height,
  disabled,
}: IIconButton) {
  const variantClass = variantToClassname(variant, styles);
  const arrowColorClass = variantToClassname(arrowColor, styles);
  const arrowClass =
    typeof arrow === "string" ? variantToClassname(variant, styles) : null;
  const buttonClass = `${styles.icon_button} ${variantClass} ${arrowClass} ${arrowColorClass}`;

  const onClickHandler = () => {
    if (!disabled) handleOnClick();
  };

  return (
    <button
      onClick={onClickHandler}
      className={buttonClass}
      disabled={disabled}
    >
      <IconContainer icon={media} width={width} height={height} />
      {label}
      <IconContainer icon={arrow} width={width} height={height} />
    </button>
  );
}
