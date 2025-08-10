import { createApp, watchEffect } from 'vue';

import '@mandor/designs';
import { preferences } from '@mandor/preferences';
import { initStores } from '@mandor/stores';

import { useTitle } from '@vueuse/core';

import { $t, setupI18n } from '~~/locales';
import { router } from '~~/router';

import App from './app.vue';

export async function bootstrap(namespace: string) {
  const app = createApp(App);

  // Internationalization i18n configuration
  await setupI18n(app);

  // Configure pinia-store
  await initStores(app, { namespace });

  app.use(router);

  watchEffect(() => {
    // Dynamically modify the title
    if (preferences.app.dynamicTitle) {
      const routeTitle = router.currentRoute.value.meta?.title;
      const prefixStr = routeTitle ? `${$t(routeTitle)} - ` : '';
      const pageTitle = prefixStr + preferences.app.name;

      useTitle(pageTitle);
    }
  });

  app.mount('#app');
}
