<script lang="ts" setup>
interface Props {
  companyName?: string;
  companySiteLink?: string;
  date: string;
}

const {
  companyName = 'mandor',
  companySiteLink,
} = defineProps<Props>();
</script>

<template>
  <div class="flex-center">
    <!-- Copyright Text -->
    Copyright © {{ new Date().getFullYear() }}

    <!-- Company Link -->
    <a
      v-if="companyName"
      :href="companySiteLink || 'javascript:void(0)'"
      class="mx-1 hover:color-primary-hover"
      target="_blank"
    >
      {{ companyName }}
    </a>
  </div>
</template>
