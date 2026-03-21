import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { OverflowMenuProps, OverflowMenuItem } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTOverflowMenu({
  items,
  label,
  onSelect,
  accessibilityLabel = 'Flere muligheder',
}: OverflowMenuProps) {
  const { theme } = useGrundtoneTheme();
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(item: OverflowMenuItem) {
    if (item.disabled) return;
    setIsOpen(false);
    onSelect?.(item);
  }

  const triggerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rem(theme.spacing.xs),
    borderWidth: 1,
    borderColor: theme.colors.borderMedium ?? theme.colors.text,
    borderRadius: rem(theme.radius.md),
    paddingVertical: rem(theme.spacing.xs),
    paddingHorizontal: rem(theme.spacing.sm),
  };

  const triggerText: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    color: theme.colors.text,
  };

  const backdropStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  };

  const panelStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: rem(theme.radius.md),
    borderWidth: 1,
    borderColor: theme.colors.borderMedium ?? theme.colors.text,
    minWidth: 200,
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    paddingVertical: rem(theme.spacing.xs),
  };

  const itemStyle: ViewStyle = {
    paddingVertical: rem(theme.spacing.sm),
    paddingHorizontal: rem(theme.spacing.md),
    flexDirection: 'row',
    alignItems: 'center',
    gap: rem(theme.spacing.sm),
  };

  const itemText: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    color: theme.colors.text,
  };

  return (
    <View>
      <Pressable
        style={triggerStyle}
        onPress={() => setIsOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label ?? accessibilityLabel}
        accessibilityState={{ expanded: isOpen }}
      >
        <Text style={triggerText}>{label ?? '⋯'}</Text>
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={backdropStyle} onPress={() => setIsOpen(false)}>
          <View style={panelStyle}>
            <FlatList
              data={items}
              keyExtractor={(item, i) => item.value ?? String(i)}
              renderItem={({ item }) => (
                <Pressable
                  style={[itemStyle, item.disabled && { opacity: 0.5 }]}
                  onPress={() => handleSelect(item)}
                  disabled={item.disabled}
                  accessibilityRole="menuitem"
                  accessibilityState={{
                    disabled: item.disabled,
                    selected: item.active,
                  }}
                >
                  {item.active && (
                    <Text style={{ color: theme.colors.primary }}>✓</Text>
                  )}
                  <Text
                    style={[
                      itemText,
                      item.active && {
                        fontWeight: String(
                          theme.typography.fontWeight.semibold,
                        ) as '600',
                      },
                      item.danger && { color: theme.colors.error },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
