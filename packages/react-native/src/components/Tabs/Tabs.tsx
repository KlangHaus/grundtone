import React, { createContext, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import { GTIcon } from '../Icon';
import type { TabsProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export const TabsContext = createContext<{
  activeTab: string;
} | null>(null);

export function GTTabs({
  tabs,
  activeTab: controlledActive,
  variant = 'underline',
  onTabChange,
  accessibilityLabel,
  children,
}: TabsProps) {
  const [internalActive, setInternalActive] = useState(
    controlledActive ?? tabs[0]?.id ?? '',
  );
  const active = controlledActive ?? internalActive;
  const { theme } = useGrundtoneTheme();

  function selectTab(id: string) {
    setInternalActive(id);
    onTabChange?.(id);
  }

  const isSegment = variant === 'segment';
  const isPill = variant === 'pill';
  const isUnderline = variant === 'underline';

  const listStyle: ViewStyle = {
    flexDirection: 'row',
    ...(isSegment && {
      backgroundColor: theme.colors.surfaceAlt,
      borderRadius: rem(theme.radius.lg),
      padding: 3,
      gap: 2,
    }),
    ...(isPill && {
      gap: rem(theme.spacing.xs),
    }),
    ...(isUnderline && {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
      gap: rem(theme.spacing.xs),
    }),
  };

  function tabStyle(isActive: boolean): ViewStyle {
    const base: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: rem(theme.spacing.xs),
      paddingVertical: rem(theme.spacing.sm),
      paddingHorizontal: rem(theme.spacing.md),
      minHeight: 40,
    };

    if (isSegment) {
      return {
        ...base,
        flex: 1,
        borderRadius: rem(theme.radius.lg) - 2,
        ...(isActive && {
          backgroundColor: theme.colors.surface,
        }),
      };
    }

    if (isPill) {
      return {
        ...base,
        borderRadius: 9999,
        paddingHorizontal: rem(theme.spacing.lg),
        ...(isActive && {
          backgroundColor: theme.colors.primary,
        }),
        ...(!isActive && {
          backgroundColor: 'transparent',
        }),
      };
    }

    // Underline
    return {
      ...base,
      borderBottomWidth: 2,
      borderBottomColor: isActive ? theme.colors.primary : 'transparent',
      marginBottom: -1,
    };
  }

  function tabTextStyle(isActive: boolean): TextStyle {
    const base: TextStyle = {
      fontSize: rem(theme.typography.fontSize.sm),
      fontFamily: theme.typography.fontFamily.base,
      fontWeight: (isActive
        ? theme.typography.fontWeight.semibold
        : theme.typography.fontWeight.medium) as TextStyle['fontWeight'],
    };

    if (isPill && isActive) {
      return { ...base, color: theme.colors.onPrimary };
    }

    return {
      ...base,
      color: isActive ? theme.colors.text : theme.colors.textSecondary,
    };
  }

  return (
    <TabsContext.Provider value={{ activeTab: active }}>
      <View accessibilityLabel={accessibilityLabel}>
        <View style={listStyle} accessibilityRole="tablist">
          {tabs.map(tab => {
            const isActive = active === tab.id;
            return (
              <Pressable
                key={tab.id}
                style={tabStyle(isActive)}
                onPress={() => selectTab(tab.id)}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
              >
                {tab.icon ? <GTIcon name={tab.icon} size="sm" /> : null}
                <Text style={tabTextStyle(isActive)}>{tab.label}</Text>
              </Pressable>
            );
          })}
        </View>
        {children}
      </View>
    </TabsContext.Provider>
  );
}
