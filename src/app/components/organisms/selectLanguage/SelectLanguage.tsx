import React from "react";
import Box from "@/components/atoms/box/Box";
import SelectDropdown from "@/components/molecules/selectDropdown/SelectDropdown";
import { LANGUAGES_DROPDOWN_DATA } from "@/constants/languages";
import { setUserLocale } from "@/services/locale";
import { TLocaleCodes } from "@/types/locales";
import { useLocale } from "next-intl";
import whiteGlobeEarthIcon from "@/assets/icons/white-globe-earth.svg";
import Label from "@/components/atoms/label/Label";
import { modalSlice } from "@/store/slices/modalSlice";
import { useAppDispatch } from "@/store/hooks/redux";
import ModalHeader from "@/components/molecules/modalHeader/ModalHeader";
import localeService from "@/services/api/LocaleService";

const boxStyles: React.CSSProperties = {
  boxShadow:
    "0px 4px 8px 0px rgba(12, 13, 14, 0.25), 0px 16px 32px 0px rgba(12, 13, 14, 0.15)",
  maxHeight: 489,
};

export default function SelectLanguage() {
  const { setModal } = modalSlice.actions;
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const handleOnSelectLanguage = (code: string | number) => {
    setUserLocale(code as TLocaleCodes);
    localeService.setLocale(true);
  };

  const handleOnCloseModal = () => {
    dispatch(setModal(null));
  };

  return (
    <Box
      variant="dark-gray"
      borderRadius={20}
      padding="8px"
      direction="flex-column"
      gap={2}
      customStyles={boxStyles}
    >
      <ModalHeader
        icon={whiteGlobeEarthIcon.src}
        handleOnClose={handleOnCloseModal}
        title="Choose a language"
      />
      <SelectDropdown
        items={LANGUAGES_DROPDOWN_DATA}
        handleOnSelect={handleOnSelectLanguage}
        selectedItem={locale}
      />
      <Label
        text="You can change the language by clicking on the menu"
        padding="12px"
        color="dark-gray"
        variant="x-small"
      />
    </Box>
  );
}
