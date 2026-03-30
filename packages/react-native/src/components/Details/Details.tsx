import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
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
 * Pressable summary that reveals/hides content with animated height transition.
 * Three variants: default (border-left accent), subtle (inline), card (boxed).
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

  const animValue = useRef(new Animated.Value(initialOpen ? 1 : 0)).current;
  const contentHeight = useRef(0);

  const onContentLayout = useCallback(
    (e: { nativeEvent: { layout: { height: number } } }) => {
      contentHeight.current = e.nativeEvent.layout.height;
    },
    [],
  );

  function toggle() {
    const toOpen = !isOpen;
    setIsOpen(toOpen);
    Animated.timing(animValue, {
      toValue: toOpen ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }

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

  const arrowRotation = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const maxHeight = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  const opacity = animValue.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 0, 1],
  });

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
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Animated.Text
          style={{
            fontSize: rem(theme.typography.fontSize.xs),
            color: summaryTextStyle.color,
            transform: [{ rotate: arrowRotation }],
          }}
        >
          ▶
        </Animated.Text>
        <Text style={summaryTextStyle}>{summary}</Text>
      </Pressable>
      <Animated.View style={{ maxHeight, opacity, overflow: 'hidden' }}>
        <View onLayout={onContentLayout} style={bodyStyle}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
