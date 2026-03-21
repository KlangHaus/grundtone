import React from 'react';
import { Text, Pressable, type TextStyle } from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { BackLinkProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

/**
 * GTBackLink — back navigation with chevron icon.
 * On RN, label is optional (icon-only for Android-style).
 */
export function GTBackLink({ label, onPress }: BackLinkProps) {
  const { theme } = useGrundtoneTheme();

  const textStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    fontWeight: String(theme.typography.fontWeight.medium) as '500',
    color: theme.colors.primary,
  };

  const chevronStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.base),
    color: theme.colors.primary,
    marginRight: label ? rem(theme.spacing.xs) : 0,
  };

  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center' }}
      accessibilityRole="link"
      accessibilityLabel={label ?? 'Tilbage'}
    >
      <Text style={chevronStyle}>‹</Text>
      {label && <Text style={textStyle}>{label}</Text>}
    </Pressable>
  );
}
