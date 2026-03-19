import React, { createContext, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { AccordionProps, AccordionVariant } from './types';

/** Parse rem string to pixel number (base 16) */
function rem(value: string): number {
  return parseFloat(value) * 16;
}

type SetOpen = React.Dispatch<React.SetStateAction<boolean>>;

export const AccordionContext = createContext<{
  variant: AccordionVariant;
  register: (setter: SetOpen) => void;
  unregister: (setter: SetOpen) => void;
} | null>(null);

export function GTAccordion({
  variant = 'default',
  showToggleAll = true,
  toggleAllLabelOpen = 'Vis alle',
  toggleAllLabelClose = 'Skjul alle',
  accessibilityLabel,
  children,
}: AccordionProps) {
  const [allOpen, setAllOpen] = useState(false);
  const { theme } = useGrundtoneTheme();
  const settersRef = useRef<Set<SetOpen>>(new Set());

  const register = useCallback((setter: SetOpen) => {
    settersRef.current.add(setter);
  }, []);

  const unregister = useCallback((setter: SetOpen) => {
    settersRef.current.delete(setter);
  }, []);

  function toggleAll() {
    const next = !allOpen;
    setAllOpen(next);
    for (const setter of settersRef.current) {
      setter(next);
    }
  }

  const isBordered = variant === 'bordered';
  const isCard = variant === 'card';

  const containerStyle: ViewStyle = {
    ...(isBordered && {
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      borderRadius: rem(theme.radius.lg),
      overflow: 'hidden',
    }),
    ...(isCard && {
      backgroundColor: theme.colors.surfaceAlt,
      borderRadius: rem(theme.radius.xl),
      paddingHorizontal: rem(theme.spacing.lg),
      paddingVertical: rem(theme.spacing.sm),
    }),
  };

  const toggleStyle: ViewStyle = {
    paddingVertical: rem(theme.spacing.xs),
    paddingHorizontal: isBordered ? rem(theme.spacing.md) : 0,
    ...(isBordered && {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
    }),
  };

  const toggleTextStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.xs),
    fontWeight: theme.typography.fontWeight.medium as TextStyle['fontWeight'],
    fontFamily: theme.typography.fontFamily.base,
    color: theme.colors.primary,
    letterSpacing: 0.4,
  };

  return (
    <AccordionContext.Provider value={{ variant, register, unregister }}>
      <View style={containerStyle} accessibilityLabel={accessibilityLabel}>
        {showToggleAll ? (
          <Pressable style={toggleStyle} onPress={toggleAll}>
            <Text style={toggleTextStyle}>
              {allOpen ? toggleAllLabelClose : toggleAllLabelOpen}
            </Text>
          </Pressable>
        ) : null}
        {children}
      </View>
    </AccordionContext.Provider>
  );
}
