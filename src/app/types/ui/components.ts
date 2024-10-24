export type TDynamicMedia = React.ReactElement<SVGElement> | string;
export const TARROWS = [
  "up-right",
  "right",
  "white-up-right",
  "white-right",
] as const;
export type TArrows = (typeof TARROWS)[number];

export type TButtonVariants = "primary" | "secondary";
export interface IButton {
  readonly label: string;
  readonly handleOnClick: () => void;
  readonly variant: TButtonVariants;
}

export type TIconColors = "i-white" | "i-black";
export interface IIconButton extends IButton {
  readonly media?: string | React.ReactElement<SVGElement>;
  readonly arrow?: React.ReactElement<SVGElement> | TArrows;
  readonly arrowColor?: TIconColors;
  readonly width?: number;
  readonly height?: number;
  readonly disabled?: boolean;
}

export type TBoxColors = "dark-gray" | "gray" | "light-gray";
export type TBoxBorder = "b-gray" | "b-dark-gray";
export type TBoxDirections =
  | "flex-vertical-center"
  | "flex-center"
  | "flex-right"
  | "flex-left"
  | "flex-space-between"
  | "flex-column"
  | "flex-column-center";
export interface IBox {
  readonly variant?: TBoxColors;
  readonly padding?: string;
  readonly children: React.ReactNode;
  readonly borderRadius?: number;
  readonly border?: TBoxBorder;
  readonly direction?: TBoxDirections;
  readonly gap?: number;
  readonly customStyles?: React.CSSProperties;
}
export type IBoxObj = Omit<IBox, "children">;
