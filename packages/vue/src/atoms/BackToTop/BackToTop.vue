<script setup lang="ts">
  import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { BackToTopProps } from './types';

  const props = withDefaults(defineProps<BackToTopProps>(), {
    label: 'Til toppen',
    smooth: true,
    threshold: 0,
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-back-to-top`);

  const visible = ref(false);
  let computedThreshold = 0;

  function onScroll() {
    visible.value = window.scrollY > computedThreshold;
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: props.smooth ? 'smooth' : 'instant',
    });
  }

  onMounted(() => {
    computedThreshold =
      props.threshold > 0 ? props.threshold : window.innerHeight * 2;
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
</script>

<template>
  <button
    type="button"
    :class="[base, { [`${base}--visible`]: visible }]"
    :aria-label="label"
    @click="scrollToTop"
  >
    <span :class="`${base}__icon`" aria-hidden="true" />
    <span :class="`${base}__label`">{{ label }}</span>
  </button>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-back-to-top {
    position: fixed;
    bottom: tokens.space('lg');
    right: tokens.space('lg');
    z-index: tokens.z-index('fixed');
    display: inline-flex;
    align-items: center;
    gap: tokens.space('xs');
    padding: tokens.space('sm') tokens.space('md');
    background: tokens.color('surface');
    color: tokens.color('text');
    border: 1px solid tokens.color('border-medium');
    border-radius: tokens.radius('full');
    box-shadow: tokens.shadow('md');
    cursor: pointer;
    font-size: tokens.font-size('sm');
    font-weight: tokens.font-weight('medium');
    text-decoration: none;
    opacity: 0;
    visibility: hidden;
    transform: translateY(1rem);
    transition:
      opacity tokens.duration('fast') tokens.ease('ease'),
      visibility tokens.duration('fast') tokens.ease('ease'),
      transform tokens.duration('fast') tokens.ease('ease');

    &--visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    &:hover {
      background: tokens.color('surface-alt');
    }

    &:focus-visible {
      outline: 2px solid tokens.color('focus-ring');
      outline-offset: 2px;
    }

    &__icon {
      display: inline-block;
      width: 1.25em;
      height: 1.25em;
      flex-shrink: 0;
      background: currentColor;
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 15l-6-6-6 6'/%3E%3C/svg%3E");
      mask-size: contain;
      mask-repeat: no-repeat;
      -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 15l-6-6-6 6'/%3E%3C/svg%3E");
      -webkit-mask-size: contain;
      -webkit-mask-repeat: no-repeat;
    }

    @media (max-width: 639px) {
      padding: tokens.space('sm');

      &__label {
        display: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
      transform: none;
    }
  }
</style>
