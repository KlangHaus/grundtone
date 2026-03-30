import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import { useDateField } from './useDateField';
import { required, date as dateValidator } from '@grundtone/utils';

function withSetup<T>(fn: () => T): T {
  let result!: T;
  const { defineComponent, createApp, h } = require('vue');
  const app = createApp(
    defineComponent({
      setup() {
        result = fn();
        return () => h('div');
      },
    }),
  );
  app.mount(document.createElement('div'));
  return result;
}

describe('useDateField', () => {
  it('initializes with empty date', () => {
    const field = withSetup(() => useDateField());
    expect(field.dateValue.value).toEqual({ day: '', month: '', year: '' });
    expect(field.value.value).toBe('');
    expect(field.touched.value).toBe(false);
    expect(field.errorText.value).toBeUndefined();
    expect(field.isValid.value).toBe(true);
  });

  it('uses initialValue', () => {
    const field = withSetup(() =>
      useDateField({ initialValue: { day: '15', month: '03', year: '1990' } }),
    );
    expect(field.dateValue.value).toEqual({
      day: '15',
      month: '03',
      year: '1990',
    });
    expect(field.value.value).toBe('15-03-1990');
  });

  it('derives string value from dateValue', () => {
    const field = withSetup(() => useDateField());
    field.dateValue.value = { day: '01', month: '12', year: '2024' };
    expect(field.value.value).toBe('01-12-2024');
  });

  it('returns empty string when all fields empty', () => {
    const field = withSetup(() => useDateField());
    field.dateValue.value = { day: '', month: '', year: '' };
    expect(field.value.value).toBe('');
  });

  it('validates on blur by default', async () => {
    const field = withSetup(() =>
      useDateField({ validators: [required('Required')] }),
    );
    expect(field.errorText.value).toBeUndefined();

    field.handlers.onBlur();
    await nextTick();

    expect(field.touched.value).toBe(true);
    expect(field.errorText.value).toBe('Required');
  });

  it('validates on input when configured', async () => {
    const field = withSetup(() =>
      useDateField({ validators: [required('Required')], validateOn: 'input' }),
    );

    field.handlers['onUpdate:modelValue']({ day: '', month: '', year: '' });
    await nextTick();

    expect(field.errorText.value).toBe('Required');
  });

  it('clears error when date becomes valid', async () => {
    const field = withSetup(() =>
      useDateField({
        validators: [dateValidator('Invalid')],
        validateOn: 'input',
      }),
    );

    field.handlers['onUpdate:modelValue']({
      day: '31',
      month: '02',
      year: '2023',
    });
    await nextTick();
    expect(field.errorText.value).toBe('Invalid');

    field.handlers['onUpdate:modelValue']({
      day: '15',
      month: '03',
      year: '2023',
    });
    await nextTick();
    expect(field.errorText.value).toBeUndefined();
  });

  it('reset() restores initial state', async () => {
    const initial = { day: '01', month: '01', year: '2020' };
    const field = withSetup(() =>
      useDateField({ validators: [required()], initialValue: initial }),
    );

    field.dateValue.value = { day: '', month: '', year: '' };
    field.handlers.onBlur();
    await nextTick();

    field.reset();
    await nextTick();

    expect(field.dateValue.value).toEqual(initial);
    expect(field.touched.value).toBe(false);
    expect(field.errorText.value).toBeUndefined();
  });

  it('works with useFormValidation via UseFieldReturn interface', () => {
    const field = withSetup(() =>
      useDateField({ validators: [required('Required')] }),
    );
    // Should have all UseFieldReturn properties
    expect(field.value).toBeDefined();
    expect(field.errorText).toBeDefined();
    expect(field.touched).toBeDefined();
    expect(field.isValid).toBeDefined();
    expect(field.validate).toBeDefined();
    expect(field.reset).toBeDefined();
    expect(field.handlers).toBeDefined();
  });
});
