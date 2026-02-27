<template>
  <button
    type="button"
    :class="[
      'button',
      `button--${variant}`,
      `button--${size}`,
      { 'button--loading': loading },
      { 'button--disabled': disabled },
    ]"
    :disabled="disabled || loading"
    :aria-disabled="disabled"
    :aria-busy="loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="button__loader"></span>
    <span v-else class="button__content">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
  import { ButtonProps } from './types';

  withDefaults(defineProps<ButtonProps>(), {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
  });
</script>

<style lang="scss">
  @use './Button';
</style>
