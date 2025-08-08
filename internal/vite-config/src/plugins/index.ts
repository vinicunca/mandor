/* eslint-disable no-await-in-loop */
import type { PluginOption } from 'vite';

import type {
  ApplicationPluginOptions,
  CommonPluginOptions,
  ConditionPlugin,
  LibraryPluginOptions,
} from '../typings';

import viteVueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import viteVue from '@vitejs/plugin-vue';
import viteVueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer as viteVisualizerPlugin } from 'rollup-plugin-visualizer';
import UnoCSS from 'unocss/vite';
import viteDtsPlugin from 'vite-plugin-dts';
import { createHtmlPlugin as viteHtmlPlugin } from 'vite-plugin-html';
import viteVueDevTools from 'vite-plugin-vue-devtools';
import { viteExtraAppConfigPlugin } from './extra-app-config';
import { viteFontsPlugin } from './fonts';
import { viteInjectAppLoadingPlugin } from './inject-app-loading';
import { viteMetadataPlugin } from './inject-metadata';
import { viteLicensePlugin } from './license';

/**
 * Get the vite plugin that meets the conditions
 * @param conditionPlugins
 */
async function loadConditionPlugins(conditionPlugins: Array<ConditionPlugin>) {
  const plugins: Array<PluginOption> = [];
  for (const conditionPlugin of conditionPlugins) {
    if (conditionPlugin.condition) {
      const realPlugins = await conditionPlugin.plugins();
      plugins.push(...realPlugins);
    }
  }
  return plugins.flat();
}

/**
 * Get general vite plugins based on conditions
 */
async function loadCommonPlugins(
  options: CommonPluginOptions,
): Promise<Array<ConditionPlugin>> {
  const { devtools, injectMetadata, isBuild, visualizer } = options;
  return [
    {
      condition: true,
      plugins: () => [
        viteVue(),
        viteVueJsx(),
        UnoCSS(),
      ],
    },

    {
      condition: !isBuild && devtools,
      plugins: () => [viteVueDevTools()],
    },
    {
      condition: injectMetadata,
      plugins: async () => [await viteMetadataPlugin()],
    },
    {
      condition: isBuild && !!visualizer,
      plugins: () => [<PluginOption>viteVisualizerPlugin({
        filename: './node_modules/.cache/visualizer/stats.html',
        gzipSize: true,
        open: true,
      })],
    },
  ];
}

/**
 * Get the vite plugin that meets the conditions
 */
export async function loadApplicationPlugins(
  options: ApplicationPluginOptions,
): Promise<Array<PluginOption>> {
  // Get it separately, otherwise commonOptions will not be available
  const isBuild = options.isBuild;
  const env = options.env;

  const {
    extraAppConfig,
    html,
    i18n,
    injectAppLoading,
    license,
    fonts,
    ...commonOptions
  } = options;

  const commonPlugins = await loadCommonPlugins(commonOptions);

  return await loadConditionPlugins([
    ...commonPlugins,
    {
      condition: i18n,
      plugins: async () => {
        return [
          viteVueI18nPlugin({
            compositionOnly: true,
            fullInstall: true,
            runtimeOnly: true,
          }),
        ];
      },
    },

    {
      condition: injectAppLoading,
      plugins: async () => [await viteInjectAppLoadingPlugin(!!isBuild, env)],
    },
    {
      condition: license,
      plugins: async () => [await viteLicensePlugin()],
    },
    {
      condition: !!html,
      plugins: () => [viteHtmlPlugin({ minify: true })],
    },
    {
      condition: isBuild && extraAppConfig,
      plugins: async () => [
        await viteExtraAppConfigPlugin({ isBuild: true, root: process.cwd() }),
      ],
    },
    {
      condition: Boolean(fonts),
      plugins: async () => {
        return [await viteFontsPlugin(fonts)];
      },
    },
  ]);
}

/**
 * Get the vite plugin that meets the conditions
 */
export async function loadLibraryPlugins(
  options: LibraryPluginOptions,
): Promise<Array<PluginOption>> {
  // Get it separately, otherwise commonOptions will not be available
  const isBuild = options.isBuild;
  const { dts, ...commonOptions } = options;
  const commonPlugins = await loadCommonPlugins(commonOptions);
  return await loadConditionPlugins([
    ...commonPlugins,
    {
      condition: isBuild && !!dts,
      plugins: () => [viteDtsPlugin({ logLevel: 'error' })],
    },
  ]);
}
