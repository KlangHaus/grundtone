<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { GTIcon } from '../../atoms/Icon';
  import type { ToastProps } from './types';

  const props = withDefaults(defineProps<ToastProps>(), {
    variant: 'default',
    description: undefined,
    icon: undefined,
    duration: 5000,
    dismissible: true,
    rich: false,
    index: 0,
  });

  const emit = defineEmits<{
    dismiss: [];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-toast`);

  const ariaLive = computed(() =>
    props.variant === 'error' || props.variant === 'warning'
      ? 'assertive'
      : 'polite',
  );

  const role = computed(() =>
    props.variant === 'error' || props.variant === 'warning'
      ? 'alert'
      : 'status',
  );

  function onCountdownEnd() {
    emit('dismiss');
  }
</script>

<template>
  <div
    :class="[base, `${base}--${variant}`, { [`${base}--rich`]: rich }]"
    :data-index="index"
    :role="role"
    :aria-live="ariaLive"
    aria-atomic="true"
  >
    <GTIcon v-if="icon" :name="icon" size="sm" :class="`${base}__icon`" />

    <div :class="`${base}__content`">
      <p :class="`${base}__message`">{{ message }}</p>
      <p v-if="description" :class="`${base}__description`">
        {{ description }}
      </p>
    </div>

    <button
      v-if="dismissible"
      :class="`${base}__close`"
      type="button"
      aria-label="Luk"
      @click="emit('dismiss')"
    >
      &times;
    </button>

    <div
      v-if="duration > 0"
      :class="`${base}__countdown`"
      :style="{ animationDuration: `${duration}ms` }"
      @animationend="onCountdownEnd"
    />
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  @keyframes gt-toast-countdown {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  @keyframes gt-toast-enter {
    from {
      opacity: 0;
      transform: translateY(100%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes gt-toast-exit {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(100%) scale(0.95);
    }
  }

  .#{$prefix}-toast {
    position: relative;
    pointer-events: auto;
    min-width: 356px;
    max-width: 420px;
    padding: tokens.space('md') tokens.space('lg');
    background: tokens.color('surface');
    border: 1px solid tokens.color('border-medium');
    border-radius: tokens.radius('lg');
    box-shadow: tokens.shadow('lg');
    display: flex;
    align-items: center;
    gap: tokens.space('sm');
    overflow: hidden;
    transition:
      transform tokens.duration('fast') tokens.ease('ease'),
      opacity tokens.duration('fast') tokens.ease('ease');

    &--entering {
      animation: gt-toast-enter tokens.duration('fast') tokens.ease('ease-out');
    }

    &--leaving {
      animation: gt-toast-exit tokens.duration('fast') ease-in forwards;
    }

    &[data-index='1'] {
      transform: scale(0.95) translateY(-0.5rem);
      opacity: 0.8;
    }

    &[data-index='2'] {
      transform: scale(0.9) translateY(-1rem);
      opacity: 0.6;
    }

    &__icon {
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    &__content {
      flex: 1;
      min-width: 0;
    }

    &__message {
      font-size: tokens.font-size('sm');
      font-weight: tokens.font-weight('medium');
      color: tokens.color('text');
      line-height: tokens.line-height('normal');
    }

    &__description {
      font-size: tokens.font-size('xs');
      color: tokens.color('text-secondary');
      margin-top: tokens.space('xs');
      line-height: tokens.line-height('normal');
    }

    &__close {
      position: absolute;
      top: tokens.space('sm');
      right: tokens.space('sm');
      background: none;
      border: none;
      cursor: pointer;
      color: tokens.color('text-secondary');
      font-size: tokens.font-size('sm');
      line-height: 1;
      padding: tokens.space('xs');
      border-radius: tokens.radius('sm');
      opacity: 0;
      transition: opacity tokens.duration('fast') tokens.ease('ease');

      &:hover {
        color: tokens.color('text');
      }

      &:focus-visible {
        opacity: 1;
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: 2px;
      }
    }

    &:hover &__close {
      opacity: 1;
    }

    &__countdown {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      border-radius: 0 0 tokens.radius('lg') tokens.radius('lg');
      animation: gt-toast-countdown linear forwards;
    }

    &:hover &__countdown,
    &:focus-within &__countdown {
      animation-play-state: paused;
    }

    &--success &__countdown {
      background: tokens.color('success');
    }

    &--warning &__countdown {
      background: tokens.color('warning');
    }

    &--error &__countdown {
      background: tokens.color('error');
    }

    &--info &__countdown {
      background: tokens.color('info');
    }

    &--default &__countdown {
      background: tokens.color('text-secondary');
    }

    &--rich.#{$prefix}-toast--success {
      background: color-mix(
        in srgb,
        tokens.color('success') 12%,
        tokens.color('surface')
      );
      border-color: color-mix(
        in srgb,
        tokens.color('success') 25%,
        transparent
      );
    }

    &--rich.#{$prefix}-toast--warning {
      background: color-mix(
        in srgb,
        tokens.color('warning') 12%,
        tokens.color('surface')
      );
      border-color: color-mix(
        in srgb,
        tokens.color('warning') 25%,
        transparent
      );
    }

    &--rich.#{$prefix}-toast--error {
      background: color-mix(
        in srgb,
        tokens.color('error') 12%,
        tokens.color('surface')
      );
      border-color: color-mix(in srgb, tokens.color('error') 25%, transparent);
    }

    &--rich.#{$prefix}-toast--info {
      background: color-mix(
        in srgb,
        tokens.color('info') 12%,
        tokens.color('surface')
      );
      border-color: color-mix(in srgb, tokens.color('info') 25%, transparent);
    }

    @media (prefers-reduced-motion: reduce) {
      &--entering,
      &--leaving {
        animation: none;
      }

      .#{$prefix}-toast__countdown {
        animation: none;
        width: 100%;
      }
    }

    @media (max-width: 639px) {
      min-width: auto;
      max-width: none;
      width: calc(100vw - 2 * tokens.space('lg'));
    }
  }
</style>
