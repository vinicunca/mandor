<script setup lang="ts">
interface Props {
  /**
   * Whether to collapse the text
   */
  collapsed?: boolean;
  /**
   * Logo redirect URL
   */
  href?: string;
  /**
   * Logo icon
   */
  src?: string;
  /**
   * Logo text
   */
  text: string;
  /**
   * Logo theme
   */
  theme?: string;
}

defineOptions({
  name: 'KuliLogo',
});

const {
  collapsed = false,
  href = '#',
  theme = 'light',
} = defineProps<Props>();
</script>

<template>
  <div
    :class="theme"
    class="text-lg flex h-full items-center"
  >
    <a
      :class="$attrs.class"
      :href="href"
      class="text-lg leading-normal px-3 flex gap-2 h-full transition-all-500 items-center overflow-hidden"
    >
      <span
        v-if="!collapsed"
        class="color-foreground font-semibold text-nowrap truncate"
      >
        {{ text }}
      </span>
    </a>
  </div>
</template>
