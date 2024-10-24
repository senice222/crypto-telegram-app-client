import React from "react";
import styles from "./Feature.module.scss";
import { TDynamicMedia } from "@/types/ui";
import DynamicMedia from "../dynamicMedia/DynamicMedia";
import Label from "../label/Label";

export interface IFeature {
  readonly media: TDynamicMedia;
  readonly title: string;
  readonly description: string;
}

export default function Feature({ media, title, description }: IFeature) {
  return (
    <div className={styles.feature}>
      <DynamicMedia media={media} width={48} height={48} unoptimized />
      <Label text={title} variant="default" color="white" />
      <Label text={description} variant="default" color="gray" />
    </div>
  );
}
