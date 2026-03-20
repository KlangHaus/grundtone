import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { SpinnerProps } from './types';

/** Parse rem string to pixel number (base 16) */
function rem(value: string): number {
  return parseFloat(value) * 16;
}

/**
 * GTSpinner — loading indicator driven by Grundtone theme tokens.
 *
 * Animated rotating circle with optional text.
 * Uses the same border-trick as the web version for visual parity.
 *
 * @example
 * <GTSpinner size="lg" text="Henter data…" />
 */
export function GTSpinner({
  size = 'sm',
  variant = 'dark',
  text,
  accessibilityLabel = 'Indlæser…',
}: SpinnerProps) {
  const { theme } = useGrundtoneTheme();
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 750,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const circleSize = size === 'lg' ? rem(theme.spacing['3xl'] ?? '3rem') : 20;
  const borderWidth = size === 'lg' ? 4 : 2;

  const borderColor =
    variant === 'light'
      ? theme.colors.background
      : (theme.colors.textSecondary ?? theme.colors.text);

  const container: ViewStyle = {
    alignItems: 'center',
    gap: rem(theme.spacing.sm),
    flexDirection: size === 'lg' ? 'column' : 'row',
  };

  const circleStyle: ViewStyle = {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    borderWidth,
    borderColor,
    borderRightColor: 'transparent',
    transform: [{ rotate: spin as unknown as string }],
  };

  const textStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    color: theme.colors.textSecondary ?? theme.colors.text,
  };

  return (
    <View
      style={container}
      accessibilityRole="progressbar"
      accessibilityLabel={text ?? accessibilityLabel}
    >
      <Animated.View style={circleStyle} />
      {text ? <Text style={textStyle}>{text}</Text> : null}
    </View>
  );
}
