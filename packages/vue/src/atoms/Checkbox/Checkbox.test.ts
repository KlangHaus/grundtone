import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Checkbox from './Checkbox.vue';

describe('Checkbox', () => {
  it('renders with label', () => {
    const wrapper = mount(Checkbox, { props: { label: 'Accept terms' } });
    expect(wrapper.find('.gt-choice__label').text()).toBe('Accept terms');
  });

  it('renders as checkbox type', () => {
    const wrapper = mount(Checkbox);
    expect(wrapper.find('input').attributes('type')).toBe('checkbox');
  });

  it('has gt-choice--checkbox class', () => {
    const wrapper = mount(Checkbox);
    expect(wrapper.find('.gt-choice--checkbox').exists()).toBe(true);
  });

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false } });
    await wrapper.find('input').trigger('change');
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);
  });

  it('toggles checked state', async () => {
    const wrapper = mount(Checkbox, { props: { modelValue: true } });
    await wrapper.find('input').trigger('change');
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false]);
  });

  it('applies checked class when modelValue is true', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: true } });
    expect(wrapper.find('.gt-choice--checked').exists()).toBe(true);
  });

  it('renders help text', () => {
    const wrapper = mount(Checkbox, {
      props: { label: 'Terms', helpText: 'Read the terms carefully' },
    });
    expect(wrapper.find('.gt-choice__hint').text()).toBe(
      'Read the terms carefully',
    );
  });

  it('applies disabled state', () => {
    const wrapper = mount(Checkbox, { props: { disabled: true } });
    expect(wrapper.find('.gt-choice--disabled').exists()).toBe(true);
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('does not emit when disabled', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, disabled: true },
    });
    await wrapper.find('input').trigger('change');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});
