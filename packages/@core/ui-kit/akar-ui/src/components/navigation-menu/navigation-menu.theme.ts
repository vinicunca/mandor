// @unocss-include
import type { MandorComponentConfig } from '@mandor-core/typings';

import { uv } from 'unocss-variants';

export const navigationMenuUv = uv({
  slots: {
    root: 'relative flex gap-1.5 [&>div]:min-w-0',
    list: 'isolate min-w-0',
    label: 'w-full flex items-center gap-1.5 font-semibold text-xs/5 text-highlighted px-2.5 py-1.5',
    item: 'min-w-0',
    link: 'group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
    linkLeadingIcon: 'shrink-0 size-5',
    linkLeadingAvatar: 'shrink-0',
    linkLeadingAvatarSize: '2xs',
    linkTrailing: 'group ms-auto inline-flex gap-1.5 items-center',
    linkTrailingBadge: 'shrink-0',
    linkTrailingBadgeSize: 'sm',
    linkTrailingIcon: 'size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'inline-block size-3 align-top text-dimmed',
    childList: 'isolate',
    childLabel: 'text-xs text-highlighted',
    childItem: '',
    childLink: 'group relative size-full flex items-start text-start text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
    childLinkWrapper: 'min-w-0',
    childLinkIcon: 'size-5 shrink-0',
    childLinkLabel: 'truncate',
    childLinkLabelExternalIcon: 'inline-block size-3 align-top text-dimmed',
    childLinkDescription: 'text-muted',
    separator: 'px-2 h-px bg-border',
    viewportWrapper: 'absolute top-full left-0 flex w-full',
    viewport: 'relative overflow-hidden bg-default shadow-lg rounded-md ring ring-default h-(--akar-navigation-menu-viewport-height) w-full transition-[width,height,left] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-[1]',
    content: '',
    indicator: 'absolute data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=hidden]:opacity-0 bottom-0 z-[2] w-(--akar-navigation-menu-indicator-size) translate-x-(--akar-navigation-menu-indicator-position) flex h-2.5 items-end justify-center overflow-hidden transition-[translate,width] duration-200',
    arrow: 'relative top-[50%] size-2.5 rotate-45 border border-default bg-default z-[1] rounded-xs',
  },
  variants: {
    color: {
      neutral: {
        link: 'focus-visible:before:ring-inverted',
        childLink: 'focus-visible:before:ring-inverted',
      },
    },
    highlightColor: {
      neutral: '',
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
        link: 'px-2.5 py-1.5 before:inset-x-px before:inset-y-0',
        childList: 'grid p-2',
        childLink: 'px-3 py-2 gap-2 before:inset-x-px before:inset-y-0',
        childLinkLabel: 'font-medium',
        content: 'absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto',
      },
      vertical: {
        root: 'flex-col',
        link: 'flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0',
        childLabel: 'px-1.5 py-0.5',
        childLink: 'p-1.5 gap-1.5 before:inset-y-px before:inset-x-0',
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
        childLink: 'before:bg-elevated text-highlighted',
        childLinkIcon: 'text-default',
      },
      false: {
        link: 'text-muted',
        linkLeadingIcon: 'text-dimmed',
        childLink: 'transition-colors before:transition-colors hover:before:bg-elevated/50 text-default hover:text-highlighted',
        childLinkIcon: 'text-dimmed group-hover:text-default transition-colors',
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
});

export type AuNavigationMenuUv = MandorComponentConfig<typeof navigationMenuUv>;
