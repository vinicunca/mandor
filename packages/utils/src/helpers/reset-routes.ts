import type { Router, RouteRecordName, RouteRecordRaw } from 'vue-router';
import { traverseTreeValues } from '@mandor-core/shared/utils';

/**
 * Reset all routes, except those specified in the whitelist
 */
export function resetStaticRoutes(
  { router, routes }: { router: Router; routes: Array<RouteRecordRaw> },
) {
  // Get the name of all nodes including child nodes of static routes, and exclude routes without name fields
  const staticRouteNames = traverseTreeValues<
    RouteRecordRaw,
    RouteRecordName | undefined
  >({
    tree: routes,
    getValue: (route) => {
    // These routes need to be named to prevent the routes without the specified name from being deleted when the routes are reset.
      if (!route.name) {
        console.warn(
          `The route with the path ${route.path} needs to have the field name specified.`,
        );
      }
      return route.name;
    },
  });

  const { getRoutes, hasRoute, removeRoute } = router;
  const allRoutes = getRoutes();

  allRoutes.forEach(({ name }) => {
    // Only those that exist in the routing table and are not in the whitelist need to be deleted.
    if (name && !staticRouteNames.includes(name) && hasRoute(name)) {
      removeRoute(name);
    }
  });
}
