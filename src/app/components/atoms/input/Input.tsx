import React, { useState, useRef, useEffect } from "react";
import styles from "./Input.module.scss";

const crossIcon = (): React.ReactElement<SVGElement> => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M12.3532 11.6467C12.5485 11.842 12.5485 12.1587 12.3532 12.354C12.2558 12.4514 12.1278 12.5007 11.9998 12.5007C11.8718 12.5007 11.7438 12.452 11.6465 12.354L7.99983 8.70733L4.35317 12.354C4.25583 12.4514 4.12783 12.5007 3.99983 12.5007C3.87183 12.5007 3.74383 12.452 3.6465 12.354C3.45117 12.1587 3.45117 11.842 3.6465 11.6467L7.29317 8.00002L3.6465 4.35337C3.45117 4.15804 3.45117 3.84135 3.6465 3.64601C3.84183 3.45068 4.1585 3.45068 4.35384 3.64601L8.0005 7.2927L11.6472 3.64601C11.8425 3.45068 12.1592 3.45068 12.3545 3.64601C12.5498 3.84135 12.5498 4.15804 12.3545 4.35337L8.70783 8.00002L12.3532 11.6467Z"
        fill="#ECF3FF"
        fillOpacity="0.25"
      />
    </svg>
  );
};

export interface IInput {
  readonly value: string;
  readonly placeholder: string;
  readonly handleOnChange: (value: string) => void;
  readonly type?: string;
}

const Input: React.FC<IInput> = ({
  value,
  placeholder,
  handleOnChange,
  type = "text",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputClass = `${styles.input} ${isFocused ? styles.focused : ""}`;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange(event.target.value);
  };

  const onFocusHandler = () => {
    setIsFocused(true);
  };

  const onBlurHandler = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const handleOnClear = () => {
    handleOnChange("");
  };

  return (
    <div className={inputClass}>
      <input
        ref={inputRef}
        value={value}
        type={type}
        className={styles.input__editable}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />
      {value && (
        <div className={styles.input__cross} onClick={handleOnClear}>
          {crossIcon()}
        </div>
      )}
    </div>
  );
};

export default Input;
