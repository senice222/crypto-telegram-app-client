import React from "react";

export const isSvgElement = (
  element: unknown
): element is React.ReactElement<SVGElement> => {
  if (React.isValidElement(element)) {
    const type = element.type;
    return typeof type === "string" && type.toLowerCase().includes("svg");
  }
  return false;
};
