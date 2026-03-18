import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import { shadowToRN } from '../../shadows';
import type { CardProps } from './types';

/** Parse rem string to pixel number (base 16) */
function rem(value: string): number {
  return parseFloat(value) * 16;
}

/**
 * GTCard — content grouping and navigation card driven by Grundtone theme tokens.
 *
 * @example
 * <GTCard title="Getting Started">
 *   <Text>Learn how to set up Grundtone.</Text>
 * </GTCard>
 */
export function GTCard({
  variant = 'raised',
  nav = false,
  onPress,
  horizontal = false,
  subheading,
  title,
  image,
  imageAlt,
  accessibilityLabel,
  children,
  footer,
}: CardProps) {
  const { theme } = useGrundtoneTheme();

  const baseStyle: ViewStyle = {
    flexDirection: horizontal ? 'row' : 'column',
    borderRadius: rem(theme.radius.lg),
    overflow: 'hidden',
  };

  // Variant styles
  if (variant === 'raised') {
    baseStyle.backgroundColor = theme.colors.surfaceRaised;
    Object.assign(baseStyle, shadowToRN(theme.shadowDefinitions.sm));
  } else if (variant === 'bordered') {
    baseStyle.backgroundColor = theme.colors.surface;
    baseStyle.borderWidth = 1;
    baseStyle.borderColor = theme.colors.borderLight;
  } else {
    baseStyle.backgroundColor = 'transparent';
  }

  const mediaStyle: ViewStyle = horizontal
    ? { width: 100, overflow: 'hidden', flexShrink: 0 }
    : { aspectRatio: 16 / 9 };

  const imageStyle: ImageStyle = horizontal
    ? {
        width: 100,
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
      }
    : { width: '100%', height: '100%', resizeMode: 'cover' };

  const contentStyle: ViewStyle = {
    flex: 1,
    padding: horizontal ? rem(theme.spacing.sm) : rem(theme.spacing.lg),
    gap: horizontal ? 2 : rem(theme.spacing.xs),
    justifyContent: horizontal ? 'center' : 'flex-start',
  };

  const subheadingStyle: TextStyle = {
    fontSize: rem(
      horizontal ? theme.typography.fontSize.xs : theme.typography.fontSize.sm,
    ),
    fontWeight: theme.typography.fontWeight.medium as TextStyle['fontWeight'],
    fontFamily: theme.typography.fontFamily.base,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  };

  const titleStyle: TextStyle = {
    fontSize: rem(
      horizontal
        ? theme.typography.fontSize.base
        : theme.typography.fontSize.lg,
    ),
    fontWeight: theme.typography.fontWeight.semibold as TextStyle['fontWeight'],
    fontFamily: theme.typography.fontFamily.base,
    color: theme.colors.text,
  };

  const footerStyle: ViewStyle = {
    marginTop: 'auto' as unknown as number,
    paddingTop: rem(theme.spacing.md),
  };

  const content = (
    <>
      {image ? (
        <View style={mediaStyle}>
          <Image
            source={typeof image === 'string' ? { uri: image } : image}
            style={imageStyle}
            resizeMode="cover"
            accessibilityLabel={imageAlt}
          />
        </View>
      ) : null}

      <View style={contentStyle}>
        {subheading ? <Text style={subheadingStyle}>{subheading}</Text> : null}
        <Text style={titleStyle}>{title}</Text>
        {children ? <View>{children}</View> : null}
        {footer ? <View style={footerStyle}>{footer}</View> : null}
      </View>
    </>
  );

  if (nav) {
    return (
      <Pressable
        style={({ pressed }) => [baseStyle, pressed && { opacity: 0.9 }]}
        onPress={onPress}
        accessibilityRole="link"
        accessibilityLabel={accessibilityLabel}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={baseStyle} accessibilityLabel={accessibilityLabel}>
      {content}
    </View>
  );
}
