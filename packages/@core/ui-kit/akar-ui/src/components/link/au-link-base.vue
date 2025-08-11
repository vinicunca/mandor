<script lang="ts">
import type { APrimitiveProps } from 'akar';

import type { AuLinkProps } from './au-link.vue';

export interface AuLinkBaseProps {
  as?: APrimitiveProps['as'];
  type?: string;
  disabled?: boolean;
  onClick?: ((event: MouseEvent) => void | Promise<void>) | Array<((event: MouseEvent) => void | Promise<void>)>;
  href?: string;
  navigate?: (event: MouseEvent) => void;
  target?: AuLinkProps['target'];
  rel?: AuLinkProps['rel'];
  active?: boolean;
  isExternal?: boolean;
}
</script>

<script setup lang="ts">
import { APrimitive } from 'akar';

const props = withDefaults(
  defineProps<AuLinkBaseProps>(),
  {
    as: 'button',
    type: 'button',
  },
);

function onClickWrapper(event: MouseEvent) {
  if (props.disabled) {
    event.stopPropagation();
    event.preventDefault();

    return;
  }

  if (props.onClick) {
    for (const onClick of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
      onClick(event);
    }
  }

  if (props.href && props.navigate && !props.isExternal) {
    props.navigate(event);
  }
}
</script>

<template>
  <APrimitive
    v-bind="props.href ? {
      'as': 'a',
      'href': props.disabled ? undefined : props.href,
      'aria-disabled': props.disabled ? 'true' : undefined,
      'role': props.disabled ? 'link' : undefined,
      'tabindex': props.disabled ? -1 : undefined,
    } : props.as === 'button' ? {
      as: props.as,
      type: props.type,
      disabled: props.disabled,
    } : { as: props.as }"
    :rel="props.rel"
    :target="props.target"
    @click="onClickWrapper"
  >
    <slot />
  </APrimitive>
</template>
