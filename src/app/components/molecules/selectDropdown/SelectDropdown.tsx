import React from "react";
import styles from "./SelectDropdown.module.scss";
import SelectDropdownItem, {
  ISelectDropdownItemBase,
} from "./selectDropdownItem/SelectDropdownItem";

export interface ISelectDropdown {
  items: ISelectDropdownItemBase[];
  handleOnSelect: (id: number | string) => void;
  selectedItem: number | string;
}

export default function SelectDropdown({
  items,
  handleOnSelect,
  selectedItem,
}: ISelectDropdown) {
  return (
    <div className={styles.select_dropdown}>
      {items.map((item, index) => (
        <SelectDropdownItem
          key={index}
          {...item}
          handleOnSelect={handleOnSelect}
          selected={selectedItem === item.id}
        />
      ))}
    </div>
  );
}
