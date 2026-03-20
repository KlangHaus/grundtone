import React from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { CheckboxGroupProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTCheckboxGroup({
  value = [],
  options,
  label,
  helpText,
  errorText,
  disabled = false,
  onValueChange,
  accessibilityLabel,
}: CheckboxGroupProps) {
  const { theme } = useGrundtoneTheme();

  function toggle(optionValue: string) {
    const current = [...value];
    const idx = current.indexOf(optionValue);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(optionValue);
    onValueChange?.(current);
  }

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
  };

  const indicatorBase: ViewStyle = {
    width: 20,
    height: 20,
    borderRadius: rem(theme.radius.sm),
    borderWidth: 2,
    borderColor: errorText
      ? theme.colors.error
      : (theme.colors.borderMedium ?? theme.colors.text),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  };

  const checkStyle: ViewStyle = {
    width: 10,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: theme.colors.background,
    transform: [{ rotate: '-45deg' }],
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
    <View accessibilityLabel={accessibilityLabel ?? label}>
      {label && <Text style={legendStyle}>{label}</Text>}
      {helpText && !errorText && <Text style={hintStyle}>{helpText}</Text>}
      {errorText && (
        <Text style={errorStyle} accessibilityRole="alert">
          {errorText}
        </Text>
      )}
      <View style={{ gap: rem(theme.spacing.sm) }}>
        {options.map(option => {
          const checked = value.includes(option.value);
          const isDisabled = disabled || option.disabled;
          return (
            <Pressable
              key={option.value}
              style={[optionStyle, isDisabled && { opacity: 0.5 }]}
              onPress={() => !isDisabled && toggle(option.value)}
              accessibilityRole="checkbox"
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
                {checked && <View style={checkStyle} />}
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
