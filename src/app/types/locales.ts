import { TDynamicMedia } from "./ui";

export interface ILanguage {
  media: TDynamicMedia;
  language: string;
  code: TLocaleCodes;
}

export type TLocaleCodes =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "tr"
  | "hi"
  | "zh";
