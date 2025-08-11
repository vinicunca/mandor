<script lang="ts">
import type { AConfigProviderProps, ATooltipProviderProps } from 'akar';

// import type { PToasterProps } from '../toast/p-toaster.vue';

export interface AuAppProps extends Omit<AConfigProviderProps, 'useId'> {
  tooltip?: ATooltipProviderProps;
  // toaster?: PToasterProps | null;
  portal?: string | HTMLElement;
}

export interface AuAppSlots {
  default: (props?: object) => any;
}
</script>

<script lang="ts" setup>
import { provide, toRef } from 'vue';

import { reactivePick } from '@vueuse/core';
import { AConfigProvider, ATooltipProvider, useForwardProps } from 'akar';

// import { portalTargetInjectionKey } from '../../composables/use-portal';
// import POverlayProvider from '../overlay/p-overlay-provider.vue';
// import PToaster from '../toast/p-toaster.vue';

const props = withDefaults(
  defineProps<AuAppProps>(),
  {
    portal: 'body',
  },
);

defineSlots<AuAppSlots>();

const configProviderProps = useForwardProps(
  reactivePick(props, 'scrollBody'),
);
const tooltipProps = toRef(() => props.tooltip);
// const toasterProps = toRef(() => props.toaster);

const portal = toRef(() => props.portal);
// provide(portalTargetInjectionKey, portal);
</script>

<template>
  <AConfigProvider
    v-bind="configProviderProps"
  >
    <slot />
    <!-- <ATooltipProvider v-bind="tooltipProps">
      <PToaster
        v-if="props.toaster !== null"
        v-bind="toasterProps"
      >
        <slot />
      </PToaster>

      <slot v-else />

      <POverlayProvider />
    </ATooltipProvider> -->
  </AConfigProvider>
</template>
