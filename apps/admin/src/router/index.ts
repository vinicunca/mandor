import { resetStaticRoutes } from '@mandor/utils';

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { createRouterGuard } from './core.guard';
import { routes } from './routes';

export const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_BASE)
      : createWebHistory(import.meta.env.VITE_BASE),

  routes,

  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }

    return to.hash
      ? { behavior: 'smooth', el: to.hash }
      : { left: 0, top: 0 };
  },
});

export const resetRoutes = () => resetStaticRoutes({ router, routes });

createRouterGuard(router);
