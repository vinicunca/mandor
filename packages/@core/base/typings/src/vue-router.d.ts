import type { Component } from 'vue';
import type { Router, RouteRecordRaw } from 'vue-router';

export interface RouteMeta {
  /**
   * Active icon (menu/tab)
   */
  activeIcon?: string;
  /**
   * Currently active menu, used when you want to activate the parent menu instead of the current menu
   */
  activePath?: string;
  /**
   * Whether to fix the tab
   * @default false
   */
  affixTab?: boolean;
  /**
   * Order of the fixed tab
   * @default 0
   */
  affixTabOrder?: number;
  /**
   * Roles required to access
   * @default []
   */
  authority?: Array<string>;
  /**
   * Badge
   */
  badge?: string;
  /**
   * Badge type
   */
  badgeType?: 'dot' | 'normal';
  /**
   * Badge color
   */
  badgeVariants?:
    | 'default'
    | 'destructive'
    | 'primary'
    | 'success'
    | 'warning'
    | string;
  /**
   * The full path of the route is used as the key
   * @default true
   */
  fullPathKey?: boolean;
  /**
   * Do not display the children of the current route in the menu
   * @default false
   */
  hideChildrenInMenu?: boolean;
  /**
   * Do not display the current route in the breadcrumb
   * @default false
   */
  hideInBreadcrumb?: boolean;
  /**
   * Do not display the current route in the menu
   * @default false
   */
  hideInMenu?: boolean;
  /**
   * Do not display the current route in the tab
   * @default false
   */
  hideInTab?: boolean;
  /**
   * Icon (menu/tab)
   */
  icon?: Component | string;
  /**
   * Iframe source URL
   */
  iframeSrc?: string;
  /**
   * Ignore access control, can be accessed directly
   * @default false
   */
  ignoreAccess?: boolean;
  /**
   * Enable KeepAlive cache
   */
  keepAlive?: boolean;
  /**
   * External link - redirect path
   */
  link?: string;
  /**
   * Whether the route has been loaded
   */
  loaded?: boolean;
  /**
   * Maximum number of open tabs
   * @default -1
   */
  maxNumOfOpenTab?: number;
  /**
   * Menu is visible, but access will be redirected to 403
   */
  menuVisibleWithForbidden?: boolean;
  /**
   * Open in a new window
   */
  openInNewWindow?: boolean;
  /**
   * Used for route -> menu sorting
   */
  order?: number;
  /**
   * Parameters carried by the menu
   */
  query?: Recordable;
  /**
   * Title name
   */
  title: string;
}

// Define a recursive type to change the component property of RouteRecordRaw to string
export type RouteRecordStringComponent<T = string> = Omit<
  RouteRecordRaw,
  'children' | 'component'
> & {
  children?: Array<RouteRecordStringComponent<T>>;
  component: T;
};

export type ComponentRecordType = Record<string, () => Promise<Component>>;

export interface GenerateMenuAndRoutesOptions {
  fetchMenuListAsync?: () => Promise<Array<RouteRecordStringComponent>>;
  forbiddenComponent?: RouteRecordRaw['component'];
  layoutMap?: ComponentRecordType;
  pageMap?: ComponentRecordType;
  roles?: Array<string>;
  router: Router;
  routes: Array<RouteRecordRaw>;
}

export type {
  RouteRecordRaw,
};
