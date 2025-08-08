import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-wind4';
import { getCorePreflights } from './preset.preflights';

export function presetCore(): Preset<Theme> {
  return {
    name: 'preset-core',

    preflights: [
      ...getCorePreflights(),
    ],

    theme: {
      font: {
        heading: 'Inter, sans-serif',
        sans: 'Roboto, sans-serif',
      },
    },
  };
}
