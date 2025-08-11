<script lang="ts" setup>
import type { VNode } from 'vue';
import type {
  RouteLocationNormalizedLoaded,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router';

import { preferences, usePreferences } from '@mandor/preferences';
import { getTabKey, storeToRefs, useTabbarStore } from '@mandor/stores';

import { computed } from 'vue';
import { RouterView } from 'vue-router';

import { IFrameRouterView } from '../../iframe';

const tabbarStore = useTabbarStore();
const { keepAlive } = usePreferences();

const { getCachedTabs, getExcludeCachedTabs, renderRouteView } = storeToRefs(tabbarStore);

/**
 * Whether to use animation
 */
const getEnabledTransition = computed(() => {
  const { transition } = preferences;
  const transitionName = transition.name;
  return transitionName && transition.enable;
});

// Page switching animation
function getTransitionName(_route: RouteLocationNormalizedLoaded) {
  // If the preference is not set, no animation is used.
  const { tabbar, transition } = preferences;
  const transitionName = transition.name;
  if (!transitionName || !transition.enable) {
    return;
  }

  // If the tab bar is not enabled or caching is not enabled, use the global configuration animation
  if (!tabbar.enable || !keepAlive) {
    return transitionName;
  }

  return transitionName;
}

/**
 * Transform component, automatically add name
 */
function transformComponent(
  component: VNode,
  route: RouteLocationNormalizedLoadedGeneric,
) {
  // Component view not found, if a fallback view is set, return the fallback view, otherwise throw an error
  if (!component) {
    console.error(
      'Component view not found, please check the route configuration',
    );
    return undefined;
  }

  const routeName = route.name as string;
  // If the component does not have a name, return directly
  if (!routeName) {
    return component;
  }
  const componentName = (component?.type as any)?.name;

  // If the name has been set, return directly
  if (componentName) {
    return component;
  }

  // If componentName is equal to routeName, return component directly
  if (componentName === routeName) {
    return component;
  }

  // Set name
  component.type ||= {};
  (component.type as any).name = routeName;

  return component;
}
</script>

<template>
  <div
    class="relative h-full"
    data-akar-drawer-wrapper
  >
    <IFrameRouterView />

    <RouterView v-slot="{ Component, route }">
      <Transition
        v-if="getEnabledTransition"
        :name="getTransitionName(route)"
        appear
        mode="out-in"
      >
        <KeepAlive
          v-if="keepAlive"
          :exclude="getExcludeCachedTabs"
          :include="getCachedTabs"
        >
          <component
            :is="transformComponent(Component, route)"
            v-if="renderRouteView"
            v-show="!route.meta.iframeSrc"
            :key="getTabKey(route)"
          />
        </KeepAlive>

        <component
          :is="Component"
          v-else-if="renderRouteView"
          :key="getTabKey(route)"
        />
      </Transition>

      <template v-else>
        <KeepAlive
          v-if="keepAlive"
          :exclude="getExcludeCachedTabs"
          :include="getCachedTabs"
        >
          <component
            :is="transformComponent(Component, route)"
            v-if="renderRouteView"
            v-show="!route.meta.iframeSrc"
            :key="getTabKey(route)"
          />
        </KeepAlive>

        <component
          :is="Component"
          v-else-if="renderRouteView"
          :key="getTabKey(route)"
        />
      </template>
    </RouterView>
  </div>
</template>
