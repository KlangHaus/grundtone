<script setup lang="ts">
  import { computed } from 'vue';
  import { GTAutocomplete } from '../../atoms/Autocomplete';
  import type { AutocompleteSuggestion } from '../../atoms/Autocomplete/types';
  import { useDawaAutocomplete } from '../../composables/useDawaAutocomplete';
  import type { DawaResult } from '../../composables/useDawaAutocomplete';
  import type { AddressInputProps } from './types';

  const props = withDefaults(defineProps<AddressInputProps>(), {
    modelValue: '',
    type: 'adresse',
    size: 'md',
    label: undefined,
    helpText: undefined,
    errorText: undefined,
    placeholder: 'Indtast adresse...',
    required: false,
    disabled: false,
    minChars: 2,
    debounce: 250,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
    select: [result: DawaResult];
  }>();

  const { results, loading, search, clear } = useDawaAutocomplete({
    type: props.type,
    minChars: props.minChars,
    debounce: props.debounce,
  });

  const suggestions = computed<AutocompleteSuggestion[]>(() =>
    results.value.map(r => ({
      value: r.data.id as string,
      label: r.forslagstekst,
    })),
  );

  function handleSearch(q: string) {
    search(q);
  }

  function handleSelect(suggestion: AutocompleteSuggestion) {
    emit('update:modelValue', suggestion.label);
    // Find matching DAWA result and emit full data
    const match = results.value.find(
      r => (r.data.id as string) === suggestion.value,
    );
    if (match) emit('select', match);
    clear();
  }

  function handleInput(value: string) {
    emit('update:modelValue', value);
  }
</script>

<template>
  <GTAutocomplete
    :model-value="modelValue"
    :suggestions="suggestions"
    :size="size"
    :label="label"
    :help-text="helpText"
    :error-text="errorText"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :loading="loading"
    :min-chars="minChars"
    no-results-text="Ingen adresser fundet"
    @update:model-value="handleInput"
    @search="handleSearch"
    @select="handleSelect"
  />
</template>
