import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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
 * Help text and error messages are placed between label and input,
 * following form field best practices.
 *
 * @example
 * <GTInput value={name} onChangeText={setName} label="Name" />
 * <GTInput value={email} onChangeText={setEmail} type="email" errorText="Invalid email" />
 * <GTInput value={amount} onChangeText={setAmount} prefix="kr." label="Amount" />
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
  optionalLabel,
  block = false,
  maxLength,
  prefix,
  suffix,
  accessibilityLabel,
}: InputProps) {
  const { theme } = useGrundtoneTheme();
  const [isFocused, setIsFocused] = useState(false);

  const sp = (key: keyof typeof theme.spacing) => rem(theme.spacing[key]);
  const fs = (key: keyof typeof theme.typography.fontSize) =>
    rem(theme.typography.fontSize[key]);
  const fw = (key: keyof typeof theme.typography.fontWeight) =>
    `${theme.typography.fontWeight[key]}` as TextStyle['fontWeight'];

  const sizeStyles = getSizeStyles(size, theme);
  const radiusStyle = getRadiusStyle(rounded, theme.radius);

  const borderColor = errorText
    ? theme.colors.error
    : isFocused
      ? theme.colors.primary
      : theme.colors.borderMedium;

  const inputStyle: ViewStyle & TextStyle = {
    borderWidth: 1,
    ...sizeStyles,
    ...radiusStyle,
    borderColor,
    backgroundColor:
      disabled || readonly ? theme.colors.surfaceAlt : theme.colors.background,
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.base,
    opacity: disabled ? 0.5 : 1,
    ...(block ? { width: '100%' as const } : undefined),
  };

  const hasAffix = !!prefix || !!suffix;

  // When using prefix/suffix, remove border radius from adjacent sides
  const affixInputStyle: ViewStyle & TextStyle = hasAffix
    ? {
        ...inputStyle,
        ...(prefix
          ? {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeftWidth: 0,
            }
          : {}),
        ...(suffix
          ? {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderRightWidth: 0,
            }
          : {}),
        flex: 1,
      }
    : inputStyle;

  const affixStyle: ViewStyle & TextStyle = {
    justifyContent: 'center',
    paddingHorizontal: sp('md'),
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor,
  };

  function handleFocus() {
    setIsFocused(true);
    onFocus?.();
  }

  function handleBlur() {
    setIsFocused(false);
    onBlur?.();
  }

  const textInput = (
    <TextInput
      style={hasAffix ? affixInputStyle : inputStyle}
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
  );

  return (
    <View style={block ? { width: '100%' as const } : undefined}>
      {/* Label */}
      {label ? (
        <Text
          style={{
            marginBottom: sp('xs'),
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.base,
            fontSize: fs('sm'),
            fontWeight: fw('medium'),
          }}
        >
          {label}
          {optionalLabel && !required ? (
            <Text
              style={{
                color: theme.colors.textSecondary,
                fontWeight: fw('normal'),
              }}
            >
              {' '}
              {optionalLabel}
            </Text>
          ) : null}
        </Text>
      ) : null}

      {/* Help text — between label and input */}
      {helpText && !errorText ? (
        <Text
          style={{
            marginBottom: sp('xs'),
            color: theme.colors.textSecondary,
            fontFamily: theme.typography.fontFamily.base,
            fontSize: fs('sm'),
          }}
        >
          {helpText}
        </Text>
      ) : null}

      {/* Error text — between label and input */}
      {errorText ? (
        <Text
          style={{
            marginBottom: sp('xs'),
            color: theme.colors.error,
            fontFamily: theme.typography.fontFamily.base,
            fontSize: fs('sm'),
            fontWeight: fw('semibold'),
          }}
          accessibilityRole="alert"
        >
          {errorText}
        </Text>
      ) : null}

      {/* Input with optional prefix/suffix */}
      {hasAffix ? (
        <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
          {prefix ? (
            <View
              style={[
                affixStyle,
                radiusStyle,
                { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
              ]}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            >
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontFamily: theme.typography.fontFamily.base,
                  fontSize: fs('base'),
                }}
              >
                {prefix}
              </Text>
            </View>
          ) : null}
          {textInput}
          {suffix ? (
            <View
              style={[
                affixStyle,
                radiusStyle,
                { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
              ]}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            >
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontFamily: theme.typography.fontFamily.base,
                  fontSize: fs('base'),
                }}
              >
                {suffix}
              </Text>
            </View>
          ) : null}
        </View>
      ) : (
        textInput
      )}
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
