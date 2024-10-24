//TODO:
// PRIORITY: MED
// DESCRIPTION:
// Full refactor

import React from "react";
import styles from "./MediaDropdown.module.scss";
import Item, { TMediaDropdownItem, isSelectableItem } from "./item/Item";
import Separator from "@/components/atoms/separator/Separator";

export interface IMediaDropdownCategory {
  readonly items: Omit<TMediaDropdownItem, "selected">[];
}

export interface IMediaDropdown {
  readonly categories: IMediaDropdownCategory[];
  readonly handleOnSelect?: (id: number) => void;
  readonly handleOnClick?: () => void;
  readonly selectedItem?: number;
}

const defaultHandleOnSelect = (id: number) => {
  console.warn(`handleOnSelect not provided. ID: ${id}`);
};

export default function MediaDropdown({
  categories,
  handleOnSelect = defaultHandleOnSelect,
  selectedItem,
}: IMediaDropdown) {
  return (
    <div className={styles.media_dropdown}>
      {categories.map((category, categoryIndex) => (
        <div
          key={`category-${categoryIndex}`}
          className={styles.media_dropdown__parent_category}
        >
          <div className={styles.parent_category__category}>
            {category.items.map((item, itemIndex) => {
              if (isSelectableItem(item)) {
                return (
                  <Item
                    key={`item-${itemIndex}`}
                    id={item.id}
                    selectable={item.selectable}
                    selected={item.id === selectedItem}
                    isArrow={item.isArrow}
                    icon={item.icon}
                    text={item.text}
                    handleOnClick={() => handleOnSelect(item.id)}
                  />
                );
              } else {
                return (
                  <Item
                    key={`item-${itemIndex}`}
                    id={item.id as number}
                    selectable={item.selectable as true}
                    selected={(item.id as number) === selectedItem}
                    isArrow={item.isArrow as false}
                    icon={item.icon}
                    text={item.text}
                    handleOnClick={item.handleOnClick}
                  />
                );
              }
            })}
          </div>
          {categoryIndex < categories.length - 1 && (
            <Separator padding="4px 8px" />
          )}
        </div>
      ))}
    </div>
  );
}
