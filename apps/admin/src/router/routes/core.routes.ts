import type { RouteRecordRaw } from 'vue-router';
import { LOGIN_PATH, LOGIN_ROUTE_NAME } from '@mandor/constants';

import { preferences } from '@mandor/preferences';
import { $t } from '~~/locales';

const LayoutCore = () => import('~~/layouts/core.vue');
const LayoutAuth = () => import('~~/layouts/auth.vue');

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

  {
    component: LayoutAuth,
    meta: {
      hideInTab: true,
      title: 'Authentication',
    },
    name: 'Authentication',
    path: '/auth',
    redirect: LOGIN_PATH,
    children: [
      {
        name: LOGIN_ROUTE_NAME,
        path: 'login',
        component: () => import('~~/pages/_core/auth/page-login.vue'),
        meta: {
          title: $t('pages.auth.login'),
        },
      },
    ],
  },
];
