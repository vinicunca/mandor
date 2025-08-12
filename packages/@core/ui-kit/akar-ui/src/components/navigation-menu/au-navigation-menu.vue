<script lang="ts">
import type {
  AAccordionRootProps,
  ANavigationMenuRootEmits,
  ANavigationMenuRootProps,
  APrimitiveProps,
} from 'akar';

import type {
  ArrayOrNested,
  DynamicSlots,
  MergeTypes,
  NavigationMenuRecord,
  NestedItem,
} from '@mandor-core/typings';

import type { AuNavigationMenuUv } from './navigation-menu.theme';

import { reactivePick } from '@vueuse/core';

import AuNavigationMenuItem from './au-navigation-menu-item.vue';

export interface NavigationMenuItem extends NavigationMenuRecord {
  slot?: string;

  uv?: Pick<AuNavigationMenuUv['slots'], 'item' | 'linkLeadingAvatarSize' | 'linkLeadingAvatar' | 'linkLeadingIcon' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkTrailing' | 'linkTrailingBadgeSize' | 'linkTrailingBadge' | 'linkTrailingIcon' | 'label' | 'link' | 'content' | 'childList' | 'childLabel' | 'childItem' | 'childLink' | 'childLinkIcon' | 'childLinkWrapper' | 'childLinkLabel' | 'childLinkLabelExternalIcon' | 'childLinkDescription'>;
}

export interface AuNavigationMenuProps<
  T extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>,
> extends Pick<ANavigationMenuRootProps, 'modelValue' | 'defaultValue' | 'delayDuration' | 'disableClickTrigger' | 'disableHoverTrigger' | 'skipDelayDuration' | 'disablePointerLeaveClose' | 'unmountOnHide'>, Pick<AAccordionRootProps, 'disabled' | 'type' | 'collapsible'>
{
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /**
   * Collapse the navigation menu to only show icons.
   * Only works when `orientation` is `vertical`.
   * @defaultValue false
   */
  collapsed?: boolean;
  /**
   * The orientation of the menu.
   * @defaultValue 'horizontal'
   */
  orientation?: ANavigationMenuRootProps['orientation'];
  items?: T;
  uv?: AuNavigationMenuUv['slots'];
  class?: any;
}

export interface AuNavigationMenuEmits extends ANavigationMenuRootEmits {}

type SlotProps<T extends NavigationMenuItem> = (props: { item: T; index: number; active?: boolean }) => any;

export type AuNavigationMenuSlots<
  A extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>,
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

<script lang="ts" setup generic="T extends ArrayOrNested<NavigationMenuItem>">
import { computed } from 'vue';

import { isArrayOfArray } from '@mandor-core/shared/utils';

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

const lists = computed<Array<Array<NavigationMenuItem>>>(() => {
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

function getAccordionDefaultValue(list: Array<NavigationMenuItem>, level = 0) {
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
