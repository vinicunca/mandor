import { vinicuncaESLint } from '@vinicunca/eslint-config';

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
      },
    },

    {
      files: ['internal/**/**', 'scripts/**/**'],
      rules: {
        'no-console': 'off',
        'node/prefer-global/process': 'off',
        'sonar/hashing': 'off',
      },
    },
  );
}
