import React from "react";
import styles from "./Checkbox.module.scss";

const whiteCheckmark = (): React.ReactElement<SVGElement> => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
    >
      <path
        d="M3.99993 7.99998C3.99927 7.99998 3.9986 7.99998 3.99727 7.99998C3.81927 7.99932 3.64993 7.928 3.52526 7.80133L0.858601 5.09333C0.599935 4.83066 0.603269 4.40866 0.865936 4.15066C1.1286 3.89266 1.54993 3.89532 1.8086 4.15798L4.00393 6.38731L10.1959 0.195988C10.4566 -0.0646784 10.8779 -0.0646784 11.1386 0.195988C11.3993 0.455988 11.3993 0.878656 11.1386 1.13866L4.47193 7.80532C4.3466 7.92999 4.1766 7.99998 3.99993 7.99998Z"
        fill="white"
      />
    </svg>
  );
};

export interface ICheckbox {
  readonly checked: boolean;
  readonly handleOnClick?: () => void;
}

export default function Checkbox({ checked, handleOnClick }: ICheckbox) {
  const checkedClass = checked ? styles.checked : styles.unchecked;
  const checkboxClass = `${styles.checkbox} ${checkedClass}`;

  const onClickHandler = () => {
    if (typeof handleOnClick === "function") handleOnClick();
  };

  return (
    <div className={checkboxClass} onClick={onClickHandler}>
      {whiteCheckmark()}
    </div>
  );
}
