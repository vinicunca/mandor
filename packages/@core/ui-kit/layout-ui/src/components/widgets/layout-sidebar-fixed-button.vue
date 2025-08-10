<script setup lang="ts">
const expandOnHover = defineModel<boolean>('expandOnHover');

function toggleFixed() {
  expandOnHover.value = !expandOnHover.value;
}
</script>

<template>
  <div
    class="color-foreground/60 p-[5px] rounded-sm bg-accent flex-center cursor-pointer transition-all-300 bottom-2 right-3 absolute z-10 hover:color-foreground hover:bg-accent-hover"
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
