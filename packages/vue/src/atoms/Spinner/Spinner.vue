<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { SpinnerProps } from './types';

  withDefaults(defineProps<SpinnerProps>(), {
    size: 'sm',
    variant: 'dark',
    text: undefined,
    backdrop: false,
    ariaLabel: 'Indlæser…',
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-spinner`);
</script>

<template>
  <div
    :class="[
      base,
      `${base}--${size}`,
      `${base}--${variant}`,
      { [`${base}--backdrop`]: backdrop },
    ]"
    role="status"
    aria-live="polite"
  >
    <span :class="`${base}__circle`" aria-hidden="true" />
    <span v-if="text" :class="`${base}__text`">{{ text }}</span>
    <span v-else class="sr-only">{{ ariaLabel }}</span>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  @keyframes #{$prefix}-spinner-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .#{$prefix}-spinner {
    display: inline-flex;
    align-items: center;
    gap: tokens.space('sm');

    &__circle {
      display: block;
      border-radius: tokens.radius('full');
      border-style: solid;
      border-color: currentColor;
      border-right-color: transparent;
      animation: #{$prefix}-spinner-spin 0.75s linear infinite;
    }

    &__text {
      font-size: tokens.font-size('sm');
      color: tokens.color('text-secondary');
    }

    // Sizes
    &--sm .#{$prefix}-spinner__circle {
      width: 1em;
      height: 1em;
      border-width: 0.15em;
    }

    &--lg {
      flex-direction: column;

      .#{$prefix}-spinner__circle {
        width: 3rem;
        height: 3rem;
        border-width: 0.25rem;
      }
    }

    // Variants
    &--dark .#{$prefix}-spinner__circle {
      border-color: tokens.color('text-secondary');
      border-right-color: transparent;
    }

    &--light .#{$prefix}-spinner__circle {
      border-color: tokens.color('background');
      border-right-color: transparent;
    }

    // Backdrop
    &--backdrop {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: tokens.space('xl');
      background: color-mix(
        in srgb,
        #{tokens.color('background')} 75%,
        transparent
      );
      z-index: tokens.z-index('dropdown');
    }
  }
</style>
