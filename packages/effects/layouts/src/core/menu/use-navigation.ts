import type { RouteRecordNormalized } from 'vue-router';

import { isHttpUrl, openRouteInNewWindow, openWindow } from '@mandor/utils';

import { useRouter } from 'vue-router';

export function useNavigation() {
  const router = useRouter();
  const routeMetaMap = new Map<string, RouteRecordNormalized>();

  // Initialize route map
  function initRouteMetaMap() {
    const routes = router.getRoutes();
    routes.forEach((route) => {
      routeMetaMap.set(route.path, route);
    });
  }

  initRouteMetaMap();

  router.afterEach(() => {
    initRouteMetaMap();
  });

  // Check if it should open in a new window
  function shouldOpenInNewWindow(path: string): boolean {
    if (isHttpUrl(path)) {
      return true;
    }
    const route = routeMetaMap.get(path);

    return route?.meta?.openInNewWindow ?? false;
  }

  const resolveHref = (path: string): string => {
    return router.resolve(path).href;
  };

  async function navigation(path: string) {
    try {
      const route = routeMetaMap.get(path);
      const { openInNewWindow = false, query = {} } = route?.meta ?? {};

      if (isHttpUrl(path)) {
        openWindow({
          url: path,
          options: { target: '_blank' },
        });
      } else if (openInNewWindow) {
        openRouteInNewWindow(resolveHref(path));
      } else {
        await router.push({
          path,
          query,
        });
      }
    } catch (error) {
      console.error('Navigation failed:', error);
      throw error;
    }
  }

  function willOpenedByWindow(path: string) {
    return shouldOpenInNewWindow(path);
  }

  return { navigation, willOpenedByWindow };
}
