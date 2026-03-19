import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { DetailsProps } from './types';

/** Parse rem string to pixel number (base 16) */
function rem(value: string): number {
  return parseFloat(value) * 16;
}

/**
 * GTDetails — disclosure component driven by Grundtone theme tokens.
 *
 * Pressable summary that reveals/hides content. Three variants:
 * default (border-left accent), subtle (inline), card (boxed).
 *
 * @example
 * <GTDetails summary="More info">
 *   <Text>Hidden content revealed on press.</Text>
 * </GTDetails>
 */
export function GTDetails({
  summary,
  variant = 'default',
  open: initialOpen = false,
  accessibilityLabel,
  children,
}: DetailsProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const { theme } = useGrundtoneTheme();

  const isCard = variant === 'card';
  const isSubtle = variant === 'subtle';

  const containerStyle: ViewStyle = {
    ...(isCard && {
      backgroundColor: theme.colors.surfaceAlt,
      borderRadius: rem(theme.radius.xl),
      padding: rem(theme.spacing.md),
      paddingHorizontal: rem(theme.spacing.lg),
    }),
  };

  const summaryStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rem(theme.spacing.sm),
  };

  const summaryTextStyle: TextStyle = {
    fontFamily: theme.typography.fontFamily.base,
    fontSize: rem(theme.typography.fontSize.sm),
    fontWeight: (isCard
      ? theme.typography.fontWeight.semibold
      : isSubtle
        ? theme.typography.fontWeight.normal
        : theme.typography.fontWeight.medium) as TextStyle['fontWeight'],
    color: isCard
      ? theme.colors.text
      : isSubtle
        ? theme.colors.textSecondary
        : theme.colors.primary,
  };

  const arrowStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.xs),
    color: summaryTextStyle.color,
    transform: [{ rotate: isOpen ? '90deg' : '0deg' }],
  };

  const bodyStyle: ViewStyle = {
    paddingTop: rem(theme.spacing.sm),
    ...(variant === 'default' && {
      paddingLeft: rem(theme.spacing.md),
      borderLeftWidth: 2,
      borderLeftColor: theme.colors.primary,
      marginLeft: 2,
    }),
  };

  return (
    <View style={containerStyle} accessibilityLabel={accessibilityLabel}>
      <Pressable
        style={summaryStyle}
        onPress={() => setIsOpen(prev => !prev)}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Text style={arrowStyle}>▶</Text>
        <Text style={summaryTextStyle}>{summary}</Text>
      </Pressable>
      {isOpen ? <View style={bodyStyle}>{children}</View> : null}
    </View>
  );
}
