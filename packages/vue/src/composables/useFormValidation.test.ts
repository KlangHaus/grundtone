import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import { useField } from './useField';
import { useFormValidation } from './useFormValidation';
import { required, email } from '@grundtone/utils';

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

describe('useFormValidation', () => {
  it('isValid reflects all fields', () => {
    const { form } = withSetup(() => {
      const name = useField({ validators: [required()] });
      const mail = useField({ validators: [required(), email()] });
      const form = useFormValidation({ name, email: mail });
      return { form };
    });

    // Initially valid because validation hasn't run
    expect(form.isValid.value).toBe(true);
  });

  it('validateAll marks all fields touched and returns false if any invalid', async () => {
    const { nameField, emailField, form } = withSetup(() => {
      const nameField = useField({ validators: [required()] });
      const emailField = useField({ validators: [required(), email()] });
      const form = useFormValidation({ name: nameField, email: emailField });
      return { nameField, emailField, form };
    });

    const valid = form.validateAll();
    await nextTick();

    expect(valid).toBe(false);
    expect(nameField.touched.value).toBe(true);
    expect(emailField.touched.value).toBe(true);
    expect(nameField.errorText.value).toBe('This field is required');
    expect(emailField.errorText.value).toBe('This field is required');
  });

  it('validateAll returns true when all fields are valid', async () => {
    const { form } = withSetup(() => {
      const nameField = useField({
        validators: [required()],
        initialValue: 'John',
      });
      const emailField = useField({
        validators: [required(), email()],
        initialValue: 'john@example.com',
      });
      const form = useFormValidation({ name: nameField, email: emailField });
      return { form, nameField, emailField };
    });

    const valid = form.validateAll();
    expect(valid).toBe(true);
    expect(form.isValid.value).toBe(true);
  });

  it('resetAll resets all fields', async () => {
    const { form, nameField } = withSetup(() => {
      const nameField = useField({
        validators: [required()],
        initialValue: 'initial',
      });
      const form = useFormValidation({ name: nameField });
      return { form, nameField };
    });

    nameField.handlers['onUpdate:modelValue']('changed');
    nameField.handlers.onBlur();
    await nextTick();

    form.resetAll();
    await nextTick();

    expect(nameField.value.value).toBe('initial');
    expect(nameField.touched.value).toBe(false);
    expect(nameField.errorText.value).toBeUndefined();
  });
});
