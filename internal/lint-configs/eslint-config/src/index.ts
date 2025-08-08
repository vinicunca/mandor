import { vinicuncaESLint } from '@vinicunca/eslint-config';
import { customConfig } from './custom-config';

export async function defineConfig() {
return vinicuncaESLint(
  {
    typescript: true,
    unocss: true,
    vue: true,
    pnpm: true,
    formatters: {
      css: true,
      html: true,
    }
  },
customConfig,
)
}
