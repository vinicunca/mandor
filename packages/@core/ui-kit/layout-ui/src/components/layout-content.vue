<script setup lang="ts">
import type { CSSProperties } from 'vue';

import type { ContentCompactType } from '@mandor-core/typings';

import { computed } from 'vue';

import { APrimitiveSlot } from '@mandor-core/akar-ui';
import { useLayoutContentStyle } from '@mandor-core/composables';

interface Props {
  /**
   * Fixed width of content area
   */
  contentCompact: ContentCompactType;
  /**
   * Fixed width layout width
   */
  contentCompactWidth: number;
  padding: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
}

const props = withDefaults(
  defineProps<Props>(),
  {},
);

const { contentElement, overlayStyle } = useLayoutContentStyle();

const style = computed<CSSProperties>(() => {
  const {
    contentCompact,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
  } = props;

  const compactStyle: CSSProperties
    = contentCompact === 'compact'
      ? { margin: '0 auto', width: `${props.contentCompactWidth}px` }
      : {};

  return {
    ...compactStyle,
    flex: 1,
    padding: `${padding}px`,
    paddingBottom: `${paddingBottom}px`,
    paddingLeft: `${paddingLeft}px`,
    paddingRight: `${paddingRight}px`,
    paddingTop: `${paddingTop}px`,
  };
});
</script>

<template>
  <main
    ref="contentElement"
    :style="style"
    class="bg-background-deep relative"
  >
    <APrimitiveSlot :style="overlayStyle">
      <slot name="overlay" />
    </APrimitiveSlot>
    <slot />
  </main>
</template>
