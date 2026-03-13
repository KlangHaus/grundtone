import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from './Input.vue';

const BASE = 'gt-input';

describe('Input', () => {
  // Rendering
  it('renders with default props', () => {
    const wrapper = mount(Input);
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.classes()).toContain(BASE);
    expect(input.classes()).toContain(`${BASE}--md`);
    expect(input.attributes('type')).toBe('text');
  });

  // Sizes
  it.each(['sm', 'md', 'lg'] as const)('renders %s size', size => {
    const wrapper = mount(Input, { props: { size } });
    expect(wrapper.find('input').classes()).toContain(`${BASE}--${size}`);
  });

  // v-model
  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Input, { props: { modelValue: '' } });
    const input = wrapper.find('input');
    await input.setValue('hello');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['hello']);
  });

  it('renders modelValue as input value', () => {
    const wrapper = mount(Input, { props: { modelValue: 'test' } });
    expect(wrapper.find('input').element.value).toBe('test');
  });

  // Type
  it('sets input type from prop', () => {
    const wrapper = mount(Input, { props: { type: 'password' } });
    expect(wrapper.find('input').attributes('type')).toBe('password');
  });

  // Placeholder
  it('renders placeholder', () => {
    const wrapper = mount(Input, { props: { placeholder: 'Enter text' } });
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text');
  });

  // Disabled
  it('sets disabled state', () => {
    const wrapper = mount(Input, { props: { disabled: true } });
    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeDefined();
    expect(input.classes()).toContain(`${BASE}--disabled`);
  });

  // Readonly
  it('sets readonly state', () => {
    const wrapper = mount(Input, { props: { readonly: true } });
    const input = wrapper.find('input');
    expect(input.attributes('readonly')).toBeDefined();
    expect(input.classes()).toContain(`${BASE}--readonly`);
  });

  // Label
  it('renders label with correct for/id association', () => {
    const wrapper = mount(Input, { props: { label: 'Email', id: 'my-email' } });
    const label = wrapper.find('label');
    const input = wrapper.find('input');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Email');
    expect(label.attributes('for')).toBe('my-email');
    expect(input.attributes('id')).toBe('my-email');
  });

  it('auto-generates id when not provided', () => {
    const wrapper = mount(Input, { props: { label: 'Name' } });
    const label = wrapper.find('label');
    const input = wrapper.find('input');
    expect(label.attributes('for')).toBe(input.attributes('id'));
  });

  it('does not render label when not provided', () => {
    const wrapper = mount(Input);
    expect(wrapper.find('label').exists()).toBe(false);
  });

  // Required
  it('shows required asterisk and sets aria-required', () => {
    const wrapper = mount(Input, { props: { label: 'Name', required: true } });
    expect(wrapper.find(`.${BASE}-label__required`).exists()).toBe(true);
    expect(wrapper.find('input').attributes('aria-required')).toBe('true');
    expect(wrapper.find('input').attributes('required')).toBeDefined();
  });

  // Help text
  it('renders help text', () => {
    const wrapper = mount(Input, { props: { helpText: 'Enter your name' } });
    const help = wrapper.find(`.${BASE}-help`);
    expect(help.exists()).toBe(true);
    expect(help.text()).toBe('Enter your name');
  });

  // Error text
  it('renders error text and sets aria-invalid', () => {
    const wrapper = mount(Input, { props: { errorText: 'Required field' } });
    const error = wrapper.find(`.${BASE}-error`);
    const input = wrapper.find('input');
    expect(error.exists()).toBe(true);
    expect(error.text()).toBe('Required field');
    expect(error.attributes('role')).toBe('alert');
    expect(input.attributes('aria-invalid')).toBe('true');
    expect(input.classes()).toContain(`${BASE}--error`);
  });

  it('error text replaces help text', () => {
    const wrapper = mount(Input, {
      props: { helpText: 'Help', errorText: 'Error' },
    });
    expect(wrapper.find(`.${BASE}-error`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}-help`).exists()).toBe(false);
  });

  // aria-describedby
  it('sets aria-describedby pointing to help/error text', () => {
    const wrapper = mount(Input, {
      props: { id: 'test', helpText: 'Help' },
    });
    const input = wrapper.find('input');
    const help = wrapper.find(`.${BASE}-help`);
    expect(input.attributes('aria-describedby')).toBe('test-desc');
    expect(help.attributes('id')).toBe('test-desc');
  });

  it('does not set aria-describedby without help/error text', () => {
    const wrapper = mount(Input);
    expect(
      wrapper.find('input').attributes('aria-describedby'),
    ).toBeUndefined();
  });

  // Block
  it('applies block class', () => {
    const wrapper = mount(Input, { props: { block: true } });
    expect(wrapper.find(`.${BASE}-field--block`).exists()).toBe(true);
  });

  // Rounded
  it('applies border-radius style when rounded prop is set', () => {
    const wrapper = mount(Input, { props: { rounded: 'full' } });
    expect(wrapper.find('input').attributes('style')).toContain(
      'border-radius: var(--radius-full)',
    );
  });

  it('does not apply inline border-radius when rounded is not set', () => {
    const wrapper = mount(Input);
    expect(wrapper.find('input').attributes('style')).toBeUndefined();
  });

  // Events
  it('emits focus event', async () => {
    const wrapper = mount(Input);
    await wrapper.find('input').trigger('focus');
    expect(wrapper.emitted('focus')).toHaveLength(1);
  });

  it('emits blur event', async () => {
    const wrapper = mount(Input);
    await wrapper.find('input').trigger('blur');
    expect(wrapper.emitted('blur')).toHaveLength(1);
  });

  // Name and autocomplete
  it('passes name and autocomplete attributes', () => {
    const wrapper = mount(Input, {
      props: { name: 'email', autocomplete: 'email' },
    });
    const input = wrapper.find('input');
    expect(input.attributes('name')).toBe('email');
    expect(input.attributes('autocomplete')).toBe('email');
  });

  // Maxlength
  it('passes maxlength attribute', () => {
    const wrapper = mount(Input, { props: { maxlength: 100 } });
    expect(wrapper.find('input').attributes('maxlength')).toBe('100');
  });

  // aria-invalid is false when no error
  it('aria-invalid is false when no error', () => {
    const wrapper = mount(Input);
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('false');
  });
});
