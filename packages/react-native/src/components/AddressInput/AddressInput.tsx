import React, { useMemo } from 'react';
import { GTAutocomplete } from '../Autocomplete';
import type { AutocompleteSuggestion } from '../Autocomplete/types';
import { useDawaAutocomplete } from '../../hooks/useDawaAutocomplete';
import type { AddressInputProps } from './types';

/**
 * GTAddressInput — DAWA address autocomplete for React Native.
 *
 * Wraps GTAutocomplete with DAWA API integration.
 */
export function GTAddressInput({
  value = '',
  type = 'adresse',
  label,
  placeholder = 'Indtast adresse...',
  disabled = false,
  minChars = 2,
  debounce = 250,
  onChangeText,
  onSelect,
  accessibilityLabel,
}: AddressInputProps) {
  const { results, loading, search, clear } = useDawaAutocomplete({
    type,
    minChars,
    debounce,
  });

  const suggestions: AutocompleteSuggestion[] = useMemo(
    () =>
      results.map(r => ({
        value: r.data.id as string,
        label: r.forslagstekst,
      })),
    [results],
  );

  function handleSearch(q: string) {
    search(q);
  }

  function handleChangeText(text: string) {
    onChangeText?.(text);
  }

  function handleSelect(suggestion: AutocompleteSuggestion) {
    onChangeText?.(suggestion.label);
    const match = results.find(r => (r.data.id as string) === suggestion.value);
    if (match) onSelect?.(match);
    clear();
  }

  return (
    <GTAutocomplete
      value={value}
      suggestions={suggestions}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      loading={loading}
      minChars={minChars}
      noResultsText="Ingen adresser fundet"
      onChangeText={handleChangeText}
      onSearch={handleSearch}
      onSelect={handleSelect}
      accessibilityLabel={accessibilityLabel}
    />
  );
}
