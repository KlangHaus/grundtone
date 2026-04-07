<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { GTIcon } from '../Icon';
  import type { TagProps } from './types';

  const props = withDefaults(defineProps<TagProps>(), {
    value: undefined,
    icon: undefined,
    dismissible: false,
    selected: undefined,
    size: 'md',
    disabled: false,
  });

  const emit = defineEmits<{
    click: [value: string | undefined];
    dismiss: [value: string | undefined];
    'update:selected': [value: boolean];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-tag`);

  function handleClick() {
    if (props.disabled) return;
    emit('click', props.value);
    emit('update:selected', !props.selected);
  }

  const isSelectable = computed(() => props.selected !== undefined);

  function handleDismiss(e: Event) {
    e.stopPropagation();
    if (props.disabled) return;
    emit('dismiss', props.value);
  }
</script>

<template>
  <span
    :class="[
      base,
      `${base}--${size}`,
      {
        [`${base}--selected`]: selected,
        [`${base}--disabled`]: disabled,
      },
    ]"
    :role="isSelectable ? 'option' : undefined"
    :aria-selected="isSelectable ? selected : undefined"
    :aria-disabled="disabled || undefined"
    :tabindex="isSelectable || dismissible ? 0 : undefined"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <GTIcon v-if="icon" :name="icon" size="xs" :class="`${base}__icon`" />
    <span :class="`${base}__label`">{{ label }}</span>
    <button
      v-if="dismissible"
      type="button"
      :class="`${base}__dismiss`"
      :aria-label="`Fjern ${label}`"
      :disabled="disabled"
      @click="handleDismiss"
    >
      &times;
    </button>
  </span>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-tag {
    display: inline-flex;
    align-items: center;
    gap: tokens.space('xs');
    border: 1px solid tokens.color('border-medium');
    border-radius: tokens.radius('full');
    background: tokens.color('background');
    color: tokens.color('text');
    cursor: pointer;
    white-space: nowrap;
    vertical-align: middle;
    transition:
      background-color tokens.duration('fast') tokens.ease('ease'),
      border-color tokens.duration('fast') tokens.ease('ease'),
      color tokens.duration('fast') tokens.ease('ease');

    &:hover {
      background: tokens.color('surface-alt');
    }

    &:focus-visible {
      outline: 2px solid tokens.color('focus-ring');
      outline-offset: 2px;
    }

    &--sm {
      padding: 0.0625rem tokens.space('sm');
      font-size: tokens.font-size('xs');
      line-height: tokens.line-height('normal');
    }

    &--md {
      padding: tokens.space('xs') tokens.space('md');
      font-size: tokens.font-size('sm');
      line-height: tokens.line-height('normal');
    }

    &--selected {
      background: tokens.color('primary');
      border-color: tokens.color('primary');
      color: var(--color-on-primary, #fff);

      &:hover {
        opacity: 0.9;
      }
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    &__icon {
      flex-shrink: 0;
    }

    &__dismiss {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      color: inherit;
      opacity: 0.6;
      padding: 0;
      margin-left: calc(-1 * #{tokens.space('xs')});
      font-size: 1em;
      line-height: 1;
      border-radius: tokens.radius('full');
      width: 1.25em;
      height: 1.25em;
      transition: opacity tokens.duration('fast') tokens.ease('ease');

      &:hover {
        opacity: 1;
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: 1px;
      }
    }
  }
</style>
