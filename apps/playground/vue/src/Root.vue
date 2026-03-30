<script setup lang="ts">
  import { GrundtoneThemeProvider } from '@grundtone/vue';
</script>

<template>
  <GrundtoneThemeProvider mode="auto" persist-mode>
    <slot />
  </GrundtoneThemeProvider>
</template>
