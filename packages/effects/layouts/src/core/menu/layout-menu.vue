<script lang="ts">
import type { ArrayOrNested } from '@mandor/typings';
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<NavigationMenuItem>">
import { computed } from 'vue';

import { isArrayOfArray } from '@mandor/utils';

import { AuNavigationMenu } from '@mandor-core/akar-ui';

interface Props {

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
  <AuNavigationMenu />
</template>
