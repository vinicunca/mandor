<script lang="ts">
import type { AAvatarFallbackProps, AAvatarImageProps, APrimitiveProps } from 'akar';

import type { AuChipProps } from '../chip';
import type { AuAvatarUv } from './avatar.theme';

import { isObjectType } from '@vinicunca/perkakas';

export interface AuAvatarProps extends Omit<AAvatarImageProps, 'src'>, AAvatarFallbackProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: APrimitiveProps['as'];
  src?: string;
  alt?: string;
  text?: string;
  icon?: string;
  /**
   * @defaultValue 'md'
   */
  size?: AuAvatarUv['variants']['size'];
  chip?: boolean | AuChipProps;
  class?: any;
  style?: any;
  uv?: AuAvatarUv['slots'];
}

export interface AuAvatarSlots {
  default: (props?: object) => any;
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';

import { reactivePick } from '@vueuse/core';
import { AAvatarFallback, AAvatarImage, AAvatarRoot, useForwardProps } from 'akar';
import { uv } from 'unocss-variants';

import { useAvatarGroup } from '../../composables/use-avatar-group';
import AuChip from '../chip/au-chip.vue';
import { avatarUv } from './avatar.theme';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<AuAvatarProps>(),
  {
    src: '',
  },
);

const { size } = useAvatarGroup(props);

const avatarImageProps = useForwardProps(
  reactivePick(props, 'src', 'crossOrigin', 'referrerPolicy', 'alt'),
);
const avatarFallbackProps = useForwardProps(
  reactivePick(props, 'delayMs'),
);

const fallback = computed(() =>
  props.text
  || (props.alt || '')
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .substring(0, 2),
);

const mandorUv = computed(
  () => uv({
    extend: uv(avatarUv),
  })({
    size: size.value,
  }),
);

const sizePx = computed(() => ({
  '3xs': 16,
  '2xs': 20,
  'xs': 24,
  'sm': 28,
  'md': 32,
  'lg': 36,
  'xl': 40,
  '2xl': 44,
  '3xl': 48,
})[props.size || 'md']);
</script>

<template>
  <AuChip
    v-if="props.chip"
    v-bind="isObjectType(props.chip) ? { inset: true, ...props.chip } : { inset: true }"
    :class="mandorUv.root({ class: [props.uv?.root, props.class] })"
    :style="props.style"
  >
    <AAvatarRoot data-slot="avatar">
      <AAvatarImage
        data-slot="avatar-image"
        v-bind="{ ...avatarImageProps, ...$attrs }"
        :width="sizePx"
        :height="sizePx"
        :class="mandorUv.image({ class: props.uv?.image })"
      />

      <AAvatarFallback
        data-slot="avatar-fallback"
        v-bind="avatarFallbackProps"
        :class="mandorUv.fallback({ class: props.uv?.fallback })"
      >
        {{ fallback }}
      </AAvatarFallback>
    </AAvatarRoot>
  </AuChip>

  <AAvatarRoot
    v-else
    data-slot="avatar"
    :class="mandorUv.root({ class: [props.uv?.root, props.class] })"
  >
    <AAvatarImage
      data-slot="avatar-image"
      v-bind="{ ...avatarImageProps, ...$attrs }"
      :width="sizePx"
      :height="sizePx"
      :class="mandorUv.image({ class: props.uv?.image })"
    />

    <AAvatarFallback
      data-slot="avatar-fallback"
      v-bind="avatarFallbackProps"
      :class="mandorUv.fallback({ class: props.uv?.fallback })"
    >
      {{ fallback }}
    </AAvatarFallback>
  </AAvatarRoot>
</template>
