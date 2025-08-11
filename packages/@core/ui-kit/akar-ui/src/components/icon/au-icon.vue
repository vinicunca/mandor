<script setup lang="ts">
import type { Component } from 'vue';

import { computed } from 'vue';

import { IconifyIcon } from '@mandor-core/icons';
import { isHttpUrl } from '@mandor-core/shared/utils';

import { isFunction, isPlainObject, isString } from '@vinicunca/perkakas';

const props = defineProps<{
  // Whether to display the default icon
  fallback?: boolean;
  // eslint-disable-next-line ts/no-unsafe-function-type
  icon?: Component | Function | string;
}>();

const isRemoteIcon = computed(() => {
  return isString(props.icon) && isHttpUrl(props.icon);
});

const isComponent = computed(() => {
  const { icon } = props;

  return !isString(icon) && (isPlainObject(icon) || isFunction(icon));
});

const isUnoIcon = computed(() => {
  if (isString(props.icon)) {
    return props.icon.startsWith('i-');
  }

  return false;
});
</script>

<template>
  <component
    :is="(icon as Component)"
    v-if="isComponent"
    v-bind="$attrs"
  />

  <img
    v-else-if="isRemoteIcon"
    :src="(props.icon as string)"
    v-bind="$attrs"
  >

  <i
    v-else-if="isUnoIcon"
    :class="props.icon"
  />

  <IconifyIcon
    v-else-if="props.icon"
    v-bind="$attrs"
    :icon="(props.icon as string)"
  />
</template>
