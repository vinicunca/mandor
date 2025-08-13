<script lang="ts">
import type {
  AHoverCardRootProps,
  AHoverCardTriggerProps,
  APopoverArrowProps,
  APopoverContentEmits,
  APopoverContentProps,
  APopoverRootEmits,
  APopoverRootProps,
} from 'akar';

import type { EmitsToProps } from '@mandor-core/typings';

import type { AuPopoverUv } from './popover.theme';

export interface AuPopoverProps extends APopoverRootProps, Pick<AHoverCardRootProps, 'openDelay' | 'closeDelay'> {
  /**
   * The display mode of the popover.
   * @defaultValue 'click'
   */
  mode?: 'click' | 'hover';
  /**
   * The content of the popover.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
   */
  content?: Omit<APopoverContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<APopoverContentEmits>>;
  /**
   * Display an arrow alongside the popover.
   * @defaultValue false
   */
  arrow?: boolean | Omit<APopoverArrowProps, 'as' | 'asChild'>;
  /**
   * Render the popover in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
  /**
   * The reference (or anchor) element that is being referred to for positioning.
   *
   * If not provided will use the current component as anchor.
   */
  reference?: AHoverCardTriggerProps['reference'];
  /**
   * When `false`, the popover will not close when clicking outside or pressing escape.
   * @defaultValue true
   */
  dismissible?: boolean;
  class?: any;
  uv?: AuPopoverUv['slots'];
}

export interface AuPopoverEmits extends APopoverRootEmits {
  'close:prevent': [];
}

export interface AuPopoverSlots {
  default: (props: { open: boolean }) => any;
  content: (props?: object) => any;
  anchor: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { computed, toRef } from 'vue';

import { defu } from '@mandor-core/shared/utils';

import { reactivePick } from '@vueuse/core';
import { useForwardPropsEmits } from 'akar';
import { AHoverCard, APopover } from 'akar/namespaced';
import { uv } from 'unocss-variants';

import { usePortal } from '../../composables/use-portal';
import { popoverUv } from './popover.theme';

const props = withDefaults(
  defineProps<AuPopoverProps>(),
  {
    portal: true,
    mode: 'click',
    openDelay: 0,
    closeDelay: 0,
    dismissible: true,
  },
);
const emits = defineEmits<AuPopoverEmits>();
const slots = defineSlots<AuPopoverSlots>();

const pick = props.mode === 'hover'
  ? reactivePick(props, 'defaultOpen', 'open', 'openDelay', 'closeDelay')
  : reactivePick(props, 'defaultOpen', 'open', 'modal');
const rootProps = useForwardPropsEmits(pick, emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8 }) as APopoverContentProps);
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ['pointerDownOutside', 'interactOutside', 'escapeKeyDown'];

    return events.reduce((acc, curr) => {
      acc[curr] = (e: Event) => {
        e.preventDefault();
        emits('close:prevent');
      };
      return acc;
    }, {} as Record<typeof events[number], (e: Event) => void>);
  }

  return {};
});
const arrowProps = toRef(() => props.arrow as APopoverArrowProps);

const mandorUv = computed(
  () => uv({
    extend: uv(popoverUv),
  })({
    side: contentProps.value.side,
  }),
);

const Component = computed(() => props.mode === 'hover' ? AHoverCard : APopover);
</script>

<template>
  <Component.Root
    v-slot="{ open }"
    v-bind="rootProps"
  >
    <Component.Trigger
      v-if="!!slots.default || !!reference"
      as-child
      :reference="reference"
      :class="props.class"
    >
      <slot :open="open" />
    </Component.Trigger>

    <Component.Anchor
      v-if="'Anchor' in Component && !!slots.anchor"
      as-child
    >
      <slot name="anchor" />
    </Component.Anchor>

    <Component.Portal v-bind="portalProps">
      <Component.Content
        v-bind="contentProps"
        :class="mandorUv.content({ class: [!slots.default && props.class, props.uv?.content] })"
        v-on="contentEvents"
      >
        <slot name="content" />

        <Component.Arrow
          v-if="!!arrow"
          v-bind="arrowProps"
          :class="mandorUv.arrow({ class: props.uv?.arrow })"
        />
      </Component.Content>
    </Component.Portal>
  </Component.Root>
</template>
