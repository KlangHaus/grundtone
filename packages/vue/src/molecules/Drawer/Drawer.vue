<script setup lang="ts">
  import { computed, watch, onBeforeUnmount, ref } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { createFocusTrap, createScrollLock } from '@grundtone/utils';
  import type { FocusTrap } from '@grundtone/utils';
  import type { DrawerProps } from './types';

  const props = withDefaults(defineProps<DrawerProps>(), {
    side: 'left',
    size: '20rem',
    modal: true,
    ariaLabel: undefined,
  });

  const emit = defineEmits<{
    'update:open': [value: boolean];
    close: [];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-drawer`);

  const panelRef = ref<HTMLElement | null>(null);
  let focusTrap: FocusTrap | null = null;
  const scrollLock = createScrollLock();
  let previousFocus: HTMLElement | null = null;

  function close() {
    emit('update:open', false);
    emit('close');
  }

  function handleScrimClick() {
    close();
  }

  function handleKeydown(e: Event) {
    if ((e as { key?: string }).key === 'Escape') close();
  }

  watch(
    () => props.open,
    isOpen => {
      if (isOpen) {
        // Remember the opener so focus returns there on close — the trigger is
        // whatever had focus (hamburger, a detail-row button, …), not hard-wired.
        previousFocus = document.activeElement as HTMLElement | null;
        // Only a modal drawer owns the page: lock scroll + trap focus. A
        // non-modal panel leaves the page usable, so we just move focus in.
        if (props.modal) scrollLock.lock();
        window.requestAnimationFrame(() => {
          if (!panelRef.value) return;
          if (props.modal) {
            focusTrap = createFocusTrap(panelRef.value);
            focusTrap.activate();
          } else {
            panelRef.value.focus();
          }
        });
      } else {
        focusTrap?.deactivate();
        focusTrap = null;
        scrollLock.unlock();
        previousFocus?.focus();
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
    <Transition :name="base">
      <div
        v-if="open"
        :class="[base, `${base}--${side}`, { [`${base}--modal`]: modal }]"
        @keydown="handleKeydown"
      >
        <div v-if="modal" :class="`${base}__scrim`" @click="handleScrimClick" />
        <div
          ref="panelRef"
          :class="`${base}__panel`"
          :style="{ inlineSize: size }"
          role="dialog"
          :aria-modal="modal ? 'true' : undefined"
          :aria-label="ariaLabel"
          tabindex="-1"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-drawer {
    position: fixed;
    inset: 0;
    z-index: tokens.z-index('modal-backdrop');
    display: flex;

    // A modal drawer owns the viewport (scrim catches clicks). A non-modal
    // detail panel must let clicks through to the page — only the panel itself
    // is interactive.
    &:not(.#{$prefix}-drawer--modal) {
      pointer-events: none;
    }

    &--right {
      justify-content: flex-end;
    }

    &__scrim {
      position: absolute;
      inset: 0;
      background: tokens.color('modal-backdrop');
    }

    &__panel {
      position: relative;
      z-index: tokens.z-index('modal');
      pointer-events: auto;
      block-size: 100%;
      max-inline-size: 100%;
      overflow-y: auto;
      background: tokens.color('surface');
      box-shadow: tokens.shadow('lg');

      &:focus {
        outline: none;
      }
    }

    // ── Transitions ────────────────────────────────────────────────────────
    // Scrim fades; panel slides from its edge. Single transition name on the
    // container, so we key the panel animation on side + enter/leave state.
    &-enter-active .#{$prefix}-drawer__scrim,
    &-leave-active .#{$prefix}-drawer__scrim {
      animation: gt-fade-in tokens.duration('fast') tokens.ease('ease-out');
    }

    &-leave-active .#{$prefix}-drawer__scrim {
      animation-name: gt-fade-out;
    }

    &--left.#{$prefix}-drawer-enter-active .#{$prefix}-drawer__panel {
      animation: gt-drawer-in-left tokens.duration('base')
        tokens.ease('ease-out');
    }
    &--left.#{$prefix}-drawer-leave-active .#{$prefix}-drawer__panel {
      animation: gt-drawer-out-left tokens.duration('base') ease-in;
    }
    &--right.#{$prefix}-drawer-enter-active .#{$prefix}-drawer__panel {
      animation: gt-drawer-in-right tokens.duration('base')
        tokens.ease('ease-out');
    }
    &--right.#{$prefix}-drawer-leave-active .#{$prefix}-drawer__panel {
      animation: gt-drawer-out-right tokens.duration('base') ease-in;
    }

    @media (prefers-reduced-motion: reduce) {
      &[class*='-enter-active'] .#{$prefix}-drawer__scrim,
      &[class*='-leave-active'] .#{$prefix}-drawer__scrim,
      &[class*='-enter-active'] .#{$prefix}-drawer__panel,
      &[class*='-leave-active'] .#{$prefix}-drawer__panel {
        animation: none;
      }
    }
  }

  @keyframes gt-drawer-in-left {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes gt-drawer-out-left {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
  @keyframes gt-drawer-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes gt-drawer-out-right {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
</style>
