import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import type { LinkRecord } from './link-record';

/**
 * Extended route record object
 */
export type ExtendedRouteRecordRaw = RouteRecordRaw & {
  parent?: string;
  parents?: Array<string>;
  path?: any;
};

export interface MenuRecordBadgeRaw {
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
  badgeVariants?: 'destructive' | 'primary' | string;
}

/**
 * Menu record object
 */
export interface MenuRecordRaw extends MenuRecordBadgeRaw {
  /**
   * Icon name when active
   */
  activeIcon?: string;
  /**
   * Submenus
   */
  children?: Array<MenuRecordRaw>;
  /**
   * Whether the menu is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon name
   */
  icon?: Component | string;
  /**
   * Menu name
   */
  name: string;
  /**
   * Order number
   */
  order?: number;
  /**
   * Parent path
   */
  parent?: string;
  /**
   * All parent paths
   */
  parents?: Array<string>;
  /**
   * Menu path, unique, can be used as a key
   */
  path: string;
  /**
   * Whether to show the menu
   * @default true
   */
  show?: boolean;
}

export interface NavigationMenuRecord extends LinkRecord {
  defaultOpen?: boolean;
  isOpen?: boolean;
  /**
   * The value of the item. Avoid using `index` as the value to prevent conflicts in horizontal orientation with Akar.
   * @defaultValue `item-${index}`
   */
  value?: string;
}
