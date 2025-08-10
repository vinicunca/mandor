<script setup lang="ts">
const collapsed = defineModel<boolean>('collapsed');

function handleCollapsed() {
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <div
    class="color-foreground/60 p-1 rounded-sm bg-accent flex-center cursor-pointer bottom-2 left-3 absolute z-10 hover:color-foreground hover:bg-accent-hover"
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
