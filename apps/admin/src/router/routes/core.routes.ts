import type { RouteRecordRaw } from 'vue-router';

import { preferences } from '@mandor/preferences';

const LayoutCore = () => import('~~/layouts/core.vue');

/** Global not found page */
export const fallbackNotFoundRoute: RouteRecordRaw = {
  component: () => import('~~/pages/_core/fallback/not-found.vue'),

  meta: {
    hideInBreadcrumb: true,
    hideInMenu: true,
    hideInTab: true,
    title: '404',
  },

  name: 'FallbackNotFound',
  path: '/:path(.*)*',
};

/**
 * Basic routes, these routes must exist.
 */
export const coreRoutes: Array<RouteRecordRaw> = [
  /**
   * Root route
   * Use the core layout as the parent container of all pages,
   * so the child does not need to configure LayoutCore.
   * This route must exist and should not be modified
   */
  {
    component: LayoutCore,
    meta: {
      hideInBreadcrumb: true,
      title: 'Root',
    },
    name: 'Root',
    path: '/',
    redirect: preferences.app.defaultHomePath,
    children: [],
  },
];
