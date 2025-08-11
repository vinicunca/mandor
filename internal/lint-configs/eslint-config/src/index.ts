import { vinicuncaESLint } from '@vinicunca/eslint-config';

export async function defineConfig() {
  return vinicuncaESLint(
    {
      typescript: true,
      unocss: true,
      vue: true,
      pnpm: true,
      formatters: {
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

    {
      files: ['packages/@core/ui-kit/akar-ui/**/*.vue'],
      rules: {
      /**
       * Exporting an interface in vue files is not possibile within script setup,
       * so there's a case where we define two script tags in a single vue file.
       * If we don't turn this off, we will have to define the import statements in the first script tag,
       * where we don't want that.
       */
        'import/first': 'off',

        /**
         * We need to turn this off since within vue templates we use a lot of type casting and if we don't wrap it
         * in parenthesis, the syntax highlighting will break.
         */
        'vue/no-extra-parens': 'off',
      },
    },
  );
}
