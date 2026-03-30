<script setup lang="ts">
  import { computed, ref, nextTick, onBeforeUnmount } from 'vue';
  import { getClassPrefix } from '@grundtone/core';
  import { generateId } from '@grundtone/utils';
  import {
    getCalendarGrid,
    getMonthNames,
    getWeekdayNames,
    formatCalendarDate,
    parseDate,
    isSameDay,
    isToday as checkIsToday,
  } from '@grundtone/utils';
  import { GTIcon } from '../../atoms/Icon';
  import type { DatePickerProps } from './types';

  const props = withDefaults(defineProps<DatePickerProps>(), {
    modelValue: '',
    placeholder: 'DD/MM/ÅÅÅÅ',
    format: 'DD/MM/YYYY',
    locale: 'da',
    disabled: false,
    required: false,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  const p = computed(() => getClassPrefix());
  const base = computed(() => `${p.value}-date-picker`);
  const inputBase = computed(() => `${p.value}-input`);
  const inputId = computed(() => props.id ?? generateId('datepicker'));
  const descId = computed(() =>
    props.errorText || props.helpText ? `${inputId.value}-desc` : undefined,
  );

  const isOpen = ref(false);
  const calendarRef = ref<HTMLElement | null>(null);

  // Calendar state
  const today = new Date();
  const viewYear = ref(today.getFullYear());
  const viewMonth = ref(today.getMonth() + 1);

  // Initialize from modelValue or initialDate
  function initCalendarView() {
    const initial = props.initialDate || props.modelValue;
    if (initial) {
      const d = parseDate(initial);
      if (d) {
        viewYear.value = d.getFullYear();
        viewMonth.value = d.getMonth() + 1;
        return;
      }
    }
    viewYear.value = today.getFullYear();
    viewMonth.value = today.getMonth() + 1;
  }

  const selectedDate = computed(() => {
    if (!props.modelValue) return null;
    return parseDate(props.modelValue);
  });

  const displayValue = computed(() => {
    if (!selectedDate.value) return '';
    return formatCalendarDate(selectedDate.value, props.format);
  });

  const monthNames = computed(() => getMonthNames(props.locale));
  const weekdays = computed(() => getWeekdayNames(props.locale, true));
  const grid = computed(() => getCalendarGrid(viewYear.value, viewMonth.value));

  const minDate = computed(() => (props.min ? parseDate(props.min) : null));
  const maxDate = computed(() => (props.max ? parseDate(props.max) : null));

  function isDayDisabled(day: number): boolean {
    const d = new Date(viewYear.value, viewMonth.value - 1, day);
    if (minDate.value && d < minDate.value) return true;
    if (maxDate.value && d > maxDate.value) return true;
    return false;
  }

  function isDaySelected(day: number): boolean {
    if (!selectedDate.value) return false;
    return isSameDay(
      new Date(viewYear.value, viewMonth.value - 1, day),
      selectedDate.value,
    );
  }

  function isDayToday(day: number): boolean {
    return checkIsToday(new Date(viewYear.value, viewMonth.value - 1, day));
  }

  function selectDay(day: number) {
    if (isDayDisabled(day)) return;
    const d = new Date(viewYear.value, viewMonth.value - 1, day);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    emit('update:modelValue', iso);
    isOpen.value = false;
  }

  function prevMonth() {
    if (viewMonth.value === 1) {
      viewMonth.value = 12;
      viewYear.value--;
    } else {
      viewMonth.value--;
    }
  }

  function nextMonth() {
    if (viewMonth.value === 12) {
      viewMonth.value = 1;
      viewYear.value++;
    } else {
      viewMonth.value++;
    }
  }

  function toggleCalendar() {
    if (props.disabled) return;
    if (!isOpen.value) {
      initCalendarView();
      isOpen.value = true;
      nextTick(() => {
        document.addEventListener('click', onOutsideClick);
      });
    } else {
      closeCalendar();
    }
  }

  function closeCalendar() {
    isOpen.value = false;
    document.removeEventListener('click', onOutsideClick);
  }

  function onOutsideClick(e: Event) {
    const target = e.target as HTMLElement;
    if (calendarRef.value?.contains(target)) return;
    closeCalendar();
  }

  function onKeydown(e: Event) {
    if ((e as { key?: string }).key === 'Escape') closeCalendar();
  }

  function onInputChange(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    const d = parseDate(val);
    if (d) {
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      emit('update:modelValue', iso);
    }
  }

  onBeforeUnmount(() => {
    document.removeEventListener('click', onOutsideClick);
  });
</script>

<template>
  <div :class="`${inputBase}-field`" ref="calendarRef" @keydown="onKeydown">
    <label v-if="label" :for="inputId" :class="`${inputBase}-label`">
      {{ label }}
    </label>

    <p v-if="helpText && !errorText" :id="descId" :class="`${inputBase}-hint`">
      {{ helpText }}
    </p>
    <p v-if="errorText" :id="descId" :class="`${inputBase}-error`" role="alert">
      {{ errorText }}
    </p>

    <div :class="base">
      <div :class="`${base}__trigger`">
        <input
          :id="inputId"
          :class="[
            inputBase,
            `${inputBase}--md`,
            { [`${inputBase}--error`]: !!errorText },
          ]"
          type="text"
          :value="displayValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :required="required"
          :aria-invalid="!!errorText"
          :aria-describedby="descId"
          :aria-required="required"
          @change="onInputChange"
          @focus="!isOpen && toggleCalendar()"
        />
        <button
          type="button"
          :class="`${base}__icon-btn`"
          :aria-label="isOpen ? 'Luk kalender' : 'Åbn kalender'"
          :disabled="disabled"
          @click.stop="toggleCalendar"
        >
          <GTIcon name="calendar" size="sm" />
        </button>
      </div>

      <div
        v-if="isOpen"
        :class="`${base}__calendar`"
        role="dialog"
        aria-modal="false"
      >
        <div :class="`${base}__header`">
          <button
            type="button"
            :class="`${base}__nav`"
            aria-label="Forrige måned"
            @click.stop="prevMonth"
          >
            <GTIcon name="chevron-left" size="sm" />
          </button>
          <span :class="`${base}__month-label`">
            {{ monthNames[viewMonth - 1] }} {{ viewYear }}
          </span>
          <button
            type="button"
            :class="`${base}__nav`"
            aria-label="Næste måned"
            @click.stop="nextMonth"
          >
            <GTIcon name="chevron-right" size="sm" />
          </button>
        </div>

        <div :class="`${base}__grid`" role="grid">
          <span v-for="wd in weekdays" :key="wd" :class="`${base}__weekday`">
            {{ wd }}
          </span>

          <template v-for="(week, wi) in grid" :key="wi">
            <button
              v-for="(day, di) in week"
              :key="`${wi}-${di}`"
              type="button"
              :class="[
                `${base}__day`,
                {
                  [`${base}__day--today`]: day !== null && isDayToday(day),
                  [`${base}__day--selected`]:
                    day !== null && isDaySelected(day),
                  [`${base}__day--disabled`]:
                    day !== null && isDayDisabled(day),
                  [`${base}__day--empty`]: day === null,
                },
              ]"
              :disabled="day === null || isDayDisabled(day)"
              :tabindex="day === null ? -1 : 0"
              @click.stop="day !== null && selectDay(day)"
            >
              {{ day }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  $prefix: 'gt' !default;

  .#{$prefix}-date-picker {
    position: relative;

    &__trigger {
      position: relative;
    }

    .#{$prefix}-input {
      padding-right: 3rem;
    }

    &__icon-btn {
      position: absolute;
      right: 1px;
      top: 1px;
      bottom: 1px;
      display: flex;
      align-items: center;
      padding: 0 tokens.space('sm');
      background: tokens.color('background');
      border: none;
      border-left: 1px solid tokens.color('border-medium');
      border-radius: 0 tokens.radius('md') tokens.radius('md') 0;
      color: tokens.color('text-secondary');
      cursor: pointer;

      &:hover {
        color: tokens.color('text');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: -2px;
      }
    }

    &__calendar {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: tokens.space('xs');
      background: tokens.color('surface');
      border: 1px solid tokens.color('border-medium');
      border-radius: tokens.radius('lg');
      box-shadow: tokens.shadow('lg');
      z-index: tokens.z-index('dropdown');
      padding: tokens.space('md');
      min-width: 280px;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: tokens.space('sm');
    }

    &__nav {
      background: none;
      border: none;
      cursor: pointer;
      color: tokens.color('text-secondary');
      padding: tokens.space('xs');
      border-radius: tokens.radius('sm');
      display: flex;
      align-items: center;

      &:hover {
        color: tokens.color('text');
        background: tokens.color('surface-alt');
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: 2px;
      }
    }

    &__month-label {
      font-size: tokens.font-size('sm');
      font-weight: tokens.font-weight('semibold');
      color: tokens.color('text');
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
    }

    &__weekday {
      font-size: tokens.font-size('xs');
      font-weight: tokens.font-weight('medium');
      color: tokens.color('text-secondary');
      padding: tokens.space('xs') 0;
    }

    &__day {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      margin: 0 auto;
      font-size: tokens.font-size('sm');
      color: tokens.color('text');
      border-radius: tokens.radius('full');
      cursor: pointer;
      border: none;
      background: none;
      transition:
        background-color tokens.duration('fast') tokens.ease('ease'),
        color tokens.duration('fast') tokens.ease('ease');

      &:hover {
        background: tokens.color('surface-alt');
      }

      &--today {
        border: 1px solid tokens.color('border-medium');
      }

      &--selected {
        background: tokens.color('primary');
        color: var(--color-on-primary, #fff);
        font-weight: tokens.font-weight('semibold');

        &:hover {
          opacity: 0.9;
        }
      }

      &--disabled {
        color: tokens.color('text-secondary');
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      &--empty {
        visibility: hidden;
      }

      &:focus-visible {
        outline: 2px solid tokens.color('focus-ring');
        outline-offset: 2px;
      }
    }
  }
</style>
