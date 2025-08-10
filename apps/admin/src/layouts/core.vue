<script lang="ts" setup>
import { computed } from 'vue';

import { LayoutCore, LayoutUserDropdown } from '@mandor/layouts';

import { useAuthStore } from '~~/auth/auth.store';
import { useUserStore } from '~~/auth/user.store';

const userStore = useUserStore();
const authStore = useAuthStore();

const avatar = computed(() => {
  return userStore.userInfo?.avatar_url ?? '';
});

async function handleLogout() {
  await authStore.doLogout();
}
</script>

<template>
  <LayoutCore>
    <template #user-dropdown>
      <LayoutUserDropdown
        :avatar="avatar"
        :text="userStore.userInfo?.display_name ?? ''"
        :description="userStore.email ?? ''"
        @logout="handleLogout"
      />
    </template>
  </LayoutCore>
</template>
