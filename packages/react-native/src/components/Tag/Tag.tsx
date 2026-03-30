import React from 'react';
import { Text, Pressable, type ViewStyle, type TextStyle } from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { TagProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTTag({
  label,
  value,
  selected = false,
  dismissible = false,
  disabled = false,
  size = 'md',
  onPress,
  onDismiss,
}: TagProps) {
  const { theme } = useGrundtoneTheme();

  const isSm = size === 'sm';

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rem(theme.spacing.xs),
    borderWidth: 1,
    borderColor: selected
      ? theme.colors.primary
      : (theme.colors.borderMedium ?? theme.colors.text),
    borderRadius: 999,
    backgroundColor: selected ? theme.colors.primary : theme.colors.background,
    paddingVertical: isSm ? 1 : rem(theme.spacing.xs),
    paddingHorizontal: isSm ? rem(theme.spacing.sm) : rem(theme.spacing.md),
    opacity: disabled ? 0.5 : 1,
  };

  const labelStyle: TextStyle = {
    fontSize: isSm
      ? rem(theme.typography.fontSize.xs)
      : rem(theme.typography.fontSize.sm),
    color: selected ? '#fff' : theme.colors.text,
  };

  const dismissStyle: TextStyle = {
    fontSize: isSm
      ? rem(theme.typography.fontSize.xs)
      : rem(theme.typography.fontSize.sm),
    color: selected ? '#fff' : theme.colors.text,
    opacity: 0.6,
    marginLeft: -2,
  };

  return (
    <Pressable
      style={containerStyle}
      onPress={() => !disabled && onPress?.(value)}
      disabled={disabled}
      accessibilityRole={selected !== undefined ? 'checkbox' : 'button'}
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={label}
    >
      <Text style={labelStyle}>{label}</Text>
      {dismissible && (
        <Pressable
          onPress={() => !disabled && onDismiss?.(value)}
          accessibilityLabel={`Fjern ${label}`}
          accessibilityRole="button"
          disabled={disabled}
          hitSlop={8}
        >
          <Text style={dismissStyle}>×</Text>
        </Pressable>
      )}
    </Pressable>
  );
}
