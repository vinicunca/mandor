<script lang="ts">
import type { AAvatarFallbackProps, AAvatarImageProps, APrimitiveProps } from 'akar';

import type { AuAvatarUv } from './avatar.theme';

export interface AuAvatarProps extends Omit<AAvatarImageProps, 'src'>, AAvatarFallbackProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: APrimitiveProps['as'];
  src?: string;
  text?: string;
  uv?: AuAvatarUv['slots'];
  class?: any;
}

export interface AuAvatarSlots {
  default: (props?: object) => any;
}
</script>

<script lang="ts" setup>
import { reactivePick } from '@vueuse/core';
import { AAvatarFallback, AAvatarImage, AAvatarRoot, useForwardProps } from 'akar';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<AuAvatarProps>(),
  {
    src: '',
  },
);

const avatarImageProps = useForwardProps(
  reactivePick(props, 'src', 'crossOrigin', 'referrerPolicy'),
);
const avatarFallbackProps = useForwardProps(
  reactivePick(props, 'delayMs'),
);
</script>

<template>
  <AAvatarRoot
    data-slot="avatar"
  >
    <AAvatarImage v-bind="avatarImageProps" />

    <AAvatarFallback v-bind="avatarFallbackProps" />
  </AAvatarRoot>
</template>
