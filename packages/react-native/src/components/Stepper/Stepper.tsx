import React from 'react';
import { View, Text, Pressable, type ViewStyle, type TextStyle } from 'react-native';
import { useGrundtoneTheme } from '../../useGrundtoneTheme';
import type { StepperProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTStepper({
  steps,
  activeStep = 0,
  allClickable = false,
  onStepPress,
}: StepperProps) {
  const { theme } = useGrundtoneTheme();

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'flex-start',
  };

  const stepStyle: ViewStyle = {
    flex: 1,
    alignItems: 'center',
  };

  const dotBase: ViewStyle = {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.borderMedium ?? theme.colors.text,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const labelBase: TextStyle = {
    marginTop: rem(theme.spacing.xs),
    fontSize: rem(theme.typography.fontSize.xs),
    fontWeight: String(theme.typography.fontWeight.medium) as '500',
    color: theme.colors.textSecondary ?? theme.colors.text,
    textAlign: 'center',
  };

  const lineStyle: ViewStyle = {
    position: 'absolute',
    top: 12,
    left: -50 + '%' as unknown as number,
    right: '50%' as unknown as number,
    height: 2,
    backgroundColor: theme.colors.borderMedium ?? theme.colors.text,
  };

  return (
    <View style={containerStyle}>
      {steps.map((step, i) => {
        const isActive = i === activeStep;
        const isCompleted = i < activeStep;
        const isClickable = allClickable || isCompleted;

        return (
          <Pressable
            key={i}
            style={[stepStyle, !isClickable && !isActive && { opacity: 0.5 }]}
            onPress={() => isClickable && onStepPress?.(i)}
            disabled={!isClickable && !isActive}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`${step.label}${isCompleted ? ' (gennemført)' : ''}${step.error ? ' (fejl)' : ''}`}
          >
            <View
              style={[
                dotBase,
                isActive && { borderColor: theme.colors.primary },
                isCompleted && {
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.colors.primary,
                },
                step.error && {
                  borderColor: theme.colors.error,
                  backgroundColor: theme.colors.error,
                },
              ]}
            >
              {isActive && !step.error && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: theme.colors.primary,
                  }}
                />
              )}
              {isCompleted && !step.error && (
                <Text style={{ color: theme.colors.background, fontSize: 12 }}>✓</Text>
              )}
              {step.error && (
                <Text style={{ color: theme.colors.background, fontSize: 12, fontWeight: '700' }}>×</Text>
              )}
            </View>
            <Text
              style={[
                labelBase,
                isActive && { color: theme.colors.text, fontWeight: String(theme.typography.fontWeight.semibold) as '600' },
                step.error && { color: theme.colors.error },
              ]}
            >
              {step.label}
            </Text>
            {step.info && (
              <Text style={{ fontSize: rem(theme.typography.fontSize.xs), color: theme.colors.textSecondary ?? theme.colors.text, marginTop: 2, textAlign: 'center' }}>
                {step.info}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
