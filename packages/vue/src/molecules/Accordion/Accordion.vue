<script setup lang="ts">
  import { computed, ref, provide, type Ref } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import type { AccordionProps } from './types';

  const props = withDefaults(defineProps<AccordionProps>(), {
    variant: 'default',
    transition: 'slide',
    showToggleAll: true,
    toggleAllLabelOpen: 'Vis alle',
    toggleAllLabelClose: 'Skjul alle',
    ariaLabel: 'Accordion',
  });

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-accordion`);

  const allOpen = ref(false);
  const itemRefs: Ref<boolean>[] = [];

  function registerItem(isOpen: Ref<boolean>) {
    itemRefs.push(isOpen);
    if (isOpen.value) allOpen.value = true;
  }

  provide('gt-accordion-register', registerItem);
  provide(
    'gt-accordion-transition',
    computed(() => props.transition),
  );

  function toggleAll() {
    allOpen.value = !allOpen.value;
    for (const isOpen of itemRefs) {
      isOpen.value = allOpen.value;
    }
  }
</script>

<template>
  <div
    :class="[base, `${base}--${variant}`]"
    :aria-label="ariaLabel"
    role="region"
  >
    <button
      v-if="showToggleAll"
      type="button"
      :class="`${base}__toggle-all`"
      @click="toggleAll"
    >
      {{ allOpen ? toggleAllLabelClose : toggleAllLabelOpen }}
    </button>
    <slot />
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-accordion {
    font-size: tokens.font-size('sm');
    line-height: tokens.line-height('base');
    color: tokens.color('text');

    &__toggle-all {
      display: inline-flex;
      align-items: center;
      gap: tokens.space('xs');
      padding: tokens.space('xs') 0;
      margin-bottom: tokens.space('sm');
      background: none;
      border: none;
      cursor: pointer;
      font-size: tokens.font-size('xs');
      font-weight: tokens.font-weight('medium');
      color: tokens.color('primary');
      letter-spacing: 0.025em;

      &:hover {
        color: tokens.color('primary-dark');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: 2px;
        border-radius: tokens.radius('sm');
      }
    }

    &__item {
      border-top: 1px solid tokens.color('border-light');

      &:last-child {
        border-bottom: 1px solid tokens.color('border-light');
      }
    }

    &__header {
      display: flex;
      align-items: center;
      gap: tokens.space('sm');
      width: 100%;
      padding: tokens.space('md') 0;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      color: tokens.color('text');
      transition: background tokens.duration('fast') tokens.ease('out');
      border-radius: 0;

      &:hover {
        background: color-mix(in srgb, tokens.color('text') 4%, transparent);
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: -2px;
        border-radius: tokens.radius('sm');
      }
    }

    &__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
      color: tokens.color('primary');
      position: relative;

      &::before,
      &::after {
        content: '';
        position: absolute;
        background: currentColor;
        border-radius: 1px;
        transition: transform tokens.duration('fast') tokens.ease('ease');
      }

      &::before {
        width: 0.75rem;
        height: 2px;
      }

      &::after {
        width: 2px;
        height: 0.75rem;
      }
    }

    &__item--open
      > .#{$prefix}-accordion__header
      .#{$prefix}-accordion__icon::after {
      transform: rotate(90deg);
    }

    &__heading {
      flex: 1;
      font-weight: tokens.font-weight('semibold');
      margin: 0;
    }

    &__summary {
      display: block;
      font-size: tokens.font-size('xs');
      color: tokens.color('text-tertiary');
      font-weight: tokens.font-weight('normal');
      margin-top: tokens.space('xs');
    }

    &__panel {
      // Slide transition (JS-driven height)
      &--slide {
        overflow: hidden;
        height: 0;
        transition: height tokens.duration('base') tokens.ease('ease-out');

        &.#{$prefix}-accordion__panel--open {
          height: auto;
        }
      }

      // Fade transition
      &--fade {
        opacity: 0;
        transition: opacity tokens.duration('base') tokens.ease('ease');
        pointer-events: none;

        &.#{$prefix}-accordion__panel--open {
          opacity: 1;
          pointer-events: auto;
        }
      }

      // No transition
      &--none:not(.#{$prefix}-accordion__panel--open) {
        display: none;
      }
    }

    &__body {
      padding: 0 0 tokens.space('md') calc(1.25rem + #{tokens.space('sm')});
      color: tokens.color('text');

      > :first-child {
        margin-top: 0;
      }

      > :last-child {
        margin-bottom: 0;
      }
    }

    // Bordered
    &--bordered {
      border: 1px solid tokens.color('border-light');
      border-radius: tokens.radius('lg');
      overflow: hidden;

      .#{$prefix}-accordion__toggle-all {
        padding: tokens.space('sm') tokens.space('md');
        margin-bottom: 0;
        border-bottom: 1px solid tokens.color('border-light');
        width: 100%;
      }

      .#{$prefix}-accordion__item {
        border-top: 1px solid tokens.color('border-light');

        &:first-child {
          border-top: none;
        }

        &:last-child {
          border-bottom: none;
        }
      }

      .#{$prefix}-accordion__header {
        padding-left: tokens.space('md');
        padding-right: tokens.space('md');
      }

      .#{$prefix}-accordion__body {
        padding-left: calc(
          #{tokens.space('md')} + 1.25rem + #{tokens.space('sm')}
        );
        padding-right: tokens.space('md');
      }
    }

    // Card
    &--card {
      background: tokens.color('surface-alt');
      border-radius: tokens.radius('xl');
      padding: tokens.space('sm') tokens.space('lg');

      .#{$prefix}-accordion__toggle-all {
        margin-bottom: 0;
        padding-bottom: tokens.space('sm');
      }

      .#{$prefix}-accordion__item:last-child {
        border-bottom: none;
      }

      .#{$prefix}-accordion__header {
        border-radius: tokens.radius('md');
        padding-left: tokens.space('xs');
        padding-right: tokens.space('xs');
      }

      .#{$prefix}-accordion__body {
        padding-left: calc(
          #{tokens.space('xs')} + 1.25rem + #{tokens.space('sm')}
        );
      }
    }
  }
</style>
