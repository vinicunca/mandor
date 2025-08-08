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
        scale: 1.25,
        warn: true,
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
