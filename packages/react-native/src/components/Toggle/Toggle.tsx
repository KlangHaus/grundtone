import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { TOGGLE_SIZES } from '@grundtone/core';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { ToggleProps } from './types';

/** Parse rem string to pixel number (base 16) */
function rem(value: string): number {
  return parseFloat(value) * 16;
}

/**
 * GTToggle — toggle switch component driven by Grundtone theme tokens.
 *
 * A digital on/off button. The choice takes effect immediately.
 *
 * @example
 * <GTToggle value={isDark} onValueChange={setIsDark} label="Dark mode" />
 */
export function GTToggle({
  value = false,
  onValueChange,
  label,
  size = 'md',
  disabled = false,
  accessibilityLabel,
}: ToggleProps) {
  const { theme } = useGrundtoneTheme();

  const dims = TOGGLE_SIZES[size];
  const thumbOffset = 2;
  const thumbTravel = dims.width - dims.thumb - thumbOffset * 2;

  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  function handlePress() {
    if (disabled) return;
    onValueChange?.(!value);
  }

  const fieldStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rem(theme.spacing.sm),
    opacity: disabled ? 0.5 : 1,
  };

  const labelStyle: TextStyle = {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.base,
    fontSize: rem(theme.typography.fontSize.sm),
    fontWeight: theme.typography.fontWeight.medium as TextStyle['fontWeight'],
  };

  const trackBg = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.borderMedium, theme.colors.primary],
  });

  const thumbTranslate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, thumbTravel],
  });

  return (
    <View style={fieldStyle}>
      {label ? <Text style={labelStyle}>{label}</Text> : null}
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="switch"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ checked: value, disabled }}
      >
        <Animated.View
          style={{
            width: dims.width,
            height: dims.height,
            borderRadius: 9999,
            backgroundColor: trackBg,
            justifyContent: 'center',
          }}
        >
          <Animated.View
            style={{
              position: 'absolute',
              width: dims.thumb,
              height: dims.thumb,
              borderRadius: 9999,
              backgroundColor: theme.colors.background,
              left: thumbOffset,
              transform: [{ translateX: thumbTranslate }],
            }}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}
