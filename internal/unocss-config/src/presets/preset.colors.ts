import type { Theme } from 'unocss/preset-wind4';

export const themeColors: Theme['colors'] = {
  accent: {
    DEFAULT: 'hsl(var(--mandor-color-accent))',
    foreground: 'hsl(var(--mandor-color-accent-foreground))',
    hover: 'hsl(var(--mandor-color-accent-hover))',
    lighter: 'has(val(--mandor-color-accent-lighter))',
  },

  background: {
    deep: 'hsl(var(--mandor-color-background-deep))',
    DEFAULT: 'hsl(var(--mandor-color-background))',
  },

  border: {
    DEFAULT: 'hsl(var(--mandor-color-border))',
  },

  card: {
    DEFAULT: 'hsl(var(--mandor-color-card))',
    foreground: 'hsl(var(--mandor-color-card-foreground))',
  },

  foreground: {
    DEFAULT: 'hsl(var(--mandor-color-foreground))',
  },

  header: {
    DEFAULT: 'hsl(var(--mandor-color-header))',
  },

  input: {
    background: 'hsl(var(--mandor-color-input-background))',
    DEFAULT: 'hsl(var(--mandor-color-input))',
  },

  muted: {
    DEFAULT: 'hsl(var(--mandor-color-muted))',
    foreground: 'hsl(var(--mandor-color-muted-foreground))',
  },

  popover: {
    DEFAULT: 'hsl(var(--mandor-color-popover))',
    foreground: 'hsl(var(--mandor-color-popover-foreground))',
  },

  overlay: {
    content: 'hsl(var(--mandor-color-overlay-content))',
    DEFAULT: 'hsl(var(--mandor-color-overlay))',
  },

  sidebar: {
    deep: 'hsl(var(--mandor-color-sidebar-deep))',
    DEFAULT: 'hsl(var(--mandor-color-sidebar))',
  },

  ring: 'hsl(var(--mandor-color-ring))',
};
