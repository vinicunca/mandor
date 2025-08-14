<script lang="ts" setup>
import { computed, useSlots } from 'vue';

import { useRefresh } from '@mandor/composables';
import { preferences, usePreferences } from '@mandor/preferences';

// import { PButtonIcon, PFullScreen } from '@mandor-core/akar-ui';
import {
  LayoutWidgetThemeToggle,
} from '../../widgets';

interface Props {
  theme?: string;
}

withDefaults(
  defineProps<Props>(),
  {
    theme: 'light',
  },
);

const emits = defineEmits<{ clearPreferencesAndLogout: [] }>();

const REFERENCE_VALUE = 50;

const { preferencesButtonPosition } = usePreferences();
const slots = useSlots();
const { refresh } = useRefresh();

const rightSlots = computed(() => {
  const list = [{ index: REFERENCE_VALUE + 100, name: 'user-dropdown' }];
  if (preferences.widget.globalSearch) {
    list.push({
      index: REFERENCE_VALUE,
      name: 'global-search',
    });
  }

  if (preferencesButtonPosition.value.header) {
    list.push({
      index: REFERENCE_VALUE + 10,
      name: 'preferences',
    });
  }
  if (preferences.widget.themeToggle) {
    list.push({
      index: REFERENCE_VALUE + 20,
      name: 'theme-toggle',
    });
  }
  if (preferences.widget.languageToggle) {
    list.push({
      index: REFERENCE_VALUE + 30,
      name: 'language-toggle',
    });
  }
  if (preferences.widget.fullscreen) {
    list.push({
      index: REFERENCE_VALUE + 40,
      name: 'fullscreen',
    });
  }
  if (preferences.widget.notification) {
    list.push({
      index: REFERENCE_VALUE + 50,
      name: 'notification',
    });
  }

  Object.keys(slots).forEach((key) => {
    const name = key.split('-');
    if (key.startsWith('header-right')) {
      list.push({ index: Number(name[2]), name: key });
    }
  });
  return list.sort((a, b) => a.index - b.index);
});

const leftSlots = computed(() => {
  const list: Array<{ index: number; name: string }> = [];

  if (preferences.widget.refresh) {
    list.push({
      index: 0,
      name: 'refresh',
    });
  }

  Object.keys(slots).forEach((key) => {
    const name = key.split('-');
    if (key.startsWith('header-left')) {
      list.push({ index: Number(name[2]), name: key });
    }
  });
  return list.sort((a, b) => a.index - b.index);
});

function clearPreferencesAndLogout() {
  emits('clearPreferencesAndLogout');
}
</script>

<template>
  <template
    v-for="slot in leftSlots.filter((item) => item.index < REFERENCE_VALUE)"
    :key="slot.name"
  >
    <slot :name="slot.name">
      <template v-if="slot.name === 'refresh'">
        <!-- <PButtonIcon
          class="my-0 mr-1 rounded-md"
          icon="i-lucide:rotate-cw"
          @click="refresh"
        /> -->
      </template>
    </slot>
  </template>

  <div class="flex-center hidden lg:block">
    <slot name="breadcrumb" />
  </div>

  <template
    v-for="slot in leftSlots.filter((item) => item.index > REFERENCE_VALUE)"
    :key="slot.name"
  >
    <slot :name="slot.name" />
  </template>

  <div
    :class="`menu-align-${preferences.header.menuAlign}`"
    class="flex flex-1 h-full min-w-0 items-center"
  >
    <slot name="menu" />
  </div>

  <div class="flex flex-shrink-0 h-full min-w-0 items-center">
    <template
      v-for="slot in rightSlots"
      :key="slot.name"
    >
      <slot :name="slot.name">
        <template v-if="slot.name === 'global-search'">
          <!-- <GlobalSearch
            :enable-shortcut-key="globalSearchShortcutKey"
            :menus="accessStore.accessMenus"
            class="mr-1 sm:mr-4"
          /> -->
        </template>

        <template v-else-if="slot.name === 'preferences'">
          <!-- <PreferencesButton
            class="mr-1"
            @clear-preferences-and-logout="clearPreferencesAndLogout"
          /> -->
        </template>

        <template v-else-if="slot.name === 'theme-toggle'">
          <LayoutWidgetThemeToggle class="mr-1 mt-[2px]" />
        </template>

        <template v-else-if="slot.name === 'language-toggle'">
          <!-- <LanguageToggle class="mr-1" /> -->
        </template>

        <template v-else-if="slot.name === 'fullscreen'">
          <!-- <PFullScreen class="mr-1" /> -->
        </template>
      </slot>
    </template>
  </div>
</template>

<style lang="postcss" scoped>
.menu-align-start {
  --menu-align: start;
}

.menu-align-center {
  --menu-align: center;
}

.menu-align-end {
  --menu-align: end;
}
</style>
