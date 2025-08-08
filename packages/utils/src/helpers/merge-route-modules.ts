import type { RouteRecordRaw } from 'vue-router';

export interface RouteModuleType {
  default: Array<RouteRecordRaw>;
}

/**
 * Merge the default exports of dynamic routing modules
 * @param routeModules dynamically imported routing module object
 * @returns the merged routing configuration array
 */
export function mergeRouteModules(
  routeModules: Record<string, unknown>,
): Array<RouteRecordRaw> {
  const mergedRoutes: Array<RouteRecordRaw> = [];

  for (const routeModule of Object.values(routeModules)) {
    const moduleRoutes = (routeModule as RouteModuleType)?.default ?? [];
    mergedRoutes.push(...moduleRoutes);
  }

  return mergedRoutes;
}
