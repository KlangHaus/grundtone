import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { AutocompleteProps, AutocompleteSuggestion } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTAutocomplete({
  value = '',
  suggestions = [],
  placeholder,
  label,
  loading = false,
  disabled = false,
  noResultsText = 'Ingen resultater',
  minChars = 2,
  onChangeText,
  onSearch,
  onSelect,
  accessibilityLabel,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useGrundtoneTheme();
  const inputRef = useRef<TextInput>(null);

  const showDropdown =
    isOpen && value.length >= minChars && (suggestions.length > 0 || loading);

  function handleChangeText(text: string) {
    onChangeText?.(text);
    onSearch?.(text);
    setIsOpen(true);
  }

  function handleSelect(suggestion: AutocompleteSuggestion) {
    onChangeText?.(suggestion.label);
    onSelect?.(suggestion);
    setIsOpen(false);
  }

  const containerStyle: ViewStyle = {
    position: 'relative',
    zIndex: 10,
  };

  const labelStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    fontWeight: theme.typography.fontWeight.medium as TextStyle['fontWeight'],
    fontFamily: theme.typography.fontFamily.base,
    color: theme.colors.text,
    marginBottom: rem(theme.spacing.xs),
  };

  const inputStyle: TextStyle = {
    borderWidth: 1,
    borderColor: theme.colors.borderMedium,
    borderRadius: rem(theme.radius.md),
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.base,
    fontSize: rem(theme.typography.fontSize.base),
    padding: rem(theme.spacing.sm),
    paddingHorizontal: rem(theme.spacing.md),
    opacity: disabled ? 0.5 : 1,
  };

  const dropdownStyle: ViewStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: rem(theme.spacing.xs),
    maxHeight: 250,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderMedium,
    borderRadius: rem(theme.radius.lg),
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  };

  const optionStyle: ViewStyle = {
    paddingVertical: rem(theme.spacing.sm),
    paddingHorizontal: rem(theme.spacing.md),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  };

  const optionLabelStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    fontWeight: theme.typography.fontWeight.medium as TextStyle['fontWeight'],
    fontFamily: theme.typography.fontFamily.base,
    color: theme.colors.text,
  };

  const optionDescStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.xs),
    fontFamily: theme.typography.fontFamily.base,
    color: theme.colors.textTertiary,
    marginTop: 1,
  };

  const emptyStyle: TextStyle = {
    padding: rem(theme.spacing.sm),
    paddingHorizontal: rem(theme.spacing.md),
    fontSize: rem(theme.typography.fontSize.sm),
    fontFamily: theme.typography.fontFamily.base,
    color: theme.colors.textTertiary,
    textAlign: 'center',
  };

  return (
    <View style={containerStyle} accessibilityLabel={accessibilityLabel}>
      {label ? <Text style={labelStyle}>{label}</Text> : null}
      <TextInput
        ref={inputRef}
        style={inputStyle}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        editable={!disabled}
        autoCorrect={false}
        onChangeText={handleChangeText}
        onFocus={() => value.length >= minChars && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      {showDropdown ? (
        <View style={dropdownStyle}>
          {loading ? (
            <Text style={emptyStyle}>Søger...</Text>
          ) : suggestions.length === 0 ? (
            <Text style={emptyStyle}>{noResultsText}</Text>
          ) : (
            <FlatList
              data={suggestions}
              keyExtractor={item => item.value}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [
                    optionStyle,
                    pressed && { backgroundColor: theme.colors.surfaceAlt },
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={optionLabelStyle}>{item.label}</Text>
                  {item.description ? (
                    <Text style={optionDescStyle}>{item.description}</Text>
                  ) : null}
                </Pressable>
              )}
            />
          )}
        </View>
      ) : null}
    </View>
  );
}
