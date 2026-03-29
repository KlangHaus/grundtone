<script setup lang="ts">
  import { computed, ref, watch, nextTick } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { AutocompleteProps, AutocompleteSuggestion } from './types';

  const props = withDefaults(defineProps<AutocompleteProps>(), {
    modelValue: '',
    suggestions: () => [],
    size: 'md',
    placeholder: undefined,
    label: undefined,
    helpText: undefined,
    errorText: undefined,
    required: false,
    disabled: false,
    loading: false,
    minChars: 2,
    noResultsText: 'Ingen resultater',
    name: undefined,
    id: undefined,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
    search: [query: string];
    select: [suggestion: AutocompleteSuggestion];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-autocomplete`);
  const inputBase = computed(() => `${p.value}-input`);

  const inputId = computed(() => props.id ?? generateId('autocomplete'));
  const listboxId = computed(() => `${inputId.value}-listbox`);
  const descriptionId = computed(() =>
    props.errorText || props.helpText ? `${inputId.value}-desc` : undefined,
  );

  const isOpen = ref(false);
  const activeIndex = ref(-1);
  const inputRef = ref<HTMLInputElement | null>(null);

  const showDropdown = computed(
    () =>
      isOpen.value &&
      props.modelValue.length >= props.minChars &&
      (props.suggestions.length > 0 ||
        props.loading ||
        props.modelValue.length >= props.minChars),
  );

  const activeDescendant = computed(() =>
    activeIndex.value >= 0
      ? `${inputId.value}-opt-${activeIndex.value}`
      : undefined,
  );

  function handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    emit('update:modelValue', value);
    emit('search', value);
    activeIndex.value = -1;
    isOpen.value = true;
  }

  function handleSelect(suggestion: AutocompleteSuggestion) {
    emit('update:modelValue', suggestion.label);
    emit('select', suggestion);
    isOpen.value = false;
    activeIndex.value = -1;
  }

   
  function handleKeydown(event: KeyboardEvent) {
    if (!showDropdown.value) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        activeIndex.value = Math.min(
          activeIndex.value + 1,
          props.suggestions.length - 1,
        );
        scrollActiveIntoView();
        break;
      case 'ArrowUp':
        event.preventDefault();
        activeIndex.value = Math.max(activeIndex.value - 1, -1);
        scrollActiveIntoView();
        break;
      case 'Enter':
        event.preventDefault();
        if (activeIndex.value >= 0 && props.suggestions[activeIndex.value]) {
          handleSelect(props.suggestions[activeIndex.value]);
        }
        break;
      case 'Escape':
        isOpen.value = false;
        activeIndex.value = -1;
        break;
    }
  }

  function handleFocus() {
    if (props.modelValue.length >= props.minChars) {
      isOpen.value = true;
    }
  }

  function handleBlur() {
    // Delay to allow click on option
    setTimeout(() => {
      isOpen.value = false;
      activeIndex.value = -1;
    }, 200);
  }

  function scrollActiveIntoView() {
    nextTick(() => {
      const el = document.getElementById(
        `${inputId.value}-opt-${activeIndex.value}`,
      );
      el?.scrollIntoView({ block: 'nearest' });
    });
  }

  // Reset active index when suggestions change
  watch(
    () => props.suggestions,
    () => {
      activeIndex.value = -1;
    },
  );
</script>

<template>
  <div :class="[base, `${inputBase}-field`]">
    <label v-if="label" :for="inputId" :class="`${inputBase}-label`">
      {{ label }}
      <span
        v-if="required"
        :class="`${inputBase}-label__required`"
        aria-hidden="true"
        >*</span
      >
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

    <div style="position: relative">
      <input
        ref="inputRef"
        :id="inputId"
        type="text"
        role="combobox"
        :class="[
          `${inputBase}`,
          `${inputBase}--${size}`,
          { [`${inputBase}--error`]: !!errorText },
        ]"
        :value="modelValue"
        :placeholder="placeholder"
        :name="name"
        :disabled="disabled"
        :required="required"
        :aria-invalid="errorText ? 'true' : undefined"
        :aria-describedby="descriptionId"
        :aria-required="required || undefined"
        :aria-expanded="showDropdown"
        :aria-controls="showDropdown ? listboxId : undefined"
        :aria-activedescendant="activeDescendant"
        aria-autocomplete="list"
        autocomplete="off"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <ul
        v-if="showDropdown"
        :id="listboxId"
        :class="`${base}__dropdown`"
        role="listbox"
      >
        <li v-if="loading" :class="`${base}__loading`" role="presentation">
          Søger...
        </li>
        <li
          v-else-if="suggestions.length === 0 && modelValue.length >= minChars"
          :class="`${base}__empty`"
          role="presentation"
        >
          {{ noResultsText }}
        </li>
        <li
          v-for="(suggestion, index) in suggestions"
          v-else
          :key="suggestion.value"
          :id="`${inputId}-opt-${index}`"
          :class="[
            `${base}__option`,
            { [`${base}__option--active`]: index === activeIndex },
          ]"
          role="option"
          :aria-selected="index === activeIndex"
          @mousedown.prevent="handleSelect(suggestion)"
        >
          <span :class="`${base}__option-label`">{{ suggestion.label }}</span>
          <span
            v-if="suggestion.description"
            :class="`${base}__option-description`"
          >
            {{ suggestion.description }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-autocomplete {
    position: relative;

    &__dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: tokens.z-index('dropdown');
      margin-top: tokens.space('xs');
      max-height: 280px;
      overflow-y: auto;
      background: tokens.color('surface');
      border: 1px solid tokens.color('border-medium');
      border-radius: tokens.radius('lg');
      box-shadow: tokens.shadow('lg');
      list-style: none;
      padding: tokens.space('xs') 0;
    }

    &__option {
      display: flex;
      flex-direction: column;
      gap: 1px;
      padding: tokens.space('sm') tokens.space('md');
      cursor: pointer;
      font-size: tokens.font-size('sm');
      color: tokens.color('text');
      transition: background tokens.duration('fast') tokens.ease('out');

      &:hover,
      &--active {
        background: tokens.color('surface-alt');
      }

      &--active {
        color: tokens.color('primary');
      }
    }

    &__option-label {
      font-weight: tokens.font-weight('medium');
    }

    &__option-description {
      font-size: tokens.font-size('xs');
      color: tokens.color('text-tertiary');
    }

    &__empty,
    &__loading {
      padding: tokens.space('sm') tokens.space('md');
      font-size: tokens.font-size('sm');
      color: tokens.color('text-tertiary');
      text-align: center;
    }
  }
</style>
