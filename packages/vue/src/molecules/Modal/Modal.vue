<script setup lang="ts">
  import { computed, watch, onBeforeUnmount, ref } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import { createFocusTrap, createScrollLock } from '@grundtone/utils';
  import type { FocusTrap } from '@grundtone/utils';
  import type { ModalProps } from './types';

  const props = withDefaults(defineProps<ModalProps>(), {
    persistent: false,
    transition: 'scale',
    ariaLabel: undefined,
  });

  const emit = defineEmits<{
    'update:open': [value: boolean];
    close: [];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-modal`);
  const titleId = computed(() => generateId('modal-title'));

  const dialogRef = ref<HTMLElement | null>(null);
  let focusTrap: FocusTrap | null = null;
  const scrollLock = createScrollLock();
  let previousFocus: HTMLElement | null = null;

  function handleClose() {
    if (props.persistent) return;
    emit('update:open', false);
    emit('close');
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) handleClose();
  }

  function handleKeydown(e: Event) {
    if ((e as { key?: string }).key === 'Escape') handleClose();
  }

  watch(
    () => props.open,
    isOpen => {
      if (isOpen) {
        previousFocus = document.activeElement as HTMLElement;
        scrollLock.lock();

        // Focus trap — delayed to let Teleport render
        window.requestAnimationFrame(() => {
          if (dialogRef.value) {
            focusTrap = createFocusTrap(dialogRef.value);
            focusTrap.activate();
          }
        });
      } else {
        focusTrap?.deactivate();
        focusTrap = null;
        scrollLock.unlock();
        if (previousFocus) previousFocus.focus();
      }
    },
  );

  onBeforeUnmount(() => {
    focusTrap?.deactivate();
    scrollLock.unlock();
  });
</script>

<template>
  <Teleport to="body">
    <Transition
      :name="transition === 'none' ? undefined : `${base}--${transition}`"
    >
      <div
        v-if="open"
        :class="base"
        @click="handleBackdropClick"
        @keydown="handleKeydown"
      >
        <div
          ref="dialogRef"
          :class="[`${base}__dialog`, { [`${base}--persistent`]: persistent }]"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-label="ariaLabel"
        >
          <div :class="`${base}__header`">
            <h2 :id="titleId" :class="`${base}__title`">{{ title }}</h2>
            <button
              v-if="!persistent"
              :class="`${base}__close`"
              type="button"
              aria-label="Luk"
              @click="handleClose"
            >
              &times;
            </button>
          </div>

          <div :class="`${base}__body`">
            <slot />
          </div>

          <div v-if="$slots.footer" :class="`${base}__footer`">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-modal {
    position: fixed;
    inset: 0;
    z-index: tokens.z-index('modal-backdrop');
    display: flex;
    align-items: center;
    justify-content: center;
    background: tokens.color('modal-backdrop');
    padding: tokens.space('lg');

    &__dialog {
      position: relative;
      z-index: tokens.z-index('modal');
      background: tokens.color('surface');
      border-radius: tokens.radius('lg');
      box-shadow: tokens.shadow('lg');
      max-width: 32rem;
      width: 100%;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: tokens.space('lg') tokens.space('lg') 0;
    }

    &__title {
      font-size: tokens.font-size('lg');
      font-weight: tokens.font-weight('semibold');
      color: tokens.color('text');
      margin: 0;
    }

    &__close {
      background: none;
      border: none;
      cursor: pointer;
      color: tokens.color('text-secondary');
      font-size: tokens.font-size('xl');
      line-height: 1;
      padding: tokens.space('xs');
      border-radius: tokens.radius('sm');

      &:hover {
        color: tokens.color('text');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus');
        outline-offset: 2px;
      }
    }

    &__body {
      padding: tokens.space('lg');
      color: tokens.color('text');
      font-size: tokens.font-size('base');
      line-height: tokens.line-height('normal');
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      gap: tokens.space('sm');
      padding: 0 tokens.space('lg') tokens.space('lg');
    }

    // Vue Transition classes per animation type
    // Backdrop always fades
    &--scale-enter-active,
    &--fade-enter-active,
    &--slide-up-enter-active,
    &--slide-down-enter-active,
    &--slide-right-enter-active {
      animation: gt-fade-in tokens.duration('fast') tokens.ease('ease-out');
    }

    &--scale-leave-active,
    &--fade-leave-active,
    &--slide-up-leave-active,
    &--slide-down-leave-active,
    &--slide-right-leave-active {
      animation: gt-fade-out tokens.duration('fast') ease-in;
    }

    // Dialog animations
    &--scale-enter-active .#{$prefix}-modal__dialog {
      animation: gt-scale-in tokens.duration('fast') tokens.ease('ease-out');
    }

    &--scale-leave-active .#{$prefix}-modal__dialog {
      animation: gt-scale-out tokens.duration('fast') ease-in;
    }

    &--slide-up-enter-active .#{$prefix}-modal__dialog {
      animation: gt-slide-up-in tokens.duration('fast') tokens.ease('ease-out');
    }

    &--slide-up-leave-active .#{$prefix}-modal__dialog {
      animation: gt-slide-up-out tokens.duration('fast') ease-in;
    }

    &--slide-down-enter-active .#{$prefix}-modal__dialog {
      animation: gt-slide-down-in tokens.duration('fast')
        tokens.ease('ease-out');
    }

    &--slide-down-leave-active .#{$prefix}-modal__dialog {
      animation: gt-slide-down-out tokens.duration('fast') ease-in;
    }

    &--slide-right-enter-active .#{$prefix}-modal__dialog {
      animation: gt-slide-right-in tokens.duration('fast')
        tokens.ease('ease-out');
    }

    &--slide-right-leave-active .#{$prefix}-modal__dialog {
      animation: gt-slide-right-out tokens.duration('fast') ease-in;
    }

    // Fade — dialog also fades (no transform)
    &--fade-enter-active .#{$prefix}-modal__dialog {
      animation: gt-fade-in tokens.duration('fast') tokens.ease('ease-out');
    }

    &--fade-leave-active .#{$prefix}-modal__dialog {
      animation: gt-fade-out tokens.duration('fast') ease-in;
    }

    @media (prefers-reduced-motion: reduce) {
      &[class*='-enter-active'],
      &[class*='-leave-active'],
      &[class*='-enter-active'] .#{$prefix}-modal__dialog,
      &[class*='-leave-active'] .#{$prefix}-modal__dialog {
        animation: none;
      }
    }
  }
</style>
