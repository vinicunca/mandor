<script lang="ts" setup>
// import { PSpinner } from '@mandor-core/akar-ui';

import { useContentSpinner } from './use-content-spinner';

const { spinning } = useContentSpinner();
</script>

<template>
  <PSpinner :spinning="spinning" />
</template>
