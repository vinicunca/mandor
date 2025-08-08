import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from '@mandor/vite-config';

export default defineConfig(
  async () => {
    return {
      application: {
        fonts: {
          families: [
            {
              name: 'Roboto',
              italic: 'fullAxis',
              weight: 'fullAxis',
            },
          ],
          provider: 'google',
        },
      },

      vite: {
        resolve: {
          alias: {
            '~~': fileURLToPath(new URL('./src', import.meta.url)),
          },
        },
      },
    };
  },
);
