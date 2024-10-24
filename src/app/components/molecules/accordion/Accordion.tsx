import React from "react";
import styles from "./Accordion.module.scss";
import AccordionItem, { IAccordionItem } from "./accordionItem/AccordionItem";

export interface IAccordion {
  items: Omit<IAccordionItem, "id">[];
}

export default function Accordion({ items }: IAccordion) {
  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const formattedIndex = index + 1;

        return <AccordionItem key={index} id={formattedIndex} {...item} />;
      })}
    </div>
  );
}
