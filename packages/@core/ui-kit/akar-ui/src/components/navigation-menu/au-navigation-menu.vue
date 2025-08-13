<script lang="ts">
import type {
  AAccordionRootProps,
  ANavigationMenuContentEmits,
  ANavigationMenuContentProps,
  ANavigationMenuRootEmits,
  ANavigationMenuRootProps,
  APrimitiveProps,
} from 'akar';

import type {
  ArrayOrNested,
  DynamicSlots,
  EmitsToProps,
  MergeTypes,
  NavigationMenuRecord,
  NestedItem,
} from '@mandor-core/typings';

import type { AuAvatarProps } from '../avatar';
import type { AuBadgeProps } from '../badge';
import type { AuPopoverProps } from '../popover';
import type { AuTooltipProps } from '../tooltip';
import type { AuNavigationMenuUv } from './navigation-menu.theme';

export interface AuNavigationMenuChildItem extends Omit<AuNavigationMenuItem, 'type' | 'uv'> {
  /** Description is only used when `orientation` is `horizontal`. */
  description?: string;
}

export interface AuNavigationMenuItem extends Omit<NavigationMenuRecord, 'badge'> {
  avatar?: AuAvatarProps;
  /**
   * Display a badge on the item.
   * `{ size: 'sm', color: 'neutral', variant: 'outline' }
   */
  badge?: string | number | AuBadgeProps;

  slot?: string;

  uv?: Pick<AuNavigationMenuUv['slots'], 'item' | 'linkLeadingAvatarSize' | 'linkLeadingAvatar' | 'linkLeadingIcon' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkTrailing' | 'linkTrailingBadgeSize' | 'linkTrailingBadge' | 'linkTrailingIcon' | 'label' | 'link' | 'content' | 'childList' | 'childLabel' | 'childItem' | 'childLink' | 'childLinkIcon' | 'childLinkWrapper' | 'childLinkLabel' | 'childLinkLabelExternalIcon' | 'childLinkDescription'>;
}

export interface AuNavigationMenuProps<
  T extends ArrayOrNested<AuNavigationMenuItem> = ArrayOrNested<AuNavigationMenuItem>,
> extends Pick<ANavigationMenuRootProps, 'modelValue' | 'defaultValue' | 'delayDuration' | 'disableClickTrigger' | 'disableHoverTrigger' | 'skipDelayDuration' | 'disablePointerLeaveClose' | 'unmountOnHide'>, Pick<AAccordionRootProps, 'disabled' | 'type' | 'collapsible'>
{
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /**
   * The icon displayed to open the menu.
   */
  trailingIcon?: string;
  /**
   * The icon displayed when the item is an external link.
   * Set to `false` to hide the external icon.
   */
  externalIcon?: boolean | string;
  items?: T;
  /**
   * @defaultValue 'primary'
   */
  color?: AuNavigationMenuUv['variants']['color'];
  /**
   * @defaultValue 'pill'
   */
  variant?: AuNavigationMenuUv['variants']['variant'];
  /**
   * The orientation of the menu.
   * @defaultValue 'horizontal'
   */
  orientation?: ANavigationMenuRootProps['orientation'];
  /**
   * Collapse the navigation menu to only show icons.
   * Only works when `orientation` is `vertical`.
   * @defaultValue false
   */
  /**
   * Collapse the navigation menu to only show icons.
   * Only works when `orientation` is `vertical`.
   * @defaultValue false
   */
  collapsed?: boolean;
  /**
   * Display a tooltip on the items when the menu is collapsed with the label of the item.
   * `{ delayDuration: 0, content: { side: 'right' } }`{lang="ts-type"}
   * @defaultValue false
   */
  tooltip?: boolean | AuTooltipProps;
  /**
   * Display a popover on the items when the menu is collapsed with the children list.
   * `{ mode: 'hover', content: { side: 'right', align: 'start', alignOffset: 2 } }`{lang="ts-type"}
   * @defaultValue false
   */
  popover?: boolean | AuPopoverProps;
  /** Display a line next to the active item. */
  highlight?: boolean;
  /**
   * @defaultValue 'primary'
   */
  highlightColor?: AuNavigationMenuUv['variants']['highlightColor'];
  /** The content of the menu. */
  content?: Omit<ANavigationMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ANavigationMenuContentEmits>>;
  /**
   * The orientation of the content.
   * Only works when `orientation` is `horizontal`.
   * @defaultValue 'horizontal'
   */
  contentOrientation?: AuNavigationMenuUv['variants']['contentOrientation'];
  /**
   * Display an arrow alongside the menu.
   * @defaultValue false
   */
  arrow?: boolean;
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: keyof NestedItem<T>;
  uv?: AuNavigationMenuUv['slots'];
  class?: any;
}

export interface AuNavigationMenuEmits extends ANavigationMenuRootEmits {}

type SlotProps<T extends AuNavigationMenuItem> = (props: { item: T; index: number; active?: boolean }) => any;

export type AuNavigationMenuSlots<
  A extends ArrayOrNested<AuNavigationMenuItem> = ArrayOrNested<AuNavigationMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = {
  'item': SlotProps<T>;
  'item-leading': SlotProps<T>;
  'item-label': SlotProps<T>;
  'item-trailing': SlotProps<T>;
  'item-content': SlotProps<T>;
  'list-leading': (props?: object) => any;
  'list-trailing': (props?: object) => any;
} & DynamicSlots<MergeTypes<T>, 'leading' | 'label' | 'trailing' | 'content', { index: number; active?: boolean }>;
</script>

<script lang="ts" setup generic="T extends ArrayOrNested<AuNavigationMenuItem>">
import { computed, toRef } from 'vue';

import { defu, isArrayOfArray } from '@mandor-core/shared/utils';

import { reactivePick } from '@vueuse/core';
import {
  AAccordionRoot,
  ANavigationMenuList,
  ANavigationMenuRoot,
  useForwardPropsEmits,
} from 'akar';
import { uv } from 'unocss-variants';

import { navigationMenuUv } from './navigation-menu.theme';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<AuNavigationMenuProps>(),
  {
    collapsed: false,
    orientation: 'horizontal',
  },
);

const emits = defineEmits<AuNavigationMenuEmits>();
const slots = defineSlots<AuNavigationMenuSlots<T>>();

const rootProps = useForwardPropsEmits(
  computed(() => ({
    as: props.as,
    modelValue: props.modelValue,
    defaultValue: props.defaultValue,
    delayDuration: props.delayDuration,
    skipDelayDuration: props.skipDelayDuration,
    orientation: props.orientation,
    disableClickTrigger: props.disableClickTrigger,
    disableHoverTrigger: props.disableHoverTrigger,
    disablePointerLeaveClose: props.disablePointerLeaveClose,
    unmountOnHide: props.unmountOnHide,
  })),
  emits,
);
const accordionProps = useForwardPropsEmits(
  reactivePick(props, 'collapsible', 'disabled', 'type', 'unmountOnHide'),
  emits,
);
const contentProps = toRef(() => props.content);
const tooltipProps = toRef(() => defu(typeof props.tooltip === 'boolean' ? {} : props.tooltip, { delayDuration: 0, content: { side: 'right' } }) as TooltipProps);
const popoverProps = toRef(() => defu(typeof props.popover === 'boolean' ? {} : props.popover, { mode: 'hover', content: { side: 'right', align: 'start', alignOffset: 2 } }) as PopoverProps);

const lists = computed<Array<Array<AuNavigationMenuItem>>>(() => {
  if (props.items?.length) {
    return isArrayOfArray(props.items)
      ? props.items
      : [props.items];
  }

  return [];
});

const mandorUv = computed(
  () => uv({
    extend: navigationMenuUv,
  })(),
);

function getAccordionDefaultValue(list: Array<AuNavigationMenuItem>, level = 0) {
  const indexes = list.reduce(
    (acc: Array<string>, item, index) => {
      if (item.defaultOpen || item.isOpen) {
        acc.push(
          item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`),
        );
      }
      return acc;
    },
    [],
  );

  return props.type === 'single' ? indexes[0] : indexes;
}
</script>

<template>
  <ANavigationMenuRoot
    v-bind="{ ...rootProps, ...$attrs }"
    :data-collapsed="props.collapsed"
    :class="mandorUv.root({
      class: [
        props.class,
        props.uv?.root,
      ],
    })"
  >
    <slot name="list-leading" />

    <template
      v-for="(list, listIndex) in lists"
      :key="`list-${listIndex}`"
    >
      <component
        v-bind="props.orientation === 'vertical' && !props.collapsed ? {
          ...accordionProps,
          defaultValue: getAccordionDefaultValue(list),
        } : {}"
        :is="orientation === 'vertical' && !collapsed ? AAccordionRoot : ANavigationMenuList"
        as="ul"
        :class="mandorUv.list({ class: props.uv?.list })"
      >
        <AuNavigationMenuItem
          v-for="(item, index) in list"
          :key="`list-${listIndex}-${index}`"
          :item="item"
          :index="index"
          :class="mandorUv.item({
            class: [props.uv?.item, item.uv?.item],
          })"
        />
      </component>

      <div
        v-if="orientation === 'vertical' && listIndex < lists.length - 1"
        :class="mandorUv.separator({ class: props.uv?.separator })"
      />
    </template>
  </ANavigationMenuRoot>
</template>
