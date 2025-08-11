import type { Pinia } from 'pinia';

import type { App } from 'vue';

import { createPinia } from 'pinia';
import SecureLS from 'secure-ls';

let pinia: Pinia;

export interface InitStoreOptions {
  /**
   * @Application name.
   * Since this store is shared, there may be multiple apps in the future.
   * To prevent cache conflicts between multiple apps, we can configure the application name here.
   * The application name will be used as a prefix for persistence.
   */
  namespace: string;
}

export async function initStores(app: App, options: InitStoreOptions) {
  const { createPersistedState } = await import('pinia-plugin-persistedstate');

  pinia = createPinia();

  const { namespace } = options;

  const ls = new SecureLS({
    encodingType: 'aes',
    encryptionSecret: import.meta.env.VITE_APP_STORE_SECURE_KEY,
    isCompression: true,
    // @ts-expect-error secure-ls does not have a type definition for this
    metaKey: `${namespace}-secure-meta`,
  });

  pinia.use(
    createPersistedState({
      // key $appName-$store.id
      key: (storeKey) => `${namespace}-${storeKey}`,
      storage: import.meta.env.DEV
        ? localStorage
        : {
            getItem(key) {
              return ls.get(key);
            },
            setItem(key, value) {
              ls.set(key, value);
            },
          },
    }),
  );

  app.use(pinia);

  return pinia;
}

export function resetAllStores() {
  if (!pinia) {
    console.error('Pinia is not installed');
    return;
  }

  const allStores = (pinia as any)._s;

  for (const [_key, store] of allStores) {
    store.$reset();
  }
}
