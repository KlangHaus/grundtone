<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import type { SearchFieldProps, SearchSuggestion } from './types';

  const props = withDefaults(defineProps<SearchFieldProps>(), {
    modelValue: '',
    placeholder: 'Søg...',
    label: 'Søg',
    buttonLabel: 'Søg',
    size: 'md',
    disabled: false,
    id: undefined,
    suggestions: undefined,
    loading: false,
    minChars: 2,
    noResultsText: 'Ingen resultater',
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
    submit: [query: string];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-search-field`);

  const inputId = computed(() => props.id ?? generateId('search'));
  const showSuggestions = ref(false);
  const highlightIndex = ref(-1);

  const hasSuggestions = computed(
    () =>
      props.suggestions &&
      props.suggestions.length > 0 &&
      props.modelValue.length >= props.minChars,
  );

  function handleInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    emit('update:modelValue', value);
    showSuggestions.value = true;
    highlightIndex.value = -1;
  }

  function handleSubmit() {
    showSuggestions.value = false;
    emit('submit', props.modelValue);
  }

  function selectSuggestion(suggestion: SearchSuggestion) {
    emit('update:modelValue', suggestion.value);
    showSuggestions.value = false;
    emit('submit', suggestion.value);
  }

  function handleKeydown(e: Event) {
    const ke = e as { key?: string };
    if (!ke.key || !hasSuggestions.value || !showSuggestions.value) return;

    const len = props.suggestions!.length;

    switch (ke.key) {
      case 'ArrowDown':
        e.preventDefault();
        highlightIndex.value = (highlightIndex.value + 1) % len;
        break;
      case 'ArrowUp':
        e.preventDefault();
        highlightIndex.value = (highlightIndex.value - 1 + len) % len;
        break;
      case 'Enter':
        if (highlightIndex.value >= 0) {
          e.preventDefault();
          selectSuggestion(props.suggestions![highlightIndex.value]);
        }
        break;
      case 'Escape':
        showSuggestions.value = false;
        break;
    }
  }

  function handleBlur() {
    // Delay to allow click on suggestion
    setTimeout(() => {
      showSuggestions.value = false;
    }, 150);
  }

  watch(
    () => props.modelValue,
    val => {
      if (val.length < props.minChars) showSuggestions.value = false;
    },
  );
</script>

<template>
  <form
    :class="[base, `${base}--${size}`, { [`${base}--disabled`]: disabled }]"
    role="search"
    style="position: relative"
    @submit.prevent="handleSubmit"
  >
    <label :for="inputId" class="sr-only">{{ label }}</label>
    <input
      :id="inputId"
      :class="`${base}__input`"
      type="search"
      inputmode="search"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      autocomplete="off"
      :role="suggestions !== undefined ? 'combobox' : undefined"
      :aria-autocomplete="suggestions !== undefined ? 'list' : undefined"
      :aria-expanded="
        suggestions !== undefined
          ? showSuggestions && hasSuggestions
          : undefined
      "
      @input="handleInput"
      @keydown="handleKeydown"
      @blur="handleBlur"
      @focus="showSuggestions = true"
    />
    <button
      :class="`${base}__button`"
      type="submit"
      :disabled="disabled"
      :aria-label="buttonLabel"
    >
      <span class="sr-only">{{ buttonLabel }}</span>
    </button>

    <!-- Suggestions dropdown -->
    <ul
      v-if="showSuggestions && hasSuggestions && suggestions"
      :class="`${base}__suggestions`"
      role="listbox"
    >
      <li
        v-for="(s, i) in suggestions"
        :key="s.value"
        :class="[
          `${base}__suggestion`,
          { [`${base}__suggestion--highlighted`]: i === highlightIndex },
        ]"
        role="option"
        :aria-selected="i === highlightIndex"
        @mousedown.prevent="selectSuggestion(s)"
      >
        {{ s.label }}
      </li>
    </ul>
    <ul
      v-else-if="
        showSuggestions &&
        suggestions &&
        suggestions.length === 0 &&
        modelValue.length >= minChars &&
        !loading
      "
      :class="`${base}__suggestions`"
    >
      <li :class="`${base}__suggestion`" style="opacity: 0.6; cursor: default">
        {{ noResultsText }}
      </li>
    </ul>
  </form>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-search-field {
    display: flex;
    align-items: stretch;
    min-width: 27ch;
    max-width: 100%;

    &__input {
      flex: 1;
      min-width: 0;
      border: 1px solid tokens.color('border-medium');
      border-right: 0;
      border-radius: tokens.radius('md') 0 0 tokens.radius('md');
      background: tokens.color('background');
      color: tokens.color('text');
      font-family: tokens.font-family('base');
      transition:
        border-color tokens.duration('fast') tokens.ease('ease'),
        box-shadow tokens.duration('fast') tokens.ease('ease');

      &::placeholder {
        color: tokens.color('text-secondary');
        opacity: 0.7;
      }

      &:focus {
        outline: none;
        border-color: tokens.color('primary');
        box-shadow: 0 0 0 3px tokens.color('focus-ring');
        z-index: 1;
      }
    }

    &__button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: tokens.space('xs');
      border: 1px solid tokens.color('primary');
      border-radius: 0 tokens.radius('md') tokens.radius('md') 0;
      background: tokens.color('primary');
      color: var(--color-on-primary, #fff);
      cursor: pointer;
      font-weight: tokens.font-weight('medium');
      white-space: nowrap;
      transition: background-color tokens.duration('fast') tokens.ease('ease');

      &:hover {
        opacity: 0.9;
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: 2px;
      }

      &::before {
        content: '';
        display: inline-block;
        width: 1em;
        height: 1em;
        background: currentColor;
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.156a5 5 0 1 1 0-10 5 5 0 0 1 0 10z'/%3E%3C/svg%3E");
        mask-size: contain;
        mask-repeat: no-repeat;
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.156a5 5 0 1 1 0-10 5 5 0 0 1 0 10z'/%3E%3C/svg%3E");
        -webkit-mask-size: contain;
        -webkit-mask-repeat: no-repeat;
      }
    }

    &--md &__input {
      font-size: tokens.font-size('base');
      padding: tokens.space('sm') tokens.space('md');
    }

    &--md &__button {
      font-size: tokens.font-size('sm');
      padding: tokens.space('sm') tokens.space('md');
    }

    &--lg &__input {
      font-size: tokens.font-size('lg');
      padding: tokens.space('md') tokens.space('lg');
    }

    &--lg &__button {
      font-size: tokens.font-size('base');
      padding: tokens.space('md') tokens.space('lg');
    }

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &__suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: tokens.space('xs');
      background: tokens.color('surface');
      border: 1px solid tokens.color('border-medium');
      border-radius: tokens.radius('md');
      box-shadow: tokens.shadow('lg');
      z-index: tokens.z-index('dropdown');
      list-style: none !important;
      padding: 0.5rem 0;
      padding-left: 0;
      margin: tokens.space('xs') 0 0;
    }

    &__suggestion {
      padding: 0.375rem 1rem;
      font-size: tokens.font-size('sm');
      color: tokens.color('text');
      cursor: pointer;
      list-style: none;

      &:hover,
      &--highlighted {
        background: tokens.color('surface-alt');
      }

      &::before,
      &::marker {
        content: none;
      }
    }
  }
</style>
