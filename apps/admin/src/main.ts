import { initPreferences } from '@mandor/preferences';
import { unmountGlobalLoading } from '@mandor/utils';

/**
 * After the application is initialized, the page is loaded and rendered.
 */
async function initApplication() {
  /**
   * Name is used to specify the unique identifier of the project.
   * Used to distinguish preferences for different projects,
   * key prefixes for storing data,
   * and other data that needs to be isolated
   */
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  await initPreferences({
    namespace,
    overrides: {
      app: {
        name: import.meta.env.VITE_APP_TITLE,
      },
    },
  });

  const { bootstrap } = await import('./bootstrap');

  await bootstrap(namespace);

  unmountGlobalLoading();
}

initApplication();
