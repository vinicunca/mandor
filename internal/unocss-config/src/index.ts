import fs from 'node:fs';
import path from 'node:path';

import { presetVinicunca } from '@vinicunca/unocss-preset';
import { defineConfig } from 'unocss';

import { presetCore } from './presets/preset.core';

const mainConfigPath = path.join(__dirname, './index.ts');

/**
 * We need to define the configDeps so every changes will be hot reloaded.
 * The first one (mainConfigPath) is mandatory because it will reference
 * all the presets usage is defined here.
 *
 * So everytime we make changes in the presets it will trigger a hot reload.
 */
const configDeps = [
  mainConfigPath,
  ...getAllConfigFiles('./presets'),
];

export const unoCssConfig = defineConfig({
  configDeps,

  layers: {
    akar: 10,
    mandor: 20,
    brand: 30,
  },

  outputToCssLayers: true,

  presets: [
    presetVinicunca({
      icons: {
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
        warn: true,
      },
      theme: {
        extend: {
          keyframes: {
            'accordion-down': {
              from: { height: 0 },
              to: { height: 'var(--akar-accordion-content-height)' },
            },
            'accordion-up': {
              from: { height: 'var(--akar-accordion-content-height)' },
              to: { height: 0 },
            },
            'collapsible-down': {
              from: { height: 0 },
              to: { height: 'var(--akar-collapsible-content-height)' },
            },
            'collapsible-up': {
              from: { height: 'var(--akar-collapsible-content-height)' },
              to: { height: 0 },
            },
            'toast-collapsed-closed': {
              from: { transform: 'var(--transform)' },
              to: { transform: 'translateY(calc((var(--before) - var(--height)) * var(--gap))) scale(var(--scale))' },
            },
            'toast-closed': {
              from: { transform: 'var(--transform)' },
              to: { transform: 'translateY(calc((var(--offset) - var(--height)) * var(--translate-factor)));' },
            },
          },
          animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            'collapsible-down': 'collapsible-down 0.2s ease-in-out',
            'collapsible-up': 'collapsible-up 0.2s ease-in-out',
            'toast-collapsed-closed': 'toast-collapsed-closed 200ms ease-in-out',
            'toast-closed': 'toast-closed 200ms ease-in-out',
          },
        },
      },
    }),

    presetCore(),
  ],
});

function getAllConfigFiles(dir: string) {
  const dirFull = path.join(__dirname, dir);
  const dirFiles = fs.readdirSync(dirFull);

  const files: Array<string> = [];

  for (const file of dirFiles) {
    const fullPath = path.join(dirFull, file);

    const isDirectory = fs.statSync(fullPath).isDirectory();

    if (isDirectory) {
      files.push(...getAllConfigFiles(`${dir}/${file}`));
    } else if (path.extname(file) === '.ts') {
      files.push(fullPath);
    }
  }

  return files;
}
