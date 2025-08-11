<script lang="ts">
import type { APrimitiveProps } from 'akar';

import type { AuButtonGroupUv } from './button-group.theme';

export interface AuButtonGroupProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /**
   * @defaultValue 'md'
   */
  size?: AuButtonGroupUv['variants']['size'];
  /**
   * The orientation the buttons are laid out.
   * @defaultValue 'horizontal'
   */
  orientation?: AuButtonGroupUv['variants']['orientation'];
  class?: any;
}

export interface AuButtonGroupSlots {
  default: (props?: object) => any;
}
</script>

<script lang="ts" setup>
import { computed, provide } from 'vue';

import { APrimitive } from 'akar';

import { buttonGroupInjectionKey } from '../../composables/use-button-group';
import { buttonGroupUv } from './button-group.theme';

const props = withDefaults(
  defineProps<AuButtonGroupProps>(),
  {
    orientation: 'horizontal',
  },
);

provide(
  buttonGroupInjectionKey,
  computed(() => ({
    size: props.size,
    orientation: props.orientation,
  })),
);
</script>

<template>
  <APrimitive
    :as="props.as"
    :class="buttonGroupUv({
      orientation: props.orientation,
      class: props.class,
    })"
  >
    <slot />
  </APrimitive>
</template>
