<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed } from 'vue';

interface Props {
  height: number;
}

const props = withDefaults(
  defineProps<Props>(),
  {},
);

const style = computed<CSSProperties>(() => {
  const { height } = props;
  return {
    height: `${height}px`,
  };
});
</script>

<template>
  <section
    :style="style"
    class="w-full flex border-b border-border bg-background transition-all"
  >
    <slot />
  </section>
</template>
