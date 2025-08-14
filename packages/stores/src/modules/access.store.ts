import type { RouteRecordRaw } from 'vue-router';

import type { MenuRecordRaw } from '@mandor-core/typings';

import { acceptHMRUpdate, defineStore } from 'pinia';

interface StateAccess {
  /**
   * Access codes
   */
  accessCodes: Array<string>;
  /**
   * Accessible menu list
   */
  accessMenus: Array<MenuRecordRaw>;
  /**
   * Accessible route list
   */
  accessRoutes: Array<RouteRecordRaw>;
  /**
   * Whether access has been checked
   */
  isAccessChecked: boolean;
  /**
   * Whether the screen is locked
   */
  isLockScreen: boolean;
  /**
   * Lock screen password
   */
  lockScreenPassword?: string;
}

export const useAccessStore = defineStore('core-access', {
  state: (): StateAccess => ({
    accessCodes: [],
    accessMenus: [],
    accessRoutes: [],
    isAccessChecked: false,
    isLockScreen: false,
    lockScreenPassword: undefined,
  }),

  persist: {
    pick: [
      'accessCodes',
      'isLockScreen',
      'lockScreenPassword',
    ],
  },

  actions: {
    lockScreen(password: string) {
      this.isLockScreen = true;
      this.lockScreenPassword = password;
    },
    setAccessCodes(codes: Array<string>) {
      this.accessCodes = codes;
    },
    setAccessMenus(menus: Array<MenuRecordRaw>) {
      this.accessMenus = menus;
    },
    setAccessRoutes(routes: Array<RouteRecordRaw>) {
      this.accessRoutes = routes;
    },
    setIsAccessChecked(isAccessChecked: boolean) {
      this.isAccessChecked = isAccessChecked;
    },
    unlockScreen() {
      this.isLockScreen = false;
      this.lockScreenPassword = undefined;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccessStore, import.meta.hot));
}
