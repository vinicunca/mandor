import type { RouteRecordRaw } from 'vue-router';

import type { MenuRecordRaw } from '@mandor-core/typings';

import { acceptHMRUpdate, defineStore } from 'pinia';

export interface SupabaseSession {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
}

interface StateAccess extends SupabaseSession {
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
    access_token: '',
    expires_at: 0,
    expires_in: 0,
    refresh_token: '',
  }),

  persist: {
    pick: [
      'access_token',
      'refresh_token',
      'expires_at',
      'expires_in',
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
    setSession(session: SupabaseSession) {
      this.access_token = session.access_token;
      this.expires_at = session.expires_at;
      this.expires_in = session.expires_in;
      this.refresh_token = session.refresh_token;
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
