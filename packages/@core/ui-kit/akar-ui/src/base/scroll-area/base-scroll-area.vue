<script setup lang="ts">
import type { AScrollAreaRootProps } from 'akar';

import {
  AScrollAreaCorner,
  AScrollAreaRoot,
  AScrollAreaViewport,
} from 'akar';

import PScrollBar from './base-scroll-bar.vue';

const props = withDefaults(
  defineProps<
    AScrollAreaRootProps & {
      class?: any;
      onScroll?: (event: Event) => void;
      viewportProps?: { onScroll: (event: Event) => void };
    }
  >(),
  {
    onScroll: () => {},
  },
);
</script>

<template>
  <AScrollAreaRoot
    v-bind="props"
    class="relative overflow-hidden"
  >
    <AScrollAreaViewport
      as-child
      class="rounded-[inherit] h-full w-full focus:outline-none"
      @scroll="onScroll"
    >
      <slot />
    </AScrollAreaViewport>

    <PScrollBar />

    <AScrollAreaCorner />
  </AScrollAreaRoot>
</template>
