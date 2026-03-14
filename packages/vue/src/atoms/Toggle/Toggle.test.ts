import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Toggle from './Toggle.vue';

const BASE = 'gt-toggle';

describe('Toggle', () => {
  // Rendering
  it('renders with default props', () => {
    const wrapper = mount(Toggle);
    const btn = wrapper.find('button');
    expect(btn.exists()).toBe(true);
    expect(btn.attributes('role')).toBe('switch');
    expect(btn.attributes('aria-checked')).toBe('false');
    expect(btn.classes()).toContain(BASE);
    expect(btn.classes()).toContain(`${BASE}--md`);
  });

  // Sizes
  it.each(['sm', 'md', 'lg'] as const)('renders %s size', size => {
    const wrapper = mount(Toggle, { props: { size } });
    expect(wrapper.find('button').classes()).toContain(`${BASE}--${size}`);
  });

  // Toggle on
  it('emits update:modelValue with true on click when off', async () => {
    const wrapper = mount(Toggle, { props: { modelValue: false } });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);
  });

  // Toggle off
  it('emits update:modelValue with false on click when on', async () => {
    const wrapper = mount(Toggle, { props: { modelValue: true } });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false]);
  });

  // Checked state
  it('sets aria-checked to true when modelValue is true', () => {
    const wrapper = mount(Toggle, { props: { modelValue: true } });
    expect(wrapper.find('button').attributes('aria-checked')).toBe('true');
  });

  it('applies checked class when modelValue is true', () => {
    const wrapper = mount(Toggle, { props: { modelValue: true } });
    expect(wrapper.find('button').classes()).toContain(`${BASE}--checked`);
  });

  it('does not apply checked class when modelValue is false', () => {
    const wrapper = mount(Toggle, { props: { modelValue: false } });
    expect(wrapper.find('button').classes()).not.toContain(`${BASE}--checked`);
  });

  // Disabled
  it('sets disabled and aria-disabled when disabled', () => {
    const wrapper = mount(Toggle, { props: { disabled: true } });
    const btn = wrapper.find('button');
    expect(btn.attributes('disabled')).toBeDefined();
    expect(btn.attributes('aria-disabled')).toBe('true');
    expect(btn.classes()).toContain(`${BASE}--disabled`);
  });

  it('does not emit when disabled', async () => {
    const wrapper = mount(Toggle, { props: { disabled: true } });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  // Label
  it('renders label with correct for/id association', () => {
    const wrapper = mount(Toggle, { props: { label: 'Dark mode', id: 'dm' } });
    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Dark mode');
    expect(label.attributes('for')).toBe('dm');
    expect(wrapper.find('button').attributes('id')).toBe('dm');
  });

  it('auto-generates id when not provided', () => {
    const wrapper = mount(Toggle, { props: { label: 'Test' } });
    const btn = wrapper.find('button');
    const label = wrapper.find('label');
    const id = btn.attributes('id');
    expect(id).toBeTruthy();
    expect(label.attributes('for')).toBe(id);
  });

  it('does not render label when not provided', () => {
    const wrapper = mount(Toggle);
    expect(wrapper.find('label').exists()).toBe(false);
  });

  // Name
  it('sets name attribute', () => {
    const wrapper = mount(Toggle, { props: { name: 'darkMode' } });
    expect(wrapper.find('button').attributes('name')).toBe('darkMode');
  });
});
