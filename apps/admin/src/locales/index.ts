import type { App } from 'vue';

import type { LocaleSetupOptions, SupportedLanguagesType } from '@mandor/locales';

import {
  $t,
  setupI18n as coreI18nSetup,
  loadLocalesMapFromDir,
} from '@mandor/locales';
import { preferences } from '@mandor/preferences';

const modules = import.meta.glob('./langs/**/*.json');

const localesMap = loadLocalesMapFromDir(
  /\.\/langs\/([^/]+)\/(.*)\.json$/,
  modules,
);

/**
 * Load the language pack specific to the application
 * This can also be modified to obtain translation data from the server
 */
async function loadMessages(lang: SupportedLanguagesType) {
  const [appLocaleMessages] = await Promise.all([
    localesMap[lang]?.(),
  ]);

  return appLocaleMessages?.default ?? {};
}

export async function setupI18n(app: App, options: LocaleSetupOptions = {}) {
  await coreI18nSetup(app, {
    defaultLocale: preferences.app.locale,
    loadMessages,
    missingWarn: !import.meta.env.PROD,
    ...options,
  });
}

export {
  $t,
};
