<script lang="ts">
import type { APrimitiveProps } from 'akar';

import type { AuAvatarGroupUv } from './avatar-group.theme';

export interface AuAvatarGroupProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /**
   * @defaultValue 'md'
   */
  size?: AuAvatarGroupUv['variants']['size'];
  /**
   * The maximum number of avatars to display.
   */
  max?: number | string;
  class?: any;
  uv?: AuAvatarGroupUv['slots'];
}

export interface AuAvatarGroupSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { computed, provide } from 'vue';

import { isString, isSymbol } from '@vinicunca/perkakas';
import { APrimitive } from 'akar';
import { uv } from 'unocss-variants';

import { avatarGroupInjectionKey } from '../../composables/use-avatar-group';
import AuAvatar from './au-avatar.vue';
import { avatarGroupUv } from './avatar-group.theme';

const props = defineProps<AuAvatarGroupProps>();
const slots = defineSlots<AuAvatarGroupSlots>();

const mandorUv = computed(
  () => uv({
    extend: uv(avatarGroupUv),
  })({
    size: props.size,
  }),
);

const max = computed(() =>
  isString(props.max)
    ? Number.parseInt(props.max, 10)
    : props.max,
);

const children = computed(() => {
  let children = slots.default?.();
  if (children?.length) {
    children = children.flatMap((child: any) => {
      if (isSymbol(child.type)) {
        // `v-if="false"` or commented node
        if (isString(child.children)) {
          return undefined;
        }

        return child.children;
      }

      return child;
    }).filter(Boolean);
  }

  return children || [];
});

const visibleAvatars = computed(() => {
  if (!children.value.length) {
    return [];
  }

  if (!max.value || max.value <= 0) {
    return [...children.value].reverse();
  }

  return [...children.value].slice(0, max.value).reverse();
});

const hiddenCount = computed(() => {
  if (!children.value.length) {
    return 0;
  }

  return children.value.length - visibleAvatars.value.length;
});

provide(
  avatarGroupInjectionKey,
  computed(() => ({
    size: props.size,
  })),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="mandorUv.root({ class: [props.uv?.root, props.class] })"
  >
    <AuAvatar
      v-if="hiddenCount > 0"
      :text="`+${hiddenCount}`"
      :class="mandorUv.base({ class: props.uv?.base })"
    />

    <component
      :is="avatar"
      v-for="(avatar, count) in visibleAvatars"
      :key="count"
      :class="mandorUv.base({ class: props.uv?.base })"
    />
  </APrimitive>
</template>
