<script lang="ts">
import type { APrimitiveProps } from 'akar';

import type { UseComponentIconsProps } from '../../composables/use-component-icons';
import type { AuBadgeUv } from './badge.theme';

import { badgeUv } from './badge.theme';

export interface AuBadgeProps extends Omit<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  label?: string | number;
  /**
   * @defaultValue 'primary'
   */
  color?: AuBadgeUv['variants']['color'];
  /**
   * @defaultValue 'solid'
   */
  variant?: AuBadgeUv['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: AuBadgeUv['variants']['size'];
  square?: boolean;
  class?: any;
  uv?: AuBadgeUv['slots'];
}

export interface AuBadgeSlots {
  leading: (props?: object) => any;
  default: (props?: object) => any;
  trailing: (props?: object) => any;
}
</script>

<script setup lang="ts">
import type { AuAvatarProps } from '../avatar/au-avatar.vue';

import { computed } from 'vue';

import { APrimitive } from 'akar';
import { uv } from 'unocss-variants';

import { useButtonGroup } from '../../composables/use-button-group';
import { useComponentIcons } from '../../composables/use-component-icons';
import AuAvatar from '../avatar/au-avatar.vue';
import AuIcon from '../icon/au-icon.vue';

const props = withDefaults(
  defineProps<AuBadgeProps>(),
  {
    as: 'span',
  },
);
const slots = defineSlots<AuBadgeSlots>();

const {
  orientation,
  size: buttonGroupSize,
} = useButtonGroup<AuBadgeProps>(props);
const {
  isLeading,
  isTrailing,
  leadingIconName,
  trailingIconName,
} = useComponentIcons(props);

const mandorUv = computed(
  () =>
    uv({
      extend: uv(badgeUv),
    })({
      color: props.color,
      variant: props.variant,
      size: buttonGroupSize.value || props.size,
      square: props.square || (!slots.default && !props.label),
      buttonGroup: orientation.value,
    }),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="mandorUv.base({
      class: [props.uv?.base, props.class],
    })"
  >
    <slot name="leading">
      <AuIcon
        v-if="isLeading && leadingIconName"
        :icon="leadingIconName"
        :class="mandorUv.leadingIcon({ class: props.uv?.leadingIcon })"
      />

      <AuAvatar
        v-else-if="!!avatar"
        :size="((props.uv?.leadingAvatarSize || mandorUv.leadingAvatarSize()) as AuAvatarProps['size'])"
        v-bind="avatar"
        :class="mandorUv.leadingAvatar({ class: props.uv?.leadingAvatar })"
      />
    </slot>

    <slot>
      <span
        v-if="label !== undefined && label !== null"
        :class="mandorUv.label({ class: props.uv?.label })"
      >
        {{ label }}
      </span>
    </slot>

    <slot name="trailing">
      <AuIcon
        v-if="isTrailing && trailingIconName"
        :icon="trailingIconName"
        :class="mandorUv.trailingIcon({ class: props.uv?.trailingIcon })"
      />
    </slot>
  </APrimitive>
</template>
