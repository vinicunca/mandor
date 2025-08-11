<script lang="ts" setup>
import type { MenuRecordRaw } from '@mandor/typings';

// import type { BaseMenuProps } from '@mandor-core/menu-ui';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

import { findMenuByPath } from '@mandor/utils';

// import { BaseMenu } from '@mandor-core/menu-ui';

// interface Props extends BaseMenuProps {}

const props = defineProps();

const emits = defineEmits<{
  defaultSelect: [{ menu: MenuRecordRaw; rootMenu?: MenuRecordRaw }];
  enter: [MenuRecordRaw];
  select: [MenuRecordRaw];
}>();

const route = useRoute();

onBeforeMount(() => {
  const menu = findMenuByPath({
    list: props.menus || [],
    path: route.path,
  });

  if (menu) {
    const rootMenu = (props.menus || []).find(
      (item) => item.path === menu.parents?.[0],
    );

    emits('defaultSelect', { menu, rootMenu });
  }
});
</script>

<template>
  <BaseMenu
    :active-path="activePath"
    :collapse="collapse"
    :menus="menus"
    :rounded="rounded"
    :theme="theme"
    @enter="(menu) => emits('enter', menu)"
    @select="(menu) => emits('select', menu)"
  />
</template>
