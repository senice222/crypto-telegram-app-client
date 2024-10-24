import React from "react";
import styles from "./InlineFeature.module.scss";
import { TDynamicMedia } from "@/types/ui";
import DynamicMedia from "../dynamicMedia/DynamicMedia";

export interface IInlineFeature {
  readonly media: TDynamicMedia;
  readonly text: string;
  readonly padding?: string;
}

export default function InlineFeature({
  media,
  text,
  padding = "6px",
}: IInlineFeature) {
  const inlineFeatureStyles: React.CSSProperties = {
    padding,
  };

  return (
    <div style={inlineFeatureStyles} className={styles.inline_feature}>
      <DynamicMedia media={media} />
      <span className={styles.inline_feature__text}>{text}</span>
    </div>
  );
}
