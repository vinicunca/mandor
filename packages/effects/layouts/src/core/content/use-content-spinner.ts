import { preferences } from '@mandor/preferences';
import { computed, ref } from 'vue';

import { useRouter } from 'vue-router';

export function useContentSpinner() {
  const spinning = ref(false);
  const startTime = ref(0);
  const router = useRouter();
  const minShowTime = 500;
  const enableLoading = computed(() => preferences.transition.loading);

  function onEnd() {
    if (!enableLoading.value) {
      return;
    }
    const processTime = performance.now() - startTime.value;
    if (processTime < minShowTime) {
      setTimeout(() => {
        spinning.value = false;
      }, minShowTime - processTime);
    } else {
      spinning.value = false;
    }
  }

  router.beforeEach((to) => {
    if (to.meta.loaded || !enableLoading.value || to.meta.iframeSrc) {
      return;
    }

    startTime.value = performance.now();
    spinning.value = true;
  });

  router.afterEach((to) => {
    if (to.meta.loaded || !enableLoading.value || to.meta.iframeSrc) {
      return;
    }

    onEnd();
  });

  return { spinning };
}
