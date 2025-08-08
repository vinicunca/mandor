import type { RouteRecordRaw } from 'vue-router';

import { $t } from '~~/locales';

const routes: Array<RouteRecordRaw> = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('pages.ticketing.title'),
    },
    name: 'Ticketing',
    path: '/ticketing',
    children: [
      {
        name: 'TicketingEvents',
        path: '/ticketing/events',
        component: () => import('~~/pages/ticketing/events.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: $t('pages.ticketing.events.title'),
        },
      },
      {
        name: 'TicketingCheckIn',
        path: '/ticketing/:eventId/check-in',
        component: () => import('~~/pages/ticketing/check-in.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: $t('pages.ticketing.checkIn'),
          hideInMenu: true,
          activePath: '/ticketing',
          fullPathKey: false,
        },
      },
    ],
  },
];

export default routes;
