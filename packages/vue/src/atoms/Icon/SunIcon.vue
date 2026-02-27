<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="['icon', 'sun-icon']"
    role="img"
    :aria-hidden="ariaHidden"
    :aria-label="ariaLabel || 'Sun'"
  >
    <circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      stroke-width="2"
      fill="currentColor"
    />
    <path
      d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
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
    name: 'SunIcon',
  };
</script>

<style lang="scss" scoped>
  .sun-icon {
    transition: all 0.2s ease;

    &:hover {
      transform: rotate(45deg);
    }
  }
</style>
