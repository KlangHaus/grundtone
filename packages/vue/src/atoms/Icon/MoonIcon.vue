<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="['icon', 'moon-icon']"
    role="img"
    :aria-hidden="ariaHidden"
    :aria-label="ariaLabel || 'Moon'"
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
  import type { IconProps } from './types';

  withDefaults(defineProps<IconProps>(), {
    size: 16,
    ariaHidden: true,
  });
</script>

<script lang="ts">
  export default {
    name: 'MoonIcon',
  };
</script>

<style lang="scss" scoped>
  .moon-icon {
    transition: all 0.2s ease;

    &:hover {
      transform: rotate(-15deg);
    }
  }
</style>
