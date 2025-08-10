<script setup lang="ts">
import type { AScrollAreaScrollbarProps } from 'akar';

import { AScrollAreaScrollbar, AScrollAreaThumb } from 'akar';

const props = withDefaults(
  defineProps<AScrollAreaScrollbarProps>(),
  {
    orientation: 'vertical',
  },
);
</script>

<template>
  <AScrollAreaScrollbar
    v-bind="props"
    class="flex select-none transition-colors touch-none"
    :class="
      {
        'h-full w-2.5 border-l border-l-transparent p-px': orientation === 'vertical',
        'h-2.5 flex-col border-t border-t-transparent p-px': orientation === 'horizontal',
      }
    "
  >
    <AScrollAreaThumb class="rounded-full bg-border flex-1 relative" />
  </AScrollAreaScrollbar>
</template>
