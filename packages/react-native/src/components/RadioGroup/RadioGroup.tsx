import React from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { RadioGroupProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTRadioGroup({
  value,
  options,
  label,
  helpText,
  errorText,
  disabled = false,
  onValueChange,
  accessibilityLabel,
}: RadioGroupProps) {
  const { theme } = useGrundtoneTheme();

  const legendStyle: TextStyle = {
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

  const optionStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: rem(theme.spacing.sm),
    opacity: disabled ? 0.5 : 1,
  };

  const indicatorBase: ViewStyle = {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: errorText
      ? theme.colors.error
      : (theme.colors.borderMedium ?? theme.colors.text),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  };

  const innerDot: ViewStyle = {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.background,
  };

  const labelStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.base),
    color: theme.colors.text,
  };

  const optionHintStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    color: theme.colors.textSecondary ?? theme.colors.text,
  };

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel ?? label}
    >
      {label && <Text style={legendStyle}>{label}</Text>}
      {helpText && !errorText && <Text style={hintStyle}>{helpText}</Text>}
      {errorText && (
        <Text style={errorStyle} accessibilityRole="alert">
          {errorText}
        </Text>
      )}
      <View style={{ gap: rem(theme.spacing.sm) }}>
        {options.map(option => {
          const checked = value === option.value;
          const isDisabled = disabled || option.disabled;
          return (
            <Pressable
              key={option.value}
              style={[optionStyle, isDisabled && { opacity: 0.5 }]}
              onPress={() => !isDisabled && onValueChange?.(option.value)}
              accessibilityRole="radio"
              accessibilityState={{ checked, disabled: isDisabled }}
              accessibilityLabel={option.label}
              disabled={isDisabled}
            >
              <View
                style={[
                  indicatorBase,
                  checked && {
                    borderColor: theme.colors.primary,
                    backgroundColor: theme.colors.primary,
                  },
                ]}
              >
                {checked && <View style={innerDot} />}
              </View>
              <View style={{ flex: 1, gap: rem(theme.spacing.xs) }}>
                <Text style={labelStyle}>{option.label}</Text>
                {option.hint && (
                  <Text style={optionHintStyle}>{option.hint}</Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
