import React from 'react';
import { View, Text, TextInput, type TextStyle } from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { TextareaProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTTextarea({
  value = '',
  label,
  helpText,
  errorText,
  placeholder,
  disabled = false,
  maxChars,
  numberOfLines = 4,
  onChangeText,
  accessibilityLabel,
}: TextareaProps) {
  const { theme } = useGrundtoneTheme();

  const remaining = maxChars ? maxChars - value.length : null;
  const isOver = remaining !== null && remaining < 0;

  const labelStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    fontWeight: String(theme.typography.fontWeight.medium) as '500',
    color: theme.colors.text,
    marginBottom: rem(theme.spacing.xs),
  };

  const hintStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    color: theme.colors.textSecondary ?? theme.colors.text,
    marginBottom: rem(theme.spacing.sm),
  };

  const errorStyle: TextStyle = {
    ...hintStyle,
    color: theme.colors.error,
    fontWeight: String(theme.typography.fontWeight.semibold) as '600',
  };

  const inputStyle: TextStyle = {
    borderWidth: 1,
    borderColor:
      errorText || isOver
        ? theme.colors.error
        : (theme.colors.borderMedium ?? theme.colors.text),
    borderRadius: rem(theme.radius.md),
    backgroundColor: disabled
      ? (theme.colors.surfaceAlt ?? theme.colors.surface)
      : theme.colors.background,
    color: theme.colors.text,
    fontSize: rem(theme.typography.fontSize.base),
    padding: rem(theme.spacing.sm),
    textAlignVertical: 'top',
    minHeight:
      numberOfLines * rem(theme.typography.fontSize.base) * 1.5 +
      rem(theme.spacing.sm) * 2,
    opacity: disabled ? 0.5 : 1,
  };

  const countStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    color: isOver
      ? theme.colors.error
      : (theme.colors.textSecondary ?? theme.colors.text),
    fontWeight: isOver
      ? (String(theme.typography.fontWeight.semibold) as '600')
      : undefined,
    marginTop: rem(theme.spacing.xs),
  };

  return (
    <View>
      {label && <Text style={labelStyle}>{label}</Text>}
      {helpText && !errorText && <Text style={hintStyle}>{helpText}</Text>}
      {errorText && (
        <Text style={errorStyle} accessibilityRole="alert">
          {errorText}
        </Text>
      )}
      <TextInput
        style={inputStyle}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary ?? theme.colors.text}
        editable={!disabled}
        multiline
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        accessibilityLabel={accessibilityLabel ?? label}
      />
      {maxChars != null && (
        <Text style={countStyle} accessibilityLiveRegion="polite">
          {remaining! >= 0
            ? `Du har ${remaining} tegn tilbage`
            : `Du har overskredet med ${Math.abs(remaining!)} tegn`}
        </Text>
      )}
    </View>
  );
}
