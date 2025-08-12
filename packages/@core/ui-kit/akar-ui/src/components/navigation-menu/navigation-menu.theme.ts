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
});

export type AuNavigationMenuUv = MandorComponentConfig<typeof navigationMenuUv>;
