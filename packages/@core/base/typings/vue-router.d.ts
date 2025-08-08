import type { RouteMeta as IRouteMeta } from '@mandor-core/typings';

import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta extends IRouteMeta {}
}
