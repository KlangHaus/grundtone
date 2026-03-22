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
import {
  getCalendarGrid,
  getMonthNames,
  getWeekdayNames,
  formatCalendarDate,
  parseDate,
  isSameDay,
  isToday as checkIsToday,
} from '@grundtone/utils';
import type { DatePickerProps } from './types';

function rem(value: string): number {
  return parseFloat(value) * 16;
}

export function GTDatePicker({
  value = '',
  label,
  helpText,
  errorText,
  placeholder = 'DD/MM/ÅÅÅÅ',
  min,
  max,
  disabled = false,
  locale = 'da',
  onValueChange,
}: DatePickerProps) {
  const { theme } = useGrundtoneTheme();
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();
  const selected = value ? parseDate(value) : null;
  const initialMonth = selected ?? today;

  const [viewYear, setViewYear] = useState(initialMonth.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialMonth.getMonth() + 1);

  const monthNames = getMonthNames(locale);
  const weekdays = getWeekdayNames(locale, true);
  const grid = getCalendarGrid(viewYear, viewMonth);
  const minDate = min ? parseDate(min) : null;
  const maxDate = max ? parseDate(max) : null;

  function isDayDisabled(day: number) {
    const d = new Date(viewYear, viewMonth - 1, day);
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  }

  function selectDay(day: number) {
    if (isDayDisabled(day)) return;
    const d = new Date(viewYear, viewMonth - 1, day);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    onValueChange?.(iso);
    setIsOpen(false);
  }

  function prevMonth() {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear(viewYear - 1);
    } else setViewMonth(viewMonth - 1);
  }

  function nextMonth() {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear(viewYear + 1);
    } else setViewMonth(viewMonth + 1);
  }

  const displayValue = selected
    ? formatCalendarDate(selected, 'DD/MM/YYYY')
    : '';

  const labelStyle: TextStyle = {
    fontSize: rem(theme.typography.fontSize.sm),
    fontWeight: String(theme.typography.fontWeight.medium) as '500',
    color: theme.colors.text,
    marginBottom: rem(theme.spacing.xs),
  };

  const triggerStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: errorText
      ? theme.colors.error
      : (theme.colors.borderMedium ?? theme.colors.text),
    borderRadius: rem(theme.radius.md),
    backgroundColor: theme.colors.background,
    padding: rem(theme.spacing.sm),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: disabled ? 0.5 : 1,
  };

  const daySize = 40;
  const dayStyle: ViewStyle = {
    width: daySize,
    height: daySize,
    borderRadius: daySize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <View>
      {label && <Text style={labelStyle}>{label}</Text>}
      {helpText && !errorText && (
        <Text
          style={{
            fontSize: rem(theme.typography.fontSize.sm),
            color: theme.colors.textSecondary ?? theme.colors.text,
            marginBottom: rem(theme.spacing.sm),
          }}
        >
          {helpText}
        </Text>
      )}
      {errorText && (
        <Text
          style={{
            fontSize: rem(theme.typography.fontSize.sm),
            color: theme.colors.error,
            fontWeight: '600',
            marginBottom: rem(theme.spacing.sm),
          }}
          accessibilityRole="alert"
        >
          {errorText}
        </Text>
      )}

      <Pressable
        style={triggerStyle}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
      >
        <Text
          style={{
            color: displayValue
              ? theme.colors.text
              : (theme.colors.textSecondary ?? theme.colors.text),
            fontSize: rem(theme.typography.fontSize.base),
          }}
        >
          {displayValue || placeholder}
        </Text>
        <Text
          style={{ color: theme.colors.textSecondary ?? theme.colors.text }}
        >
          📅
        </Text>
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
          onPress={() => setIsOpen(false)}
        >
          <Pressable
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: rem(theme.radius.lg),
              padding: rem(theme.spacing.md),
              minWidth: 300,
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: rem(theme.spacing.sm),
              }}
            >
              <Pressable onPress={prevMonth} accessibilityLabel="Forrige måned">
                <Text
                  style={{
                    fontSize: 20,
                    color: theme.colors.textSecondary ?? theme.colors.text,
                  }}
                >
                  ‹
                </Text>
              </Pressable>
              <Text
                style={{
                  fontSize: rem(theme.typography.fontSize.sm),
                  fontWeight: '600',
                  color: theme.colors.text,
                }}
              >
                {monthNames[viewMonth - 1]} {viewYear}
              </Text>
              <Pressable onPress={nextMonth} accessibilityLabel="Næste måned">
                <Text
                  style={{
                    fontSize: 20,
                    color: theme.colors.textSecondary ?? theme.colors.text,
                  }}
                >
                  ›
                </Text>
              </Pressable>
            </View>

            {/* Weekdays */}
            <View style={{ flexDirection: 'row' }}>
              {weekdays.map(wd => (
                <View
                  key={wd}
                  style={{ flex: 1, alignItems: 'center', paddingVertical: 4 }}
                >
                  <Text
                    style={{
                      fontSize: rem(theme.typography.fontSize.xs),
                      color: theme.colors.textSecondary ?? theme.colors.text,
                      fontWeight: '500',
                    }}
                  >
                    {wd}
                  </Text>
                </View>
              ))}
            </View>

            {/* Days */}
            {grid.map((week, wi) => (
              <View key={wi} style={{ flexDirection: 'row' }}>
                {week.map((day, di) => {
                  if (day === null)
                    return (
                      <View
                        key={`${wi}-${di}`}
                        style={{ flex: 1, height: daySize }}
                      />
                    );
                  const isSelected =
                    selected &&
                    isSameDay(new Date(viewYear, viewMonth - 1, day), selected);
                  const isDisabled = isDayDisabled(day);
                  const isT = checkIsToday(
                    new Date(viewYear, viewMonth - 1, day),
                  );
                  return (
                    <Pressable
                      key={`${wi}-${di}`}
                      style={{ flex: 1, alignItems: 'center' }}
                      onPress={() => selectDay(day)}
                      disabled={isDisabled}
                    >
                      <View
                        style={[
                          dayStyle,
                          isSelected && {
                            backgroundColor: theme.colors.primary,
                          },
                          isT &&
                            !isSelected && {
                              borderWidth: 1,
                              borderColor:
                                theme.colors.borderMedium ?? theme.colors.text,
                            },
                          isDisabled && { opacity: 0.3 },
                        ]}
                      >
                        <Text
                          style={[
                            {
                              fontSize: rem(theme.typography.fontSize.sm),
                              color: theme.colors.text,
                            },
                            isSelected && { color: '#fff', fontWeight: '600' },
                          ]}
                        >
                          {day}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
