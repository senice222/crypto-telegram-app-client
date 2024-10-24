import { TStyles } from "@/types/ui";

export const variantToClassname = <T extends string>(
  variant: T | undefined,
  styles: TStyles
): string => {
  if (!variant) return "";

  const formattedVariant = variant.replaceAll("-", "_");
  return styles[formattedVariant];
};
