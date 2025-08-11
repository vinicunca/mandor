<script setup lang="ts">
import type { LayoutAuthToolbarType } from './layout.entity';
import { preferences } from '@mandor/preferences';

import { computed } from 'vue';
import { LayoutWidgetThemeToggle } from '../widgets';

interface Props {
  toolbarList?: Array<LayoutAuthToolbarType>;
}

const {
  toolbarList = ['language', 'layout', 'theme'],
} = defineProps<Props>();

const toolbarItems = computed(() => {
  const hasColor = toolbarList.includes('color');
  const hasLayout = toolbarList.includes('layout');
  const hasLanguage = toolbarList.includes('language');
  const hasTheme = toolbarList.includes('theme');

  return {
    hasColor,
    hasLayout,
    hasLanguage,
    hasTheme,
  };
});
</script>

<template>
  <div
    :class="{
      'bg-accent rounded-6 px-3 py-1': toolbarList.length > 1,
    }"
    class="absolute right-2 top-4 z-10 flex-center"
  >
    <!-- Only show on medium and larger screens -->
    <div class="hidden md:flex">
      <!-- <AuthColorToggle v-if="toolbarItems.hasColor" /> -->

      <!-- <AuthLayoutToggle v-if="toolbarItems.hasLayout" /> -->
    </div>

    <!-- Always show Language and Theme toggles -->
    <!-- <LayoutWidgetLanguage v-if="toolbarItems.hasLanguage && preferences.widget.languageToggle" /> -->

    <LayoutWidgetThemeToggle
      v-if="toolbarItems.hasTheme && preferences.widget.themeToggle"
      type="icon"
    />
  </div>
</template>
