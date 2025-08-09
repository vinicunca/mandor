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
      rules: {
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: {
              type: {
                'mandor-core-type': ['^@mandor-core/.+'],
                'mandor-type': ['^@mandor/.+'],
                'vue-type': ['^vue$', '^vue-.+', '^@vue/.+'],
              },
              value: {
                'mandor': ['^@mandor/.+'],
                'mandor-core': ['^@mandor-core/.+'],
                'vue': ['^vue$', '^vue-.+', '^@vue/.+'],
              },
            },
            environment: 'node',
            groups: [
              ['external-type', 'builtin-type', 'type'],
              'vue-type',
              'mandor-type',
              'mandor-core-type',
              ['parent-type', 'sibling-type', 'index-type'],
              ['internal-type'],
              'builtin',
              'vue',
              'mandor',
              'mandor-core',
              'external',
              'internal',
              ['parent', 'sibling', 'index'],
              'side-effect',
              'side-effect-style',
              'style',
              'object',
              'unknown',
            ],
            internalPattern: ['^~~/.+'],
            newlinesBetween: 'always',
            order: 'asc',
            type: 'natural',
          },
        ],
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
