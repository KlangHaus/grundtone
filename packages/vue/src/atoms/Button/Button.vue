<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { ButtonProps } from './types';

  const props = withDefaults(defineProps<ButtonProps>(), {
    variant: 'primary',
    size: 'md',
    rounded: undefined,
    as: 'button',
    disabled: false,
    loading: false,
    block: false,
  });

  const emit = defineEmits<{
    click: [event: MouseEvent];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-btn`);

  function handleClick(event: MouseEvent) {
    if (props.disabled || props.loading) return;
    emit('click', event);
  }
</script>

<template>
  <component
    :is="as"
    :class="[
      base,
      `${base}--${variant}`,
      `${base}--${size}`,
      {
        [`${base}--block`]: block,
        [`${base}--loading`]: loading,
        [`${base}--disabled`]: disabled,
      },
    ]"
    :style="rounded ? { borderRadius: `var(--radius-${rounded})` } : undefined"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    @click="handleClick"
  >
    <span v-if="loading" :class="`${base}__spinner`" aria-hidden="true" />
    <span
      :class="[`${base}__content`, { [`${base}__content--hidden`]: loading }]"
    >
      <slot />
    </span>
  </component>
</template>

<style lang="scss">
  // CSS class prefix — matches getClassPrefix() default from @grundtone/core
  $prefix: 'gt' !default;

  .#{$prefix}-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: tokens.space('xs');
    border: 1px solid transparent;
    border-radius: tokens.radius('md');
    font-family: tokens.font-family('base');
    font-weight: tokens.font-weight('medium');
    line-height: tokens.line-height('tight');
    cursor: pointer;
    text-decoration: none;
    transition:
      background-color tokens.duration('fast') tokens.ease('ease-out'),
      border-color tokens.duration('fast') tokens.ease('ease-out'),
      color tokens.duration('fast') tokens.ease('ease-out'),
      box-shadow tokens.duration('fast') tokens.ease('ease-out');

    // Sizes
    &--sm {
      font-size: tokens.font-size('sm');
      padding: tokens.space('xs') tokens.space('sm');
    }

    &--md {
      font-size: tokens.font-size('base');
      padding: tokens.space('sm') tokens.space('md');
    }

    &--lg {
      font-size: tokens.font-size('lg');
      padding: tokens.space('md') tokens.space('xl');
    }

    // Variants
    &--primary {
      background-color: tokens.color('primary');
      color: tokens.color('on-primary');
      border-color: tokens.color('primary');

      &:hover:not(:disabled) {
        background-color: tokens.color('primary-dark');
        border-color: tokens.color('primary-dark');
      }

      &:active:not(:disabled) {
        background-color: tokens.color('primary-dark');
      }
    }

    &--secondary {
      background-color: tokens.color('secondary');
      color: tokens.color('text');
      border-color: tokens.color('secondary');

      &:hover:not(:disabled) {
        background-color: tokens.color('secondary-dark');
        border-color: tokens.color('secondary-dark');
      }
    }

    &--outlined {
      background-color: transparent;
      color: tokens.color('primary');
      border-color: tokens.color('border-medium');

      &:hover:not(:disabled) {
        background-color: tokens.color('primary');
        color: tokens.color('on-primary');
        border-color: tokens.color('primary');
      }
    }

    &--negative {
      background-color: tokens.color('error');
      color: tokens.color('on-primary');
      border-color: tokens.color('error');

      &:hover:not(:disabled) {
        background-color: tokens.color('error-dark');
        border-color: tokens.color('error-dark');
      }
    }

    &--unstyled {
      background: none;
      border: none;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: pointer;
    }

    // States
    &:focus-visible {
      @include tokens.focus;
    }

    &--disabled,
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--block {
      display: flex;
      width: 100%;
    }

    &--loading {
      position: relative;
      cursor: wait;
    }

    // Children
    &__content {
      display: inline-flex;
      align-items: center;
      gap: tokens.space('xs');

      &--hidden {
        visibility: hidden;
      }
    }

    &__spinner {
      position: absolute;
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: tokens.radius('full');
      animation: #{$prefix}-btn-spin 0.6s linear infinite;
    }
  }

  // Prevent browser/framework anchor styles from overriding button variant colors
  a.#{$prefix}-btn[class] {
    text-decoration: none;
  }

  a.#{$prefix}-btn--primary {
    color: tokens.color('on-primary');
  }

  a.#{$prefix}-btn--secondary {
    color: tokens.color('text');
  }

  a.#{$prefix}-btn--outlined {
    color: tokens.color('primary');

    &:hover {
      color: tokens.color('on-primary');
    }
  }

  a.#{$prefix}-btn--negative {
    color: tokens.color('on-primary');
  }

  @keyframes #{$prefix}-btn-spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
