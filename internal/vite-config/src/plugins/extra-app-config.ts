import type { PluginOption } from 'vite';

import {
  colors,
  generatorContentHash,
  readPackageJSON,
} from '@mandor/node-utils';

import { loadEnv } from '../utils/env';

interface PluginOptions {
  isBuild: boolean;
  root: string;
}

const GLOBAL_CONFIG_FILE_NAME = '_app.config.js';
const MANDOR_ADMIN_PRO_APP_CONF = '_MANDOR_ADMIN_PRO_APP_CONF_';

/**
 * Used to extract the configuration file and inject it into the project
 */
export async function viteExtraAppConfigPlugin({
  isBuild,
  root,
}: PluginOptions): Promise<PluginOption | undefined> {
  let publicPath: string;
  let source: string;

  if (!isBuild) {
    return;
  }

  const { version = '' } = await readPackageJSON(root);

  return {
    async configResolved(config) {
      publicPath = ensureTrailingSlash(config.base);
      source = await getConfigSource();
    },
    async generateBundle() {
      try {
        this.emitFile({
          fileName: GLOBAL_CONFIG_FILE_NAME,
          source,
          type: 'asset',
        });

        console.log(colors.cyan('✨configuration file is build successfully!'));
      } catch (error) {
        console.log(
          colors.red(
            `configuration file configuration file failed to package:\n${error}`,
          ),
        );
      }
    },
    name: 'vite:extra-app-config',
    async transformIndexHtml(html) {
      const hash = `v=${version}-${generatorContentHash(source, 8)}`;

      const appConfigSrc = `${publicPath}${GLOBAL_CONFIG_FILE_NAME}?${hash}`;

      return {
        html,
        tags: [{ attrs: { src: appConfigSrc }, tag: 'script' }],
      };
    },
  };
}

async function getConfigSource() {
  const config = await loadEnv();
  const windowVariable = `window.${MANDOR_ADMIN_PRO_APP_CONF}`;
  // Make sure the variable is not modified
  let source = `${windowVariable}=${JSON.stringify(config)};`;
  source += `
    Object.freeze(${windowVariable});
    Object.defineProperty(window, "${MANDOR_ADMIN_PRO_APP_CONF}", {
      configurable: false,
      writable: false,
    });
  `.replaceAll(/\s/g, '');
  return source;
}

function ensureTrailingSlash(path: string) {
  return path.endsWith('/') ? path : `${path}/`;
}
