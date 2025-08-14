<script setup lang="ts">
import type { AuNavigationMenuItem } from '@mandor-core/akar-ui';

import { AuNavigationMenu } from '@mandor-core/akar-ui';

interface Props {
  menus?: Array<AuNavigationMenuItem>;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    menus: () => [],
  },
);
</script>

<template>
  <AuNavigationMenu
    orientation="vertical"
    :items="menus"
  />
</template>
