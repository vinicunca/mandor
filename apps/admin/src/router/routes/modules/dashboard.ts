import type { RouteRecordRaw } from 'vue-router';

import { $t } from '~~/locales';

const routes: Array<RouteRecordRaw> = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('pages.dashboard.title'),
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('~~/pages/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('pages.dashboard.analytics'),
        },
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('~~/pages/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: $t('pages.dashboard.workspace'),
        },
      },
    ],
  },
];

export default routes;
