<script lang="ts" setup>
import type { MenuRecordRaw } from '@mandor/typings';

// import type { MenuProps } from '@mandor-core/menu-ui';
import { useRoute } from 'vue-router';

import { useNavigation } from './use-navigation';

interface Props {
  collapse?: boolean;
  menus?: Array<MenuRecordRaw>;
}

withDefaults(
  defineProps<Props>(),
  {
    accordion: true,
    menus: () => [],
  },
);

const route = useRoute();
const { navigation } = useNavigation();

async function handleSelect(key: string) {
  await navigation(key);
}
</script>

<template>
  <!-- <mandorMenu
    :accordion="accordion"
    :collapse="collapse"
    :default-active="route.meta?.activePath || route.path"
    :menus="menus"
    :rounded="rounded"
    :theme="theme"
    mode="vertical"
    @select="handleSelect"
  /> -->

  <div>
    extra menu
  </div>
</template>
