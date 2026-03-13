import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import { useField } from './useField';
import { required, email } from '@grundtone/utils';

// Helper to use composable outside component context
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

describe('useField', () => {
  it('initializes with default values', () => {
    const field = withSetup(() => useField());
    expect(field.value.value).toBe('');
    expect(field.touched.value).toBe(false);
    expect(field.errorText.value).toBeUndefined();
    expect(field.isValid.value).toBe(true);
  });

  it('uses initialValue', () => {
    const field = withSetup(() => useField({ initialValue: 'hello' }));
    expect(field.value.value).toBe('hello');
  });

  it('validates on blur by default', async () => {
    const field = withSetup(() => useField({ validators: [required()] }));

    // No error before blur
    expect(field.errorText.value).toBeUndefined();

    // Trigger blur
    field.handlers.onBlur();
    await nextTick();

    expect(field.touched.value).toBe(true);
    expect(field.errorText.value).toBe('This field is required');
    expect(field.isValid.value).toBe(false);
  });

  it('validates on input when configured', async () => {
    const field = withSetup(() =>
      useField({ validators: [required()], validateOn: 'input' }),
    );

    field.handlers['onUpdate:modelValue']('');
    await nextTick();

    expect(field.touched.value).toBe(true);
    expect(field.errorText.value).toBe('This field is required');
  });

  it('does not validate on input when mode is blur', async () => {
    const field = withSetup(() =>
      useField({ validators: [required()], validateOn: 'blur' }),
    );

    field.handlers['onUpdate:modelValue']('');
    await nextTick();

    expect(field.touched.value).toBe(false);
    expect(field.errorText.value).toBeUndefined();
  });

  it('clears error when value becomes valid', async () => {
    const field = withSetup(() =>
      useField({ validators: [required()], validateOn: 'input' }),
    );

    field.handlers['onUpdate:modelValue']('');
    await nextTick();
    expect(field.errorText.value).toBe('This field is required');

    field.handlers['onUpdate:modelValue']('valid');
    await nextTick();
    expect(field.errorText.value).toBeUndefined();
    expect(field.isValid.value).toBe(true);
  });

  it('validate() can be called manually (submit mode)', () => {
    const field = withSetup(() =>
      useField({ validators: [required(), email()], validateOn: 'submit' }),
    );

    const result = field.validate();
    expect(result.isValid).toBe(false);
    // errorText is still undefined because touched is false
    expect(field.errorText.value).toBeUndefined();
  });

  it('reset() restores initial state', async () => {
    const field = withSetup(() =>
      useField({ validators: [required()], initialValue: 'init' }),
    );

    field.handlers['onUpdate:modelValue']('changed');
    field.handlers.onBlur();
    await nextTick();

    field.reset();
    await nextTick();

    expect(field.value.value).toBe('init');
    expect(field.touched.value).toBe(false);
    expect(field.errorText.value).toBeUndefined();
  });

  it('runs multiple validators in order', async () => {
    const field = withSetup(() =>
      useField({
        validators: [required(), email()],
        validateOn: 'input',
      }),
    );

    // Empty triggers required first
    field.handlers['onUpdate:modelValue']('');
    await nextTick();
    expect(field.errorText.value).toBe('This field is required');

    // Non-empty but invalid email
    field.handlers['onUpdate:modelValue']('notanemail');
    await nextTick();
    expect(field.errorText.value).toBe('Invalid email address');

    // Valid email
    field.handlers['onUpdate:modelValue']('test@example.com');
    await nextTick();
    expect(field.errorText.value).toBeUndefined();
  });
});
