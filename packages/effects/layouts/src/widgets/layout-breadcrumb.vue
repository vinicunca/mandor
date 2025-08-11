<script lang="ts" setup>
// import type { IBreadcrumb } from '@mandor/pohon-ui';
import type { BreadcrumbStyleType } from '@mandor/typings';

import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { $t } from '@mandor/locales';
// import { PBreadcrumbView } from '@mandor/pohon-ui';

interface Props {
  hideWhenOnlyOne?: boolean;
  showHome?: boolean;
  showIcon?: boolean;
  type?: BreadcrumbStyleType;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    showHome: false,
    showIcon: false,
    type: 'normal',
  },
);

const route = useRoute();
const router = useRouter();

const breadcrumbs = computed((): Array<IBreadcrumb> => {
  const matched = route.matched;

  const resultBreadcrumb: Array<IBreadcrumb> = [];

  for (const match of matched) {
    const { meta, path } = match;
    const { hideChildrenInMenu, hideInBreadcrumb, icon, name, title }
      = meta || {};
    if (hideInBreadcrumb || hideChildrenInMenu || !path) {
      continue;
    }

    resultBreadcrumb.push({
      icon,
      path: path || route.path,
      title: title ? $t((title || name) as string) : '',
    });
  }

  if (props.showHome) {
    resultBreadcrumb.unshift({
      icon: 'mdi:home-outline',
      isHome: true,
      path: '/',
    });
  }

  if (props.hideWhenOnlyOne && resultBreadcrumb.length === 1) {
    return [];
  }

  return resultBreadcrumb;
});

function handleSelect(path: string) {
  router.push(path);
}
</script>

<template>
  <PBreadcrumbView
    :breadcrumbs="breadcrumbs"
    :show-icon="showIcon"
    :style-type="type"
    class="ml-2"
    @select="handleSelect"
  />
</template>
