<script setup lang="ts">
  import { computed } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { SelectProps, SelectOptionGroup } from './types';

  const props = withDefaults(defineProps<SelectProps>(), {
    modelValue: undefined,
    size: 'md',
    placeholder: 'Vælg...',
    label: undefined,
    helpText: undefined,
    errorText: undefined,
    disabled: false,
    required: false,
    optionalLabel: undefined,
    name: undefined,
    id: undefined,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-select`);
  const inputBase = computed(() => `${p.value}-input`);

  const selectId = computed(() => props.id ?? generateId('select'));
  const descriptionId = computed(() =>
    props.errorText || props.helpText ? `${selectId.value}-desc` : undefined,
  );

  function isGroup(
    opt: SelectProps['options'][number],
  ): opt is SelectOptionGroup {
    return 'options' in opt;
  }

  function handleChange(event: Event) {
    emit('update:modelValue', (event.target as HTMLSelectElement).value);
  }

  const isPlaceholderSelected = computed(
    () => !props.modelValue || props.modelValue === '',
  );
</script>

<template>
  <div :class="`${inputBase}-field`">
    <label v-if="label" :for="selectId" :class="`${inputBase}-label`">
      {{ label }}
      <span
        v-if="required"
        :class="`${inputBase}-label__required`"
        aria-hidden="true"
        >*</span
      >
      <span v-if="!required && optionalLabel" class="text-xs text-secondary">
        {{ optionalLabel }}
      </span>
    </label>

    <p
      v-if="errorText"
      :id="descriptionId"
      :class="`${inputBase}-error`"
      role="alert"
    >
      {{ errorText }}
    </p>
    <p v-else-if="helpText" :id="descriptionId" :class="`${inputBase}-help`">
      {{ helpText }}
    </p>

    <select
      :id="selectId"
      :class="[
        `${base}`,
        `${base}--${size}`,
        { [`${base}--error`]: !!errorText },
        { [`${base}--placeholder`]: isPlaceholderSelected },
      ]"
      :name="name"
      :disabled="disabled"
      :required="required"
      :value="modelValue"
      :aria-invalid="errorText ? 'true' : undefined"
      :aria-describedby="descriptionId"
      :aria-required="required || undefined"
      @change="handleChange"
    >
      <option
        v-if="placeholder"
        value=""
        disabled
        :selected="isPlaceholderSelected"
      >
        {{ placeholder }}
      </option>
      <template
        v-for="opt in options"
        :key="isGroup(opt) ? opt.label : opt.value"
      >
        <optgroup v-if="isGroup(opt)" :label="opt.label">
          <option
            v-for="child in opt.options"
            :key="child.value"
            :value="child.value"
            :disabled="child.disabled"
          >
            {{ child.label }}
          </option>
        </optgroup>
        <option v-else :value="opt.value" :disabled="opt.disabled">
          {{ opt.label }}
        </option>
      </template>
    </select>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-select {
    display: block;
    width: 100%;
    border: 1px solid tokens.color('border-medium');
    border-radius: tokens.radius('md');
    background-color: tokens.color('background');
    color: tokens.color('text');
    font-family: tokens.font-family('base');
    cursor: pointer;
    transition:
      border-color tokens.duration('fast') tokens.ease('out'),
      box-shadow tokens.duration('fast') tokens.ease('out');

    // Reset native + custom chevron
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 4l4 4 4-4'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right tokens.space('sm') center;

    &:focus {
      outline: none;
      border-color: tokens.color('primary');
      box-shadow: 0 0 0 3px tokens.color('focus-ring');
    }

    // Placeholder state
    &--placeholder {
      color: tokens.color('text-secondary');
      opacity: 0.7;
    }

    // Sizes (match input)
    &--sm {
      font-size: tokens.font-size('sm');
      padding: tokens.space('xs') tokens.space('sm');
      padding-right: calc(#{tokens.space('sm')} + 12px + #{tokens.space('sm')});
    }

    &--md {
      font-size: tokens.font-size('base');
      padding: tokens.space('sm') tokens.space('md');
      padding-right: calc(#{tokens.space('md')} + 12px + #{tokens.space('sm')});
    }

    &--lg {
      font-size: tokens.font-size('lg');
      padding: tokens.space('md') tokens.space('xl');
      padding-right: calc(#{tokens.space('xl')} + 12px + #{tokens.space('sm')});
    }

    // Error
    &--error {
      border-color: tokens.color('error');

      &:focus {
        border-color: tokens.color('error');
        box-shadow: 0 0 0 3px
          color-mix(in srgb, tokens.color('error') 25%, transparent);
      }
    }

    // Disabled
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: tokens.color('surface-alt');
    }
  }
</style>
