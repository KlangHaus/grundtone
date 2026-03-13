import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonRadius,
} from './types';

/** Parse rem string to pixel number (base 16) */
function rem(value: string): number {
  return parseFloat(value) * 16;
}

/**
 * GTButton — pressable button component driven by Grundtone theme tokens.
 *
 * @example
 * <GTButton onPress={handleSave}>Save</GTButton>
 * <GTButton variant="negative" onPress={handleDelete}>Delete</GTButton>
 * <GTButton variant="outlined" size="lg" loading>Processing</GTButton>
 */
export function GTButton({
  variant = 'primary',
  size = 'md',
  rounded,
  disabled = false,
  loading = false,
  block = false,
  onPress,
  accessibilityLabel,
  children,
}: ButtonProps) {
  const { theme } = useGrundtoneTheme();

  const isDisabled = disabled || loading;

  const variantStyles = getVariantStyles(variant, theme.colors);
  const sizeStyles = getSizeStyles(size, theme);
  const radiusStyle = getRadiusStyle(rounded, theme.radius);

  const containerStyle: ViewStyle = {
    ...styles.base,
    ...variantStyles.container,
    ...sizeStyles.container,
    ...radiusStyle,
    ...(block ? styles.block : undefined),
    ...(isDisabled ? styles.disabled : undefined),
  };

  const textStyle: TextStyle = {
    ...sizeStyles.text,
    ...variantStyles.text,
    fontFamily: theme.typography.fontFamily.base,
    fontWeight:
      `${theme.typography.fontWeight.medium}` as TextStyle['fontWeight'],
  };

  const spinnerColor = variantStyles.text.color as string;

  function handlePress() {
    if (isDisabled) return;
    onPress?.();
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={({ pressed }) => [
        containerStyle,
        pressed && !isDisabled ? variantStyles.pressed : undefined,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : typeof children === 'string' ? (
        <Text style={textStyle}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

function getVariantStyles(
  variant: ButtonVariant,
  colors: ReturnType<typeof useGrundtoneTheme>['theme']['colors'],
): { container: ViewStyle; text: TextStyle; pressed: ViewStyle } {
  switch (variant) {
    case 'primary':
      return {
        container: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        text: { color: colors.onPrimary },
        pressed: { backgroundColor: colors.primaryDark },
      };
    case 'secondary':
      return {
        container: {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        },
        text: { color: colors.text },
        pressed: { backgroundColor: colors.secondaryDark },
      };
    case 'outlined':
      return {
        container: {
          backgroundColor: 'transparent',
          borderColor: colors.borderMedium,
        },
        text: { color: colors.primary },
        pressed: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
      };
    case 'negative':
      return {
        container: {
          backgroundColor: colors.error,
          borderColor: colors.error,
        },
        text: { color: colors.onPrimary },
        pressed: { backgroundColor: colors.errorDark },
      };
    case 'unstyled':
      return {
        container: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
          paddingHorizontal: 0,
          paddingVertical: 0,
        },
        text: { color: colors.text },
        pressed: {},
      };
  }
}

function getSizeStyles(
  size: ButtonSize,
  theme: ReturnType<typeof useGrundtoneTheme>['theme'],
): { container: ViewStyle; text: TextStyle } {
  switch (size) {
    case 'sm':
      return {
        container: {
          paddingVertical: rem(theme.spacing.xs),
          paddingHorizontal: rem(theme.spacing.sm),
        },
        text: { fontSize: rem(theme.typography.fontSize.sm) },
      };
    case 'md':
      return {
        container: {
          paddingVertical: rem(theme.spacing.sm),
          paddingHorizontal: rem(theme.spacing.md),
        },
        text: { fontSize: rem(theme.typography.fontSize.base) },
      };
    case 'lg':
      return {
        container: {
          paddingVertical: rem(theme.spacing.md),
          paddingHorizontal: rem(theme.spacing.xl),
        },
        text: { fontSize: rem(theme.typography.fontSize.lg) },
      };
  }
}

function getRadiusStyle(
  rounded: ButtonRadius | undefined,
  radius: ReturnType<typeof useGrundtoneTheme>['theme']['radius'],
): ViewStyle {
  if (!rounded) return { borderRadius: rem(radius.md) };
  if (rounded === 'full') return { borderRadius: 9999 };
  if (rounded === 'none') return { borderRadius: 0 };
  return { borderRadius: rem(radius[rounded]) };
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    gap: 4,
  },
  block: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});
