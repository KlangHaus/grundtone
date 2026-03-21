<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
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
    :class="[
      'search-field',
      `search-field--${size}`,
      { 'search-field--disabled': disabled },
    ]"
    role="search"
    style="position: relative"
    @submit.prevent="handleSubmit"
  >
    <label :for="inputId" class="sr-only">{{ label }}</label>
    <input
      :id="inputId"
      class="search-field__input"
      type="search"
      inputmode="search"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      autocomplete="off"
      aria-autocomplete="list"
      :aria-expanded="showSuggestions && hasSuggestions"
      @input="handleInput"
      @keydown="handleKeydown"
      @blur="handleBlur"
      @focus="showSuggestions = true"
    />
    <button
      class="search-field__button"
      type="submit"
      :disabled="disabled"
      :aria-label="buttonLabel"
    >
      <span class="sr-only">{{ buttonLabel }}</span>
    </button>

    <!-- Suggestions dropdown -->
    <ul
      v-if="showSuggestions && hasSuggestions && suggestions"
      class="search-field__suggestions"
      role="listbox"
    >
      <li
        v-for="(s, i) in suggestions"
        :key="s.value"
        :class="[
          'search-field__suggestion',
          { 'search-field__suggestion--highlighted': i === highlightIndex },
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
      class="search-field__suggestions"
    >
      <li
        class="search-field__suggestion"
        style="opacity: 0.6; cursor: default"
      >
        {{ noResultsText }}
      </li>
    </ul>
  </form>
</template>
