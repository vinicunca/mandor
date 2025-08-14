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
  LinkRecord,
  MergeTypes,
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
  [key: string]: any;
}

export interface AuNavigationMenuItem extends LinkRecord {
  label?: string;
  icon?: string;
  avatar?: AuAvatarProps;
  /**
   * Display a badge on the item.
   * `{ size: 'sm', color: 'neutral', variant: 'outline' }
   */
  badge?: string | number | AuBadgeProps;

  /**
   * Display a tooltip on the item when the menu is collapsed with the label of the item.
   * This has priority over the global `tooltip` prop.
   */
  tooltip?: boolean | AuTooltipProps;
  /**
   * Display a popover on the item when the menu is collapsed with the children list.
   * This has priority over the global `popover` prop.
   */
  popover?: boolean | AuPopoverProps;
  trailingIcon?: string;
  /**
   * The type of the item.
   * The `label` type is only displayed in `vertical` orientation.
   * The `trigger` type is used to force the item to be collapsible when its a link in `vertical` orientation.
   * @defaultValue 'link'
   */
  type?: 'label' | 'trigger' | 'link';
  slot?: string;
  /**
   * The value of the item. Avoid using `index` as the value to prevent conflicts in horizontal orientation with Reka UI.
   * @defaultValue `item-${index}`
   */
  value?: string;
  children?: Array<AuNavigationMenuChildItem>;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onSelect?: (event: Event) => void;
  class?: any;

  uv?: Pick<AuNavigationMenuUv['slots'], 'item' | 'linkLeadingAvatarSize' | 'linkLeadingAvatar' | 'linkLeadingIcon' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkTrailing' | 'linkTrailingBadgeSize' | 'linkTrailingBadge' | 'linkTrailingIcon' | 'label' | 'link' | 'content' | 'childList' | 'childLabel' | 'childItem' | 'childLink' | 'childLinkIcon' | 'childLinkWrapper' | 'childLinkLabel' | 'childLinkLabelExternalIcon' | 'childLinkDescription'>;
}

export interface AuNavigationMenuProps<
  T extends ArrayOrNested<AuNavigationMenuItem> = ArrayOrNested<AuNavigationMenuItem>,
> extends Pick<ANavigationMenuRootProps, 'modelValue' | 'defaultValue' | 'delayDuration' | 'disableClickTrigger' | 'disableHoverTrigger' | 'skipDelayDuration' | 'disablePointerLeaveClose' | 'unmountOnHide'>, Pick<AAccordionRootProps, 'disabled' | 'type' | 'collapsible'> {
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

import { isBoolean, isNumber, isString, prop } from '@vinicunca/perkakas';
import { createReusableTemplate, reactivePick } from '@vueuse/core';
// TODO: Use Accordion from base instead
import {
  AAccordionContent,
  AAccordionItem,
  AAccordionRoot,
  AAccordionTrigger,
  ANavigationMenuContent,
  ANavigationMenuIndicator,
  ANavigationMenuItem,
  ANavigationMenuLink,
  ANavigationMenuList,
  ANavigationMenuRoot,
  ANavigationMenuTrigger,
  ANavigationMenuViewport,
  useForwardPropsEmits,
} from 'akar';
import { uv } from 'unocss-variants';

import { pickLinkProps } from '../../utils';
import { AuAvatar } from '../avatar';
import { AuBadge } from '../badge';
import { AuIcon } from '../icon';
import { AuLink, AuLinkBase } from '../link';
import { AuPopover } from '../popover';
import { AuTooltip } from '../tooltip';
import { navigationMenuUv } from './navigation-menu.theme';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<AuNavigationMenuProps>(),
  {
    orientation: 'horizontal',
    contentOrientation: 'horizontal',
    externalIcon: true,
    delayDuration: 0,
    type: 'multiple',
    collapsible: true,
    unmountOnHide: true,
    labelKey: 'label',
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
const tooltipProps = toRef(() => defu(
  isBoolean(props.tooltip) ? {} : props.tooltip,
  { delayDuration: 0, content: { side: 'right' } },
) as AuTooltipProps);
const popoverProps = toRef(() => defu(
  isBoolean(props.popover) ? {} : props.popover,
  { mode: 'hover', content: { side: 'right', align: 'start', alignOffset: 2 } },
) as AuPopoverProps);

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{
  item: AuNavigationMenuItem;
  index: number;
  isActive?: boolean;
}>();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{
  item: AuNavigationMenuItem;
  index: number;
  level?: number;
}>({
  props: {
    item: Object,
    index: Number,
    level: Number,
  },
});

const mandorUv = computed(
  () => uv({
    extend: navigationMenuUv,
  })({
    orientation: props.orientation,
    contentOrientation: props.orientation === 'vertical' ? undefined : props.contentOrientation,
    collapsed: props.collapsed,
    color: props.color,
    variant: props.variant,
    highlight: props.highlight,
    highlightColor: props.highlightColor || props.color,
  }),
);

const lists = computed<Array<Array<AuNavigationMenuItem>>>(() => {
  if (props.items?.length) {
    return isArrayOfArray(props.items)
      ? props.items
      : [props.items];
  }

  return [];
});

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

type KeyAuNavigationMenuSlot = keyof AuNavigationMenuSlots<T>;
</script>

<template>
  <DefineLinkTemplate v-slot="{ item, isActive, index }">
    <slot
      :name="((item.slot || 'item') as KeyAuNavigationMenuSlot)"
      :item="item"
      :index="index"
    >
      <slot
        :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as KeyAuNavigationMenuSlot)"
        :item="item"
        :active="isActive"
        :index="index"
      >
        <AuAvatar
          v-if="item.avatar"
          :size="(
            (item.uv?.linkLeadingAvatarSize || props.uv?.linkLeadingAvatarSize || mandorUv.linkLeadingAvatarSize()) as AuAvatarProps['size']
          )"
          v-bind="item.avatar"
          :class="mandorUv.linkLeadingAvatar({
            class: [props.uv?.linkLeadingAvatar, item.uv?.linkLeadingAvatar],
            active: isActive,
            disabled: !!item.disabled,
          })"
        />

        <AuIcon
          v-else-if="item.icon"
          :icon="item.icon"
          :class="mandorUv.linkLeadingIcon({
            class: [props.uv?.linkLeadingIcon, item.uv?.linkLeadingIcon],
            active: isActive,
            disabled: !!item.disabled,
          })"
        />
      </slot>

      <span
        v-if="(!collapsed || orientation !== 'vertical')
          && (prop(item, props.labelKey)
            || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as KeyAuNavigationMenuSlot]
          )"
        :class="mandorUv.linkLabel({ class: [props.uv?.linkLabel, item.uv?.linkLabel] })"
      >
        <slot
          :name="((item.slot ? `${item.slot}-label` : 'item-label') as KeyAuNavigationMenuSlot)"
          :item="item"
          :active="isActive"
          :index="index"
        >
          {{ prop(item, props.labelKey) }}
        </slot>

        <AuIcon
          v-if="item.target === '_blank' && externalIcon !== false"
          :icon="isString(externalIcon) ? externalIcon : undefined"
          :class="mandorUv.linkLabelExternalIcon({
            class: [props.uv?.linkLabelExternalIcon, item.uv?.linkLabelExternalIcon],
            active: isActive,
          })"
        />
      </span>

      <component
        :is="orientation === 'vertical'
          && item.children?.length
          && !collapsed ? AAccordionTrigger : 'span'
        "
        v-if="(!collapsed || orientation !== 'vertical')
          && (
            item.badge || (
              orientation === 'horizontal' && (
                item.children?.length
                || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as KeyAuNavigationMenuSlot]
              )
            )
            || (orientation === 'vertical' && item.children?.length)
            || item.trailingIcon
            || !!slots[(item.slot ? `${item.slot}-trailing` : 'item-trailing') as KeyAuNavigationMenuSlot]
          )
        "
        as="span"
        :class="mandorUv.linkTrailing({
          class: [props.uv?.linkTrailing, item.uv?.linkTrailing],
        })"
        @click.stop.prevent
      >
        <slot
          :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as KeyAuNavigationMenuSlot)"
          :item="item"
          :active="isActive"
          :index="index"
        >
          <AuBadge
            v-if="item.badge !== undefined"
            color="neutral"
            variant="outline"
            :size="((item.uv?.linkTrailingBadgeSize || props.uv?.linkTrailingBadgeSize || mandorUv .linkTrailingBadgeSize()) as AuBadgeProps['size'])"
            v-bind="(isString(item.badge) || isNumber(item.badge)) ? { label: item.badge } : item.badge"
            :class="mandorUv.linkTrailingBadge({
              class: [props.uv?.linkTrailingBadge, item.uv?.linkTrailingBadge],
            })"
          />

          <AuIcon
            v-if="(
              orientation === 'horizontal'
              && (item.children?.length
                || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as KeyAuNavigationMenuSlot])
            ) || (orientation === 'vertical' && item.children?.length
            )"
            :icon="item.trailingIcon || trailingIcon || 'i-lucide:chevron-down'"
            :class="mandorUv.linkTrailingIcon({
              class: [props.uv?.linkTrailingIcon, item.uv?.linkTrailingIcon],
              active: isActive,
            })"
          />

          <AuIcon
            v-else-if="item.trailingIcon"
            :name="item.trailingIcon"
            :class="mandorUv.linkTrailingIcon({
              class: [props.uv?.linkTrailingIcon, item.uv?.linkTrailingIcon],
              active: isActive,
            })"
          />
        </slot>
      </component>
    </slot>
  </DefineLinkTemplate>

  <DefineItemTemplate v-slot="{ item, index, level = 0 }">
    <component
      :is="(orientation === 'vertical' && !collapsed) ? AAccordionItem : ANavigationMenuItem"
      as="li"
      :value="item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`)"
    >
      <div
        v-if="orientation === 'vertical' && item.type === 'label' && !collapsed"
        :class="mandorUv.label({ class: [props.uv?.label, item.uv?.label, item.class] })"
      >
        <ReuseLinkTemplate
          :item="item"
          :index="index"
        />
      </div>

      <AuLink
        v-else-if="item.type !== 'label'"
        v-slot="{ active, ...slotProps }"
        v-bind="(
          orientation === 'vertical'
          && item.children?.length
          && !collapsed && item.type === 'trigger'
        ) ? {}
          : pickLinkProps(item as Omit<AuNavigationMenuItem, 'type'>)
        "
        custom
      >
        <component
          :is="(
            orientation === 'horizontal'
            && (
              item.children?.length
              || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as KeyAuNavigationMenuSlot])
          )
            ? ANavigationMenuTrigger : (
              (
                orientation === 'vertical'
                && item.children?.length
                && !collapsed
                && !(slotProps as any).href
              ) ? AAccordionTrigger : ANavigationMenuLink
            )"
          as-child
          :active="active || item.active"
          :disabled="item.disabled"
          @select="item.onSelect"
        >
          <AuPopover
            v-if="
              orientation === 'vertical'
                && collapsed
                && item.children?.length && (!!props.popover || !!item.popover)"
            v-bind="{ ...popoverProps, ...(typeof item.popover === 'boolean' ? {} : item.popover || {}) }"
            :ui="{ content: mandorUv.content({ class: [props.uv?.content, item.uv?.content] }) }"
          >
            <AuLinkBase
              v-bind="slotProps"
              :class="mandorUv.link({ class: [props.uv?.link, item.uv?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })"
            >
              <ReuseLinkTemplate
                :item="item"
                :active="active || item.active"
                :index="index"
              />
            </AuLinkBase>

            <template #content>
              <slot
                :name="((item.slot ? `${item.slot}-content` : 'item-content') as KeyAuNavigationMenuSlot)"
                :item="item"
                :active="active || item.active"
                :index="index"
              >
                <ul :class="mandorUv.childList({ class: [props.uv?.childList, item.uv?.childList] })">
                  <li
                    :class="mandorUv.childLabel({
                      class: [props.uv?.childLabel, item.uv?.childLabel],
                    })"
                  >
                    {{ prop(item, props.labelKey) }}
                  </li>

                  <li
                    v-for="(childItem, childIndex) in item.children"
                    :key="childIndex"
                    :class="mandorUv.childItem({ class: [props.uv?.childItem, item.uv?.childItem] })"
                  >
                    <AuLink
                      v-slot="{ active: childActive, ...childSlotProps }"
                      v-bind="pickLinkProps(childItem)"
                      custom
                    >
                      <ANavigationMenuLink
                        as-child
                        :active="childActive"
                        @select="childItem.onSelect"
                      >
                        <AuLinkBase
                          v-bind="childSlotProps"
                          :class="mandorUv.childLink({ class: [props.uv?.childLink, item.uv?.childLink, childItem.class], active: childActive })"
                        >
                          <AuIcon
                            v-if="childItem.icon"
                            :icon="childItem.icon"
                            :class="mandorUv.childLinkIcon({ class: [props.uv?.childLinkIcon, item.uv?.childLinkIcon], active: childActive })"
                          />

                          <span
                            :class="mandorUv.childLinkLabel({
                              class: [props.uv?.childLinkLabel, item.uv?.childLinkLabel],
                              active: childActive,
                            })"
                          >
                            {{ prop(childItem, props.labelKey as keyof AuNavigationMenuChildItem) }}

                            <AuIcon
                              v-if="childItem.target === '_blank' && externalIcon !== false"
                              :icon="typeof externalIcon === 'string' ? externalIcon : undefined"
                              :class="mandorUv.childLinkLabelExternalIcon({
                                class: [props.uv?.childLinkLabelExternalIcon, item.uv?.childLinkLabelExternalIcon],
                                active: childActive,
                              })"
                            />
                          </span>
                        </AuLinkBase>
                      </ANavigationMenuLink>
                    </AuLink>
                  </li>
                </ul>
              </slot>
            </template>
          </AuPopover>

          <AuTooltip
            v-else-if="orientation === 'vertical' && collapsed && (!!props.tooltip || !!item.tooltip)"
            :text="prop(item, props.labelKey)"
            v-bind="{
              ...tooltipProps,
              ...(isBoolean(item.tooltip) ? {} : item.tooltip || {}),
            }"
          >
            <AuLinkBase
              v-bind="slotProps"
              :class="mandorUv.link({
                class: [props.uv?.link, item.uv?.link, item.class],
                active: active || item.active,
                disabled: !!item.disabled,
                level: level > 0,
              })"
            >
              <ReuseLinkTemplate
                :item="item"
                :active="active || item.active"
                :index="index"
              />
            </AuLinkBase>
          </AuTooltip>

          <AuLinkBase
            v-else
            v-bind="slotProps"
            :class="mandorUv.link({
              class: [props.uv?.link, item.uv?.link, item.class],
              active: active || item.active,
              disabled: !!item.disabled,
              level: orientation === 'horizontal' || level > 0,
            })"
          >
            <ReuseLinkTemplate
              :item="item"
              :active="active || item.active"
              :index="index"
            />
          </AuLinkBase>
        </component>

        <ANavigationMenuContent
          v-if="orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as KeyAuNavigationMenuSlot])"
          v-bind="contentProps"
          :class="mandorUv.content({ class: [props.uv?.content, item.uv?.content] })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-content` : 'item-content') as KeyAuNavigationMenuSlot)"
            :item="item"
            :active="active || item.active"
            :index="index"
          >
            <ul :class="mandorUv.childList({ class: [props.uv?.childList, item.uv?.childList] })">
              <li
                v-for="(childItem, childIndex) in item.children"
                :key="childIndex"
                :class="mandorUv.childItem({ class: [props.uv?.childItem, item.uv?.childItem] })"
              >
                <AuLink
                  v-slot="{ active: childActive, ...childSlotProps }"
                  v-bind="pickLinkProps(childItem)"
                  custom
                >
                  <ANavigationMenuLink
                    as-child
                    :active="childActive"
                    @select="childItem.onSelect"
                  >
                    <AuLinkBase
                      v-bind="childSlotProps"
                      :class="mandorUv.childLink({ class: [props.uv?.childLink, item.uv?.childLink, childItem.class], active: childActive })"
                    >
                      <AuIcon
                        v-if="childItem.icon"
                        :icon="childItem.icon"
                        :class="mandorUv.childLinkIcon({ class: [props.uv?.childLinkIcon, item.uv?.childLinkIcon], active: childActive })"
                      />

                      <div :class="mandorUv.childLinkWrapper({ class: [props.uv?.childLinkWrapper, item.uv?.childLinkWrapper] })">
                        <p :class="mandorUv.childLinkLabel({ class: [props.uv?.childLinkLabel, item.uv?.childLinkLabel], active: childActive })">
                          {{ prop(childItem, props.labelKey as keyof AuNavigationMenuChildItem) }}

                          <AuIcon
                            v-if="childItem.target === '_blank' && externalIcon !== false"
                            :name="typeof externalIcon === 'string' ? externalIcon : undefined"
                            :class="mandorUv.childLinkLabelExternalIcon({ class: [props.uv?.childLinkLabelExternalIcon, item.uv?.childLinkLabelExternalIcon], active: childActive })"
                          />
                        </p>

                        <p
                          v-if="childItem.description"
                          :class="mandorUv.childLinkDescription({ class: [props.uv?.childLinkDescription, item.uv?.childLinkDescription], active: childActive })"
                        >
                          {{ childItem.description }}
                        </p>
                      </div>
                    </AuLinkBase>
                  </ANavigationMenuLink>
                </AuLink>
              </li>
            </ul>
          </slot>
        </ANavigationMenuContent>
      </AuLink>

      <AAccordionContent
        v-if="orientation === 'vertical' && item.children?.length && !collapsed"
        :class="mandorUv.content({ class: [props.uv?.content, item.uv?.content] })"
      >
        <AAccordionRoot
          v-bind="({
            ...accordionProps,
            defaultValue: getAccordionDefaultValue(item.children, level + 1),
          } as AAccordionRootProps)"
          as="ul"
          :class="mandorUv.childList({ class: props.uv?.childList })"
        >
          <ReuseItemTemplate
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            :item="childItem"
            :index="childIndex"
            :level="level + 1"
            :class="mandorUv.childItem({ class: [props.uv?.childItem, childItem.uv?.childItem] })"
          />
        </AAccordionRoot>
      </AAccordionContent>
    </component>
  </DefineItemTemplate>

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
        <ReuseItemTemplate
          v-for="(item, index) in list"
          :key="`list-${listIndex}-${index}`"
          :item="item"
          :index="index"
          :class="mandorUv.item({ class: [props.uv?.item, item.uv?.item] })"
        />
      </component>

      <div
        v-if="orientation === 'vertical' && listIndex < lists.length - 1"
        :class="mandorUv.separator({ class: props.uv?.separator })"
      />
    </template>

    <slot name="list-trailing" />

    <div
      v-if="orientation === 'horizontal'"
      :class="mandorUv.viewportWrapper({ class: props.uv?.viewportWrapper })"
    >
      <ANavigationMenuIndicator
        v-if="arrow"
        :class="mandorUv.indicator({ class: props.uv?.indicator })"
      >
        <div :class="mandorUv.arrow({ class: props.uv?.arrow })" />
      </ANavigationMenuIndicator>

      <ANavigationMenuViewport :class="mandorUv.viewport({ class: props.uv?.viewport })" />
    </div>
  </ANavigationMenuRoot>
</template>
