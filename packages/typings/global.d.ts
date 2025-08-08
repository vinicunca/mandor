import type { RouteMeta as IRouteMeta } from '@mandor-core/typings';

import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta extends IRouteMeta {}
}

export interface ApplicationConfig {
  supabaseUrl: string;
  supabaseKey: string;
}

export interface MandorAdminAppConfigRaw {
}

declare global {
  interface Window {
    _MANDOR_ADMIN_PRO_APP_CONF_: MandorAdminAppConfigRaw;
  }
}
