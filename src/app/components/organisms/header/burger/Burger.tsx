"use client";

import React from "react";
import styles from "./Burger.module.scss";
import Image from "next/image";
import burgerIcon from "@/assets/icons/burger.svg";
import DefaultAPWrapper from "@/components/molecules/defaultAPWrapper/DefaultAPWrapper";
import Navigation from "./navigation/Navigation";
import SelectLanguage from "./selectLanguage/SelectLanguage";
import { burgerSlice, TBurgerStates } from "@/store/slices/burgerSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";

const burgerStyles: React.CSSProperties = {
  position: "absolute",
  top: "calc(100% + 12px)",
  right: 0,
  width: 230,
  zIndex: 1000,
};

const burgerTypeMapper = (type: TBurgerStates) => {
  switch (type) {
    case "navigation":
      return <Navigation />;

    case "select-language":
      return <SelectLanguage />;

    default:
      break;
  }
};

export default function Burger() {
  const { burgerState } = useAppSelector((item) => item.burgerSlice);
  const { setBurgerState } = burgerSlice.actions;
  const dispatch = useAppDispatch();

  const currentBurger = burgerTypeMapper(burgerState);
  const animationKey = `burger-${burgerState}`;

  const handleChangeBurgerState = () => {
    if (!burgerState) {
      dispatch(setBurgerState("navigation"));
      return;
    }

    dispatch(setBurgerState(null));
  };

  const handleOnCloseBurger = () => {
    dispatch(setBurgerState(null));
  };

  return (
    <div className={styles.burger} onClick={handleChangeBurgerState}>
      <div className={styles.burger__icon}>
        <Image src={burgerIcon.src} alt="Burger" width={20} height={20} />
      </div>
      <DefaultAPWrapper
        animationKey={animationKey}
        animationPreset="scale"
        customStyles={burgerStyles}
        duration={0.1}
        clickOutside={true}
        onClose={handleOnCloseBurger}
        conditionSatisfied={burgerState !== null}
      >
        {currentBurger}
      </DefaultAPWrapper>
    </div>
  );
}
