<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { DetailsProps } from './types';

  withDefaults(defineProps<DetailsProps>(), {
    variant: 'default',
    open: false,
    ariaLabel: undefined,
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-details`);
</script>

<template>
  <details
    :class="[base, `${base}--${variant}`]"
    :open="open || undefined"
    :aria-label="ariaLabel"
  >
    <summary :class="`${base}__summary`">
      <span :class="`${base}__arrow`" aria-hidden="true" />
      {{ summary }}
    </summary>
    <div :class="`${base}__content`">
      <div :class="`${base}__body`">
        <slot />
      </div>
    </div>
  </details>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-details {
    font-size: tokens.font-size('sm');
    line-height: tokens.line-height('base');
    color: tokens.color('text');

    &__summary {
      display: flex;
      align-items: center;
      gap: tokens.space('sm');
      cursor: pointer;
      font-weight: tokens.font-weight('medium');
      color: tokens.color('primary');
      list-style: none;
      user-select: none;

      &::-webkit-details-marker {
        display: none;
      }

      &::marker {
        content: none;
      }

      &:hover {
        color: tokens.color('primary-dark');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: 2px;
        border-radius: tokens.radius('sm');
      }
    }

    &__arrow {
      display: inline-flex;
      width: 1em;
      height: 1em;
      flex-shrink: 0;
      transition: transform tokens.duration('fast') tokens.ease('ease');

      &::before {
        content: '';
        display: block;
        width: 0.4em;
        height: 0.4em;
        margin: auto;
        border-right: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        transform: rotate(-45deg);
        transform-origin: center;
      }
    }

    &[open] > .#{$prefix}-details__summary .#{$prefix}-details__arrow::before {
      transform: rotate(45deg);
    }

    &__content {
      overflow: hidden;
    }

    &__body {
      padding-top: tokens.space('sm');
      color: tokens.color('text');

      > :first-child {
        margin-top: 0;
      }

      > :last-child {
        margin-bottom: 0;
      }
    }

    // Default — border-left accent
    &--default {
      .#{$prefix}-details__body {
        padding-left: tokens.space('md');
        border-left: 2px solid tokens.color('primary');
        margin-left: 2px;
      }
    }

    // Subtle — inline, minimal
    &--subtle {
      .#{$prefix}-details__summary {
        font-weight: tokens.font-weight('normal');
        font-size: tokens.font-size('sm');
        color: tokens.color('text-secondary');

        &:hover {
          color: tokens.color('text');
        }
      }

      .#{$prefix}-details__body {
        color: tokens.color('text-secondary');
      }
    }

    // Card — boxed, standalone
    &--card {
      background: tokens.color('surface-alt');
      border-radius: tokens.radius('xl');
      padding: tokens.space('md') tokens.space('lg');

      .#{$prefix}-details__summary {
        color: tokens.color('text');
        font-weight: tokens.font-weight('semibold');
      }

      .#{$prefix}-details__body {
        padding-left: 0;
        border-left: none;
      }
    }
  }
</style>
