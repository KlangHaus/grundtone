<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { GTIcon } from '../../atoms/Icon';
  import type { AlertProps } from './types';

  const props = withDefaults(defineProps<AlertProps>(), {
    heading: undefined,
    icon: undefined,
    dismissible: false,
    ariaLabel: undefined,
  });

  const emit = defineEmits<{
    dismiss: [];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-alert`);

  const semanticRole = computed(() =>
    props.variant === 'error' ? 'alert' : 'status',
  );
</script>

<template>
  <div
    :class="[base, `${base}--${variant}`]"
    :role="semanticRole"
    :aria-label="ariaLabel"
  >
    <GTIcon v-if="icon" :name="icon" size="lg" :class="`${base}__icon`" />

    <div :class="`${base}__content`">
      <p v-if="heading" :class="`${base}__heading`">{{ heading }}</p>
      <div :class="`${base}__body`">
        <slot />
      </div>
      <div v-if="$slots.footer" :class="`${base}__footer`">
        <slot name="footer" />
      </div>
    </div>

    <button
      v-if="dismissible"
      type="button"
      :class="`${base}__close`"
      aria-label="Close"
      @click="emit('dismiss')"
    >
      <GTIcon name="close" size="xs" />
    </button>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-alert {
    display: flex;
    gap: tokens.space('md');
    padding: tokens.space('md');
    border-radius: tokens.radius('lg');
    border: 1px solid transparent;
    font-size: tokens.font-size('sm');
    line-height: tokens.line-height('base');

    &__icon {
      flex-shrink: 0;
      align-self: center;
    }

    &__content {
      flex: 1;
      min-width: 0;
    }

    &__heading {
      font-weight: tokens.font-weight('semibold');
      margin: 0 0 tokens.space('xs');
    }

    &__body {
      p {
        margin: 0;
      }
    }

    &__footer {
      margin-top: tokens.space('lg');
      padding-top: tokens.space('lg');
      border-top: 1px solid currentColor;
      opacity: 0.3;
    }

    &__close {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      opacity: 0.7;

      &:hover,
      &:focus-visible {
        opacity: 1;
      }
    }

    &--info {
      background: color-mix(in srgb, tokens.color('info') 12%, transparent);
      border-color: tokens.color('info');
      color: tokens.color('text');
    }

    &--success {
      background: color-mix(in srgb, tokens.color('success') 12%, transparent);
      border-color: tokens.color('success');
      color: tokens.color('text');
    }

    &--warning {
      background: color-mix(in srgb, tokens.color('warning') 12%, transparent);
      border-color: tokens.color('warning');
      color: tokens.color('text');
    }

    &--error {
      background: color-mix(in srgb, tokens.color('error') 12%, transparent);
      border-color: tokens.color('error');
      color: tokens.color('text');
    }
  }
</style>
