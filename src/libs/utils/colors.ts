import { colord } from "colord";

/**
 * Returns whether text should be light or dark based on background color
 * Using WCAG contrast ratio recommendations
 */
export function getLightOrDarkColor(bgColor: string): "light" | "dark" {
  const color = colord(bgColor);
  return color.isLight() ? "light" : "dark";
} 