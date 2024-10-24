import React from "react";
import styles from "./SelectLanguage.module.scss";
import Box from "@/components/atoms/box/Box";
import SelectDropdown from "@/components/molecules/selectDropdown/SelectDropdown";
import { LANGUAGES_DROPDOWN_DATA } from "@/constants/languages";
import { setUserLocale } from "@/services/locale";
import { TLocaleCodes } from "@/types/locales";
import { useLocale } from "next-intl";
import { burgerSlice } from "@/store/slices/burgerSlice";
import { useAppDispatch } from "@/store/hooks/redux";
import localeService from "@/services/api/LocaleService";

const angleLeftSmallIcon = (): React.ReactElement<SVGElement> => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M11.6667 14.1667C11.4533 14.1667 11.24 14.0851 11.0775 13.9226L7.74413 10.5892C7.4183 10.2634 7.4183 9.73667 7.74413 9.41084L11.0775 6.0775C11.4033 5.75167 11.93 5.75167 12.2558 6.0775C12.5817 6.40334 12.5817 6.93006 12.2558 7.25589L9.51171 10L12.2558 12.7442C12.5817 13.07 12.5817 13.5967 12.2558 13.9226C12.0933 14.0851 11.88 14.1667 11.6667 14.1667Z"
        fill="#ECF3FF"
        fillOpacity="0.5"
      />
    </svg>
  );
};

const boxStyles: React.CSSProperties = {
  boxShadow:
    "0px 4px 8px 0px rgba(12, 13, 14, 0.25), 0px 16px 32px 0px rgba(12, 13, 14, 0.15)",
  maxHeight: 242,
  zIndex: 1000,
};

export default function SelectLanguage() {
  const { setBurgerState } = burgerSlice.actions;
  const dispatch = useAppDispatch();

  const locale = useLocale();
  const handleOnSelectLanguage = (code: string | number) => {
    setUserLocale(code as TLocaleCodes);
    localeService.setLocale(true);
  };

  const handleOnBackToNavigation = () => {
    dispatch(setBurgerState("navigation"));
  };

  return (
    <Box
      variant="dark-gray"
      borderRadius={12}
      padding="4px"
      direction="flex-column"
      gap={6}
      customStyles={boxStyles}
    >
      <div
        className={styles.selecet_language__heading}
        onClick={handleOnBackToNavigation}
      >
        {angleLeftSmallIcon()}
        <span className={styles.heading__text}>Back to Navigation</span>
      </div>
      <SelectDropdown
        items={LANGUAGES_DROPDOWN_DATA}
        handleOnSelect={handleOnSelectLanguage}
        selectedItem={locale}
      />
    </Box>
  );
}
