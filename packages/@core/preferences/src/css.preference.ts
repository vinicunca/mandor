import type { Preferences } from './entity.preference';

/**
 * Update theme's CSS variables and other CSS variables
 * @param preferences - current preferences object, its theme values will be used to set the document's theme.
 */
export function updateCssVariables(preferences: Preferences) {
  // When the color variable is modified, update the css variable
  const htmlEl = document.documentElement;

  if (!htmlEl) {
    return;
  }

  const theme = preferences.theme ?? {};

  const { mode } = theme;

  if (Reflect.has(theme, 'mode')) {
    const dark = isDarkTheme(mode);
    htmlEl.classList.toggle('dark', dark);
  }
}

export function isDarkTheme(theme: string) {
  let dark = theme === 'dark';

  if (theme === 'auto') {
    dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  return dark;
}
