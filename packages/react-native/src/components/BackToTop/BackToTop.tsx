import React from 'react';
import { Text, Pressable, type ViewStyle, type TextStyle } from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { BackToTopProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTBackToTop({ label, scrollRef }: BackToTopProps) {
  const { theme } = useGrundtoneTheme();

  function handlePress() {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }

  const containerStyle: ViewStyle = {
    position: 'absolute',
    bottom: rem(theme.spacing.lg),
    right: rem(theme.spacing.lg),
    flexDirection: 'row',
    alignItems: 'center',
    gap: rem(theme.spacing.xs),
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderMedium ?? theme.colors.text,
    borderRadius: 999,
    paddingVertical: rem(theme.spacing.sm),
    paddingHorizontal: rem(theme.spacing.md),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  };

  const iconStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.base),
    color: theme.colors.text,
  };

  const labelStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    fontWeight: String(theme.typography.fontWeight.medium) as '500',
    color: theme.colors.text,
  };

  return (
    <Pressable
      style={containerStyle}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={label ?? 'Til toppen'}
    >
      <Text style={iconStyle}>↑</Text>
      {label && <Text style={labelStyle}>{label}</Text>}
    </Pressable>
  );
}
