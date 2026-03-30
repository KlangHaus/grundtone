import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { ModalProps } from './types';

/** Parse rem string to pixel number (base 16) */
function rem(value: string): number {
  return parseFloat(value) * 16;
}

/**
 * GTModal — dialog component driven by Grundtone theme tokens.
 *
 * Uses React Native's built-in Modal with theme-aware styling.
 * Supports fade and slide-up transitions.
 *
 * @example
 * <GTModal open={showModal} title="Confirm" onClose={() => setShowModal(false)}
 *   footer={<GTButton onPress={() => setShowModal(false)}>OK</GTButton>}
 * >
 *   <Text>Are you sure?</Text>
 * </GTModal>
 */
export function GTModal({
  open,
  title,
  persistent = false,
  transition = 'fade',
  onClose,
  accessibilityLabel,
  children,
  footer,
}: ModalProps) {
  const { theme } = useGrundtoneTheme();

  function handleClose() {
    if (persistent) return;
    onClose?.();
  }

  const backdropStyle: ViewStyle = {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: rem(theme.spacing.lg),
  };

  const dialogStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: rem(theme.radius.lg),
    maxWidth: 500,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  };

  const headerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: rem(theme.spacing.lg),
    paddingBottom: 0,
  };

  const titleStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.lg),
    fontWeight: String(theme.typography.fontWeight.semibold) as '600',
    color: theme.colors.text,
    flex: 1,
  };

  const closeStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.xl),
    color: theme.colors.textSecondary ?? theme.colors.text,
    padding: rem(theme.spacing.xs),
  };

  const bodyStyle: ViewStyle = {
    padding: rem(theme.spacing.lg),
  };

  const footerStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: rem(theme.spacing.sm),
    paddingHorizontal: rem(theme.spacing.lg),
    paddingBottom: rem(theme.spacing.lg),
  };

  const animationType =
    transition === 'slide-up'
      ? 'slide'
      : transition === 'none'
        ? 'none'
        : 'fade';

  return (
    <RNModal
      visible={open}
      transparent
      animationType={animationType}
      onRequestClose={handleClose}
      accessibilityLabel={accessibilityLabel ?? title}
    >
      <Pressable style={backdropStyle} onPress={handleClose}>
        <Pressable style={dialogStyle}>
          <View style={headerStyle}>
            <Text style={titleStyle} accessibilityRole="header">
              {title}
            </Text>
            {!persistent && (
              <Pressable
                onPress={handleClose}
                accessibilityLabel="Luk"
                accessibilityRole="button"
              >
                <Text style={closeStyle}>&times;</Text>
              </Pressable>
            )}
          </View>

          <View style={bodyStyle}>{children}</View>

          {footer && <View style={footerStyle}>{footer}</View>}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
