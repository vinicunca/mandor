<script lang="ts" setup>
import type { LayoutAuthToolbarType } from './layout.entity';
import { Logomandor } from '@mandor/icons';
import { preferences, usePreferences } from '@mandor/preferences';
import { LayoutCopyright } from '../core/copyright';
import DefaultSloganIcon from './default-slogan-icon.vue';

import LayoutAuthForm from './layout-auth-form.vue';
import LayoutAuthToolbar from './layout-auth-toolbar.vue';

interface Props {
  appName?: string;
  logo?: string;
  pageTitle?: string;
  pageDescription?: string;
  sloganImage?: string;
  toolbar?: boolean;
  copyright?: boolean;
  toolbarList?: Array<LayoutAuthToolbarType>;
  clickLogo?: () => void;
}

const {
  appName = '',
  pageTitle = '',
  pageDescription = '',
  sloganImage = '',
  logo = '',
  copyright = true,
  toolbar = true,
  toolbarList = ['theme'],
} = defineProps<Props>();

const { authPageLayout } = usePreferences();
</script>

<template>
  <div class="min-h-full flex flex-1 select-none overflow-x-hidden">
    <template v-if="toolbar">
      <slot name="toolbar">
        <LayoutAuthToolbar :toolbar-list="toolbarList" />
      </slot>
    </template>

    <!-- Left panel -->
    <LayoutAuthForm
      v-if="authPageLayout === 'panel-left'"
      class="min-h-full w-2/5 flex-1"
      transition-name="slide-left"
    >
      <template
        v-if="copyright"
        #copyright
      >
        <slot name="copyright">
          <LayoutCopyright
            v-if="preferences.copyright.enable"
            v-bind="preferences.copyright"
          />
        </slot>
      </template>
    </LayoutAuthForm>

    <slot name="logo">
      <!-- Header Logo and application name -->
      <div
        v-if="logo || appName"
        class="absolute left-0 top-0 z-10 flex flex-1"
      >
        <div
          class="ml-4 mt-4 flex flex-1 items-center color-foreground"
        >
          <Logomandor class="h-auto w-160px" />
        </div>
      </div>
    </slot>

    <!-- Main Slogan -->
    <div
      v-if="authPageLayout !== 'panel-center'"
      class="relative hidden w-0 flex-1 lg:block"
    >
      <div
        class="absolute inset-0 h-full w-full bg-background-deep dark:bg-[#070709]"
      >
        <div class="login-background absolute left-0 top-0 size-full" />
        <div class="mr-20 h-full flex-col-center enter--x">
          <template v-if="sloganImage">
            <img
              :alt="appName"
              :src="sloganImage"
              class="h-64 w-2/5 animate-float"
            >
          </template>

          <DefaultSloganIcon
            v-else
            :alt="appName"
            class="h-64 w-2/5 animate-float"
          />

          <div class="mt-6 text-2xl color-foreground font-sans">
            {{ pageTitle }}
          </div>

          <div class="dark:color-muted-foreground mt-2">
            {{ pageDescription }}
          </div>
        </div>
      </div>
    </div>

    <!-- Center Panel -->
    <div
      v-if="authPageLayout === 'panel-center'"
      class="relative w-full flex-center"
    >
      <div class="login-background absolute left-0 top-0 size-full" />

      <LayoutAuthForm
        class="shadow-float w-full rounded-3xl pb-20 shadow-primary/5 lg:w-1/2 md:w-2/3 xl:w-[36%] md:bg-background"
      >
        <template
          v-if="copyright"
          #copyright
        >
          <slot name="copyright">
            <LayoutCopyright
              v-if="preferences.copyright.enable"
              v-bind="preferences.copyright"
            />
          </slot>
        </template>
      </LayoutAuthForm>
    </div>

    <!-- Right panel -->
    <LayoutAuthForm
      v-if="authPageLayout === 'panel-right'"
      class="min-h-full w-[34%] flex-1"
    >
      <template
        v-if="copyright"
        #copyright
      >
        <slot name="copyright">
          <LayoutCopyright
            v-if="preferences.copyright.enable"
            v-bind="preferences.copyright"
          />
        </slot>
      </template>
    </LayoutAuthForm>
  </div>
</template>

<style scoped>
.login-background {
  background: linear-gradient(
    154deg,
    #07070915 30%,
    hsl(var(--mandor-color-primary) / 30%) 48%,
    #07070915 64%
  );
  filter: blur(100px);
}

.dark {
  .login-background {
    background: linear-gradient(
      154deg,
      #07070915 30%,
      hsl(var(--mandor-color-primary) / 20%) 48%,
      #07070915 64%
    );
    filter: blur(100px);
  }
}
</style>
