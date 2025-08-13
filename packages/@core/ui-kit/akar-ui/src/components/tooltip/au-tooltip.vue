<script lang="ts">
import type {
  ATooltipArrowProps,
  ATooltipContentEmits,
  ATooltipContentProps,
  ATooltipRootEmits,
  ATooltipRootProps,
  ATooltipTriggerProps,
} from 'akar';

import type { EmitsToProps } from '@mandor-core/typings';

import type { AuKbdProps } from '../kbd';
import type { AuTooltipUv } from './tooltip.theme';

export interface AuTooltipProps extends ATooltipRootProps {
  /** The text content of the tooltip. */
  text?: string;
  /** The keyboard keys to display in the tooltip. */
  kbds?: Array<AuKbdProps['value']> | Array<AuKbdProps>;
  /**
   * The content of the tooltip.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
   */
  content?: Omit<ATooltipContentProps, 'as' | 'asChild'> & Partial<EmitsToProps<ATooltipContentEmits>>;
  /**
   * Display an arrow alongside the tooltip.
   * @defaultValue false
   */
  arrow?: boolean | Omit<ATooltipArrowProps, 'as' | 'asChild'>;
  /**
   * Render the tooltip in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
  /**
   * The reference (or anchor) element that is being referred to for positioning.
   *
   * If not provided will use the current component as anchor.
   */
  reference?: ATooltipTriggerProps['reference'];
  class?: any;
  uv?: AuTooltipUv['slots'];
}

export interface ATooltipEmits extends ATooltipRootEmits {}

export interface ATooltipSlots {
  default: (props: { open: boolean }) => any;
  content: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { computed, toRef } from 'vue';

import { defu } from '@mandor-core/shared/utils';

import { isString } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import {
  ATooltipArrow,
  ATooltipContent,
  ATooltipPortal,
  ATooltipRoot,
  ATooltipTrigger,
  useForwardPropsEmits,
} from 'akar';
import { uv } from 'unocss-variants';

import { usePortal } from '../../composables/use-portal';
import { AuKbd } from '../kbd';
import { tooltipUv } from './tooltip.theme';

const props = withDefaults(
  defineProps<AuTooltipProps>(),
  {
    portal: true,
  },
);
const emits = defineEmits<ATooltipEmits>();
const slots = defineSlots<ATooltipSlots>();

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'defaultOpen',
    'open',
    'delayDuration',
    'disableHoverableContent',
    'disableClosingTrigger',
    'ignoreNonKeyboardFocus',
  ),
  emits,
);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(
  props.content,
  { side: 'bottom', sideOffset: 8, collisionPadding: 8 },
) as ATooltipContentProps);
const arrowProps = toRef(() => props.arrow as ATooltipArrowProps);

const mandorUv = computed(
  () => uv({
    extend: uv(tooltipUv),
  })({
    side: contentProps.value.side,
  }),
);
</script>

<template>
  <ATooltipRoot
    v-slot="{ open }"
    v-bind="rootProps"
    :disabled="!(text || kbds?.length || !!slots.content) || props.disabled"
  >
    <ATooltipTrigger
      v-if="!!slots.default || !!reference"
      v-bind="$attrs"
      as-child
      :reference="reference"
      :class="props.class"
    >
      <slot :open="open" />
    </ATooltipTrigger>

    <ATooltipPortal v-bind="portalProps">
      <ATooltipContent
        v-bind="contentProps"
        :class="mandorUv.content({
          class: [!slots.default && props.class, props.uv?.content],
        })"
      >
        <slot name="content">
          <span
            v-if="text"
            :class="mandorUv.text({ class: props.uv?.text })"
          >{{ text }}</span>

          <span
            v-if="kbds?.length"
            :class="mandorUv.kbds({ class: props.uv?.kbds })"
          >
            <AuKbd
              v-for="(kbd, index) in kbds"
              :key="index"
              :size="((props.uv?.kbdsSize || mandorUv.kbdsSize()) as AuKbdProps['size'])"
              v-bind="isString(kbd) ? { value: kbd } : kbd"
            />
          </span>
        </slot>

        <ATooltipArrow
          v-if="!!arrow"
          v-bind="arrowProps"
          :class="mandorUv.arrow({ class: props.uv?.arrow })"
        />
      </ATooltipContent>
    </ATooltipPortal>
  </ATooltipRoot>
</template>
