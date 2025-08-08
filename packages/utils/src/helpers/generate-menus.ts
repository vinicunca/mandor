import type { ExtendedRouteRecordRaw, MenuRecordRaw, RouteMeta } from '@mandor/typings';

import type { Router, RouteRecordRaw } from 'vue-router';
import { filterTree, mapTree } from '@mandor-core/shared/utils';

/**
 * Generate a menu list based on routes
 */
export async function generateMenus(
  { routes, router }: { routes: Array<RouteRecordRaw>; router: Router },
): Promise<Array<MenuRecordRaw>> {
  // Convert the route list to an object map with name as the key
  // Get the final path and name of all routes from the router
  const finalRoutesMap: { [key: string]: string } = Object.fromEntries(
    router.getRoutes().map(({ name, path }) => [name, path]),
  );

  let menus = mapTree<ExtendedRouteRecordRaw, MenuRecordRaw>({
    tree: routes,
    mapper: (route) => {
      // There are multiple ways to write the path in the route table, here we get the final path from the router and assign it
      const path = finalRoutesMap[route.name as string] ?? route.path;

      // Convert to menu structure
      const {
        meta = {} as RouteMeta,
        name: routeName,
        redirect,
        children = [],
      } = route;
      const {
        activeIcon,
        badge,
        badgeType,
        badgeVariants,
        hideChildrenInMenu = false,
        icon,
        link,
        order,
        title = '',
      } = meta;

      const name = (title || routeName || '') as string;

      // Hide submenus
      const resultChildren = hideChildrenInMenu
        ? []
        : ((children as Array<MenuRecordRaw>) ?? []);

      // Record all parent paths and parent menus in the menu item
      if (resultChildren && resultChildren.length > 0) {
        resultChildren.forEach((child) => {
          child.parents = [...(route.parents || []), path];
          child.parent = path;
        });
      }

      // Hide submenus
      const resultPath = hideChildrenInMenu
        ? redirect || path
        : link || path;

      return {
        activeIcon,
        badge,
        badgeType,
        badgeVariants,
        icon,
        name,
        order,
        parent: route.parent,
        parents: route.parents,
        path: resultPath,
        show: !meta.hideInMenu,
        children: resultChildren,
      };
    },
  });

  // Sort the menus
  menus = menus.sort((a, b) => (a.order || 999) - (b.order || 999));

  return filterTree({
    tree: menus,
    filter: (menu) => Boolean(menu.show),
  });
}
