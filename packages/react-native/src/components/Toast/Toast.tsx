import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { ToastProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTToast({
  variant = 'default',
  message,
  description,
  duration = 5000,
  dismissible = true,
  onDismiss,
}: ToastProps) {
  const { theme } = useGrundtoneTheme();
  const countdown = useRef(new Animated.Value(1)).current;

  const variantColors: Record<string, string> = {
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
    info: theme.colors.info,
    default: theme.colors.textSecondary ?? theme.colors.text,
  };

  useEffect(() => {
    if (duration <= 0) return;
    const anim = Animated.timing(countdown, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    });
    anim.start(({ finished }) => {
      if (finished) onDismiss?.();
    });
    return () => anim.stop();
  }, [duration, countdown, onDismiss]);

  const containerStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderMedium ?? theme.colors.text,
    borderRadius: rem(theme.radius.lg),
    padding: rem(theme.spacing.md),
    paddingRight: rem(theme.spacing.lg),
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: rem(theme.spacing.sm),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
    minWidth: 300,
  };

  const messageStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    fontWeight: String(theme.typography.fontWeight.medium) as '500',
    color: theme.colors.text,
  };

  const descStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.xs),
    color: theme.colors.textSecondary ?? theme.colors.text,
    marginTop: rem(theme.spacing.xs),
  };

  const countdownStyle: ViewStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: variantColors[variant],
    borderBottomLeftRadius: rem(theme.radius.lg),
  };

  const countdownWidth = countdown.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={containerStyle}
      accessibilityRole={
        variant === 'error' || variant === 'warning' ? 'alert' : 'summary'
      }
      accessibilityLiveRegion={
        variant === 'error' || variant === 'warning' ? 'assertive' : 'polite'
      }
    >
      <View style={{ flex: 1 }}>
        <Text style={messageStyle}>{message}</Text>
        {description && <Text style={descStyle}>{description}</Text>}
      </View>

      {dismissible && (
        <Pressable
          onPress={onDismiss}
          accessibilityLabel="Luk"
          accessibilityRole="button"
          hitSlop={8}
        >
          <Text
            style={{
              color: theme.colors.textSecondary ?? theme.colors.text,
              fontSize: 16,
            }}
          >
            ×
          </Text>
        </Pressable>
      )}

      {duration > 0 && (
        <Animated.View style={[countdownStyle, { width: countdownWidth }]} />
      )}
    </View>
  );
}
