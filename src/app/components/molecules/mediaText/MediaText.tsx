import React from "react";
import styles from "./MediaText.module.scss";
import DynamicMedia, {
  IDynamicMedia,
} from "@/components/atoms/dynamicMedia/DynamicMedia";
import Label from "@/components/atoms/label/Label";
import { ILabel } from "@/types/ui";

export interface IMediaText extends IDynamicMedia, ILabel {}

export default function MediaText({
  media,
  text,
  color,
  variant,
  customStyles,
  width,
  height,
  unoptimized,
}: IMediaText) {
  return (
    <div className={styles.media_text}>
      <DynamicMedia
        media={media}
        width={width}
        height={height}
        unoptimized={unoptimized}
      />
      <Label
        text={text}
        color={color}
        customStyles={customStyles}
        variant={variant}
      />
    </div>
  );
}
