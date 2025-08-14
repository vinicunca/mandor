// @unocss-include
import type { MandorComponentConfig } from '@mandor-core/typings';

import { uv } from 'unocss-variants';

export const navigationMenuUv = uv({
  slots: {
    root: 'relative flex gap-1.5 [&>div]:min-w-0',
    list: 'isolate min-w-0',
    label: 'w-full flex items-center gap-1.5 font-semibold text-xs/5 color-highlighted px-2.5 py-1.5',
    item: 'min-w-0',
    link: 'group relative w-full flex items-center gap-2 font-medium text-sm before:(absolute -z-1 rounded-md content-empty) focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
    linkLeadingIcon: 'shrink-0 size-4',
    linkLeadingAvatar: 'shrink-0',
    linkLeadingAvatarSize: '2xs',
    linkTrailing: 'group ms-auto inline-flex gap-1.5 items-center',
    linkTrailingBadge: 'shrink-0',
    linkTrailingBadgeSize: 'sm',
    linkTrailingIcon: 'size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'inline-block size-3 align-top color-dimmed',
    childList: 'isolate',
    childLabel: 'text-xs color-highlighted',
    childItem: '',
    childLink: 'group relative size-full flex items-start text-start text-sm before:(absolute z-[-1] rounded-md) focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
    childLinkWrapper: 'min-w-0',
    childLinkIcon: 'size-5 shrink-0',
    childLinkLabel: 'truncate',
    childLinkLabelExternalIcon: 'inline-block size-3 align-top color-dimmed',
    childLinkDescription: 'color-muted',
    separator: 'px-2 h-px bg-border',
    viewportWrapper: 'absolute top-full left-0 flex w-full',
    viewport: 'relative overflow-hidden bg-default shadow-lg rounded-md ring ring-default h-(--akar-navigation-menu-viewport-height) w-full transition-[width,height,left] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-[1]',
    content: '',
    indicator: 'absolute data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=hidden]:opacity-0 bottom-0 z-[2] w-(--akar-navigation-menu-indicator-size) translate-x-(--akar-navigation-menu-indicator-position) flex h-2.5 items-end justify-center overflow-hidden transition-[translate,width] duration-200',
    arrow: 'relative top-[50%] size-2.5 rotate-45 border border-default bg-default z-[1] rounded-xs',
  },
  variants: {
    color: {
      primary: {
        link: 'focus-visible:before:ring-primary',
        childLink: 'focus-visible:before:ring-primary',
      },
    },
    highlightColor: {
      primary: '',
    },
    variant: {
      pill: '',
      link: '',
    },
    orientation: {
      horizontal: {
        root: 'items-center justify-between',
        list: 'flex items-center',
        item: 'py-2',
        link: 'px-2.5 py-1.5 before:(inset-x-px inset-y-0)',
        childList: 'grid p-2',
        childLink: 'px-3 py-2 gap-2 before:(inset-x-px inset-y-0)',
        childLinkLabel: 'font-medium',
        content: 'absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto',
      },
      vertical: {
        root: 'flex-col',
        link: 'flex-row px-2.5 py-5 before:(inset-y-px inset-x-0) h-38px',
        childLabel: 'px-1.5 py-0.5',
        childLink: 'p-1.5 gap-1.5 before:(inset-y-px inset-x-0)',
      },
    },
    contentOrientation: {
      horizontal: {
        viewportWrapper: 'justify-center',
        content: 'data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]',
      },
      vertical: {
        viewport: 'sm:w-(--akar-navigation-menu-viewport-width) left-(--akar-navigation-menu-viewport-left)',
      },
    },
    active: {
      true: {
        childLink: 'before:bg-elevated color-highlighted',
        childLinkIcon: 'color-default',
      },
      false: {
        link: 'color-foreground',
        linkLeadingIcon: 'color-dimmed',
        childLink: 'transition-colors before:transition-colors hover:before:bg-elevated/50 color-default hover:color-highlighted',
        childLinkIcon: 'color-dimmed group-hover:color-default transition-colors',
      },
    },
    disabled: {
      true: {
        link: 'cursor-not-allowed opacity-75',
      },
    },
    highlight: {
      true: '',
    },
    level: {
      true: '',
    },
    collapsed: {
      true: '',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      contentOrientation: 'horizontal',
      class: {
        childList: 'grid-cols-2 gap-2',
      },
    },
    {
      orientation: 'horizontal',
      contentOrientation: 'vertical',
      class: {
        childList: 'gap-1',
        content: 'w-60',
      },
    },
    {
      orientation: 'vertical',
      collapsed: false,
      class: {
        childList: 'ms-5 border-s border-default',
        childItem: 'ps-1.5 -ms-px',
        content: 'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden',
      },
    },
    {
      orientation: 'vertical',
      collapsed: true,
      class: {
        link: 'px-1.5',
        content: 'shadow-sm rounded-sm min-h-6 p-1',
      },
    },
    {
      orientation: 'horizontal',
      highlight: true,
      class: {
        link: 'after:(absolute -bottom-2 inset-x-2.5 block h-px rounded-full transition-colors)',
      },
    },
    {
      orientation: 'vertical',
      highlight: true,
      level: true,
      class: {
        link: 'after:(absolute -start-1.5 inset-y-0.5 block w-px rounded-full transition-colors)',
      },
    },
    {
      disabled: false,
      active: false,
      variant: 'pill',
      class: {
        link: 'hover:color-primary hover:before:bg-accent transition-colors before:transition-colors-280',
        linkLeadingIcon: 'group-hover:scale-120 transition-colors,transform-280',
      },
    },
    {
      disabled: false,
      active: false,
      variant: 'pill',
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:color-highlighted',
        linkLeadingIcon: 'group-data-[state=open]:color-default',
      },
    },
    {
      disabled: false,
      variant: 'pill',
      highlight: true,
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:before:bg-elevated/50',
      },
    },
    {
      disabled: false,
      variant: 'pill',
      highlight: false,
      active: false,
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:before:bg-elevated/50',
      },
    },
    {
      color: 'primary',
      variant: 'pill',
      active: true,
      class: {
        link: 'color-primary',
        linkLeadingIcon: 'color-primary group-data-[state=open]:color-primary',
      },
    },
    {
      variant: 'pill',
      active: true,
      highlight: false,
      class: {
        link: 'before:bg-elevated',
      },
    },
    {
      variant: 'pill',
      active: true,
      highlight: true,
      disabled: false,
      class: {
        link: 'hover:before:bg-elevated/50 before:transition-colors',
      },
    },
    {
      disabled: false,
      active: false,
      variant: 'link',
      class: {
        link: 'hover:color-highlighted transition-colors',
        linkLeadingIcon: 'group-hover:color-default transition-colors',
      },
    },
    {
      disabled: false,
      active: false,
      variant: 'link',
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:color-highlighted',
        linkLeadingIcon: 'group-data-[state=open]:color-default',
      },
    },
    {
      color: 'primary',
      variant: 'link',
      active: true,
      class: {
        link: 'color-primary',
        linkLeadingIcon: 'color-primary group-data-[state=open]:color-primary',
      },
    },
    {
      highlightColor: 'primary',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-primary',
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
    highlightColor: 'primary',
    variant: 'pill',
  },
});

export type AuNavigationMenuUv = MandorComponentConfig<typeof navigationMenuUv>;
