// @unocss-include

import type { MandorComponentConfig } from '@mandor-core/typings';

import { uv } from 'unocss-variants';

export const popoverUv = uv({
  slots: {
    content: 'bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--akar-popover-content-transform-origin) focus:outline-none pointer-events-auto',
    arrow: 'fill-default',
  },
});

export type AuPopoverUv = MandorComponentConfig<typeof popoverUv>;
