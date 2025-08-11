<script lang="ts" setup>
import type { MenuRecordRaw } from '@mandor/typings';

// import type { MenuItemPayload, MenuProps } from '@mandor-core/menu-ui';

// import { mandorMenu } from '@mandor-core/menu-ui';

interface Props {
  menus?: Array<MenuRecordRaw>;
}

const props = withDefaults(defineProps<Props>(), {
  accordion: true,
  menus: () => [],
});

const emits = defineEmits<{
  open: [MenuItemPayload];
  select: [{
    key: string;
    mode: MenuProps['mode'];
  }];
}>();

function handleMenuSelect(item: MenuItemPayload) {
  emits('select', {
    key: item.path,
    mode: props.mode,
  });
}

function handleMenuOpen(item: MenuItemPayload) {
  emits('open', item);
}
</script>

<template>
  <div>
    Layout Menu
  </div>
</template>
