import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { TooltipProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

/**
 * GTTooltip — long press to show tooltip on RN.
 * Renders as a Modal overlay with dark bubble.
 */
export function GTTooltip({ content, children }: TooltipProps) {
  const { theme } = useGrundtoneTheme();
  const [visible, setVisible] = useState(false);

  const bubbleStyle: ViewStyle = {
    backgroundColor: theme.colors.text,
    borderRadius: rem(theme.radius.md),
    paddingVertical: rem(theme.spacing.xs),
    paddingHorizontal: rem(theme.spacing.sm),
    maxWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  };

  const textStyle: TextStyle = {
    color: theme.colors.background,
    fontSize: rem(theme.typography.fontSize.xs),
    lineHeight: rem(theme.typography.fontSize.xs) * 1.5,
  };

  return (
    <View>
      <Pressable
        onLongPress={() => setVisible(true)}
        delayLongPress={300}
        accessibilityHint={content}
      >
        {children}
      </Pressable>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => setVisible(false)}
        >
          <View style={bubbleStyle}>
            <Text style={textStyle}>{content}</Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
