import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-wind4';

import { themeColors } from './preset.colors';
import { getCorePreflights } from './preset.preflights';

export function presetCore(): Preset<Theme> {
  return {
    name: 'preset-core',

    preflights: [
      ...getCorePreflights(),
    ],

    theme: {
      colors: themeColors,

      font: {
        heading: 'Inter, sans-serif',
        sans: 'Roboto, sans-serif',
      },
    },
  };
}
