import React from 'react';
import { View, Text, type ViewStyle, type TextStyle } from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import { GTIcon } from '../Icon';
import type { BadgeProps } from './types';

/** Parse rem string to pixel number (base 16) */
function rem(value: string): number {
  return parseFloat(value) * 16;
}

/** Convert hex color to rgba with alpha */
function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const variantColorMap = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const;

/**
 * GTBadge — non-interactive status indicator driven by Grundtone theme tokens.
 *
 * @example
 * <GTBadge variant="success" dot>Active</GTBadge>
 */
export function GTBadge({
  variant = 'neutral',
  size = 'md',
  icon,
  dot = false,
  accessibilityLabel,
  children,
}: BadgeProps) {
  const { theme } = useGrundtoneTheme();

  const isNeutral = variant === 'neutral';
  const colorKey = isNeutral ? null : variantColorMap[variant];
  const accentColor = colorKey
    ? theme.colors[colorKey]
    : theme.colors.textSecondary;
  const bgColor = isNeutral
    ? theme.colors.surfaceAlt
    : hexAlpha(accentColor, 0.14);

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rem(theme.spacing.xs),
    borderRadius: 9999,
    paddingHorizontal:
      size === 'sm' ? rem(theme.spacing.sm) : rem(theme.spacing.md),
    paddingVertical: size === 'sm' ? 1 : rem(theme.spacing.xs),
    backgroundColor: bgColor,
    alignSelf: 'flex-start',
  };

  const textStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.xs),
    fontWeight: theme.typography.fontWeight.semibold as TextStyle['fontWeight'],
    fontFamily: theme.typography.fontFamily.base,
    color: accentColor,
    letterSpacing: 0.4,
  };

  const dotStyle: ViewStyle = {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: accentColor,
  };

  return (
    <View
      style={containerStyle}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel}
    >
      {dot ? <View style={dotStyle} /> : null}
      {icon ? <GTIcon name={icon} size="xs" /> : null}
      <Text style={textStyle}>{children}</Text>
    </View>
  );
}
