import type { ComputedRef, InjectionKey } from 'vue';

import type { AuAvatarGroupProps } from '../components/avatar/au-avatar-group.vue';

import { computed, inject, provide } from 'vue';

export const avatarGroupInjectionKey: InjectionKey<
  ComputedRef<{ size: AuAvatarGroupProps['size'] }>
> = Symbol('nuxt-ui.avatar-group');

export function useAvatarGroup(props: { size: AuAvatarGroupProps['size'] }) {
  const avatarGroup = inject(avatarGroupInjectionKey, undefined);

  const size = computed(() => props.size ?? avatarGroup?.value.size);
  provide(avatarGroupInjectionKey, computed(() => ({ size: size.value })));

  return {
    size,
  };
}
