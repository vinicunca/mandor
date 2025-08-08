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

  const supabaseKey = getSupabaseKey();

  pinia.use(
    createPersistedState({
      // key $appName-$store.id
      key: (storeKey) => {
        if (storeKey === 'core-access') {
          return supabaseKey;
        }

        return `${namespace}-${storeKey}`;
      },
      storage: {
        getItem(key) {
          if (key === supabaseKey) {
            return localStorage.getItem(supabaseKey);
          }

          return import.meta.env.DEV
            ? localStorage.getItem(key)
            : ls.get(key);
        },
        setItem(key, value) {
          if (import.meta.env.DEV || key === supabaseKey) {
            localStorage.setItem(key, value);
          } else {
            ls.set(key, value);
          }
        },
      },
    }),
  );

  app.use(pinia);

  return pinia;
}

function getSupabaseKey() {
  const supabaseUrl = import.meta.env.VITE_GLOB_SUPABASE_URL;
  const baseUrl = new URL(supabaseUrl);

  return `sb-${baseUrl.hostname.split('.')[0]}-auth-token`;
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
