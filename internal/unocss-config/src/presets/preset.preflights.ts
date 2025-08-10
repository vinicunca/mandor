import type { Preflight } from 'unocss';
import type { Theme } from 'unocss/preset-mini';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Helper to get the current directory in an ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getCorePreflights(): Array<Preflight> {
  return [
    generateGlobalBase(),
  ];
}

function getFileContent(filePath: string): string {
  try {
    return fs.readFileSync(
      path.resolve(__dirname, filePath),
      'utf-8',
    );
  } catch (error) {
    // Handle error if needed
    console.error(`Error reading file: ${filePath}`, error);
    return '';
  }
}

function generateGlobalBase(): Preflight<Theme> {
  return {
    getCSS: () => {
      const css = getFileContent('./styles/preset.global.css');

      return compressCSS(css);
    },
  };
}

function compressCSS(css: string) {
  return css.replace(/\s+/g, ' ').replace(/\/\*[\s\S]*?\*\//g, '');
}
