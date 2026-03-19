import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Autocomplete from './Autocomplete.vue';

const BASE = 'gt-autocomplete';
const INPUT = 'gt-input';

const suggestions = [
  { value: '1', label: 'Vesterbrogade 1, 1620 København V' },
  { value: '2', label: 'Vesterbrogade 2, 1620 København V' },
  { value: '3', label: 'Vesterbrogade 3, 1620 København V' },
];

describe('Autocomplete', () => {
  it('renders with base class', () => {
    const wrapper = mount(Autocomplete);
    expect(wrapper.find(`.${BASE}`).exists()).toBe(true);
  });

  it('renders native input with role="combobox"', () => {
    const wrapper = mount(Autocomplete);
    expect(wrapper.find('input').attributes('role')).toBe('combobox');
  });

  it('renders label', () => {
    const wrapper = mount(Autocomplete, {
      props: { label: 'Address' },
    });
    expect(wrapper.find('label').text()).toContain('Address');
  });

  it('renders help text', () => {
    const wrapper = mount(Autocomplete, {
      props: { helpText: 'Start typing' },
    });
    expect(wrapper.text()).toContain('Start typing');
  });

  it('renders error text with role="alert"', () => {
    const wrapper = mount(Autocomplete, {
      props: { errorText: 'Required' },
    });
    expect(wrapper.find('[role="alert"]').text()).toBe('Required');
    expect(wrapper.find('input').classes()).toContain(`${INPUT}--error`);
  });

  it('dropdown is hidden by default', () => {
    const wrapper = mount(Autocomplete, {
      props: { suggestions },
    });
    expect(wrapper.find(`.${BASE}__dropdown`).exists()).toBe(false);
  });

  it('shows dropdown on input with sufficient chars', async () => {
    const wrapper = mount(Autocomplete, {
      props: { suggestions, modelValue: 'Ve', minChars: 2 },
    });
    await wrapper.find('input').trigger('focus');
    expect(wrapper.find(`.${BASE}__dropdown`).exists()).toBe(true);
  });

  it('renders all suggestions', async () => {
    const wrapper = mount(Autocomplete, {
      props: { suggestions, modelValue: 'Ve', minChars: 2 },
    });
    await wrapper.find('input').trigger('focus');
    expect(wrapper.findAll(`.${BASE}__option`)).toHaveLength(3);
  });

  it('shows loading state', async () => {
    const wrapper = mount(Autocomplete, {
      props: { loading: true, modelValue: 'Ve', minChars: 2 },
    });
    await wrapper.find('input').trigger('focus');
    expect(wrapper.find(`.${BASE}__loading`).exists()).toBe(true);
  });

  it('shows no results text', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        suggestions: [],
        modelValue: 'Ve',
        minChars: 2,
        noResultsText: 'Nothing found',
      },
    });
    await wrapper.find('input').trigger('focus');
    expect(wrapper.find(`.${BASE}__empty`).text()).toBe('Nothing found');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Autocomplete);
    await wrapper.find('input').setValue('test');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test']);
  });

  it('emits search on input', async () => {
    const wrapper = mount(Autocomplete);
    await wrapper.find('input').setValue('test');
    expect(wrapper.emitted('search')?.[0]).toEqual(['test']);
  });

  it('emits select on option click', async () => {
    const wrapper = mount(Autocomplete, {
      props: { suggestions, modelValue: 'Ve', minChars: 2 },
    });
    await wrapper.find('input').trigger('focus');
    await wrapper.findAll(`.${BASE}__option`)[1].trigger('mousedown');
    expect(wrapper.emitted('select')?.[0]).toEqual([suggestions[1]]);
  });

  it('renders suggestion description', async () => {
    const withDesc = [
      { value: '1', label: 'Address', description: '1620 København' },
    ];
    const wrapper = mount(Autocomplete, {
      props: { suggestions: withDesc, modelValue: 'Ad', minChars: 2 },
    });
    await wrapper.find('input').trigger('focus');
    expect(wrapper.find(`.${BASE}__option-description`).text()).toBe(
      '1620 København',
    );
  });

  it('has aria-expanded', async () => {
    const wrapper = mount(Autocomplete, {
      props: { suggestions, modelValue: 'Ve', minChars: 2 },
    });
    expect(wrapper.find('input').attributes('aria-expanded')).toBe('false');
    await wrapper.find('input').trigger('focus');
    expect(wrapper.find('input').attributes('aria-expanded')).toBe('true');
  });

  it('dropdown has role="listbox"', async () => {
    const wrapper = mount(Autocomplete, {
      props: { suggestions, modelValue: 'Ve', minChars: 2 },
    });
    await wrapper.find('input').trigger('focus');
    expect(wrapper.find(`.${BASE}__dropdown`).attributes('role')).toBe(
      'listbox',
    );
  });

  it('options have role="option"', async () => {
    const wrapper = mount(Autocomplete, {
      props: { suggestions, modelValue: 'Ve', minChars: 2 },
    });
    await wrapper.find('input').trigger('focus');
    expect(wrapper.find(`.${BASE}__option`).attributes('role')).toBe('option');
  });

  it('disabled state', () => {
    const wrapper = mount(Autocomplete, {
      props: { disabled: true },
    });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('has autocomplete="off"', () => {
    const wrapper = mount(Autocomplete);
    expect(wrapper.find('input').attributes('autocomplete')).toBe('off');
  });

  it('defaults to md size', () => {
    const wrapper = mount(Autocomplete);
    expect(wrapper.find('input').classes()).toContain(`${INPUT}--md`);
  });
});
