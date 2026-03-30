import React, { useRef } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { SearchFieldProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTSearchField({
  value = '',
  placeholder = 'Søg...',
  disabled = false,
  onChangeText,
  onSubmit,
  accessibilityLabel = 'Søg',
}: SearchFieldProps) {
  const { theme } = useGrundtoneTheme();
  const inputRef = useRef<TextInput>(null);

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'stretch',
    opacity: disabled ? 0.5 : 1,
  };

  const inputStyle: TextStyle = {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.borderMedium ?? theme.colors.text,
    borderRightWidth: 0,
    borderTopLeftRadius: rem(theme.radius.md),
    borderBottomLeftRadius: rem(theme.radius.md),
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontSize: rem(theme.typography.fontSize.base),
    paddingVertical: rem(theme.spacing.sm),
    paddingHorizontal: rem(theme.spacing.md),
  };

  const buttonStyle: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderTopRightRadius: rem(theme.radius.md),
    borderBottomRightRadius: rem(theme.radius.md),
    paddingHorizontal: rem(theme.spacing.md),
    paddingVertical: rem(theme.spacing.sm),
  };

  const buttonTextStyle: TextStyle = {
    color: '#fff',
    fontSize: rem(theme.typography.fontSize.sm),
    fontWeight: String(theme.typography.fontWeight.medium) as '500',
  };

  return (
    <View style={containerStyle}>
      <TextInput
        ref={inputRef}
        style={inputStyle}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary ?? theme.colors.text}
        editable={!disabled}
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={() => onSubmit?.(value)}
        accessibilityLabel={accessibilityLabel}
      />
      <Pressable
        style={buttonStyle}
        onPress={() => onSubmit?.(value)}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel="Søg"
      >
        <Text style={buttonTextStyle}>🔍</Text>
      </Pressable>
    </View>
  );
}
