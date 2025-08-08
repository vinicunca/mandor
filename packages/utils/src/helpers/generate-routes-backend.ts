import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
  RouteRecordRaw,
  RouteRecordStringComponent,
} from '@mandor/typings';
import { mapTree } from '@mandor-core/shared/utils';

/**
 * Dynamically generate routes - backend method
 */
export async function generateRoutesByBackend(
  options: GenerateMenuAndRoutesOptions,
): Promise<Array<RouteRecordRaw>> {
  const {
    fetchMenuListAsync,
    layoutMap = {},
    pageMap = {},
  } = options;

  try {
    const menuRoutes = await fetchMenuListAsync?.();
    if (!menuRoutes) {
      return [];
    }

    const normalizePageMap: ComponentRecordType = {};

    for (const [key, value] of Object.entries(pageMap)) {
      normalizePageMap[normalizeViewPath(key)] = value;
    }

    const routes = convertRoutes({
      routes: menuRoutes,
      layoutMap,
      pageMap: normalizePageMap,
    });

    return routes;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function normalizeViewPath(path: string): string {
  // Remove relative path prefix
  const normalizedPath = path.replace(/^(\.\/|\.\.\/)+/, '');

  // Ensure the path starts with '/'
  const viewPath = normalizedPath.startsWith('/')
    ? normalizedPath
    : `/${normalizedPath}`;

  return viewPath.replace(/^\/pages/, '');
}

function convertRoutes(
  { routes, layoutMap, pageMap }:
  {
    routes: Array<RouteRecordStringComponent>;
    layoutMap: ComponentRecordType;
    pageMap: ComponentRecordType;
  },
): Array<RouteRecordRaw> {
  return mapTree({
    tree: routes,
    mapper: (node) => {
      const route = node as unknown as RouteRecordRaw;
      const { component, name } = node;

      if (!name) {
        console.error('Route name is required:', route);
      }

      if (component && layoutMap[component]) {
        route.component = layoutMap[component];
      } else if (component) {
        const normalizePath = normalizeViewPath(component);
        const pageKey = normalizePath.endsWith('.vue')
          ? normalizePath
          : `${normalizePath}.vue`;
        if (pageMap[pageKey]) {
          route.component = pageMap[pageKey];
        } else {
          console.error(`route component is invalid: ${pageKey}`, route);
          route.component = pageMap['/_core/fallback/not-found.vue'];
        }
      }

      return route;
    },
  });
}
