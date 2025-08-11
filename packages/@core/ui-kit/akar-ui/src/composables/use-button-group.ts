import type { ComputedRef, InjectionKey } from 'vue';

import type { GetObjectField } from '@mandor-core/typings';

import type { AuButtonGroupProps } from '../components/button/au-button-group.vue';

import { computed, inject } from 'vue';

interface Props<T> {
  size?: GetObjectField<T, 'size'>;
}

export const buttonGroupInjectionKey: InjectionKey<ComputedRef<{
  size: AuButtonGroupProps['size'];
  orientation: AuButtonGroupProps['orientation'];
}>> = Symbol('pohon.button-group');

export function useButtonGroup<T>(props: Props<T>) {
  const buttonGroup = inject(buttonGroupInjectionKey, undefined);

  return {
    orientation: computed(() => buttonGroup?.value.orientation),
    size: computed(() => props.size ?? buttonGroup?.value.size),
  };
}
