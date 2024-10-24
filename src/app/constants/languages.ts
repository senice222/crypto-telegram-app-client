import { ILanguage } from "@/types/locales";
import gbIcon from "@/assets/icons/flags/gb.svg";
import esIcon from "@/assets/icons/flags/es.svg";
import frIcon from "@/assets/icons/flags/fr.svg";
import deIcon from "@/assets/icons/flags/de.svg";
import itIcon from "@/assets/icons/flags/it.svg";
import ptIcon from "@/assets/icons/flags/pt.svg";
import trIcon from "@/assets/icons/flags/tr.svg";
import hiIcon from "@/assets/icons/flags/hi.svg";
import zhIcon from "@/assets/icons/flags/zh.svg";
import { ISelectDropdownItemBase } from "@/components/molecules/selectDropdown/selectDropdownItem/SelectDropdownItem";

export const LANGUAGES: ILanguage[] = [
  {
    media: gbIcon.src,
    language: "English",
    code: "en",
  },
  {
    media: esIcon.src,
    language: "Spanish",
    code: "es",
  },
  {
    media: frIcon.src,
    language: "French",
    code: "fr",
  },
  {
    media: deIcon.src,
    language: "German",
    code: "de",
  },
  {
    media: itIcon.src,
    language: "Italian",
    code: "it",
  },
  {
    media: ptIcon.src,
    language: "Portuguese",
    code: "pt",
  },
  {
    media: trIcon.src,
    language: "Turkish",
    code: "tr",
  },
  {
    media: hiIcon.src,
    language: "Hindi",
    code: "hi",
  },
  {
    media: zhIcon.src,
    language: "Chinese",
    code: "zh",
  },
];

export const LANGUAGES_DROPDOWN_DATA: ISelectDropdownItemBase[] = LANGUAGES.map(
  (language) => {
    return {
      id: language.code,
      media: language.media,
      text: language.language,
      width: 20,
      height: 20,
    };
  }
);
