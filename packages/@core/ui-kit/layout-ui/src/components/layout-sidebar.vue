<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { PScrollbar } from '@ngibur/pohon-ui';
import { useScrollLock } from '@vueuse/core';

import { computed, shallowRef, useSlots, watchEffect } from 'vue';

import { LayoutSidebarCollapseButton, LayoutSidebarFixedButton } from './widgets';

interface Props {
  /**
   * Collapse area height
   * @default 42
   */
  collapseHeight?: number;
  /**
   * Collapse width
   * @default 48
   */
  collapseWidth?: number;
  /**
   * Whether the hidden DOM is visible
   * @default true
   */
  domVisible?: boolean;
  /**
   * Extra area width
   */
  extraWidth: number;
  /**
   * Fixed extra area
   * @default false
   */
  fixedExtra?: boolean;
  /**
   * Header height
   */
  headerHeight: number;
  /**
   * Whether it is sidebar mixed mode
   * @default false
   */
  isSidebarMixed?: boolean;
  /**
   * Top margin
   * @default 60
   */
  marginTop?: number;
  /**
   * Mixed menu width
   * @default 80
   */
  mixedWidth?: number;
  /**
   * Top padding
   * @default 60
   */
  paddingTop?: number;
  /**
   * Whether to show
   * @default true
   */
  show?: boolean;
  /**
   * Show collapse button
   * @default false
   */
  showCollapseButton?: boolean;
  /**
   * Show pin button
   * @default true
   */
  showFixedButton?: boolean;
  /**
   * Theme
   */
  theme: string;

  /**
   * Width
   */
  width: number;
  /**
   * zIndex
   * @default 0
   */
  zIndex?: number;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    collapseHeight: 42,
    collapseWidth: 48,
    domVisible: true,
    fixedExtra: false,
    isSidebarMixed: false,
    marginTop: 0,
    mixedWidth: 70,
    paddingTop: 0,
    show: true,
    showCollapseButton: true,
    zIndex: 0,
  },
);

const emits = defineEmits<{ leave: [] }>();
const collapse = defineModel<boolean>('collapse');
const extraCollapse = defineModel<boolean>('extraCollapse');
const expandOnHovering = defineModel<boolean>('expandOnHovering');
const expandOnHover = defineModel<boolean>('expandOnHover');
const extraVisible = defineModel<boolean>('extraVisible');

const isLocked = useScrollLock(document.body);
const slots = useSlots();

const asideRef = shallowRef<HTMLDivElement | null>();

const hiddenSideStyle = computed<CSSProperties>(() => calcMenuWidthStyle(true));

const style = computed<CSSProperties>(() => {
  const { isSidebarMixed, marginTop, paddingTop, zIndex } = props;

  return {
    '--scroll-shadow': 'var(--sidebar)',
    ...calcMenuWidthStyle(false),
    'height': `calc(100% - ${marginTop}px)`,
    'marginTop': `${marginTop}px`,
    'paddingTop': `${paddingTop}px`,
    zIndex,
    ...(isSidebarMixed && extraVisible.value ? { transition: 'none' } : {}),
  };
});

const extraStyle = computed<CSSProperties>(() => {
  const { extraWidth, show, width, zIndex } = props;

  return {
    left: `${width}px`,
    width: extraVisible.value && show ? `${extraWidth}px` : 0,
    zIndex,
  };
});

const extraTitleStyle = computed<CSSProperties>(() => {
  const { headerHeight } = props;

  return {
    height: `${headerHeight - 1}px`,
  };
});

const contentWidthStyle = computed<CSSProperties>(() => {
  const { collapseWidth, fixedExtra, isSidebarMixed, mixedWidth } = props;
  if (isSidebarMixed && fixedExtra) {
    return { width: `${collapse.value ? collapseWidth : mixedWidth}px` };
  }
  return {};
});

const contentStyle = computed<CSSProperties>(() => {
  const { collapseHeight, headerHeight } = props;

  return {
    height: `calc(100% - ${headerHeight + collapseHeight}px)`,
    ...contentWidthStyle.value,
  };
});

const headerStyle = computed<CSSProperties>(() => {
  const { headerHeight, isSidebarMixed } = props;

  return {
    ...(isSidebarMixed ? { display: 'flex', justifyContent: 'center' } : {}),
    height: `${headerHeight - 1}px`,
    ...contentWidthStyle.value,
  };
});

const extraContentStyle = computed<CSSProperties>(() => {
  const { collapseHeight, headerHeight } = props;
  return {
    height: `calc(100% - ${headerHeight + collapseHeight}px)`,
  };
});

const collapseStyle = computed<CSSProperties>(() => {
  return {
    height: `${props.collapseHeight}px`,
  };
});

watchEffect(() => {
  extraVisible.value = props.fixedExtra ? true : extraVisible.value;
});

function calcMenuWidthStyle(isHiddenDom: boolean): CSSProperties {
  const { extraWidth, fixedExtra, isSidebarMixed, show, width } = props;

  const extraWidth_ = isSidebarMixed && fixedExtra && extraVisible.value ? extraWidth : 0;

  let widthValue
    = width === 0
      ? '0px'
      : `${width + extraWidth_}px`;

  const { collapseWidth } = props;

  if (isHiddenDom && expandOnHovering.value && !expandOnHover.value) {
    widthValue = `${collapseWidth}px`;
  }

  return {
    ...(widthValue === '0px' ? { overflow: 'hidden' } : {}),
    flex: `0 0 ${widthValue}`,
    marginLeft: show ? 0 : `-${widthValue}`,
    maxWidth: widthValue,
    minWidth: widthValue,
    width: widthValue,
  };
}

function handleMouseenter(event: MouseEvent) {
  if (event?.offsetX < 10) {
    return;
  }

  // The unopened and unfolded states are not effective.
  if (expandOnHover.value) {
    return;
  }

  if (!expandOnHovering.value) {
    collapse.value = false;
  }

  if (props.isSidebarMixed) {
    isLocked.value = true;
  }

  expandOnHovering.value = true;
}

function handleMouseleave() {
  emits('leave');

  if (props.isSidebarMixed) {
    isLocked.value = false;
  }

  if (expandOnHover.value) {
    return;
  }

  expandOnHovering.value = false;
  collapse.value = true;
  extraVisible.value = false;
}
</script>

<template>
  <div
    v-if="domVisible"
    :class="theme"
    :style="hiddenSideStyle"
    class="h-full transition-all-150"
  />
  <aside
    :class="[
      theme,
      {
        'bg-sidebar-deep': isSidebarMixed,
        'bg-sidebar border-border border-r': !isSidebarMixed,
      },
    ]"
    :style="style"
    class="fixed left-0 top-0 h-full transition-all-150"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <LayoutSidebarFixedButton
      v-if="!collapse && !isSidebarMixed"
      v-model:expand-on-hover="expandOnHover"
    />

    <div
      v-if="slots.logo"
      :style="headerStyle"
    >
      <slot name="logo" />
    </div>

    <PScrollbar
      class="overflow-y-auto pt-2"
      :style="contentStyle"
      shadow
      shadow-border
    >
      <slot />
    </PScrollbar>

    <div :style="collapseStyle" />

    <LayoutSidebarCollapseButton
      v-if="showCollapseButton && !isSidebarMixed"
      v-model:collapsed="collapse"
    />

    <div
      v-if="isSidebarMixed"
      ref="asideRef"
      :class="{
        'border-l': extraVisible,
      }"
      :style="extraStyle"
      class="fixed top-0 h-full overflow-hidden border-r border-border bg-sidebar transition-all-200"
    >
      <LayoutSidebarCollapseButton
        v-if="isSidebarMixed && expandOnHover"
        v-model:collapsed="extraCollapse"
      />

      <LayoutSidebarFixedButton
        v-if="!extraCollapse"
        v-model:expand-on-hover="expandOnHover"
      />

      <div
        v-if="!extraCollapse"
        :style="extraTitleStyle"
        class="pl-2"
      >
        <slot name="extra-title" />
      </div>

      <PScrollbar
        :style="extraContentStyle"
        class="border-border py-2"
        shadow
        shadow-border
      >
        <slot name="extra" />
      </PScrollbar>
    </div>
  </aside>
</template>
