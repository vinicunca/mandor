import type { CAC } from 'cac';

import { execaCommand } from '@mandor/node-utils';

interface LintCommandOptions {
  /**
   * Format lint problem.
   */
  format?: boolean;
}

async function runLint({ format }: LintCommandOptions) {
  if (format) {
    await execaCommand('stylelint "**/*.{vue,css,less,scss}" --cache --fix', {
      stdio: 'inherit',
    });
    await execaCommand('eslint . --cache --fix', {
      stdio: 'inherit',
    });
    return;
  }
  await Promise.all([
    execaCommand('eslint . --cache', {
      stdio: 'inherit',
    }),
    execaCommand('stylelint "**/*.{vue,css,less,scss}" --cache', {
      stdio: 'inherit',
    }),
  ]);
}

export function defineLintCommand(cac: CAC) {
  cac
    .command('lint')
    .usage('Batch execute project lint check.')
    .option('--format', 'Format lint problem.')
    .action(runLint);
}
