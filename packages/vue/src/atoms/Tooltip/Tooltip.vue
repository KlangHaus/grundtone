<script setup lang="ts">
  import { computed, ref, nextTick, onBeforeUnmount } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { TooltipProps } from './types';

  const props = withDefaults(defineProps<TooltipProps>(), {
    position: 'top',
    trigger: 'click',
    delay: 300,
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-tooltip`);
  const tooltipId = generateId('tooltip');

  const visible = ref(false);
  const actualPosition = ref(props.position);
  const triggerRef = ref<HTMLElement | null>(null);
  const tooltipRef = ref<HTMLElement | null>(null);
  let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

  function computePosition() {
    if (!triggerRef.value) return;
    const rect = triggerRef.value.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    if (props.position === 'top' && spaceAbove < 80) {
      actualPosition.value = 'bottom';
    } else if (props.position === 'bottom' && spaceBelow < 80) {
      actualPosition.value = 'top';
    } else {
      actualPosition.value = props.position;
    }
  }

  function show() {
    computePosition();
    visible.value = true;
    if (props.trigger === 'click') {
      nextTick(() => {
        document.addEventListener('click', onOutsideClick);
      });
    }
  }

  function hide() {
    visible.value = false;
    document.removeEventListener('click', onOutsideClick);
  }

  function toggle() {
    if (visible.value) hide();
    else show();
  }

  function onOutsideClick(e: Event) {
    const target = e.target as HTMLElement;
    if (
      triggerRef.value?.contains(target) ||
      tooltipRef.value?.contains(target)
    )
      return;
    hide();
  }

  function onKeydown(e: Event) {
    if ((e as { key?: string }).key === 'Escape') hide();
  }

  // Hover handlers
  function onMouseEnter() {
    if (props.trigger !== 'hover') return;
    hoverTimeout = setTimeout(show, props.delay);
  }

  function onMouseLeave() {
    if (props.trigger !== 'hover') return;
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hide();
  }

  function onFocusIn() {
    if (props.trigger !== 'hover') return;
    show();
  }

  function onFocusOut() {
    if (props.trigger !== 'hover') return;
    hide();
  }

  onBeforeUnmount(() => {
    document.removeEventListener('click', onOutsideClick);
    if (hoverTimeout) clearTimeout(hoverTimeout);
  });
</script>

<template>
  <span
    ref="triggerRef"
    :class="`${base}-trigger`"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @keydown="onKeydown"
  >
    <slot />

    <button
      v-if="trigger === 'click'"
      type="button"
      :class="`${base}-trigger__icon`"
      :aria-expanded="visible"
      :aria-controls="tooltipId"
      @click.stop="toggle"
    >
      ?
    </button>

    <div
      v-if="visible"
      :id="tooltipId"
      ref="tooltipRef"
      :class="[base, `${base}--${actualPosition}`, `${base}--visible`]"
      role="tooltip"
    >
      <span :class="`${base}__arrow`" />
      {{ content }}
    </div>
  </span>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-tooltip-trigger {
    position: relative;
    display: inline-flex;
    align-items: center;

    &__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: tokens.radius('full');
      border: 1px solid tokens.color('border-medium');
      color: tokens.color('text-secondary');
      font-size: tokens.font-size('xs');
      font-weight: tokens.font-weight('semibold');
      cursor: pointer;
      background: none;
      line-height: 1;
      margin-left: tokens.space('xs');

      &:hover {
        color: tokens.color('text');
        border-color: tokens.color('text');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: 2px;
      }
    }
  }

  .#{$prefix}-tooltip {
    position: absolute;
    z-index: tokens.z-index('tooltip');
    max-width: 250px;
    padding: tokens.space('xs') tokens.space('sm');
    background: tokens.color('text');
    color: tokens.color('background');
    font-size: tokens.font-size('xs');
    line-height: tokens.line-height('normal');
    border-radius: tokens.radius('md');
    box-shadow: tokens.shadow('lg');
    pointer-events: none;
    white-space: normal;
    word-wrap: break-word;
    opacity: 0;
    transform: scale(0.95);
    transition:
      opacity tokens.duration('fast') tokens.ease('ease-out'),
      transform tokens.duration('fast') tokens.ease('ease-out');

    &--visible {
      opacity: 1;
      transform: scale(1);
    }

    &__arrow {
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      background: tokens.color('text');
      transform: rotate(45deg);
    }

    &--top {
      bottom: calc(100% + 0.5rem);
      left: 50%;
      transform-origin: bottom center;
      transform: translateX(-50%) scale(0.95);

      &.#{$prefix}-tooltip--visible {
        transform: translateX(-50%) scale(1);
      }

      .#{$prefix}-tooltip__arrow {
        bottom: -0.25rem;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
      }
    }

    &--bottom {
      top: calc(100% + 0.5rem);
      left: 50%;
      transform-origin: top center;
      transform: translateX(-50%) scale(0.95);

      &.#{$prefix}-tooltip--visible {
        transform: translateX(-50%) scale(1);
      }

      .#{$prefix}-tooltip__arrow {
        top: -0.25rem;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
</style>
