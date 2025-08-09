<script setup lang="ts">
const collapsed = defineModel<boolean>('collapsed');

function handleCollapsed() {
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <div
    class="absolute bottom-2 left-3 z-10 flex-center cursor-pointer rounded-sm bg-accent p-1 color-foreground/60 hover:bg-accent-hover hover:color-foreground"
    @click.stop="handleCollapsed"
  >
    <i
      :class="{
        'i-lucide:chevrons-right': collapsed,
        'i-lucide:chevrons-left': !collapsed,
      }"
      class="size-4"
    />
  </div>
</template>
