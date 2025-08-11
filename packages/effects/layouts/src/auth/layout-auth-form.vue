<script lang="ts" setup>
import { LOGIN_ROUTE_NAME } from '@mandor/constants';
</script>

<template>
  <div
    class="relative flex-col-center bg-background px-6 py-10 lg:(flex-initial px-8) dark:bg-background-deep"
  >
    <slot />
    <!-- Router View with Transition and KeepAlive -->
    <RouterView v-slot="{ Component, route }">
      <Transition
        appear
        mode="out-in"
        name="slide-right"
      >
        <KeepAlive :include="[LOGIN_ROUTE_NAME]">
          <component
            :is="Component"
            :key="route.fullPath"
            class="mt-6 w-full enter-x sm:mx-auto md:max-w-md"
          />
        </KeepAlive>
      </Transition>
    </RouterView>

    <!-- Footer Copyright -->
    <div
      class="color-muted-foreground absolute bottom-3 flex text-center text-xs"
    >
      <slot name="copyright" />
    </div>
  </div>
</template>
