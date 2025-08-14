<script lang="ts">
import type { UseComponentIconsProps } from '../../composables/use-component-icons';
import type { AuLinkProps } from '../link';
import type { AuButtonUv } from './button.theme';

export interface AuButtonProps extends UseComponentIconsProps, Omit<AuLinkProps, 'raw' | 'custom'> {
  label?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: AuButtonUv['variants']['color'];
  activeColor?: AuButtonUv['variants']['color'];
  /**
   * @defaultValue 'solid'
   */
  variant?: AuButtonUv['variants']['variant'];
  activeVariant?: AuButtonUv['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: AuButtonUv['variants']['size'];
  /** Render the button with equal padding on all sides. */
  square?: boolean;
  /** Render the button full width. */
  block?: boolean;
  /** Set loading state automatically based on the `@click` promise state */
  loadingAuto?: boolean;
  onClick?: ((event: MouseEvent) => void | Promise<void>) | Array<((event: MouseEvent) => void | Promise<void>)>;
  class?: any;
  pohon?: AuButtonUv['slots'];
}

export interface PButtonSlots {
  leading: (props?: object) => any;
  default: (props?: object) => any;
  trailing: (props?: object) => any;
}
</script>

<script lang="ts" setup>
import type { AuAvatarProps } from '../avatar';

import { computed, ref } from 'vue';

import { omit } from '@vinicunca/perkakas';
import { useForwardProps } from 'akar';
import { uv } from 'unocss-variants';

import { useButtonGroup } from '../../composables/use-button-group';
import { useComponentIcons } from '../../composables/use-component-icons';
import { pickLinkProps } from '../../utils';
import { AuAvatar } from '../avatar';
import AuIcon from '../icon/au-icon.vue';
import { AuLink, AuLinkBase } from '../link';
import { buttonUv } from './button.theme';

const props = withDefaults(
  defineProps<AuButtonProps>(),
  {
    active: undefined,
    activeClass: '',
    inactiveClass: '',
  },
);

const slots = defineSlots<PButtonSlots>();

const { orientation, size: buttonSize } = useButtonGroup<AuButtonProps>(props);

const linkProps = useForwardProps(pickLinkProps(props));

const loadingAutoState = ref(false);

async function onClickWrapper(event: MouseEvent) {
  loadingAutoState.value = true;
  const callbacks = Array.isArray(props.onClick)
    ? props.onClick
    : [props.onClick];
  try {
    await Promise.all(callbacks.map((fn) => fn?.(event)));
  } finally {
    loadingAutoState.value = false;
  }
}

const isLoading = computed(() => {
  return props.loading || (
    props.loadingAuto
    && (loadingAutoState.value)
  );
});

const {
  isLeading,
  isTrailing,
  leadingIconName,
  trailingIconName,
} = useComponentIcons(
  computed(() => ({ ...props, loading: isLoading.value })),
);

const pohonUv = computed(() =>
  uv({
    extend: buttonUv,
    variants: {
      active: {
        true: {
          base: props.activeClass,
        },
        false: {
          base: props.inactiveClass,
        },
      },
    },
  })({
    color: props.color,
    variant: props.variant,
    size: buttonSize.value,
    loading: isLoading.value,
    block: props.block,
    square: props.square || (!slots.default && !props.label),
    leading: isLeading.value,
    trailing: isTrailing.value,
    buttonGroup: orientation.value,
  }),
);
</script>

<template>
  <AuLink
    v-slot="{ active, ...slotProps }"
    :type="type"
    :disabled="disabled || isLoading"
    :class="pohonUv.base({ class: [props.class, props.pohon?.base] })"
    v-bind="omit(linkProps, ['type', 'disabled', 'onClick'])"
    custom
  >
    <AuLinkBase
      v-bind="slotProps"
      :class="pohonUv.base({
        class: [props.class, props.pohon?.base],
        active,
        ...(active && activeVariant ? { variant: activeVariant } : {}),
        ...(active && activeColor ? { color: activeColor } : {}),
      })"
      @click="onClickWrapper"
    >
      <slot name="leading">
        <AuIcon
          v-if="isLeading && leadingIconName"
          :icon="leadingIconName"
          :class="pohonUv.leadingIcon({ class: props.pohon?.leadingIcon, active })"
        />
        <AuAvatar
          v-else-if="!!avatar"
          :size="((props.pohon?.leadingAvatarSize || pohonUv.leadingAvatarSize()) as AuAvatarProps['size'])"
          v-bind="avatar"
          :class="pohonUv.leadingAvatar({ class: props.pohon?.leadingAvatar, active })"
        />
      </slot>

      <slot>
        <span
          v-if="label"
          :class="pohonUv.label({ class: props.pohon?.label, active })"
        >
          {{ label }}
        </span>
      </slot>

      <slot name="trailing">
        <AuIcon
          v-if="isTrailing && trailingIconName"
          :icon="trailingIconName"
          :class="pohonUv.trailingIcon({ class: props.pohon?.trailingIcon, active })"
        />
      </slot>
    </AuLinkBase>
  </AuLink>
</template>
