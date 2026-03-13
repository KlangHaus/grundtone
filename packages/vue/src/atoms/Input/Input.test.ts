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
  it('sets aria-required and required attribute', () => {
    const wrapper = mount(Input, { props: { label: 'Name', required: true } });
    expect(wrapper.find('input').attributes('aria-required')).toBe('true');
    expect(wrapper.find('input').attributes('required')).toBeDefined();
  });

  // Optional label
  it('shows optional label text when not required', () => {
    const wrapper = mount(Input, {
      props: { label: 'Phone', optionalLabel: '(valgfrit)' },
    });
    const optional = wrapper.find(`.${BASE}-label__optional`);
    expect(optional.exists()).toBe(true);
    expect(optional.text()).toBe('(valgfrit)');
  });

  it('does not show optional label when required', () => {
    const wrapper = mount(Input, {
      props: { label: 'Name', required: true, optionalLabel: '(valgfrit)' },
    });
    expect(wrapper.find(`.${BASE}-label__optional`).exists()).toBe(false);
  });

  // Help text — between label and input (designsystem.dk)
  it('renders help text between label and input', () => {
    const wrapper = mount(Input, {
      props: { label: 'Name', helpText: 'Enter your name', id: 'test' },
    });
    const hint = wrapper.find(`.${BASE}-hint`);
    expect(hint.exists()).toBe(true);
    expect(hint.text()).toBe('Enter your name');

    // Verify order: label, hint, input
    const children = wrapper.find(`.${BASE}-field`).element.children;
    const tags = Array.from(children).map(el => el.tagName.toLowerCase());
    expect(tags.indexOf('p')).toBeLessThan(tags.indexOf('input'));
  });

  // Error text — between label and input (designsystem.dk)
  it('renders error text between label and input', () => {
    const wrapper = mount(Input, {
      props: { label: 'Name', errorText: 'Required field', id: 'test' },
    });
    const error = wrapper.find(`.${BASE}-error`);
    const input = wrapper.find('input');
    expect(error.exists()).toBe(true);
    expect(error.text()).toBe('Required field');
    expect(error.attributes('role')).toBe('alert');
    expect(input.attributes('aria-invalid')).toBe('true');
    expect(input.classes()).toContain(`${BASE}--error`);

    // Verify order: label, error, input
    const children = wrapper.find(`.${BASE}-field`).element.children;
    const tags = Array.from(children).map(el => el.tagName.toLowerCase());
    expect(tags.indexOf('p')).toBeLessThan(tags.indexOf('input'));
  });

  it('error text replaces help text', () => {
    const wrapper = mount(Input, {
      props: { helpText: 'Help', errorText: 'Error' },
    });
    expect(wrapper.find(`.${BASE}-error`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}-hint`).exists()).toBe(false);
  });

  // aria-describedby
  it('sets aria-describedby pointing to help/error text', () => {
    const wrapper = mount(Input, {
      props: { id: 'test', helpText: 'Help' },
    });
    const input = wrapper.find('input');
    const hint = wrapper.find(`.${BASE}-hint`);
    expect(input.attributes('aria-describedby')).toBe('test-desc');
    expect(hint.attributes('id')).toBe('test-desc');
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

  // Width presets
  it('applies rem-based width class', () => {
    const wrapper = mount(Input, { props: { width: 'xs' } });
    expect(wrapper.find('input').classes()).toContain(`${BASE}-width-xs`);
  });

  it('applies character-based width class', () => {
    const wrapper = mount(Input, { props: { charWidth: 4 } });
    expect(wrapper.find('input').classes()).toContain(`${BASE}-char-4`);
  });

  it('charWidth takes precedence over width', () => {
    const wrapper = mount(Input, { props: { charWidth: 8, width: 'xl' } });
    const classes = wrapper.find('input').classes();
    expect(classes).toContain(`${BASE}-char-8`);
    expect(classes).not.toContain(`${BASE}-width-xl`);
  });

  // Prefix / suffix
  it('renders prefix with wrapper', () => {
    const wrapper = mount(Input, { props: { prefix: 'kr.' } });
    const pfx = wrapper.find(`.${BASE}-prefix`);
    expect(pfx.exists()).toBe(true);
    expect(pfx.text()).toBe('kr.');
    expect(pfx.attributes('aria-hidden')).toBe('true');
    expect(wrapper.find(`.${BASE}-wrapper--prefix`).exists()).toBe(true);
  });

  it('renders suffix with wrapper', () => {
    const wrapper = mount(Input, { props: { suffix: 'kg' } });
    const sfx = wrapper.find(`.${BASE}-suffix`);
    expect(sfx.exists()).toBe(true);
    expect(sfx.text()).toBe('kg');
    expect(sfx.attributes('aria-hidden')).toBe('true');
    expect(wrapper.find(`.${BASE}-wrapper--suffix`).exists()).toBe(true);
  });

  it('does not render wrapper without prefix/suffix', () => {
    const wrapper = mount(Input);
    expect(wrapper.find(`.${BASE}-wrapper`).exists()).toBe(false);
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
