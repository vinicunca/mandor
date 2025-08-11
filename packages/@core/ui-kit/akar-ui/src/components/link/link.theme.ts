export const linkTheme = {
  base: 'focus-visible:outline-$pohon-brand-primary',
  variants: {
    active: {
      true: 'color-$pohon-brand-primary',
      false: [
        'color-$pohon-text-muted hover:color-$pohon-text',
        'transition-colors',
      ],
    },
    disabled: {
      true: 'cursor-not-allowed opacity-75',
    },
  },
};
