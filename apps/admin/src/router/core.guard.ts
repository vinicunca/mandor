import type { Router } from 'vue-router';

import { LOGIN_PATH } from '@mandor/constants';
import { preferences } from '@mandor/preferences';
import { useAccessStore } from '@mandor/stores';
import { startProgress, stopProgress } from '@mandor/utils';

// import { useAuthStore } from '~~/auth/auth.store';
// import { useUserStore } from '~~/auth/user.store';
import { generateAccess } from './access.router';
import { accessRoutes, coreRouteNames } from './routes';

export function createRouterGuard(router: Router) {
  setupCommonGuard(router);

  setupAccessGuard(router);
}

function setupCommonGuard(router: Router) {
  // Save the pages that have been loaded
  const loadedPaths = new Set<string>();

  router.beforeEach((to) => {
    to.meta.loaded = loadedPaths.has(to.path);

    // Page loading progress bar
    if (!to.meta.loaded && preferences.transition.progress) {
      startProgress();
    }

    return true;
  });

  router.afterEach((to) => {
    /**
     * Record whether the page is loaded.
     * If the page is loaded, the subsequent page switching animation and other effects will not be repeated.
     */
    loadedPaths.add(to.path);

    // Close the page loading progress bar
    if (preferences.transition.progress) {
      stopProgress();
    }
  });
}

function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const accessStore = useAccessStore();
    // const userStore = useUserStore();
    // const authStore = useAuthStore();

    // Basic routes, these routes do not need to enter the access guard
    if (coreRouteNames.includes(to.name as string)) {
      if (to.path === LOGIN_PATH && accessStore.access_token) {
        return decodeURIComponent(
          (to.query?.redirect as string)
          // || userStore.userInfo?.home_path
          || preferences.app.defaultHomePath,
        );
      }

      return true;
    }

    // accessToken check
    // if (!accessStore.access_token) {
    //   // Explicitly declare to ignore access permissions, then it can be accessed
    //   if (to.meta.ignoreAccess) {
    //     return true;
    //   }

    //   // No access permission, redirect to login page
    //   if (to.fullPath !== LOGIN_PATH) {
    //     return {
    //       path: LOGIN_PATH,
    //       // If not needed, directly delete the query
    //       query:
    //         to.fullPath === preferences.app.defaultHomePath
    //           ? {}
    //           : { redirect: encodeURIComponent(to.fullPath) },
    //       // Carry the current page to be redirected, and redirect to this page after login
    //       replace: true,
    //     };
    //   }

    //   return to;
    // }

    // Whether dynamic routes have been generated
    if (accessStore.isAccessChecked) {
      return true;
    }

    // Generate route table
    // List of role identifiers that the current logged-in user has
    // const userInfo = userStore.userInfo || (await authStore.fetchUserInfo());
    // const userRoles = userStore.currentOrganization
    //   ? [userStore.currentOrganization.role]
    //   : [];

    // Generate menus and routes
    const { accessibleMenus, accessibleRoutes } = await generateAccess({
      // roles: userRoles,
      router,
      // Will be displayed in the menu, but access will be redirected to 403
      routes: accessRoutes,
    });
    // Save menu information and route information
    accessStore.setAccessMenus(accessibleMenus);
    accessStore.setAccessRoutes(accessibleRoutes);
    accessStore.setIsAccessChecked(true);

    let redirectPath: string;

    if (from.query.redirect) {
      redirectPath = from.query.redirect as string;
    } else if (to.path === preferences.app.defaultHomePath) {
      redirectPath = preferences.app.defaultHomePath;
    // } else if (userInfo && userInfo.home_path && to.path === userInfo.home_path) {
    //   redirectPath = userInfo.home_path;
    } else {
      redirectPath = to.fullPath;
    }

    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true,
    };
  });
}
