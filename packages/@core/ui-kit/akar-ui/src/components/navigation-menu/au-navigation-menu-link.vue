<script lang="ts" setup generic="T extends ArrayOrNested<NavigationMenuItem>">
import type { ArrayOrNested } from '@mandor-core/typings';

import type { AuNavigationMenuSlots, NavigationMenuItem } from './au-navigation-menu.vue';

const props = defineProps<{
  item: NavigationMenuItem;
  index: number;
  isActive?: boolean;
}>();
</script>

<template>
  <slot
    :name="((item.slot || 'item') as keyof AuNavigationMenuSlots<T>)"
    :item="item"
    :index="index"
  >
    <slot
      :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof AuNavigationMenuSlots<T>)"
      :item="item"
      :active="active"
      :index="index"
    >
      <UAvatar
        v-if="item.avatar"
        :size="((item.ui?.linkLeadingAvatarSize || props.ui?.linkLeadingAvatarSize || ui.linkLeadingAvatarSize()) as AvatarProps['size'])"
        v-bind="item.avatar"
        :class="ui.linkLeadingAvatar({ class: [props.ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active, disabled: !!item.disabled })"
      />
      <UIcon
        v-else-if="item.icon"
        :name="item.icon"
        :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })"
      />
    </slot>

    <span
      v-if="(!collapsed || orientation !== 'vertical') && (get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof AuNavigationMenuSlots<T>])"
      :class="ui.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] })"
    >
      <slot
        :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof AuNavigationMenuSlots<T>)"
        :item="item"
        :active="active"
        :index="index"
      >
        {{ get(item, props.labelKey as string) }}
      </slot>

      <UIcon
        v-if="item.target === '_blank' && externalIcon !== false"
        :name="typeof externalIcon === 'string' ? externalIcon : appConfig.ui.icons.external"
        :class="ui.linkLabelExternalIcon({ class: [props.ui?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon], active })"
      />
    </span>

    <component
      :is="orientation === 'vertical' && item.children?.length && !collapsed ? AccordionTrigger : 'span'"
      v-if="(!collapsed || orientation !== 'vertical') && (item.badge || (orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof AuNavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length) || item.trailingIcon || !!slots[(item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof AuNavigationMenuSlots<T>])"
      as="span"
      :class="ui.linkTrailing({ class: [props.ui?.linkTrailing, item.ui?.linkTrailing] })"
      @click.stop.prevent
    >
      <slot
        :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof AuNavigationMenuSlots<T>)"
        :item="item"
        :active="active"
        :index="index"
      >
        <UBadge
          v-if="item.badge !== undefined"
          color="neutral"
          variant="outline"
          :size="((item.ui?.linkTrailingBadgeSize || props.ui?.linkTrailingBadgeSize || ui.linkTrailingBadgeSize()) as BadgeProps['size'])"
          v-bind="(typeof item.badge === 'string' || typeof item.badge === 'number') ? { label: item.badge } : item.badge"
          :class="ui.linkTrailingBadge({ class: [props.ui?.linkTrailingBadge, item.ui?.linkTrailingBadge] })"
        />

        <UIcon
          v-if="(orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof AuNavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length)"
          :name="item.trailingIcon || trailingIcon || appConfig.ui.icons.chevronDown"
          :class="ui.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })"
        />
        <UIcon
          v-else-if="item.trailingIcon"
          :name="item.trailingIcon"
          :class="ui.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })"
        />
      </slot>
    </component>
  </slot>
</template>
