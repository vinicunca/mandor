<script lang="ts">
import type { APrimitiveProps } from 'akar';

import type { AuChipUv } from './chip.theme';

export interface AuChipProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /** Display some text inside the chip. */
  text?: string | number;
  /**
   * @defaultValue 'primary'
   */
  color?: AuChipUv['variants']['color'];
  /**
   * @defaultValue 'md'
   */
  size?: AuChipUv['variants']['size'];
  /**
   * The position of the chip.
   * @defaultValue 'top-right'
   */
  position?: AuChipUv['variants']['position'];
  /** When `true`, keep the chip inside the component for rounded elements. */
  inset?: boolean;
  /** When `true`, render the chip relatively to the parent. */
  standalone?: boolean;
  class?: any;
  uv?: AuChipUv['slots'];
}

export interface AuChipEmits {
  'update:show': [payload: boolean];
}

export interface AuChipSlots {
  default: (props?: object) => any;
  content: (props?: object) => any;
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';

import { APrimitive, APrimitiveSlot } from 'akar';
import { uv } from 'unocss-variants';

import { useAvatarGroup } from '../../composables/use-avatar-group';
import { chipUv } from './chip.theme';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<AuChipProps>(),
  {
    inset: false,
    standalone: false,
  },
);

defineSlots<AuChipSlots>();

const show = defineModel<boolean>('show', { default: true });
const { size } = useAvatarGroup(props);

const mandorUv = computed(
  () => uv({
    extend: uv(chipUv),
  })({
    color: props.color,
    size: size.value,
    position: props.position,
    inset: props.inset,
    standalone: props.standalone,
  }),
);
</script>

<template>
  <APrimitive
    :as="props.as"
    :class="mandorUv.root({
      class: [props.uv?.root, props.class],
    })"
  >
    <APrimitiveSlot v-bind="$attrs">
      <slot />
    </APrimitiveSlot>

    <span
      v-if="show"
      :class="mandorUv.base({ class: props.uv?.base })"
    >
      <slot name="content">
        {{ text }}
      </slot>
    </span>
  </APrimitive>
</template>
