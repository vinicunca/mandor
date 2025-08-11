import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
} from '@mandor/typings';

import { generateAccessible } from '@mandor/access';
import { preferences } from '@mandor/preferences';

import { IFrameView, LayoutCore } from '~~/layouts';

const forbiddenComponent = () => import('~~/pages/_core/fallback/forbidden.vue');

export async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = import.meta.glob('../pages/**/*.vue');

  const layoutMap: ComponentRecordType = {
    LayoutCore,
    IFrameView,
  };

  return generateAccessible({
    mode: preferences.app.accessMode,
    options: {
      ...options,
      // fetchMenuListAsync: getAllMenusApi,
      // You can specify that you do not have permission to jump to the 403 page
      forbiddenComponent,
      layoutMap,
      pageMap,
    },
  });
}
