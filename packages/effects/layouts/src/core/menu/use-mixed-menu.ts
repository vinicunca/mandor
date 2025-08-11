import type { MenuItemPayload, MenuProps } from '@mandor-core/menu-ui';
import type { MenuRecordRaw } from '@mandor/typings';

import { preferences, usePreferences } from '@mandor/preferences';
import { useAccessStore } from '@mandor/stores';

import { findRootMenuByPath } from '@mandor/utils';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useNavigation } from './use-navigation';

export function useMixedMenu() {
  const { navigation, willOpenedByWindow } = useNavigation();
  const accessStore = useAccessStore();
  const route = useRoute();
  const splitSideMenus = ref<Array<MenuRecordRaw>>([]);
  const rootMenuPath = ref<string>('');
  const mixedRootMenuPath = ref<string>('');
  const mixExtraMenus = ref<Array<MenuRecordRaw>>([]);
  /** Record which submenu under the current top-level menu was last activated */
  const defaultSubMap = new Map<string, string>();
  const { isMixedNav, isHeaderMixedNav } = usePreferences();

  const needSplit = computed(
    () =>
      (preferences.navigation.split && isMixedNav.value)
      || isHeaderMixedNav.value,
  );

  const sidebarVisible = computed(() => {
    const enableSidebar = preferences.sidebar.enable;
    if (needSplit.value) {
      return enableSidebar && splitSideMenus.value.length > 0;
    }

    return enableSidebar;
  });

  const menus = computed(() => accessStore.accessMenus);

  const headerMenus = computed(() => {
    if (!needSplit.value) {
      return menus.value;
    }
    return menus.value.map((item) => {
      return {
        ...item,
        children: [],
      };
    });
  });

  const sidebarMenus = computed(() => {
    return needSplit.value ? splitSideMenus.value : menus.value;
  });

  const mixHeaderMenus = computed(() => {
    return isHeaderMixedNav.value ? sidebarMenus.value : headerMenus.value;
  });

  const sidebarActive = computed(() => {
    return (route?.meta?.activePath as string) ?? route.path;
  });

  const headerActive = computed(() => {
    if (!needSplit.value) {
      return route.meta?.activePath ?? route.path;
    }
    return rootMenuPath.value;
  });

  function handleMenuSelect({ key, mode }: {
    key: string;
    mode: MenuProps['mode'];
  }) {
    if (!needSplit.value || mode === 'vertical') {
      navigation(key);
      return;
    }
    const rootMenu = menus.value.find((item) => item.path === key);
    const _splitSideMenus = rootMenu?.children ?? [];

    if (!willOpenedByWindow(key)) {
      rootMenuPath.value = rootMenu?.path ?? '';
      splitSideMenus.value = _splitSideMenus;
    }

    if (_splitSideMenus.length === 0) {
      navigation(key);
    } else if (rootMenu && preferences.sidebar.autoActivateChild) {
      navigation(
        defaultSubMap.has(rootMenu.path)
          ? (defaultSubMap.get(rootMenu.path) as string)
          : rootMenu.path,
      );
    }
  }

  function handleMenuOpen({ path, parentPaths }: MenuItemPayload) {
    if (parentPaths.length <= 1 && preferences.sidebar.autoActivateChild) {
      navigation(
        defaultSubMap.has(path)
          ? (defaultSubMap.get(path) as string)
          : path,
      );
    }
  }

  function calcSideMenus(path: string = route.path) {
    let { rootMenu } = findRootMenuByPath({
      menus: menus.value,
      path,
    });

    if (!rootMenu) {
      rootMenu = menus.value.find((item) => item.path === path);
    }

    const result = findRootMenuByPath({
      menus: rootMenu?.children || [],
      path,
      level: 1,
    });
    mixedRootMenuPath.value = result.rootMenuPath ?? '';
    mixExtraMenus.value = result.rootMenu?.children ?? [];
    rootMenuPath.value = rootMenu?.path ?? '';
    splitSideMenus.value = rootMenu?.children ?? [];
  }

  watch(
    () => route.path,
    (path) => {
      const currentPath = route?.meta?.activePath ?? route?.meta?.link ?? path;
      if (willOpenedByWindow(currentPath)) {
        return;
      }
      calcSideMenus(currentPath);
      if (rootMenuPath.value) {
        defaultSubMap.set(rootMenuPath.value, currentPath);
      }
    },
    { immediate: true },
  );

  onBeforeMount(() => {
    calcSideMenus(route.meta?.activePath || route.path);
  });

  return {
    handleMenuSelect,
    handleMenuOpen,
    headerActive,
    headerMenus,
    sidebarActive,
    sidebarMenus,
    mixHeaderMenus,
    mixExtraMenus,
    sidebarVisible,
  };
}
