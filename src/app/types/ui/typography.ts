//TODO: Add hover variant

export interface ITypographyComponent {
  readonly text: string;
  readonly customStyles?: React.CSSProperties;
}

export type TSpecialColors = "exclusive" | "platinum";

type TLabelRegularVariants = "default" | "small" | "x-small";
type TLabelBoldVariants = "b-default" | "b-large" | "b-small" | "b-x-small";
export type TLabelColors =
  | "white"
  | "light-gray"
  | "gray"
  | "dark-gray"
  | "exclusive";
export type TLabelVariants = TLabelRegularVariants | TLabelBoldVariants;
export interface ILabel extends ITypographyComponent {
  readonly variant: TLabelVariants;
  readonly color: TLabelColors;
  readonly padding?: string;
}

export type TH1Colors = TLabelColors;
export interface IH1 extends ITypographyComponent {
  readonly color: TLabelColors;
}

export type TH2Colors = TLabelColors;
export interface IH2 extends ITypographyComponent {
  readonly color: TH2Colors;
  readonly padding?: string;
}

export type TH3Colors = TLabelColors | TSpecialColors;
export interface IH3 extends ITypographyComponent {
  readonly color: TH3Colors;
  readonly padding?: string;
}

export type ITag = ITypographyComponent;

export type TDefaultLinkColors = TLabelColors;
export type TDefaultLinkVariants = TLabelVariants;
export interface IDefaultLink extends ITypographyComponent {
  readonly href: string;
  readonly color: TDefaultLinkColors;
  readonly variant: TDefaultLinkVariants;
}
