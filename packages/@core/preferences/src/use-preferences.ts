import { getDiff } from '@mandor-core/shared/utils';

import { computed } from 'vue';

import { isDarkTheme } from './css.preference';
import { preferencesManager } from './manager.preference';

export function usePreferences() {
  const preferences = preferencesManager.getPreferences();
  const initialPreferences = preferencesManager.getInitialPreferences();

  const diffPreference = computed(() => {
    return getDiff(initialPreferences, preferences);
  });

  const appPreferences = computed(() => preferences.app);

  const shortcutKeysPreferences = computed(() => preferences.shortcutKeys);

  const isDark = computed(() => {
    return isDarkTheme(preferences.theme.mode);
  });

  const locale = computed(() => {
    return preferences.app.locale;
  });

  const isMobile = computed(() => {
    return appPreferences.value.isMobile;
  });

  const theme = computed(() => {
    return isDark.value ? 'dark' : 'light';
  });

  const layout = computed(() =>
    isMobile.value ? 'sidebar-nav' : appPreferences.value.layout,
  );

  const isShowHeaderNav = computed(() => {
    return preferences.header.enable;
  });

  const isFullContent = computed(
    () => appPreferences.value.layout === 'full-content',
  );

  const isSideNav = computed(
    () => appPreferences.value.layout === 'sidebar-nav',
  );

  const isSideMixedNav = computed(
    () => appPreferences.value.layout === 'sidebar-mixed-nav',
  );

  const isHeaderNav = computed(
    () => appPreferences.value.layout === 'header-nav',
  );

  const isHeaderMixedNav = computed(
    () => appPreferences.value.layout === 'header-mixed-nav',
  );

  const isHeaderSidebarNav = computed(
    () => appPreferences.value.layout === 'header-sidebar-nav',
  );

  const isMixedNav = computed(
    () => appPreferences.value.layout === 'mixed-nav',
  );

  const isSideMode = computed(() => {
    return (
      isMixedNav.value
      || isSideMixedNav.value
      || isSideNav.value
      || isHeaderMixedNav.value
      || isHeaderSidebarNav.value
    );
  });

  const sidebarCollapsed = computed(() => {
    return preferences.sidebar.collapsed;
  });

  const keepAlive = computed(
    () => preferences.tabbar.enable && preferences.tabbar.keepAlive,
  );

  const authPageLayout = computed(() => appPreferences.value.authPageLayout);

  const contentIsMaximize = computed(() => {
    const headerIsHidden = preferences.header.hidden;
    const sidebarIsHidden = preferences.sidebar.hidden;
    return headerIsHidden && sidebarIsHidden && !isFullContent.value;
  });

  const globalSearchShortcutKey = computed(() => {
    const { enable, globalSearch } = shortcutKeysPreferences.value;
    return enable && globalSearch;
  });

  const globalLogoutShortcutKey = computed(() => {
    const { enable, globalLogout } = shortcutKeysPreferences.value;
    return enable && globalLogout;
  });

  const globalLockScreenShortcutKey = computed(() => {
    const { enable, globalLockScreen } = shortcutKeysPreferences.value;
    return enable && globalLockScreen;
  });

  const preferencesButtonPosition = computed(() => {
    const { enablePreferences, preferencesButtonPosition } = preferences.app;

    if (!enablePreferences) {
      return {
        fixed: false,
        header: false,
      };
    }

    const { header, sidebar } = preferences;
    const headerHidden = header.hidden;
    const sidebarHidden = sidebar.hidden;

    const contentIsMaximize = headerHidden && sidebarHidden;

    const isHeaderPosition = preferencesButtonPosition === 'header';

    if (preferencesButtonPosition !== 'auto') {
      return {
        fixed: preferencesButtonPosition === 'fixed',
        header: isHeaderPosition,
      };
    }

    const fixed = contentIsMaximize
      || isFullContent.value
      || isMobile.value
      || !isShowHeaderNav.value;

    return {
      fixed,
      header: !fixed,
    };
  });

  return {
    authPageLayout,
    contentIsMaximize,
    diffPreference,
    globalLockScreenShortcutKey,
    globalLogoutShortcutKey,
    globalSearchShortcutKey,
    isDark,
    isFullContent,
    isHeaderMixedNav,
    isHeaderNav,
    isHeaderSidebarNav,
    isMixedNav,
    isMobile,
    isSideMixedNav,
    isSideMode,
    isSideNav,
    keepAlive,
    layout,
    locale,
    preferencesButtonPosition,
    sidebarCollapsed,
    theme,
  };
}
