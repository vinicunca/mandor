<script lang="ts" setup>
import { nextTick, ref } from 'vue';

import { updatePreferences, usePreferences } from '@mandor/preferences';

import { AuButtonIcon } from '@mandor-core/akar-ui';

const { isDark } = usePreferences();
const internalState = ref(isDark.value);

function handleChange(event: MouseEvent) {
  const isAppearanceTransition = Boolean(document.startViewTransition)
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isAppearanceTransition || !event) {
    internalState.value = !internalState.value;
    doUpdatePreferences(internalState.value);
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );

  const transition = document.startViewTransition(async () => {
    internalState.value = !internalState.value;
    await nextTick();
    doUpdatePreferences(internalState.value);
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 450,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    );
  });
}

function doUpdatePreferences(value: boolean) {
  updatePreferences({
    theme: {
      mode: value ? 'dark' : 'light',
    },
  });
}
</script>

<template>
  <AuButtonIcon
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    aria-live="polite"
    :icon="isDark ? 'i-si:sun-fill' : 'i-si:moon-fill'"
    @click="handleChange"
  />
</template>
