<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { ToggleProps } from './types';

  const props = withDefaults(defineProps<ToggleProps>(), {
    modelValue: false,
    size: 'md',
    disabled: false,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: boolean];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-toggle`);
  const toggleId = computed(() => props.id ?? generateId('toggle'));

  function toggle() {
    if (props.disabled) return;
    emit('update:modelValue', !props.modelValue);
  }
</script>

<template>
  <div :class="`${base}-field`">
    <label v-if="label" :for="toggleId" :class="`${base}-label`">
      {{ label }}
    </label>
    <button
      :id="toggleId"
      type="button"
      role="switch"
      :name="name"
      :aria-checked="!!modelValue"
      :class="[
        base,
        `${base}--${size}`,
        {
          [`${base}--checked`]: modelValue,
          [`${base}--disabled`]: disabled,
        },
      ]"
      :disabled="disabled"
      :aria-disabled="disabled"
      @click="toggle"
    >
      <span :class="`${base}__track`" />
      <span :class="`${base}__thumb`" />
    </button>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-toggle-field {
    display: flex;
    align-items: center;
    gap: tokens.space('sm');
  }

  .#{$prefix}-toggle-label {
    color: tokens.color('text');
    font-family: tokens.font-family('base');
    font-size: tokens.font-size('sm');
    font-weight: tokens.font-weight('medium');
    cursor: pointer;
    user-select: none;
  }

  .#{$prefix}-toggle {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    flex-shrink: 0;

    // Track
    &__track {
      display: block;
      background-color: tokens.color('border-medium');
      border-radius: tokens.radius('full');
      transition: background-color tokens.duration('fast') tokens.ease('ease');
    }

    // Thumb
    &__thumb {
      position: absolute;
      background-color: tokens.color('background');
      border-radius: tokens.radius('full');
      box-shadow: tokens.shadow('sm');
      transition: transform tokens.duration('fast') tokens.ease('ease');
      left: 2px;
    }

    // Checked state
    &--checked {
      .#{$prefix}-toggle__track {
        background-color: tokens.color('primary');
      }
    }

    // Sizes — values from @grundtone/core TOGGLE_SIZES
    &--sm {
      .#{$prefix}-toggle__track {
        width: 36px;
        height: 20px;
      }

      .#{$prefix}-toggle__thumb {
        width: 16px;
        height: 16px;
        top: 2px;
      }

      &.#{$prefix}-toggle--checked .#{$prefix}-toggle__thumb {
        transform: translateX(16px);
      }
    }

    &--md {
      .#{$prefix}-toggle__track {
        width: 44px;
        height: 24px;
      }

      .#{$prefix}-toggle__thumb {
        width: 20px;
        height: 20px;
        top: 2px;
      }

      &.#{$prefix}-toggle--checked .#{$prefix}-toggle__thumb {
        transform: translateX(20px);
      }
    }

    &--lg {
      .#{$prefix}-toggle__track {
        width: 52px;
        height: 28px;
      }

      .#{$prefix}-toggle__thumb {
        width: 24px;
        height: 24px;
        top: 2px;
      }

      &.#{$prefix}-toggle--checked .#{$prefix}-toggle__thumb {
        transform: translateX(24px);
      }
    }

    // Focus
    &:focus-visible {
      @include tokens.focus;
      border-radius: tokens.radius('full');
    }

    // Disabled
    &--disabled,
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--disabled + .#{$prefix}-toggle-label,
    &:disabled + .#{$prefix}-toggle-label {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  // Disabled label (label comes before toggle in DOM)
  .#{$prefix}-toggle--disabled,
  .#{$prefix}-toggle:disabled {
    pointer-events: none;
  }

  .#{$prefix}-toggle-field:has(.#{$prefix}-toggle--disabled)
    .#{$prefix}-toggle-label,
  .#{$prefix}-toggle-field:has(.#{$prefix}-toggle:disabled)
    .#{$prefix}-toggle-label {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
