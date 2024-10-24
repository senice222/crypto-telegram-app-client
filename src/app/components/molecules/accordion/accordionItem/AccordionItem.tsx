import React, { useState } from "react";
import styles from "./AccordionItem.module.scss";
import Label from "@/components/atoms/label/Label";
import DefaultAPWrapper from "../../defaultAPWrapper/DefaultAPWrapper";

const arrow = (): React.ReactElement<SVGElement> => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
    >
      <path
        d="M4.99991 5.50002C4.78658 5.50002 4.57322 5.41838 4.41072 5.25588L1.07738 1.92255C0.751549 1.59671 0.751549 1.06999 1.07738 0.744161C1.40322 0.418328 1.92993 0.418328 2.25577 0.744161L4.99991 3.4883L7.74405 0.744161C8.06988 0.418328 8.5966 0.418328 8.92243 0.744161C9.24827 1.06999 9.24827 1.59671 8.92243 1.92255L5.5891 5.25588C5.4266 5.41838 5.21324 5.50002 4.99991 5.50002Z"
        fill="white"
      />
    </svg>
  );
};

const bodyStyles: React.CSSProperties = {
  overflow: "hidden",
};

export interface IAccordionItem {
  id: number;
  label: string;
  body: string;
}

export default function AccordionItem({ id, label, body }: IAccordionItem) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const formattedId = String(id);
  const labelColor = hovered || open ? "gray" : "white";
  const openClass = open ? styles.open : "";
  const accordionItemClass = `${styles.accordion_item} ${openClass}`;

  const handleOnMouseOver = () => {
    setHovered(true);
  };

  const handleOnMouseLeave = () => {
    setHovered(false);
  };

  const handleOnChangeOpenState = () => {
    setOpen(!open);
  };

  const arrowAnimationKey = `arrow-${hovered}`;
  const accordionBodyAnimationKey = `arrow-${open}`;
  const arrowCondition = hovered || open;
  return (
    <div
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleOnChangeOpenState}
      className={accordionItemClass}
    >
      <div className={styles.accordion__item__heading}>
        <div className={styles.heading__info}>
          <Label text={formattedId} variant="default" color="gray" />
          <Label text={label} variant="default" color={labelColor} />
        </div>
        <div className={styles.heading__arrow}>
          <DefaultAPWrapper
            animationKey={arrowAnimationKey}
            conditionSatisfied={arrowCondition}
          >
            {arrow()}
          </DefaultAPWrapper>
        </div>
      </div>
      <DefaultAPWrapper
        animationKey={accordionBodyAnimationKey}
        conditionSatisfied={open}
        animationPreset="height"
        customStyles={bodyStyles}
      >
        <div className={styles.accordion_item__body}>
          <div className={styles.body__separator}>
            <div className={styles.separator__inner} />
          </div>
          <Label text={body} color="white" variant="default" />
        </div>
      </DefaultAPWrapper>
    </div>
  );
}
