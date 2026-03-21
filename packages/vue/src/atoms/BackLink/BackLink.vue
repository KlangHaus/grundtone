<script setup lang="ts">
  import type { BackLinkProps } from './types';

  defineProps<BackLinkProps>();
</script>

<template>
  <a :href="href" class="back-link">{{ label }}</a>
</template>
