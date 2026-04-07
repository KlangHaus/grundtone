<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { GTIcon } from '../Icon';
  import type { BadgeProps } from './types';

  withDefaults(defineProps<BadgeProps>(), {
    variant: 'neutral',
    size: 'md',
    icon: undefined,
    dot: false,
    ariaLabel: undefined,
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-badge`);
</script>

<template>
  <span
    :class="[base, `${base}--${variant}`, `${base}--${size}`]"
    :aria-label="ariaLabel"
  >
    <span v-if="dot" :class="`${base}__dot`" aria-hidden="true" />
    <GTIcon v-if="icon" :name="icon" size="xs" :class="`${base}__icon`" />
    <slot />
  </span>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-badge {
    display: inline-flex;
    align-items: center;
    gap: tokens.space('xs');
    border-radius: tokens.radius('sm');
    font-weight: tokens.font-weight('semibold');
    letter-spacing: 0.025em;
    white-space: nowrap;
    vertical-align: middle;

    &--sm {
      padding: 0.0625rem tokens.space('sm');
      font-size: tokens.font-size('xs');
      line-height: tokens.line-height('normal');
    }

    &--md {
      padding: tokens.space('xs') tokens.space('md');
      font-size: tokens.font-size('xs');
      line-height: tokens.line-height('normal');
    }

    &__dot {
      width: 0.375rem;
      height: 0.375rem;
      border-radius: tokens.radius('full');
      flex-shrink: 0;
    }

    &__icon {
      flex-shrink: 0;
    }

    &--neutral {
      background: tokens.color('surface-alt');
      color: tokens.color('text-secondary');

      .#{$prefix}-badge__dot {
        background: tokens.color('text-tertiary');
      }
    }

    &--info {
      background: color-mix(in srgb, tokens.color('info') 14%, transparent);
      color: tokens.color('info');

      .#{$prefix}-badge__dot {
        background: tokens.color('info');
      }
    }

    &--success {
      background: color-mix(in srgb, tokens.color('success') 14%, transparent);
      color: tokens.color('success');

      .#{$prefix}-badge__dot {
        background: tokens.color('success');
      }
    }

    &--warning {
      background: color-mix(in srgb, tokens.color('warning') 14%, transparent);
      color: tokens.color('warning');

      .#{$prefix}-badge__dot {
        background: tokens.color('warning');
      }
    }

    &--error {
      background: color-mix(in srgb, tokens.color('error') 14%, transparent);
      color: tokens.color('error');

      .#{$prefix}-badge__dot {
        background: tokens.color('error');
      }
    }
  }
</style>
