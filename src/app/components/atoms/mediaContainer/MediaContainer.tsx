import React from "react";
import styles from "./MediaContainer.module.scss";
import { variantToClassname } from "@/utils";

export type TMediaContainerHoverPresets =
  | "hover-default"
  | "hover-rotate"
  | "hover-stroke"
  | "hover-grey";

export interface IMediaContainer {
  readonly dimensions?: number;
  readonly handleOnClick?: () => void;
  readonly children: React.JSX.Element;
  readonly customStyles?: React.CSSProperties;
  readonly hoverPreset?: TMediaContainerHoverPresets;
}

export default function MediaContainer({
  hoverPreset,
  children,
  dimensions,
  customStyles,
  handleOnClick,
}: IMediaContainer) {
  const hoverClass = variantToClassname(hoverPreset, styles);
  const mediaContainerClass = `${styles.media_container} ${hoverClass}`;

  const onClickHandler = () => {
    if (typeof handleOnClick === "function") {
      handleOnClick();
    }
  };

  const customDimensions: React.CSSProperties = {
    ...customStyles,
    width: dimensions,
    height: dimensions,
  };

  return (
    <div
      style={customDimensions}
      onClick={onClickHandler}
      className={`${mediaContainerClass}`}
    >
      {children}
    </div>
  );
}
