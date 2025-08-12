<script lang="ts" setup>
import type { NavigationMenuItem } from './au-navigation-menu.vue';

const props = withDefaults(
  defineProps<{
    item: NavigationMenuItem;
    index: number;
    level?: number;
  }>(),
  {
    level: 0,
  },
);
</script>

<template>
</template>
