import React, { useContext, useEffect, useRef } from 'react';
import { Animated, type ViewStyle } from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import { TabsContext } from './Tabs';
import type { TabPanelProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTTabPanel({ id, children }: TabPanelProps) {
  const ctx = useContext(TabsContext);
  const { theme } = useGrundtoneTheme();
  const isActive = ctx?.activeTab === id;

  const opacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const translateX = useRef(new Animated.Value(isActive ? 0 : 16)).current;

  useEffect(() => {
    if (isActive) {
      translateX.setValue(16);
      opacity.setValue(0);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive, opacity, translateX]);

  if (!isActive) return null;

  const style: ViewStyle = {
    paddingTop: rem(theme.spacing.lg),
  };

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateX }] }]}>
      {children}
    </Animated.View>
  );
}
