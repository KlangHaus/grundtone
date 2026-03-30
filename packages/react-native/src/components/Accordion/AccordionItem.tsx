import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import { AccordionContext } from './Accordion';
import type { AccordionItemProps } from './types';

/** Parse rem string to pixel number (base 16) */
function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTAccordionItem({
  heading,
  summary,
  open: initialOpen = false,
  children,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const { theme } = useGrundtoneTheme();
  const ctx = useContext(AccordionContext);

  const animValue = useRef(new Animated.Value(initialOpen ? 1 : 0)).current;

  // Register with parent for toggle-all
  useEffect(() => {
    if (ctx) {
      ctx.register(setIsOpen);
      return () => ctx.unregister(setIsOpen);
    }
  }, [ctx]);

  // Sync animation with isOpen (handles both local toggle and parent toggle-all)
  const prevOpen = useRef(initialOpen);
  useEffect(() => {
    if (isOpen !== prevOpen.current) {
      prevOpen.current = isOpen;
      Animated.timing(animValue, {
        toValue: isOpen ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [isOpen, animValue]);

  function toggle() {
    setIsOpen(prev => !prev);
  }

  const variant = ctx?.variant ?? 'default';
  const isBordered = variant === 'bordered';
  const isCard = variant === 'card';

  const itemStyle: ViewStyle = {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  };

  const headerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rem(theme.spacing.sm),
    paddingVertical: rem(theme.spacing.md),
    paddingHorizontal: isBordered
      ? rem(theme.spacing.md)
      : isCard
        ? rem(theme.spacing.xs)
        : 0,
  };

  const iconStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    color: theme.colors.primary,
    fontWeight: '700',
    width: 20,
    textAlign: 'center',
  };

  const headingStyle: TextStyle = {
    flex: 1,
    fontSize: rem(theme.typography.fontSize.sm),
    fontWeight: theme.typography.fontWeight.semibold as TextStyle['fontWeight'],
    fontFamily: theme.typography.fontFamily.base,
    color: theme.colors.text,
  };

  const summaryTextStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.xs),
    color: theme.colors.textTertiary,
    fontFamily: theme.typography.fontFamily.base,
    marginTop: 2,
  };

  const bodyPaddingLeft = isBordered
    ? rem(theme.spacing.md) + 20 + rem(theme.spacing.sm)
    : isCard
      ? rem(theme.spacing.xs) + 20 + rem(theme.spacing.sm)
      : 20 + rem(theme.spacing.sm);

  const bodyStyle: ViewStyle = {
    paddingBottom: rem(theme.spacing.md),
    paddingLeft: bodyPaddingLeft,
  };

  const maxHeight = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  const opacity = animValue.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <View style={itemStyle}>
      <Pressable
        style={headerStyle}
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Text style={iconStyle}>{isOpen ? '−' : '+'}</Text>
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>{heading}</Text>
          {summary ? <Text style={summaryTextStyle}>{summary}</Text> : null}
        </View>
      </Pressable>
      <Animated.View style={{ maxHeight, opacity, overflow: 'hidden' }}>
        <View style={bodyStyle}>{children}</View>
      </Animated.View>
    </View>
  );
}
