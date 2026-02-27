<template>
  <button
    type="button"
    :class="[
      'grundtone-button',
      `grundtone-button--${variant}`,
      `grundtone-button--${size}`,
      { 'grundtone-button--loading': loading },
      { 'grundtone-button--disabled': disabled },
    ]"
    :disabled="disabled || loading"
    :aria-disabled="disabled"
    :aria-busy="loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="grundtone-button__loader"></span>
    <span v-else class="grundtone-button__content">
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
