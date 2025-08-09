<script setup lang="ts">
import type { ContentCompactType } from '@ngibur-core/typings';
import type { CSSProperties } from 'vue';

import { useLayoutContentStyle } from '@ngibur-core/composables';
import { APrimitiveSlot } from '@ngibur/pohon-ui';
import { computed } from 'vue';

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
    class="relative bg-background-deep"
  >
    <APrimitiveSlot :style="overlayStyle">
      <slot name="overlay" />
    </APrimitiveSlot>
    <slot />
  </main>
</template>
