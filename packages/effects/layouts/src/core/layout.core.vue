<script lang="ts" setup>
import type { SetupContext } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

import type { MenuRecordRaw } from '@mandor/typings';

import { computed, onMounted, useSlots, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useRefresh } from '@mandor/composables';
import { $t } from '@mandor/locales';
import {
  preferences,
  updatePreferences,
  usePreferences,
} from '@mandor/preferences';
import { mapTree } from '@mandor/utils';

import { AuLogo } from '@mandor-core/akar-ui';
import { MandorAdminLayout } from '@mandor-core/layout-ui';

import { clone } from '@vinicunca/perkakas';

import { LayoutBreadcrumb } from '../widgets';
import { LayoutContent } from './content';
import { LayoutCopyright } from './copyright';
import { LayoutFooter } from './footer';
import { LayoutHeader } from './header';
import {
  LayoutExtraMenu,
  LayoutMenu,
  LayoutMixedMenu,
  useExtraMenu,
  useMixedMenu,
} from './menu';

defineOptions({ name: 'LayoutCore' });

const emits = defineEmits<{
  clearPreferencesAndLogout: [];
}>();

const {
  isDark,
  isHeaderNav,
  isMixedNav,
  isMobile,
  isSideMixedNav,
  isHeaderMixedNav,
  isHeaderSidebarNav,
  layout,
  sidebarCollapsed,
  theme,
} = usePreferences();
const { refresh } = useRefresh();

const sidebarTheme = computed(() => {
  const dark = isDark.value || preferences.theme.semiDarkSidebar;

  return dark ? 'dark' : 'light';
});

const headerTheme = computed(() => {
  const dark = isDark.value || preferences.theme.semiDarkHeader;

  return dark ? 'dark' : 'light';
});

const logoClass = computed(() => {
  const { collapsedShowTitle } = preferences.sidebar;
  const classes: Array<string> = [];

  if (collapsedShowTitle && sidebarCollapsed.value && !isMixedNav.value) {
    classes.push('mx-auto');
  }

  if (isSideMixedNav.value) {
    classes.push('flex-center');
  }

  return classes.join(' ');
});

const isMenuRounded = computed(() => {
  return preferences.navigation.styleType === 'rounded';
});

const logoCollapsed = computed(() => {
  if (isMobile.value && sidebarCollapsed.value) {
    return true;
  }
  if (isHeaderNav.value || isMixedNav.value || isHeaderSidebarNav.value) {
    return false;
  }
  return (
    sidebarCollapsed.value || isSideMixedNav.value || isHeaderMixedNav.value
  );
});

const showHeaderNav = computed(() => {
  return (
    !isMobile.value
    && (isHeaderNav.value || isMixedNav.value || isHeaderMixedNav.value)
  );
});

const {
  handleMenuSelect,
  handleMenuOpen,
  headerActive,
  headerMenus,
  sidebarActive,
  sidebarMenus,
  mixHeaderMenus,
  sidebarVisible,
} = useMixedMenu();

// Side multi-column menu
const {
  extraActiveMenu,
  extraMenus,
  handleDefaultSelect,
  handleMenuMouseEnter,
  handleMixedMenuSelect,
  handleSideMouseLeave,
  sidebarExtraVisible,
} = useExtraMenu(mixHeaderMenus);

/**
 * Wrap menu, translate menu name
 * @param options
 * @param options.menus original menu data
 * @param options.deep whether to wrap deeply. For a two-column layout, only the first layer needs to be wrapped, because deeper data will be re-wrapped in the expanded menu
 */
function wrapperMenus(
  { menus, deep = true }:
  {
    menus: Array<MenuRecordRaw>;
    deep?: boolean;
  },
) {
  return deep
    ? mapTree({
        tree: menus,
        mapper: (item) => {
          return { ...clone(item), name: $t(item.name) };
        },
      })
    : menus.map((item) => {
        return { ...clone(item), name: $t(item.name) };
      });
}

function toggleSidebar() {
  updatePreferences({
    sidebar: {
      hidden: !preferences.sidebar.hidden,
    },
  });
}

function clearPreferencesAndLogout() {
  emits('clearPreferencesAndLogout');
}

function autoCollapseMenuByRouteMeta(route: RouteLocationNormalizedLoaded) {
  if (
    preferences.app.layout === 'sidebar-mixed-nav'
    && route.meta
    && route.meta.hideInMenu
  ) {
    sidebarExtraVisible.value = false;
  }
}

const route = useRoute();

onMounted(() => {
  autoCollapseMenuByRouteMeta(route);
});

watch(
  () => preferences.app.layout,
  async (val) => {
    if (val === 'sidebar-mixed-nav' && preferences.sidebar.hidden) {
      updatePreferences({
        sidebar: {
          hidden: false,
        },
      });
    }
  },
);

// After the language is updated, refresh the page
watch(() => preferences.app.locale, refresh, { flush: 'post' });

const slots: SetupContext['slots'] = useSlots();
const headerSlots = computed(() => {
  return Object.keys(slots).filter((key) => key.startsWith('header-'));
});
</script>

<template>
  <MandorAdminLayout
    v-model:sidebar-extra-visible="sidebarExtraVisible"
    :content-compact="preferences.app.contentCompact"
    :footer-enable="preferences.footer.enable"
    :footer-fixed="preferences.footer.fixed"
    :header-hidden="preferences.header.hidden"
    :header-mode="preferences.header.mode"
    :header-theme="headerTheme"
    :header-toggle-sidebar-button="preferences.widget.sidebarToggle"
    :header-visible="preferences.header.enable"
    :is-mobile="preferences.app.isMobile"
    :layout="layout"
    :sidebar-collapse="preferences.sidebar.collapsed"
    :sidebar-collapse-show-title="preferences.sidebar.collapsedShowTitle"
    :sidebar-enable="sidebarVisible"
    :sidebar-collapsed-button="preferences.sidebar.collapsedButton"
    :sidebar-fixed-button="preferences.sidebar.fixedButton"
    :sidebar-expand-on-hover="preferences.sidebar.expandOnHover"
    :sidebar-extra-collapse="preferences.sidebar.extraCollapse"
    :sidebar-hidden="preferences.sidebar.hidden"
    :sidebar-theme="sidebarTheme"
    :sidebar-width="preferences.sidebar.width"
    :tabbar-enable="preferences.tabbar.enable"
    :tabbar-height="preferences.tabbar.height"
    @side-mouse-leave="handleSideMouseLeave"
    @toggle-sidebar="toggleSidebar"
    @update:sidebar-collapse="
      (value) => updatePreferences({ sidebar: { collapsed: value } })
    "
    @update:sidebar-enable="
      (value) => updatePreferences({ sidebar: { enable: value } })
    "
    @update:sidebar-expand-on-hover="
      (value) => updatePreferences({ sidebar: { expandOnHover: value } })
    "
    @update:sidebar-extra-collapse="
      (value) => updatePreferences({ sidebar: { extraCollapse: value } })
    "
  >
    <!-- logo -->
    <template #logo>
      <AuLogo
        v-if="preferences.logo.enable"
        :class="logoClass"
        :collapsed="logoCollapsed"
        :src="preferences.logo.source"
        :text="preferences.app.name"
        :theme="showHeaderNav ? headerTheme : theme"
      >
        <template
          v-if="$slots['logo-text']"
          #text
        >
          <slot name="logo-text" />
        </template>
      </AuLogo>
    </template>

    <!-- Head area -->
    <template #header>
      <LayoutHeader
        :theme="theme"
        @clear-preferences-and-logout="clearPreferencesAndLogout"
      >
        <template
          v-if="!showHeaderNav && preferences.breadcrumb.enable"
          #breadcrumb
        >
          <LayoutBreadcrumb
            :hide-when-only-one="preferences.breadcrumb.hideOnlyOne"
            :show-home="preferences.breadcrumb.showHome"
            :show-icon="preferences.breadcrumb.showIcon"
            :type="preferences.breadcrumb.styleType"
          />
        </template>

        <template
          v-if="showHeaderNav"
          #menu
        >
          <!--  -->
        </template>

        <template #user-dropdown>
          <slot name="user-dropdown" />
        </template>

        <template #notification>
          <slot name="notification" />
        </template>

        <template
          v-for="item in headerSlots"
          #[item]
        >
          <slot :name="item" />
        </template>
      </LayoutHeader>
    </template>

    <!-- Side menu area -->
    <template #menu>
      <LayoutMenu
        :accordion="preferences.navigation.accordion"
        :collapse="preferences.sidebar.collapsed"
        :collapse-show-title="preferences.sidebar.collapsedShowTitle"
        :default-active="sidebarActive"
        :menus="wrapperMenus({ menus: sidebarMenus })"
        :rounded="isMenuRounded"
        :theme="sidebarTheme"
        mode="vertical"
        @open="handleMenuOpen"
        @select="handleMenuSelect"
      />
    </template>

    <template #mixed-menu>
      <!--  -->
    </template>

    <!-- Additional side area -->
    <template #side-extra>
      <!--  -->
    </template>

    <template #side-extra-title>
      <AuLogo
        v-if="preferences.logo.enable"
        :text="preferences.app.name"
        :theme="theme"
      >
        <template
          v-if="$slots['logo-text']"
          #text
        >
          <slot name="logo-text" />
        </template>
      </AuLogo>
    </template>

    <template #tabbar>
      <!-- <LayoutTabbar
        v-if="preferences.tabbar.enable"
        :show-icon="preferences.tabbar.showIcon"
        :theme="theme"
      /> -->
    </template>

    <!-- Main content -->
    <template #content>
      <LayoutContent />
    </template>

    <template
      v-if="preferences.transition.loading"
      #content-overlay
    >
      <!-- <LayoutContentSpinner /> -->
    </template>

    <!-- Footer -->
    <template
      v-if="preferences.footer.enable"
      #footer
    >
      <LayoutFooter>
        <LayoutCopyright
          v-if="preferences.copyright.enable"
          v-bind="preferences.copyright"
        />
      </LayoutFooter>
    </template>

    <template #extra>
      <slot name="extra" />
    </template>
  </MandorAdminLayout>
</template>
