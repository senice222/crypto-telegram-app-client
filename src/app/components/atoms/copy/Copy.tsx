import React from "react";
import styles from "./Copy.module.scss";

const copyIcon = (): React.ReactElement<SVGElement> => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M8.01676 4.58333C5.86676 4.58333 4.58333 5.86666 4.58333 8.01666V13.8958C4.58333 14.0417 4.45408 14.1642 4.30908 14.15C3.10742 14.03 2.5 13.3033 2.5 11.9833V4.68333C2.5 3.23333 3.23343 2.5 4.68343 2.5H11.9832C13.3032 2.5 14.03 3.10752 14.15 4.30918C14.165 4.45418 14.0425 4.58333 13.8967 4.58333H8.01676ZM15.3125 5.83333H14.1667H8.02083C6.5625 5.83333 5.83333 6.5625 5.83333 8.02083V14.1667V15.3125C5.83333 16.7708 6.5625 17.5 8.02083 17.5H15.3125C16.7708 17.5 17.5 16.7708 17.5 15.3125V8.02083C17.5 6.5625 16.7708 5.83333 15.3125 5.83333Z"
        fill="#ECF3FF"
        fillOpacity="0.25"
      />
    </svg>
  );
};

export interface ICopy {
  readonly handleOnClick: () => void;
}

export default function Copy({ handleOnClick }: ICopy) {
  return (
    <div className={styles.copy} onClick={handleOnClick}>
      {copyIcon()}
    </div>
  );
}
