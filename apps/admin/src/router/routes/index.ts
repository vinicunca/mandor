import type { RouteRecordRaw } from 'vue-router';

import { mergeRouteModules, traverseTreeValues } from '@mandor/utils';

import { coreRoutes, fallbackNotFoundRoute } from './core.routes';

const dynamicRouteFiles = import.meta.glob('./modules/**/*.ts', {
  eager: true,
});

const dynamicRoutes: Array<RouteRecordRaw> = mergeRouteModules(dynamicRouteFiles);

const staticRoutes: Array<RouteRecordRaw> = [];
const externalRoutes: Array<RouteRecordRaw> = [];

/**
 * Route list, composed of core routes, external routes and 404 fallback route
 * No need for permission verification (will always be displayed in the menu)
 */
export const routes: Array<RouteRecordRaw> = [
  ...coreRoutes,
  ...externalRoutes,
  fallbackNotFoundRoute,
];

/** Core route list, these routes do not need permission verification */
export const coreRouteNames = traverseTreeValues({
  tree: coreRoutes,
  getValue: (route) => route.name,
});

/** Route list with permission verification, including dynamic routes and static routes */
export const accessRoutes = [
  ...dynamicRoutes,
  ...staticRoutes,
];
