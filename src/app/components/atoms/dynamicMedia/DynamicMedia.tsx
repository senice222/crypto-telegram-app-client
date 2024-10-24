import { TDynamicMedia } from "@/types/ui";
import { isSvgElement } from "@/utils";
import Image from "next/image";
import React from "react";

export interface IDynamicMedia {
  readonly media: TDynamicMedia;
  readonly width?: number;
  readonly height?: number;
  readonly unoptimized?: boolean;
  readonly customStyles?: React.CSSProperties;
}

export default function DynamicMedia({
  media,
  width,
  height,
  unoptimized = false,
  customStyles,
}: IDynamicMedia) {
  const imageStyles: React.CSSProperties = {
    ...customStyles,
    objectFit: !width && !height ? "none" : "initial",
  };

  if (typeof media === "string") {
    return (
      <Image
        src={media}
        alt=""
        width={width || 28}
        height={height || 28}
        unoptimized={unoptimized}
        style={imageStyles}
      />
    );
  } else if (isSvgElement(media)) {
    return media;
  } else {
    console.error("Unsupported media type");
    return null;
  }
}
