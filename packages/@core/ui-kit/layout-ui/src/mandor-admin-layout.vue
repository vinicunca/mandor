<script lang="ts" setup>
import type { CSSProperties } from 'vue';

import type { NgiburLayoutProps } from './layout.typings';

import { computed, ref, useTemplateRef, watch } from 'vue';

import { SCROLL_FIXED_CLASS, useLayoutFooterStyle, useLayoutHeaderStyle } from '@ngibur-core/composables';
import { ELEMENT_ID_MAIN_CONTENT } from '@ngibur/constants';
import { PButtonIcon } from '@ngibur/pohon-ui';
import { useMouse, useScroll, useThrottleFn } from '@vueuse/core';

import {
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSidebar,
  LayoutTabbar,
} from './components';
import { useLayout } from './use-layout';

defineOptions({
  name: 'NgiburAdminLayout',
});

const props = withDefaults(
  defineProps<NgiburLayoutProps>(),
  {
    contentCompact: 'wide',
    contentCompactWidth: 1200,
    contentPadding: 0,
    contentPaddingBottom: 0,
    contentPaddingLeft: 0,
    contentPaddingRight: 0,
    contentPaddingTop: 0,
    footerEnable: false,
    footerFixed: true,
    footerHeight: 32,
    headerHeight: 50,
    headerHidden: false,
    headerMode: 'fixed',
    headerToggleSidebarButton: true,
    headerVisible: true,
    isMobile: false,
    layout: 'sidebar-nav',
    sidebarCollapsedButton: true,
    sidebarCollapseShowTitle: false,
    sidebarExtraCollapsedWidth: 60,
    sidebarFixedButton: true,
    sidebarHidden: false,
    sidebarMixedWidth: 80,
    sidebarTheme: 'dark',
    sidebarWidth: 180,
    sideCollapseWidth: 60,
    tabbarEnable: true,
    tabbarHeight: 40,
    zIndex: 200,
  },
);

const emits = defineEmits<{
  sideMouseLeave: [];
  toggleSidebar: [];
}>();

const sidebarCollapse = defineModel<boolean>('sidebarCollapse', {
  default: false,
});
const sidebarExtraVisible = defineModel<boolean>('sidebarExtraVisible');
const sidebarExtraCollapse = defineModel<boolean>('sidebarExtraCollapse', {
  default: false,
});
const sidebarExpandOnHover = defineModel<boolean>('sidebarExpandOnHover', {
  default: false,
});
const sidebarEnable = defineModel<boolean>('sidebarEnable', { default: true });

// Whether side is in hover state to expand the menu
const sidebarExpandOnHovering = ref(false);
const headerIsHidden = ref(false);
const contentRef = useTemplateRef('contentRef');

const {
  arrivedState,
  directions,
  isScrolling,
  y: scrollY,
} = useScroll(document);

const { setLayoutHeaderHeight } = useLayoutHeaderStyle();
const { setLayoutFooterHeight } = useLayoutFooterStyle();

const { y: mouseY } = useMouse({
  target: contentRef,
  type: 'client',
});

const {
  currentLayout,
  isFullContent,
  isHeaderMixedNav,
  isHeaderNav,
  isMixedNav,
  isSidebarMixedNav,
} = useLayout(props);

/**
 * Whether the top bar is automatically hidden
 */
const isHeaderAutoMode = computed(() => props.headerMode === 'auto');

const headerWrapperHeight = computed(() => {
  let height = 0;
  if (props.headerVisible && !props.headerHidden) {
    height += props.headerHeight;
  }
  if (props.tabbarEnable) {
    height += props.tabbarHeight;
  }
  return height;
});

const getSideCollapseWidth = computed(() => {
  const { sidebarCollapseShowTitle, sidebarMixedWidth, sideCollapseWidth }
    = props;

  return sidebarCollapseShowTitle
    || isSidebarMixedNav.value
    || isHeaderMixedNav.value
    ? sidebarMixedWidth
    : sideCollapseWidth;
});

/**
 * Dynamically get whether the sidebar area is visible
 */
const sidebarEnableState = computed(() => {
  return !isHeaderNav.value && sidebarEnable.value;
});

/**
 * Sidebar margin top height
 */
const sidebarMarginTop = computed(() => {
  const { headerHeight, isMobile } = props;
  return isMixedNav.value && !isMobile ? headerHeight : 0;
});

/**
 * Dynamically get the sidebar width
 */
const getSidebarWidth = computed(() => {
  const { isMobile, sidebarHidden, sidebarMixedWidth, sidebarWidth } = props;
  let width = 0;

  if (sidebarHidden) {
    return width;
  }

  if (
    !sidebarEnableState.value
    || (sidebarHidden
      && !isSidebarMixedNav.value
      && !isMixedNav.value
      && !isHeaderMixedNav.value)
  ) {
    return width;
  }

  if ((isHeaderMixedNav.value || isSidebarMixedNav.value) && !isMobile) {
    width = sidebarMixedWidth;
  } else if (sidebarCollapse.value) {
    width = isMobile ? 0 : getSideCollapseWidth.value;
  } else {
    width = sidebarWidth;
  }
  return width;
});

/**
 * Get the width of the extra area
 */
const sidebarExtraWidth = computed(() => {
  const { sidebarExtraCollapsedWidth, sidebarWidth } = props;

  return sidebarExtraCollapse.value ? sidebarExtraCollapsedWidth : sidebarWidth;
});

/**
 * Whether it is sidebar mode, including mixed sidebar
 */
const isSideMode = computed(
  () =>
    currentLayout.value === 'mixed-nav'
    || currentLayout.value === 'sidebar-mixed-nav'
    || currentLayout.value === 'sidebar-nav'
    || currentLayout.value === 'header-mixed-nav'
    || currentLayout.value === 'header-sidebar-nav',
);

/**
 * header fixed value
 */
const headerFixed = computed(() => {
  const { headerMode } = props;
  return (
    isMixedNav.value
    || headerMode === 'fixed'
    || headerMode === 'auto-scroll'
    || headerMode === 'auto'
  );
});

const showSidebar = computed(() => {
  return isSideMode.value && sidebarEnable.value && !props.sidebarHidden;
});

/**
 * Mask visibility
 */
const maskVisible = computed(() => !sidebarCollapse.value && props.isMobile);

const mainStyle = computed(() => {
  let width = '100%';
  let sidebarAndExtraWidth = 'unset';
  if (
    headerFixed.value
    && currentLayout.value !== 'header-nav'
    && currentLayout.value !== 'mixed-nav'
    && currentLayout.value !== 'header-sidebar-nav'
    && showSidebar.value
    && !props.isMobile
  ) {
    // Effective in fixed mode
    const isSideNavEffective
      = (isSidebarMixedNav.value || isHeaderMixedNav.value)
        && sidebarExpandOnHover.value
        && sidebarExtraVisible.value;

    if (isSideNavEffective) {
      const sideCollapseWidth = sidebarCollapse.value
        ? getSideCollapseWidth.value
        : props.sidebarMixedWidth;
      const sideWidth = sidebarExtraCollapse.value
        ? props.sidebarExtraCollapsedWidth
        : props.sidebarWidth;

      // 100% - Sidebar mixed width - Menu width
      sidebarAndExtraWidth = `${sideCollapseWidth + sideWidth}px`;
      width = `calc(100% - ${sidebarAndExtraWidth})`;
    } else {
      sidebarAndExtraWidth
        = sidebarExpandOnHovering.value && !sidebarExpandOnHover.value
          ? `${getSideCollapseWidth.value}px`
          : `${getSidebarWidth.value}px`;
      width = `calc(100% - ${sidebarAndExtraWidth})`;
    }
  }
  return {
    sidebarAndExtraWidth,
    width,
  };
});

// Calculate the style of the tabbar
const tabbarStyle = computed<CSSProperties>(() => {
  let width = '';
  let marginLeft = 0;

  // If it is not mixed navigation, the width of the tabbar is 100%
  if (!isMixedNav.value || props.sidebarHidden) {
    width = '100%';
  } else if (sidebarEnable.value) {
    // The width when the mouse is on the sidebar and the sidebar is expanded
    const onHoveringWidth = sidebarExpandOnHover.value
      ? props.sidebarWidth
      : getSideCollapseWidth.value;

    // Set marginLeft, depending on whether the sidebar is collapsed
    marginLeft = sidebarCollapse.value
      ? getSideCollapseWidth.value
      : onHoveringWidth;

    // Set the width of the tabbar, calculated as 100% minus the width of the sidebar
    width = `calc(100% - ${sidebarCollapse.value ? getSidebarWidth.value : onHoveringWidth}px)`;
  } else {
    // By default, the width of the tabbar is 100%
    width = '100%';
  }

  return {
    marginLeft: `${marginLeft}px`,
    width,
  };
});

const contentStyle = computed<CSSProperties>(() => {
  const fixed = headerFixed.value;

  const { footerEnable, footerFixed, footerHeight } = props;
  return {
    marginTop:
      fixed
      && !isFullContent.value
      && !headerIsHidden.value
      && (!isHeaderAutoMode.value || scrollY.value < headerWrapperHeight.value)
        ? `${headerWrapperHeight.value}px`
        : 0,
    paddingBottom: `${footerEnable && footerFixed ? footerHeight : 0}px`,
  };
});

const headerZIndex = computed(() => {
  const { zIndex } = props;
  const offset = isMixedNav.value ? 1 : 0;
  return zIndex + offset;
});

const headerWrapperStyle = computed<CSSProperties>(() => {
  const fixed = headerFixed.value;

  return {
    'height': isFullContent.value ? '0' : `${headerWrapperHeight.value}px`,
    'left': isMixedNav.value ? 0 : mainStyle.value.sidebarAndExtraWidth,
    'position': fixed ? 'fixed' : 'static',
    'top':
      headerIsHidden.value || isFullContent.value
        ? `-${headerWrapperHeight.value}px`
        : 0,
    'width': mainStyle.value.width,
    'z-index': headerZIndex.value,
  };
});

/**
 * Sidebar z-index
 */
const sidebarZIndex = computed(() => {
  const { isMobile, zIndex } = props;
  let offset = isMobile || isSideMode.value ? 1 : -1;

  if (isMixedNav.value) {
    offset += 1;
  }

  return zIndex + offset;
});

const footerWidth = computed(() => {
  if (!props.footerFixed) {
    return '100%';
  }

  return mainStyle.value.width;
});

const maskStyle = computed<CSSProperties>(() => {
  return { zIndex: props.zIndex };
});

const showHeaderToggleButton = computed(() => {
  return (
    props.isMobile
    || (props.headerToggleSidebarButton
      && isSideMode.value
      && !isSidebarMixedNav.value
      && !isMixedNav.value
      && !props.isMobile)
  );
});

const showHeaderLogo = computed(() => {
  return !isSideMode.value || isMixedNav.value || props.isMobile;
});

watch(
  () => props.isMobile,
  (val) => {
    if (val) {
      sidebarCollapse.value = true;
    }
  },
  {
    immediate: true,
  },
);

watch(
  [() => headerWrapperHeight.value, () => isFullContent.value],
  ([height]) => {
    setLayoutHeaderHeight(isFullContent.value ? 0 : height);
  },
  {
    immediate: true,
  },
);

watch(
  () => props.footerHeight,
  (height: number) => {
    setLayoutFooterHeight(height);
  },
  {
    immediate: true,
  },
);

{
  function mouseMove() {
    if (mouseY.value > headerWrapperHeight.value) {
      headerIsHidden.value = true;
    } else {
      headerIsHidden.value = false;
    }
  }

  watch(
    [() => props.headerMode, () => mouseY.value],
    () => {
      if (!isHeaderAutoMode.value || isMixedNav.value || isFullContent.value) {
        if (props.headerMode !== 'auto-scroll') {
          headerIsHidden.value = false;
        }
        return;
      }
      headerIsHidden.value = true;
      mouseMove();
    },
    {
      immediate: true,
    },
  );
}

{
  const checkHeaderIsHidden = useThrottleFn((top, bottom, topArrived) => {
    if (scrollY.value < headerWrapperHeight.value) {
      headerIsHidden.value = false;
      return;
    }

    if (topArrived) {
      headerIsHidden.value = false;
      return;
    }

    if (top) {
      headerIsHidden.value = false;
    } else if (bottom) {
      headerIsHidden.value = true;
    }
  }, 300);

  watch(
    () => scrollY.value,
    () => {
      if (
        props.headerMode !== 'auto-scroll'
        || isMixedNav.value
        || isFullContent.value
      ) {
        return;
      }
      if (isScrolling.value) {
        checkHeaderIsHidden(
          directions.top,
          directions.bottom,
          arrivedState.top,
        );
      }
    },
  );
}

function handleHeaderToggle() {
  if (props.isMobile) {
    sidebarCollapse.value = false;
  } else {
    emits('toggleSidebar');
  }
}

function handleClickMask() {
  sidebarCollapse.value = true;
}
</script>

<template>
  <div class="flex min-h-full w-full relative">
    <LayoutSidebar
      v-if="sidebarEnableState"
      v-model:collapse="sidebarCollapse"
      v-model:expand-on-hover="sidebarExpandOnHover"
      v-model:expand-on-hovering="sidebarExpandOnHovering"
      v-model:extra-collapse="sidebarExtraCollapse"
      v-model:extra-visible="sidebarExtraVisible"
      :show-collapse-button="sidebarCollapsedButton"
      :show-fixed-button="sidebarFixedButton"
      :collapse-width="getSideCollapseWidth"
      :dom-visible="!isMobile"
      :extra-width="sidebarExtraWidth"
      :fixed-extra="sidebarExpandOnHover"
      :header-height="isMixedNav ? 0 : headerHeight"
      :is-sidebar-mixed="isSidebarMixedNav || isHeaderMixedNav"
      :margin-top="sidebarMarginTop"
      :mixed-width="sidebarMixedWidth"
      :show="showSidebar"
      :theme="sidebarTheme"
      :width="getSidebarWidth"
      :z-index="sidebarZIndex"
      @leave="() => emits('sideMouseLeave')"
    >
      <template
        v-if="isSideMode && !isMixedNav"
        #logo
      >
        <slot name="logo" />
      </template>

      <template v-if="isSidebarMixedNav || isHeaderMixedNav">
        <slot name="mixed-menu" />
      </template>

      <template v-else>
        <slot name="menu" />
      </template>

      <template #extra>
        <slot name="side-extra" />
      </template>

      <template #extra-title>
        <slot name="side-extra-title" />
      </template>
    </LayoutSidebar>

    <div
      ref="contentRef"
      class="flex flex-1 flex-col transition-all-300 ease-in overflow-hidden"
    >
      <div
        :class="[
          {
            'shadow-[0_16px_24px_hsl(var(--kuli-color-background))]': scrollY > 20,
          },
          SCROLL_FIXED_CLASS,
        ]"
        :style="headerWrapperStyle"
        class="transition-all-200 overflow-hidden"
      >
        <LayoutHeader
          v-if="headerVisible"
          :full-width="!isSideMode"
          :height="headerHeight"
          :is-mobile="isMobile"
          :show="!isFullContent && !headerHidden"
          :sidebar-width="sidebarWidth"
          :theme="headerTheme"
          :width="mainStyle.width"
          :z-index="headerZIndex"
        >
          <template
            v-if="showHeaderLogo"
            #logo
          >
            <slot name="logo" />
          </template>

          <template #toggle-button>
            <PButtonIcon
              v-if="showHeaderToggleButton"
              class="my-0 mr-1"
              icon="i-lucide:menu"
              @click="handleHeaderToggle"
            />
          </template>

          <slot name="header" />
        </LayoutHeader>

        <LayoutTabbar
          v-if="tabbarEnable"
          :height="tabbarHeight"
          :style="tabbarStyle"
        >
          <slot name="tabbar" />
        </LayoutTabbar>
      </div>

      <!-- </div> -->
      <LayoutContent
        :id="ELEMENT_ID_MAIN_CONTENT"
        :content-compact="contentCompact"
        :content-compact-width="contentCompactWidth"
        :padding="contentPadding"
        :padding-bottom="contentPaddingBottom"
        :padding-left="contentPaddingLeft"
        :padding-right="contentPaddingRight"
        :padding-top="contentPaddingTop"
        :style="contentStyle"
        class="transition-margin-200"
      >
        <slot name="content" />

        <template #overlay>
          <slot name="content-overlay" />
        </template>
      </LayoutContent>

      <LayoutFooter
        v-if="footerEnable"
        :fixed="footerFixed"
        :height="footerHeight"
        :show="!isFullContent"
        :width="footerWidth"
        :z-index="zIndex"
      >
        <slot name="footer" />
      </LayoutFooter>
    </div>

    <slot name="extra" />

    <div
      v-if="maskVisible"
      :style="maskStyle"
      class="bg-overlay h-full w-full transition-[background-color]-200 left-0 top-0 fixed"
      @click="handleClickMask"
    />
  </div>
</template>
