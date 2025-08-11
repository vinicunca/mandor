<script lang="ts" setup>
import { ref } from 'vue';

// import {
//   PAvatar,
//   PButton,
//   PDialog,
//   PDropdownMenu,
//   PDropdownMenuContent,
//   PDropdownMenuItem,
//   PDropdownMenuLabel,
//   PDropdownMenuSeparator,
//   PDropdownMenuTrigger,
// } from '@mandor/pohon-ui';

interface Props {
  avatar?: string;
  description?: string;
  text?: string;
}

const {
  avatar = '',
  description = '',
  text = '',
} = defineProps<Props>();

const emits = defineEmits<{ logout: [] }>();

const openLogoutModal = ref(false);

function handleLogout() {
  openLogoutModal.value = true;
}
</script>

<template>
  <PDialog
    v-model:open="openLogoutModal"
    :title="$t('common.logout')"
    :description="$t('common.logoutConfirmation')"
    :pohon="{
      footer: 'justify-end',
    }"
  >
    <template #footer="{ close }">
      <PButton
        color="neutral"
        variant="outline"
        @click="close"
      >
        {{ $t('common.cancel') }}
      </PButton>

      <PButton @click="emits('logout')">
        {{ $t('common.submit') }}
      </PButton>
    </template>
  </PDialog>

  <PDropdownMenu>
    <PDropdownMenuTrigger>
      <div class="ml-1 mr-2 p-1.5 rounded-full cursor-pointer hover:bg-accent">
        <div class="flex-center hover:text-accent-foreground">
          <PAvatar
            :alt="text"
            :src="avatar"
            class="size-8"
            dot
          />
        </div>
      </div>
    </PDropdownMenuTrigger>
    <PDropdownMenuContent class="mr-2 p-0 pb-1 min-w-[240px]">
      <div>
        <PDropdownMenuLabel class="p-3 flex items-center">
          <PAvatar
            :alt="text"
            :src="avatar"
            class="size-12"
            dot
            dot-class="bottom-0 right-1 border-2 size-4 bg-green-500"
          />
          <div class="ml-2 w-full">
            <div
              v-if="text || $slots.tagText"
              class="text-sm text-foreground font-medium mb-1 flex items-center"
            >
              {{ text }}
            </div>
            <div class="text-xs text-muted-foreground font-normal">
              {{ description }}
            </div>
          </div>
        </PDropdownMenuLabel>
        <PDropdownMenuSeparator />
        <PDropdownMenuItem
          class="leading-8 mx-1 py-1 rounded-sm flex cursor-pointer items-center"
          @click="handleLogout"
        >
          <i class="i-lucide:log-out mr-2 size-4" />
          {{ $t('common.logout') }}
        </PDropdownMenuItem>
      </div>
    </PDropdownMenuContent>
  </PDropdownMenu>
</template>
