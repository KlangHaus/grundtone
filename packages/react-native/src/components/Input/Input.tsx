import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type KeyboardTypeOptions,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { InputProps, InputSize, InputRadius, InputType } from './types';

/** Parse rem string to pixel number (base 16) */
function rem(value: string): number {
  return parseFloat(value) * 16;
}

function getKeyboardType(type: InputType): KeyboardTypeOptions {
  switch (type) {
    case 'email':
      return 'email-address';
    case 'number':
      return 'numeric';
    case 'tel':
      return 'phone-pad';
    case 'url':
      return 'url';
    default:
      return 'default';
  }
}

/**
 * GTInput — text input component driven by Grundtone theme tokens.
 *
 * @example
 * <GTInput value={name} onChangeText={setName} label="Name" />
 * <GTInput value={email} onChangeText={setEmail} type="email" errorText="Invalid email" />
 */
export function GTInput({
  value,
  onChangeText,
  onFocus,
  onBlur,
  type = 'text',
  size = 'md',
  rounded,
  placeholder,
  label,
  helpText,
  errorText,
  disabled = false,
  readonly = false,
  required = false,
  block = false,
  maxLength,
  accessibilityLabel,
}: InputProps) {
  const { theme } = useGrundtoneTheme();
  const [isFocused, setIsFocused] = useState(false);

  const sizeStyles = getSizeStyles(size, theme);
  const radiusStyle = getRadiusStyle(rounded, theme.radius);

  const borderColor = errorText
    ? theme.colors.error
    : isFocused
      ? theme.colors.primary
      : theme.colors.borderMedium;

  const inputStyle: ViewStyle & TextStyle = {
    ...styles.input,
    ...sizeStyles,
    ...radiusStyle,
    borderColor,
    backgroundColor:
      disabled || readonly ? theme.colors.surfaceAlt : theme.colors.background,
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.base,
    opacity: disabled ? 0.5 : 1,
    ...(block ? styles.block : undefined),
  };

  function handleFocus() {
    setIsFocused(true);
    onFocus?.();
  }

  function handleBlur() {
    setIsFocused(false);
    onBlur?.();
  }

  return (
    <View style={block ? styles.block : undefined}>
      {label ? (
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
              fontWeight:
                `${theme.typography.fontWeight.medium}` as TextStyle['fontWeight'],
            },
          ]}
        >
          {label}
          {required ? (
            <Text style={{ color: theme.colors.error }}> *</Text>
          ) : null}
        </Text>
      ) : null}

      <TextInput
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        editable={!disabled && !readonly}
        secureTextEntry={type === 'password'}
        keyboardType={getKeyboardType(type)}
        maxLength={maxLength}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled }}
      />

      {errorText ? (
        <Text
          style={[
            styles.errorText,
            {
              color: theme.colors.error,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
              fontWeight:
                `${theme.typography.fontWeight.semibold}` as TextStyle['fontWeight'],
            },
          ]}
          accessibilityRole="alert"
        >
          {errorText}
        </Text>
      ) : helpText ? (
        <Text
          style={[
            styles.helpText,
            {
              color: theme.colors.textSecondary,
              fontFamily: theme.typography.fontFamily.base,
              fontSize: rem(theme.typography.fontSize.sm),
            },
          ]}
        >
          {helpText}
        </Text>
      ) : null}
    </View>
  );
}

function getSizeStyles(
  size: InputSize,
  theme: ReturnType<typeof useGrundtoneTheme>['theme'],
): TextStyle {
  switch (size) {
    case 'sm':
      return {
        fontSize: rem(theme.typography.fontSize.sm),
        paddingVertical: rem(theme.spacing.xs),
        paddingHorizontal: rem(theme.spacing.sm),
      };
    case 'md':
      return {
        fontSize: rem(theme.typography.fontSize.base),
        paddingVertical: rem(theme.spacing.sm),
        paddingHorizontal: rem(theme.spacing.md),
      };
    case 'lg':
      return {
        fontSize: rem(theme.typography.fontSize.lg),
        paddingVertical: rem(theme.spacing.md),
        paddingHorizontal: rem(theme.spacing.xl),
      };
  }
}

function getRadiusStyle(
  rounded: InputRadius | undefined,
  radius: ReturnType<typeof useGrundtoneTheme>['theme']['radius'],
): ViewStyle {
  if (!rounded) return { borderRadius: rem(radius.md) };
  if (rounded === 'full') return { borderRadius: 9999 };
  if (rounded === 'none') return { borderRadius: 0 };
  return { borderRadius: rem(radius[rounded]) };
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
  },
  label: {
    marginBottom: 4,
  },
  helpText: {
    marginTop: 4,
  },
  errorText: {
    marginTop: 4,
  },
  block: {
    width: '100%',
  },
});
