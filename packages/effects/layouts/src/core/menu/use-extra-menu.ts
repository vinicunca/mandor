import type { ComputedRef } from 'vue';

import type { MenuRecordRaw } from '@mandor/typings';

import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { preferences } from '@mandor/preferences';
import { useAccessStore } from '@mandor/stores';
import { findRootMenuByPath } from '@mandor/utils';

import { useNavigation } from './use-navigation';

export function useExtraMenu(useRootMenus?: ComputedRef<Array<MenuRecordRaw>>) {
  const accessStore = useAccessStore();
  const { navigation, willOpenedByWindow } = useNavigation();

  const menus = computed(() => useRootMenus?.value ?? accessStore.accessMenus);

  /** Record which submenu under the current top-level menu was last activated */
  const defaultSubMap = new Map<string, string>();
  const extraRootMenus = ref<Array<MenuRecordRaw>>([]);
  const route = useRoute();
  const extraMenus = ref<Array<MenuRecordRaw>>([]);
  const sidebarExtraVisible = ref<boolean>(false);
  const extraActiveMenu = ref('');
  const parentLevel = computed(() =>
    preferences.app.layout === 'header-mixed-nav' ? 1 : 0,
  );

  async function handleMixedMenuSelect(menu: MenuRecordRaw) {
    const _extraMenus = menu?.children ?? [];
    const hasChildren = _extraMenus.length > 0;

    if (!willOpenedByWindow(menu.path)) {
      extraMenus.value = _extraMenus ?? [];
      extraActiveMenu.value = menu.parents?.[parentLevel.value] ?? menu.path;
      sidebarExtraVisible.value = hasChildren;
    }

    if (!hasChildren) {
      await navigation(menu.path);
    } else if (preferences.sidebar.autoActivateChild) {
      await navigation(
        defaultSubMap.has(menu.path)
          ? (defaultSubMap.get(menu.path) as string)
          : menu.path,
      );
    }
  }

  async function handleDefaultSelect({ menu, rootMenu }: { menu: MenuRecordRaw; rootMenu?: MenuRecordRaw }) {
    extraMenus.value = rootMenu?.children ?? extraRootMenus.value ?? [];
    extraActiveMenu.value = menu.parents?.[parentLevel.value] ?? menu.path;

    if (preferences.sidebar.expandOnHover) {
      sidebarExtraVisible.value = extraMenus.value.length > 0;
    }
  }

  const handleSideMouseLeave = () => {
    if (preferences.sidebar.expandOnHover) {
      return;
    }

    const { findMenu, rootMenu, rootMenuPath } = findRootMenuByPath({
      menus: menus.value,
      path: route.path,
    });
    extraActiveMenu.value = rootMenuPath ?? findMenu?.path ?? '';
    extraMenus.value = rootMenu?.children ?? [];
  };

  function handleMenuMouseEnter(menu: MenuRecordRaw) {
    if (!preferences.sidebar.expandOnHover) {
      const { findMenu } = findRootMenuByPath({
        menus: menus.value,
        path: menu.path,
      });

      extraMenus.value = findMenu?.children ?? [];
      extraActiveMenu.value = menu.parents?.[parentLevel.value] ?? menu.path;
      sidebarExtraVisible.value = extraMenus.value.length > 0;
    }
  }

  function calcExtraMenus(path: string) {
    const currentPath = route.meta?.activePath || path;
    const { findMenu, rootMenu, rootMenuPath } = findRootMenuByPath({
      menus: menus.value,
      path: currentPath,
      level: parentLevel.value,
    });

    extraRootMenus.value = rootMenu?.children ?? [];

    if (rootMenuPath) {
      defaultSubMap.set(rootMenuPath, currentPath);
    }

    extraActiveMenu.value = rootMenuPath ?? findMenu?.path ?? '';
    extraMenus.value = rootMenu?.children ?? [];

    if (preferences.sidebar.expandOnHover) {
      sidebarExtraVisible.value = extraMenus.value.length > 0;
    }
  }

  watch(
    () => [route.path, preferences.app.layout],
    ([path]) => {
      calcExtraMenus(path || '');
    },
    { immediate: true },
  );

  return {
    extraActiveMenu,
    extraMenus,
    handleDefaultSelect,
    handleMenuMouseEnter,
    handleMixedMenuSelect,
    handleSideMouseLeave,
    sidebarExtraVisible,
  };
}
