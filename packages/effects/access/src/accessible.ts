import type { Component, DefineComponent } from 'vue';

import type {
  AccessModeType,
  GenerateMenuAndRoutesOptions,
  RouteRecordRaw,
} from '@mandor/typings';

import { defineComponent, h } from 'vue';

import { generateMenus, generateRoutesByBackend, generateRoutesByFrontend, mapTree } from '@mandor/utils';

import { clone, isFunction, isString } from '@vinicunca/perkakas';

export async function generateAccessible(
  { mode, options }: {
    mode: AccessModeType;
    options: GenerateMenuAndRoutesOptions;
  },
) {
  const { router } = options;

  options.routes = clone(options.routes);

  const accessibleRoutes = await generateRoutes({ mode, options });
  console.log('🚀 ~ generateAccessible ~ accessibleRoutes:', accessibleRoutes);

  const root = router.getRoutes().find((item) => item.path === '/');

  // Get a list of existing route names
  const names = root?.children?.map((item) => item.name) ?? [];

  // Dynamically add to router instance
  accessibleRoutes.forEach((route) => {
    if (root) {
      // According to the router name, if the route already exists, it will not be added.
      if (names?.includes(route.name)) {
        // Find the existing routing index and update it. If it is not updated, the first-level directory will not be updated when switching users, and the homePath in the second-level directory will cause 404 problems
        const index = root.children?.findIndex(
          (item) => item.name === route.name,
        );
        if (index !== undefined && index !== -1 && root.children) {
          root.children[index] = route;
        }
      } else {
        root.children?.push(route);
      }
    } else {
      router.addRoute(route);
    }
  });

  if (root) {
    if (root.name) {
      router.removeRoute(root.name);
    }
    router.addRoute(root);
  }

  const accessibleMenus = await generateMenus({
    routes: accessibleRoutes,
    router,
  });

  return { accessibleMenus, accessibleRoutes };
}

async function generateRoutes(
  { mode, options }: {
    mode: AccessModeType;
    options: GenerateMenuAndRoutesOptions;
  },
) {
  const { forbiddenComponent, roles, routes } = options;

  let resultRoutes: Array<RouteRecordRaw> = routes;
  switch (mode) {
    case 'backend': {
      resultRoutes = await generateRoutesByBackend(options);
      break;
    }

    case 'frontend': {
      resultRoutes = await generateRoutesByFrontend({
        routes,
        roles: roles || [],
        forbiddenComponent,
      });
      break;
    }

    case 'mixed': {
      const [feRoutes, beRoutes] = await Promise.all([
        generateRoutesByFrontend({
          routes,
          roles: roles || [],
          forbiddenComponent,
        }),
        generateRoutesByBackend(options),
      ]);

      resultRoutes = [...feRoutes, ...beRoutes];
      break;
    }
  }

  /**
   * Adjust the routing tree and do the following:
   * 1. Add redirects to routes that do not have redirects
   * 2. Change the lazy loaded component name to the name of the current route (if keep-alive is enabled)
   */
  resultRoutes = mapTree({
    tree: resultRoutes,
    mapper: (route) => {
      // Repackage the component, using the same name as the route name to support keep-alive conditional caching.
      if (
        route.meta?.keepAlive
        && isFunction(route.component)
        && route.name
        && isString(route.name)
      ) {
        const originalComponent = route.component as () => Promise<{
          default: Component | DefineComponent;
        }>;
        route.component = async () => {
          const component = await originalComponent();

          if (!component.default) {
            return component;
          }

          return defineComponent({
            name: route.name as string,
            setup(props, { attrs, slots }) {
              // eslint-disable-next-line sonar/no-nested-functions
              return () => h(component.default, { ...props, ...attrs }, slots);
            },
          });
        };
      }

      // If there is a redirect or no child routes, return directly
      if (
        route.redirect
        || !route.children
        || route.children.length === 0
      ) {
        return route;
      }

      const [firstChild] = route.children;
      // If the child route does not start with /, return directly. In this case, the correct path can only be obtained by calculating the path of all parent levels, which is not handled here
      if (!firstChild?.path || !firstChild.path.startsWith('/')) {
        return route;
      }

      route.redirect = firstChild.path;

      return route;
    },
  });

  return resultRoutes;
}
