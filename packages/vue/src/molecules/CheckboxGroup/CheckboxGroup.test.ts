import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CheckboxGroup from './CheckboxGroup.vue';

const options = [
  { value: 'dk', label: 'Dansk' },
  { value: 'se', label: 'Svensk' },
  { value: 'other', label: 'Anden nationalitet' },
];

function mountCbGroup(props = {}) {
  return mount(CheckboxGroup, { props: { options, ...props } });
}

describe('CheckboxGroup', () => {
  it('renders all options', () => {
    const wrapper = mountCbGroup();
    expect(wrapper.findAll('.choice--checkbox')).toHaveLength(3);
  });

  it('renders as checkbox inputs', () => {
    const wrapper = mountCbGroup();
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('type')).toBe('checkbox');
    });
  });

  it('emits toggled value on change', async () => {
    const wrapper = mountCbGroup({ modelValue: [] });
    await wrapper.findAll('input')[1].trigger('change');
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['se']]);
  });

  it('removes value on uncheck', async () => {
    const wrapper = mountCbGroup({ modelValue: ['dk', 'se'] });
    await wrapper.findAll('input')[0].trigger('change');
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['se']]);
  });

  it('marks checked options', () => {
    const wrapper = mountCbGroup({ modelValue: ['dk', 'other'] });
    const choices = wrapper.findAll('.choice--checkbox');
    expect(choices[0].classes()).toContain('choice--checked');
    expect(choices[1].classes()).not.toContain('choice--checked');
    expect(choices[2].classes()).toContain('choice--checked');
  });

  it('renders group label', () => {
    const wrapper = mountCbGroup({ label: 'Nationalitet' });
    expect(wrapper.find('.choice-group__legend').text()).toBe('Nationalitet');
  });

  it('renders help text', () => {
    const wrapper = mountCbGroup({ helpText: 'Vælg alle der passer' });
    expect(wrapper.find('.choice-group__hint').text()).toBe(
      'Vælg alle der passer',
    );
  });

  it('renders error text', () => {
    const wrapper = mountCbGroup({ errorText: 'Vælg mindst én' });
    const error = wrapper.find('.choice-group__error');
    expect(error.text()).toBe('Vælg mindst én');
    expect(error.attributes('role')).toBe('alert');
  });

  it('disables all when group disabled', () => {
    const wrapper = mountCbGroup({ disabled: true });
    wrapper.findAll('input').forEach(input => {
      expect(input.attributes('disabled')).toBeDefined();
    });
  });

  it('renders option hints', () => {
    const opts = [{ value: 'a', label: 'A', hint: 'Some hint' }];
    const wrapper = mount(CheckboxGroup, { props: { options: opts } });
    expect(wrapper.find('.choice__hint').text()).toBe('Some hint');
  });
});
