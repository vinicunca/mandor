<script setup lang="ts">
const expandOnHover = defineModel<boolean>('expandOnHover');

function toggleFixed() {
  expandOnHover.value = !expandOnHover.value;
}
</script>

<template>
  <div
    class="absolute bottom-2 right-3 z-10 flex-center cursor-pointer rounded-sm bg-accent p-[5px] color-foreground/60 transition-all-300 hover:bg-accent-hover hover:color-foreground"
    @click="toggleFixed"
  >
    <i
      :class="{
        'i-lucide:pin': expandOnHover,
        'i-lucide:pin-off': !expandOnHover,
      }"
      class="size-3.5"
    />
  </div>
</template>
