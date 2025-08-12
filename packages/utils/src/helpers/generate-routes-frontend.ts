import type { RouteRecordRaw } from 'vue-router';

import { filterTree, mapTree } from '@mandor-core/shared/utils';

/**
 * Dynamically generate routes - frontend method
 */
export async function generateRoutesByFrontend({
  routes,
  roles,
  forbiddenComponent,
}: {
  forbiddenComponent?: RouteRecordRaw['component'];
  roles: Array<string>;
  routes: Array<RouteRecordRaw>;
}): Promise<Array<RouteRecordRaw>> {
  // Filter the route table based on role identifiers, determining if the current user has the specified permissions
  const finalRoutes = filterTree({
    tree: routes,
    filter: (route) => {
      return hasAuthority({ route, roles });
    },
  });

  if (!forbiddenComponent) {
    return finalRoutes;
  }

  // If there is a forbidden access page, replace the forbidden access page with a 403 page
  return mapTree({
    tree: finalRoutes,
    mapper: (route) => {
      if (menuHasVisibleWithForbidden(route)) {
        route.component = forbiddenComponent;
      }

      return route;
    },
  });
}

// Determine if the route has access permissions
export function hasAuthority({
  route,
  roles,
}: {
  roles: Array<string>;
  route: RouteRecordRaw;
}) {
  const authority = route.meta?.authority;

  if (!authority) {
    return true;
  }

  const canAccess = roles.some((value) => authority.includes(value));

  return canAccess || (!canAccess && menuHasVisibleWithForbidden(route));
}

// Determine if the route is visible in the menu but access will be redirected to 403
function menuHasVisibleWithForbidden(route: RouteRecordRaw) {
  return (
    Boolean(route.meta?.authority)
    && Reflect.has(route.meta || {}, 'menuVisibleWithForbidden')
    && Boolean(route.meta?.menuVisibleWithForbidden)
  );
}
