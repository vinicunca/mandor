<script lang="ts" setup>
import type { AuButtonProps } from './au-button.vue';

import { computed, useSlots } from 'vue';

import AuButton from './au-button.vue';

interface AuButtonIconProps {
  class?: any;
  disabled?: boolean;
  color?: AuButtonProps['color'];
  onClick?: AuButtonProps['onClick'];
  variant?: AuButtonProps['variant'];
  tooltip?: string;
  tooltipDelayDuration?: number;
  tooltipSide?: 'bottom' | 'left' | 'right' | 'top';
  icon?: string;
}

const props = withDefaults(
  defineProps<AuButtonIconProps>(),
  {
    color: 'neutral',
    variant: 'ghost',
    disabled: false,
    onClick: () => {},
    tooltipDelayDuration: 200,
    tooltipSide: 'bottom',
  },
);

const slots = useSlots();

const showTooltip = computed(() => !!slots.tooltip || !!props.tooltip);
</script>

<template>
  <AuButton
    v-if="!showTooltip"
    :class="props.class"
    :disabled="props.disabled"
    :icon="props.icon"
    :color="props.color"
    size="icon"
    :variant="props.variant"
    @click="props.onClick"
  >
    <slot />
  </AuButton>
</template>
