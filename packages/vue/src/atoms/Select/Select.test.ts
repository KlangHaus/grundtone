import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Select from './Select.vue';

const BASE = 'gt-select';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('Select', () => {
  it('renders as native select element', () => {
    const wrapper = mount(Select, { props: { options } });
    expect(wrapper.find('select').exists()).toBe(true);
  });

  it('renders with base class', () => {
    const wrapper = mount(Select, { props: { options } });
    expect(wrapper.find('select').classes()).toContain(BASE);
  });

  it('renders all options', () => {
    const wrapper = mount(Select, { props: { options } });
    // 3 options + 1 placeholder
    expect(wrapper.findAll('option')).toHaveLength(4);
  });

  it('renders placeholder as disabled first option', () => {
    const wrapper = mount(Select, { props: { options } });
    const placeholder = wrapper.find('option:first-child');
    expect(placeholder.text()).toBe('Vælg...');
    expect(placeholder.attributes('disabled')).toBeDefined();
  });

  it('renders custom placeholder', () => {
    const wrapper = mount(Select, {
      props: { options, placeholder: 'Pick one' },
    });
    expect(wrapper.find('option:first-child').text()).toBe('Pick one');
  });

  it('defaults to md size', () => {
    const wrapper = mount(Select, { props: { options } });
    expect(wrapper.find('select').classes()).toContain(`${BASE}--md`);
  });

  it('renders all size classes', () => {
    for (const size of ['sm', 'md', 'lg'] as const) {
      const wrapper = mount(Select, { props: { options, size } });
      expect(wrapper.find('select').classes()).toContain(`${BASE}--${size}`);
    }
  });

  it('renders label', () => {
    const wrapper = mount(Select, {
      props: { options, label: 'Region' },
    });
    expect(wrapper.find('label').text()).toContain('Region');
  });

  it('renders required indicator', () => {
    const wrapper = mount(Select, {
      props: { options, label: 'Region', required: true },
    });
    expect(wrapper.find('select').attributes('aria-required')).toBe('true');
    expect(wrapper.text()).toContain('*');
  });

  it('renders optional label', () => {
    const wrapper = mount(Select, {
      props: { options, label: 'Region', optionalLabel: '(valgfrit)' },
    });
    expect(wrapper.text()).toContain('(valgfrit)');
  });

  it('renders help text', () => {
    const wrapper = mount(Select, {
      props: { options, helpText: 'Choose your region' },
    });
    expect(wrapper.text()).toContain('Choose your region');
  });

  it('renders error text', () => {
    const wrapper = mount(Select, {
      props: { options, errorText: 'Selection required' },
    });
    expect(wrapper.text()).toContain('Selection required');
    expect(wrapper.find('select').classes()).toContain(`${BASE}--error`);
  });

  it('error text has role="alert"', () => {
    const wrapper = mount(Select, {
      props: { options, errorText: 'Required' },
    });
    expect(wrapper.find('[role="alert"]').text()).toBe('Required');
  });

  it('sets aria-invalid on error', () => {
    const wrapper = mount(Select, {
      props: { options, errorText: 'Required' },
    });
    expect(wrapper.find('select').attributes('aria-invalid')).toBe('true');
  });

  it('disabled state', () => {
    const wrapper = mount(Select, {
      props: { options, disabled: true },
    });
    expect(wrapper.find('select').attributes('disabled')).toBeDefined();
  });

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(Select, { props: { options } });
    await wrapper.find('select').setValue('b');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b']);
  });

  it('renders option groups', () => {
    const grouped = [
      {
        label: 'Group 1',
        options: [
          { value: 'x', label: 'X' },
          { value: 'y', label: 'Y' },
        ],
      },
      { value: 'z', label: 'Standalone Z' },
    ];
    const wrapper = mount(Select, { props: { options: grouped } });
    expect(wrapper.find('optgroup').attributes('label')).toBe('Group 1');
    expect(wrapper.findAll('optgroup option')).toHaveLength(2);
  });

  it('renders disabled option', () => {
    const opts = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];
    const wrapper = mount(Select, { props: { options: opts } });
    const disabledOpt = wrapper.findAll('option').find(o => o.text() === 'B');
    expect(disabledOpt?.attributes('disabled')).toBeDefined();
  });

  it('label for links to select id', () => {
    const wrapper = mount(Select, {
      props: { options, label: 'Region' },
    });
    const selectId = wrapper.find('select').attributes('id');
    expect(wrapper.find('label').attributes('for')).toBe(selectId);
  });

  it('aria-describedby links to help/error text', () => {
    const wrapper = mount(Select, {
      props: { options, helpText: 'Help' },
    });
    const descId = wrapper.find('p').attributes('id');
    expect(wrapper.find('select').attributes('aria-describedby')).toBe(descId);
  });
});
