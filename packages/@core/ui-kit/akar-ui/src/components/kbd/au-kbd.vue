<script lang="ts">
import type { KbdKey } from '../../composables/use-kbd';
import type { AuKbdUv } from './kbd.theme';

export interface AuKbdProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'kbd'
   */
  as?: any;
  value?: KbdKey | string;
  /**
   * @defaultValue 'neutral'
   */
  color?: AuKbdUv['variants']['color'];
  /**
   * @defaultValue 'outline'
   */
  variant?: AuKbdUv['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: AuKbdUv['variants']['size'];
  class?: any;
}

export interface AuKbdSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive } from 'akar';
import { uv } from 'unocss-variants';

import { useKbd } from '../../composables/use-kbd';
import { kbdUv } from './kbd.theme';

const props = withDefaults(
  defineProps<AuKbdProps>(),
  {
    as: 'kbd',
  },
);
defineSlots<AuKbdSlots>();

const { getKbdKey } = useKbd();

const mandorUv = computed(
  () => uv({ extend: uv(kbdUv) }),
);
</script>

<template>
  <APrimitive
    :as="as"
    :class="mandorUv({
      class: props.class,
      color: props.color,
      variant: props.variant,
      size: props.size,
    })"
  >
    <slot>
      {{ getKbdKey(value) }}
    </slot>
  </APrimitive>
</template>
