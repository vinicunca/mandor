import type { ComputedRef } from 'vue';
import type {
  RouteLocationNormalized,
  Router,
  RouteRecordNormalized,
} from 'vue-router';

import type { TabDefinition } from '@mandor-core/typings';

import { toRaw } from 'vue';

import { preferences } from '@mandor-core/preferences';
import {
  openRouteInNewWindow,
  startProgress,
  stopProgress,
} from '@mandor-core/shared/utils';

import { isString, sleep } from '@vinicunca/perkakas';
import { acceptHMRUpdate, defineStore } from 'pinia';

interface TabbarState {
  /**
   * Cached list of currently open tabs
   */
  cachedTabs: Set<string>;
  /**
   * Index of the tab after dragging ends
   */
  dragEndIndex: number;
  /**
   * Tabs that need to be excluded from caching
   */
  excludeCachedTabs: Set<string>;
  /**
   * Tab right-click menu list
   */
  menuList: Array<string>;
  /**
   * Whether to refresh
   */
  renderRouteView?: boolean;
  /**
   * List of currently open tabs
   */
  tabs: Array<TabDefinition>;
  /**
   * Update time, used for some update scenarios. Using deep watch would affect performance
   */
  updateTime?: number;
}

export const useTabbarStore = defineStore('core-tabbar', {
  actions: {
    /**
     * Close tabs in bulk
     */
    async _bulkCloseByKeys(keys: Array<string>) {
      const keySet = new Set(keys);
      this.tabs = this.tabs.filter(
        (item) => !keySet.has(getTabKeyFromTab(item)),
      );

      await this.updateCacheTabs();
    },
    /**
     * Close a tab
     */
    _close(tab: TabDefinition) {
      if (isAffixTab(tab)) {
        return;
      }
      const index = this.tabs.findIndex((item) => equalTab(item, tab));
      if (index !== -1) {
        this.tabs.splice(index, 1);
      }
    },
    /**
     * Navigate to the default tab
     */
    async _goToDefaultTab(router: Router) {
      if (this.getTabs.length <= 0) {
        return;
      }
      const firstTab = this.getTabs[0];
      if (firstTab) {
        await this._goToTab({ tab: firstTab, router });
      }
    },
    /**
     * Navigate to a tab
     */
    async _goToTab(
      { tab, router }: { tab: TabDefinition; router: Router },
    ) {
      const { params, path, query } = tab;
      const toParams = {
        params: params || {},
        path,
        query: query || {},
      };
      await router.replace(toParams);
    },
    /**
     * Add a tab
     */
    addTab(routeTab: TabDefinition): TabDefinition {
      let tab = cloneTab(routeTab);
      if (!tab.key) {
        tab.key = getTabKey(routeTab);
      }
      if (!isTabShown(tab)) {
        return tab;
      }

      const tabIndex = this.tabs.findIndex((item) => {
        return equalTab(item, tab);
      });

      if (tabIndex === -1) {
        const maxCount = preferences.tabbar.maxCount;
        // Get the number of dynamic route openings. If it exceeds 0, it means that the number of openings needs to be controlled.
        const maxNumOfOpenTab = (routeTab?.meta?.maxNumOfOpenTab
          ?? -1) as number;
        // If the dynamic route level is greater than 0, then the number of open routes needs to be limited
        // Get the number of dynamic routes already opened, and check if it exceeds a certain value
        if (
          maxNumOfOpenTab > 0
          && this.tabs.filter((tab) => tab.name === routeTab.name).length
          >= maxNumOfOpenTab
        ) {
          // Close the first one
          const index = this.tabs.findIndex(
            (item) => item.name === routeTab.name,
          );
          if (index !== -1) {
            this.tabs.splice(index, 1);
          }
        } else if (maxCount > 0 && this.tabs.length >= maxCount) {
          // Close the first one
          const index = this.tabs.findIndex(
            (item) =>
              !Reflect.has(item.meta, 'affixTab') || !item.meta.affixTab,
          );
          if (index !== -1) {
            this.tabs.splice(index, 1);
          }
        }
        this.tabs.push(tab);
      } else {
        // The page already exists, do not add the tab again, just update the tab parameters
        const currentTab = toRaw(this.tabs)[tabIndex];
        const mergedTab = {
          ...currentTab,
          ...tab,
          meta: { ...currentTab?.meta, ...tab.meta },
        };
        if (currentTab) {
          const curMeta = currentTab.meta;
          if (Reflect.has(curMeta, 'affixTab')) {
            mergedTab.meta.affixTab = curMeta.affixTab;
          }
          if (Reflect.has(curMeta, 'newTabTitle')) {
            mergedTab.meta.newTabTitle = curMeta.newTabTitle;
          }
        }
        tab = mergedTab;
        this.tabs.splice(tabIndex, 1, mergedTab);
      }
      this.updateCacheTabs();
      return tab;
    },
    /**
     * Close all tabs
     */
    async closeAllTabs(router: Router) {
      const newTabs = this.tabs.filter((tab) => isAffixTab(tab));
      this.tabs = newTabs.length > 0 ? newTabs : [...this.tabs].splice(0, 1);
      await this._goToDefaultTab(router);
      this.updateCacheTabs();
    },
    /**
     * Close tabs to the left
     */
    async closeLeftTabs(tab: TabDefinition) {
      const index = this.tabs.findIndex((item) => equalTab(item, tab));

      if (index < 1) {
        return;
      }

      const leftTabs = this.tabs.slice(0, index);
      const keys: Array<string> = [];

      for (const item of leftTabs) {
        if (!isAffixTab(item)) {
          keys.push(item.key as string);
        }
      }
      await this._bulkCloseByKeys(keys);
    },
    /**
     * Close other tabs
     */
    async closeOtherTabs(tab: TabDefinition) {
      const closeKeys = this.tabs.map((item) => getTabKeyFromTab(item));

      const keys: Array<string> = [];

      for (const key of closeKeys) {
        if (key !== getTabKeyFromTab(tab)) {
          const closeTab = this.tabs.find(
            (item) => getTabKeyFromTab(item) === key,
          );
          if (!closeTab) {
            continue;
          }
          if (!isAffixTab(closeTab)) {
            keys.push(closeTab.key as string);
          }
        }
      }
      await this._bulkCloseByKeys(keys);
    },
    /**
     * Close tabs to the right
     */
    async closeRightTabs(tab: TabDefinition) {
      const index = this.tabs.findIndex((item) => equalTab(item, tab));

      if (index !== -1 && index < this.tabs.length - 1) {
        const rightTabs = this.tabs.slice(index + 1);

        const keys: Array<string> = [];
        for (const item of rightTabs) {
          if (!isAffixTab(item)) {
            keys.push(item.key as string);
          }
        }
        await this._bulkCloseByKeys(keys);
      }
    },

    /**
     * Close a tab
     */
    async closeTab(tab: TabDefinition, router: Router) {
      const { currentRoute } = router;
      // Close non-active tabs
      if (getTabKey(currentRoute.value) !== getTabKeyFromTab(tab)) {
        this._close(tab);
        this.updateCacheTabs();
        return;
      }
      const index = this.getTabs.findIndex(
        (item) => getTabKeyFromTab(item) === getTabKey(currentRoute.value),
      );

      const before = this.getTabs[index - 1];
      const after = this.getTabs[index + 1];

      // If the next tab exists, switch to the next one
      if (after) {
        this._close(tab);
        await this._goToTab({ tab: after, router });
        // If the previous tab exists, switch to the previous one
      } else if (before) {
        this._close(tab);
        await this._goToTab({ tab: before, router });
      } else {
        console.error('Failed to close the tab; only one tab remains open.');
      }
    },

    /**
     * Close a tab by key
     */
    async closeTabByKey(
      { key, router }: { key: string; router: Router },
    ) {
      const originKey = decodeURIComponent(key);
      const index = this.tabs.findIndex(
        (item) => getTabKeyFromTab(item) === originKey,
      );
      if (index === -1) {
        return;
      }

      const tab = this.tabs[index];
      if (tab) {
        await this.closeTab(tab, router);
      }
    },

    /**
     * Get a tab by path
     */
    getTabByKey(key: string) {
      return this.getTabs.find(
        (item) => getTabKeyFromTab(item) === key,
      ) as TabDefinition;
    },
    /**
     * Open a tab in a new window
     */
    async openTabInNewWindow(tab: TabDefinition) {
      openRouteInNewWindow(tab.fullPath || tab.path);
    },

    /**
     * Pin a tab
     */
    async pinTab(tab: TabDefinition) {
      const index = this.tabs.findIndex((item) => equalTab(item, tab));
      if (index === -1) {
        return;
      }
      const oldTab = this.tabs[index];
      tab.meta.affixTab = true;
      tab.meta.title = oldTab?.meta?.title as string;
      this.tabs.splice(index, 1, tab);
      // Filter pinned tabs, changing the value of affixTabOrder later may cause problems.
      const affixTabs = this.tabs.filter((tab) => isAffixTab(tab));
      // Get the index of the pinned tabs
      const newIndex = affixTabs.findIndex((item) => equalTab(item, tab));
      // Swap positions and reorder
      await this.sortTabs({ oldIndex: index, newIndex });
    },

    /**
     * Refresh the tab
     */
    async refresh(router: Router | string) {
      // If it's a Router route, refresh based on the current route
      // If it's a string, it's the route name, refresh the specified tab, cannot be the current route name, otherwise it will not refresh
      if (isString(router)) {
        return await this.refreshByName(router);
      }

      const { currentRoute } = router;
      const { name } = currentRoute.value;

      this.excludeCachedTabs.add(name as string);
      this.renderRouteView = false;
      startProgress();

      await sleep(200);

      this.excludeCachedTabs.delete(name as string);
      this.renderRouteView = true;
      stopProgress();
    },

    /**
     * Refresh the specified tab page according to the route name
     */
    async refreshByName(name: string) {
      this.excludeCachedTabs.add(name);
      await sleep(200);
      this.excludeCachedTabs.delete(name);
    },

    /**
     * Reset the tab title
     */
    async resetTabTitle(tab: TabDefinition) {
      if (tab?.meta?.newTabTitle) {
        return;
      }
      const findTab = this.tabs.find((item) => equalTab(item, tab));
      if (findTab) {
        findTab.meta.newTabTitle = undefined;
        await this.updateCacheTabs();
      }
    },

    /**
     * Set pinned tabs
     */
    setAffixTabs(tabs: Array<RouteRecordNormalized>) {
      for (const tab of tabs) {
        tab.meta.affixTab = true;
        this.addTab(routeToTab(tab));
      }
    },

    /**
     * Update menu list
     */
    setMenuList(list: Array<string>) {
      this.menuList = list;
    },

    /**
     * Set the tab title
     *
     * Support setting static title string or calculated property as dynamic title
     * When the title is a calculated property, the title will be automatically updated as the calculated property value changes
     * Applicable to scenarios where the title needs to be dynamically updated according to the status or multi-language
     */
    async setTabTitle(
      { tab, title }: { tab: TabDefinition; title: ComputedRef<string> | string },
    ) {
      const findTab = this.tabs.find((item) => equalTab(item, tab));

      if (findTab) {
        findTab.meta.newTabTitle = title;

        await this.updateCacheTabs();
      }
    },
    setUpdateTime() {
      this.updateTime = Date.now();
    },
    /**
     * Set the tab order
     */
    async sortTabs(
      { oldIndex, newIndex }: { oldIndex: number; newIndex: number },
    ) {
      const currentTab = this.tabs[oldIndex];
      if (!currentTab) {
        return;
      }
      this.tabs.splice(oldIndex, 1);
      this.tabs.splice(newIndex, 0, currentTab);
      this.dragEndIndex = this.dragEndIndex + 1;
    },

    /**
     * Toggle pinned tab
     */
    async toggleTabPin(tab: TabDefinition) {
      const affixTab = tab?.meta?.affixTab ?? false;

      await (affixTab ? this.unpinTab(tab) : this.pinTab(tab));
    },

    /**
     * Unpin a tab
     */
    async unpinTab(tab: TabDefinition) {
      const index = this.tabs.findIndex((item) => equalTab(item, tab));
      if (index === -1) {
        return;
      }
      const oldTab = this.tabs[index];
      tab.meta.affixTab = false;
      tab.meta.title = oldTab?.meta?.title as string;
      this.tabs.splice(index, 1, tab);
      // Filter fixed tabs. If you change the value of affixTabOrder later, there may be problems. Currently, there is no set value for affixTabs.
      const affixTabs = this.tabs.filter((tab) => isAffixTab(tab));
      // Get the index of the fixed tabs, and use the next position of the fixed tabs, which is the first position of the active tabs.
      const newIndex = affixTabs.length;
      // Swap positions and reorder
      await this.sortTabs({ oldIndex: index, newIndex });
    },
    /**
     * Update the cache based on currently open tabs
     */
    async updateCacheTabs() {
      const cacheMap = new Set<string>();

      for (const tab of this.tabs) {
        // Skip tabs that don't need persistence
        const keepAlive = tab.meta?.keepAlive;
        if (!keepAlive) {
          continue;
        }
        (tab.matched || []).forEach((t, i) => {
          if (i > 0) {
            cacheMap.add(t.name as string);
          }
        });

        const name = tab.name as string;
        cacheMap.add(name);
      }
      this.cachedTabs = cacheMap;
    },
  },
  getters: {
    affixTabs(): Array<TabDefinition> {
      const affixTabs = this.tabs.filter((tab) => isAffixTab(tab));

      return affixTabs.sort((a, b) => {
        const orderA = (a.meta?.affixTabOrder ?? 0) as number;
        const orderB = (b.meta?.affixTabOrder ?? 0) as number;
        return orderA - orderB;
      });
    },
    getCachedTabs(): Array<string> {
      return [...this.cachedTabs];
    },
    getExcludeCachedTabs(): Array<string> {
      return [...this.excludeCachedTabs];
    },
    getMenuList(): Array<string> {
      return this.menuList;
    },
    getTabs(): Array<TabDefinition> {
      const normalTabs = this.tabs.filter((tab) => !isAffixTab(tab));
      return [...this.affixTabs, ...normalTabs].filter(Boolean);
    },
  },
  persist: [
    {
      pick: ['tabs'],
      storage: sessionStorage,
    },
  ],
  state: (): TabbarState => ({
    cachedTabs: new Set(),
    dragEndIndex: 0,
    excludeCachedTabs: new Set(),
    menuList: [
      'close',
      'affix',
      'maximize',
      'reload',
      'open-in-new-window',
      'close-left',
      'close-right',
      'close-other',
      'close-all',
    ],
    renderRouteView: true,
    tabs: [],
    updateTime: Date.now(),
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTabbarStore, import.meta.hot));
}

/**
 * Clone the route to prevent the route from being modified
 */
function cloneTab(route: TabDefinition): TabDefinition {
  if (!route) {
    return route;
  }
  const { matched, meta, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as Array<RouteRecordNormalized>,
    meta: {
      ...meta,
      newTabTitle: meta.newTabTitle,
    },
  };
}

/**
 * Is it a fixed tab?
 */
function isAffixTab(tab: TabDefinition) {
  return tab?.meta?.affixTab ?? false;
}

/**
 * Whether to display labels
 */
function isTabShown(tab: TabDefinition) {
  const matched = tab?.matched ?? [];
  return !tab.meta.hideInTab && matched.every((item) => !item.meta.hideInTab);
}

/**
 * Get the tab page key from the route
 */
function getTabKey(tab: RouteLocationNormalized | RouteRecordNormalized) {
  const {
    fullPath,
    path,
    meta: { fullPathKey } = {},
    query = {},
  } = tab as RouteLocationNormalized;
  // pageKey may be an array (may appear when query parameters are repeated)
  const pageKey = Array.isArray(query.pageKey)
    ? query.pageKey[0]
    : query.pageKey;
  let rawKey;
  if (pageKey) {
    rawKey = pageKey;
  } else {
    rawKey = fullPathKey === false ? path : (fullPath ?? path);
  }
  try {
    return decodeURIComponent(rawKey);
  } catch {
    return rawKey;
  }
}

/**
 * Get the tab page key from the tab
 * If the tab doesn't have a key, get the key from the route
 */
function getTabKeyFromTab(tab: TabDefinition): string {
  return tab.key ?? getTabKey(tab);
}

/**
 * 比较两个tab是否相等
 */
function equalTab(a: TabDefinition, b: TabDefinition) {
  return getTabKeyFromTab(a) === getTabKeyFromTab(b);
}

function routeToTab(route: RouteRecordNormalized) {
  return {
    meta: route.meta,
    name: route.name,
    path: route.path,
    key: getTabKey(route),
  } as TabDefinition;
}

export { getTabKey };
