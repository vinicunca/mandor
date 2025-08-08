import { TinyColor } from '@ctrl/tinycolor';

/**
 * Convert color to HSL format.
 *
 * HSL is a color model that includes Hue, Saturation, and Lightness.
 *
 * @param color The input color.
 * @returns The color string in HSL format.
 */
function convertToHsl(color: string): string {
  const { a, h, l, s } = new TinyColor(color).toHsl();
  const hsl = `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
  return a < 1 ? `${hsl} ${a}` : hsl;
}

/**
 * Convert color to HSL CSS variable.
 *
 * This function is similar to convertToHsl but returns a string format
 * that can be used as a CSS variable.
 *
 * @param color The input color.
 * @returns The color string in HSL format that can be used as a CSS variable.
 */
function convertToHslCssVar(color: string): string {
  const { a, h, l, s } = new TinyColor(color).toHsl();
  const hsl = `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  return a < 1 ? `${hsl} / ${a}` : hsl;
}

/**
 * Convert color to RGB color string.
 * TinyColor cannot handle strings containing 'deg', 'grad', 'rad', or 'turn' in HSL.
 * For example, hsl(231deg 98% 65%) will be parsed as rgb(0, 0, 0).
 * Here, these units are removed before conversion.
 *
 * @param str The string representing the HLS color value.
 * @returns If the color value is valid, returns the corresponding RGB color string; if invalid, returns rgb(0, 0, 0).
 */
function convertToRgb(str: string): string {
  return new TinyColor(str.replaceAll(/deg|grad|rad|turn/g, '')).toRgbString();
}

/**
 * Check if the color is valid.
 * @param color - The color to be checked.
 * @returns true if the color is valid, otherwise returns false.
 */
function isValidColor(color?: string) {
  if (!color) {
    return false;
  }

  return new TinyColor(color).isValid;
}

export {
  convertToHsl,
  convertToHslCssVar,
  convertToRgb,
  isValidColor,
  TinyColor,
};
