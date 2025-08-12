<script lang="ts">
import type { APrimitiveProps } from 'akar';
import type { ClassValue } from 'unocss-variants';

import type { ButtonHTMLAttributes } from 'vue';

import type { LinkRecord } from '@mandor-core/typings';

export interface AuLinkProps extends LinkRecord {
  /**
   * The element or component this component should render as when not a link.
   * @defaultValue 'button'
   */
  as?: APrimitiveProps['as'];
  /**
   * The type of the button when not a link.
   * @defaultValue 'button'
   */
  type?: ButtonHTMLAttributes['type'];
  custom?: boolean;
  /** When `true`, only styles from `class`, `activeClass`, and `inactiveClass` will be applied. */
  raw?: boolean;
  class?: ClassValue;
}

export interface AuLinkSlots {
  default: (props: { active?: boolean }) => any;
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { isString } from '@vinicunca/perkakas';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { diff, isEqual } from 'ohash/utils';
import { hasProtocol } from 'ufo';
import { uv } from 'unocss-variants';

import AuLinkBase from './au-link-base.vue';
import { linkTheme } from './link.theme';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<AuLinkProps>(),
  {
    as: 'button',
    type: 'button',
    ariaCurrentValue: 'page',
    active: undefined,
    activeClass: '',
    inactiveClass: '',
  },
);

defineSlots<AuLinkSlots>();

const route = useRoute();

const routerLinkProps = useForwardProps(
  reactiveOmit(
    props,
    'as',
    'type',
    'disabled',
    'active',
    'exact',
    'exactQuery',
    'exactHash',
    'activeClass',
    'inactiveClass',
    'to',
    'href',
    'raw',
    'custom',
    'class',
  ),
);

const linkUv = uv(linkTheme);

const mandorUv = computed(() => uv({
  extend: linkUv,
  variants: {
    active: {
      true: props.activeClass,
      false: props.inactiveClass,
    },
  },
}));

const to = computed(() => props.to ?? props.href);

const isExternal = computed(() => {
  if (props.external) {
    return true;
  }

  if (!to.value) {
    return false;
  }

  return isString(props.to) && hasProtocol(props.to, { acceptRelative: true });
});

function isPartiallyEqual(item1: any, item2: any) {
  const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
    if (q.type === 'added') {
      filtered.add(q.key);
    }
    return filtered;
  }, new Set<string>());

  const item1Filtered = Object.fromEntries(Object.entries(item1).filter(([key]) => !diffedKeys.has(key)));
  const item2Filtered = Object.fromEntries(Object.entries(item2).filter(([key]) => !diffedKeys.has(key)));

  return isEqual(item1Filtered, item2Filtered);
}

function isLinkActive({ route: linkRoute, isActive, isExactActive }: any) {
  if (props.active !== undefined) {
    return props.active;
  }

  if (!to.value) {
    return false;
  }

  if (props.exactQuery === 'partial') {
    if (!isPartiallyEqual(linkRoute.query, route.query)) {
      return false;
    }
  } else if (props.exactQuery === true) {
    if (!isEqual(linkRoute.query, route.query)) {
      return false;
    }
  }

  if (props.exactHash && linkRoute.hash !== route.hash) {
    return false;
  }

  if (props.exact && isExactActive) {
    return true;
  }

  return !props.exact && isActive;
}

function resolveLinkClass({ route, isActive, isExactActive }: any = {}) {
  const active = isLinkActive({ route, isActive, isExactActive });

  if (props.raw) {
    return [props.class, active ? props.activeClass : props.inactiveClass];
  }

  return mandorUv.value({ class: props.class, active, disabled: props.disabled });
}
</script>

<template>
  <template v-if="!isExternal && !!to">
    <RouterLink
      v-slot="{ href, navigate, route: linkRoute, isActive, isExactActive }"
      v-bind="routerLinkProps"
      :to="to"
      custom
    >
      <template v-if="custom">
        <slot
          v-bind="{
            ...$attrs,
            ...(exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
            as: props.as,
            type: props.type,
            disabled: props.disabled,
            href,
            navigate,
            active: isLinkActive({ route: linkRoute, isActive, isExactActive }),
          }"
        />
      </template>

      <AuLinkBase
        v-else
        v-bind="{
          ...$attrs,
          ...(exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
          as: props.as,
          type: props.type,
          disabled: props.disabled,
          href,
          navigate,
        }"
        :class="resolveLinkClass({ route: linkRoute, isActive, isExactActive })"
      >
        <slot :active="isLinkActive({ route: linkRoute, isActive, isExactActive })" />
      </AuLinkBase>
    </RouterLink>
  </template>

  <template v-else>
    <template v-if="custom">
      <slot
        v-bind="{
          ...$attrs,
          as: props.as,
          type: props.type,
          disabled: props.disabled,
          href: to,
          target: isExternal ? '_blank' : undefined,
          active: props.active,
          isExternal,
        }"
      />
    </template>

    <AuLinkBase
      v-else
      v-bind="{
        ...$attrs,
        as: props.as,
        type: props.type,
        disabled: props.disabled,
        href: (to as string),
        target: isExternal ? '_blank' : undefined,
        isExternal,
      }"
      :class="resolveLinkClass()"
    >
      <slot :active="props.active" />
    </AuLinkBase>
  </template>
</template>
