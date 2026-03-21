import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Textarea from './Textarea.vue';

describe('Textarea', () => {
  it('renders textarea element', () => {
    const wrapper = mount(Textarea);
    expect(wrapper.find('textarea').exists()).toBe(true);
  });

  it('has textarea class', () => {
    const wrapper = mount(Textarea);
    expect(wrapper.find('textarea').classes()).toContain('gt-textarea');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Textarea, { props: { modelValue: '' } });
    await wrapper.find('textarea').setValue('hello');
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['hello']);
  });

  it('renders modelValue', () => {
    const wrapper = mount(Textarea, { props: { modelValue: 'test' } });
    expect(
      (wrapper.find('textarea').element as unknown as { value: string }).value,
    ).toBe('test');
  });

  it('renders label', () => {
    const wrapper = mount(Textarea, {
      props: { label: 'Comments', id: 'c' },
    });
    const label = wrapper.find('label');
    expect(label.text()).toBe('Comments');
    expect(label.attributes('for')).toBe('c');
  });

  it('renders help text', () => {
    const wrapper = mount(Textarea, {
      props: { helpText: 'Enter details', id: 'h' },
    });
    expect(wrapper.find('.gt-input-hint').text()).toBe('Enter details');
  });

  it('renders error text', () => {
    const wrapper = mount(Textarea, {
      props: { errorText: 'Required', id: 'e' },
    });
    const error = wrapper.find('.gt-input-error');
    expect(error.text()).toBe('Required');
    expect(error.attributes('role')).toBe('alert');
    expect(wrapper.find('textarea').classes()).toContain('gt-textarea--error');
  });

  it('error replaces help text', () => {
    const wrapper = mount(Textarea, {
      props: { helpText: 'Help', errorText: 'Error' },
    });
    expect(wrapper.find('.gt-input-error').exists()).toBe(true);
    expect(wrapper.find('.gt-input-hint').exists()).toBe(false);
  });

  it('sets rows', () => {
    const wrapper = mount(Textarea, { props: { rows: 8 } });
    expect(wrapper.find('textarea').attributes('rows')).toBe('8');
  });

  it('defaults to 4 rows', () => {
    const wrapper = mount(Textarea);
    expect(wrapper.find('textarea').attributes('rows')).toBe('4');
  });

  it('sets disabled state', () => {
    const wrapper = mount(Textarea, { props: { disabled: true } });
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    expect(wrapper.find('textarea').classes()).toContain(
      'gt-textarea--disabled',
    );
  });

  it('sets readonly state', () => {
    const wrapper = mount(Textarea, { props: { readonly: true } });
    expect(wrapper.find('textarea').attributes('readonly')).toBeDefined();
  });

  it('sets required', () => {
    const wrapper = mount(Textarea, { props: { required: true } });
    expect(wrapper.find('textarea').attributes('aria-required')).toBe('true');
  });

  it('renders placeholder', () => {
    const wrapper = mount(Textarea, { props: { placeholder: 'Type here' } });
    expect(wrapper.find('textarea').attributes('placeholder')).toBe(
      'Type here',
    );
  });

  // Character count
  it('shows character count when maxChars set', () => {
    const wrapper = mount(Textarea, {
      props: { modelValue: '', maxChars: 100 },
    });
    expect(wrapper.find('.gt-textarea-count').text()).toContain(
      '100 tegn tilbage',
    );
  });

  it('counts remaining characters', () => {
    const wrapper = mount(Textarea, {
      props: { modelValue: 'hello', maxChars: 10 },
    });
    expect(wrapper.find('.gt-textarea-count').text()).toContain(
      '5 tegn tilbage',
    );
  });

  it('shows over-limit message', () => {
    const wrapper = mount(Textarea, {
      props: { modelValue: 'hello world!', maxChars: 5 },
    });
    const count = wrapper.find('.gt-textarea-count');
    expect(count.classes()).toContain('gt-textarea-count--over');
    expect(count.text()).toContain('overskredet med 7 tegn');
  });

  it('applies error styling when over limit', () => {
    const wrapper = mount(Textarea, {
      props: { modelValue: 'hello world', maxChars: 5 },
    });
    expect(wrapper.find('textarea').classes()).toContain('gt-textarea--error');
  });

  it('does not show character count without maxChars', () => {
    const wrapper = mount(Textarea);
    expect(wrapper.find('.gt-textarea-count').exists()).toBe(false);
  });

  // aria-describedby
  it('sets aria-describedby', () => {
    const wrapper = mount(Textarea, {
      props: { helpText: 'Help', id: 'test' },
    });
    expect(wrapper.find('textarea').attributes('aria-describedby')).toBe(
      'test-desc',
    );
  });
});
