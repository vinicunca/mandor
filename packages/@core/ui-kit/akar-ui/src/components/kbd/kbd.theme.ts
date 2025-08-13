// @unocss-include
import type { MandorComponentConfig } from '@mandor-core/typings';

import { uv } from 'unocss-variants';

export const kbdUv = uv({
  base: 'inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans',
  variants: {
    color: {
      neutral: '',
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
    },
    size: {
      sm: 'h-4 min-w-[16px] text-[10px]',
      md: 'h-5 min-w-[20px] text-[11px]',
      lg: 'h-6 min-w-[24px] text-[12px]',
    },
  },
});

export type AuKbdUv = MandorComponentConfig<typeof kbdUv>;
