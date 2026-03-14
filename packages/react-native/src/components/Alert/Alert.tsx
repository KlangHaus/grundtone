import React from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import { GTIcon } from '../Icon';
import type { AlertProps } from './types';

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

/**
 * GTAlert — status message component driven by Grundtone theme tokens.
 *
 * Static alerts for info, success, warning, and error messages.
 *
 * @example
 * <GTAlert variant="info" icon="info-circle">
 *   <Text>This is an informational message.</Text>
 * </GTAlert>
 */
export function GTAlert({
  variant,
  heading,
  icon,
  dismissible = false,
  onDismiss,
  accessibilityLabel,
  children,
  footer,
}: AlertProps) {
  const { theme } = useGrundtoneTheme();

  const borderColor = {
    info: theme.colors.info,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
  }[variant];

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: rem(theme.spacing.md),
    padding: rem(theme.spacing.md),
    borderRadius: rem(theme.radius.lg),
    borderWidth: 1,
    borderColor,
    backgroundColor: hexAlpha(borderColor, 0.12),
  };

  const iconStyle: ViewStyle = {
    alignSelf: 'center',
  };

  const contentStyle: ViewStyle = {
    flex: 1,
  };

  const headingStyle: TextStyle = {
    fontWeight: theme.typography.fontWeight.semibold as TextStyle['fontWeight'],
    fontFamily: theme.typography.fontFamily.base,
    fontSize: rem(theme.typography.fontSize.sm),
    color: theme.colors.text,
    marginBottom: rem(theme.spacing.xs),
  };

  const footerStyle: ViewStyle = {
    marginTop: rem(theme.spacing.lg),
    paddingTop: rem(theme.spacing.lg),
    borderTopWidth: 1,
    borderTopColor: theme.colors.text,
    opacity: 0.3,
  };

  const closeStyle: ViewStyle = {
    opacity: 0.7,
  };

  return (
    <View
      style={containerStyle}
      accessibilityRole="alert"
      accessibilityLabel={accessibilityLabel}
    >
      {icon ? (
        <View style={iconStyle}>
          <GTIcon name={icon} size="lg" color={theme.colors.text} />
        </View>
      ) : null}

      <View style={contentStyle}>
        {heading ? <Text style={headingStyle}>{heading}</Text> : null}
        <View>{children}</View>
        {footer ? <View style={footerStyle}>{footer}</View> : null}
      </View>

      {dismissible ? (
        <Pressable
          style={closeStyle}
          onPress={onDismiss}
          accessibilityLabel="Close"
          accessibilityRole="button"
        >
          <GTIcon name="close" size="xs" color={theme.colors.text} />
        </Pressable>
      ) : null}
    </View>
  );
}
