// @unocss-include

import type { MandorComponentConfig } from '@mandor-core/typings';

import { uv } from 'unocss-variants';

import { buttonGroupVariant } from '../button/button-group.theme';

export const buttonUv = uv({
  slots: {
    base: 'rounded-full font-medium inline-flex items-center justify-center disabled:(cursor-not-allowed opacity-75) aria-disabled:(cursor-not-allowed opacity-75) transition-colors,box-shadow-280 outline-none',
    label: 'truncate',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0',
  },
  variants: {
    ...buttonGroupVariant,
    color: {
      // ...generateColors(''),
      neutral: '',
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
      ghost: '',
      link: '',
    },
    size: {
      xs: {
        base: 'px-2 py-1 text-xs gap-1',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
      },
      sm: {
        base: 'px-2.5 py-1.5 text-xs gap-1.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
      },
      md: {
        base: 'px-2.5 py-1.5 text-sm gap-1.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
      lg: {
        base: 'px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
      xl: {
        base: 'px-3 py-2 text-base gap-2',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-6',
      },
      icon: {
        base: 'size-8 px-1',
        leadingIcon: 'size-4',
      },
    },
    block: {
      true: {
        base: 'w-full justify-center',
        trailingIcon: 'ms-auto',
      },
    },
    square: {
      true: '',
    },
    leading: {
      true: '',
    },
    trailing: {
      true: '',
    },
    loading: {
      true: '',
    },
    active: {
      true: {
        base: '',
      },
      false: {
        base: '',
      },
    },
  },
  compoundVariants: [
    {
      color: 'neutral',
      variant: 'solid',
      class: 'text-(--ui-bg) bg-(--ui-bg-inverted) hover:bg-(--ui-bg-inverted)/90 disabled:bg-(--ui-bg-inverted) aria-disabled:bg-(--ui-bg-inverted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-border-inverted)',
    },
    {
      color: 'neutral',
      variant: 'outline',
      class: 'ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg) hover:bg-$pohon-bg-elevated disabled:bg-(--ui-bg) aria-disabled:bg-(--ui-bg) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)',
    },
    {
      color: 'neutral',
      variant: 'soft',
      class: 'text-(--ui-text) bg-$pohon-bg-elevated hover:bg-(--ui-bg-accented)/75 focus:outline-none focus-visible:bg-(--ui-bg-accented)/75 disabled:bg-$pohon-bg-elevated aria-disabled:bg-$pohon-bg-elevated',
    },
    {
      color: 'neutral',
      variant: 'subtle',
      class: 'ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-$pohon-bg-elevated hover:bg-(--ui-bg-accented)/75 disabled:bg-$pohon-bg-elevated aria-disabled:bg-$pohon-bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)',
    },
    {
      color: 'neutral',
      variant: 'ghost',
      class: 'color-foreground/80 hover:(bg-accent color-accent-foreground) focus:outline-none focus-visible:(outline-none bg-accent ring color-accent-foreground ring-ring) hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent',
    },
    {
      color: 'neutral',
      variant: 'link',
      class: 'text-(--ui-text-muted) hover:text-(--ui-text) disabled:text-(--ui-text-muted) aria-disabled:text-(--ui-text-muted) focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)',
    },
    {
      loading: true,
      leading: true,
      class: {
        leadingIcon: 'animate-spin',
      },
    },
    {
      loading: true,
      leading: false,
      trailing: true,
      class: {
        trailingIcon: 'animate-spin',
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
  },
});

export type AuButtonUv = MandorComponentConfig<typeof buttonUv>;
