import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchField from './SearchField.vue';

describe('SearchField', () => {
  it('renders input and submit button', () => {
    const wrapper = mount(SearchField);
    expect(wrapper.find('.gt-search-field__input').exists()).toBe(true);
    expect(wrapper.find('.gt-search-field__button').exists()).toBe(true);
  });

  it('input has type="search"', () => {
    const wrapper = mount(SearchField);
    expect(wrapper.find('input').attributes('type')).toBe('search');
  });

  it('button has type="submit"', () => {
    const wrapper = mount(SearchField);
    expect(wrapper.find('button').attributes('type')).toBe('submit');
  });

  it('wrapper is a form with role="search"', () => {
    const wrapper = mount(SearchField);
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('form').attributes('role')).toBe('search');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(SearchField, { props: { modelValue: '' } });
    await wrapper.find('input').setValue('test');
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test']);
  });

  it('emits submit on form submit', async () => {
    const wrapper = mount(SearchField, { props: { modelValue: 'query' } });
    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted('submit')![0]).toEqual(['query']);
  });

  it('renders placeholder', () => {
    const wrapper = mount(SearchField, {
      props: { placeholder: 'Search here...' },
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'Search here...',
    );
  });

  it('defaults placeholder to Søg...', () => {
    const wrapper = mount(SearchField);
    expect(wrapper.find('input').attributes('placeholder')).toBe('Søg...');
  });

  it('applies disabled state', () => {
    const wrapper = mount(SearchField, { props: { disabled: true } });
    expect(wrapper.find('.gt-search-field--disabled').exists()).toBe(true);
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
  });

  it('has sr-only label', () => {
    const wrapper = mount(SearchField, { props: { label: 'Search site' } });
    const label = wrapper.find('.sr-only');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Search site');
  });

  it('button has aria-label', () => {
    const wrapper = mount(SearchField, {
      props: { buttonLabel: 'Find' },
    });
    expect(wrapper.find('button').attributes('aria-label')).toBe('Find');
  });

  // Sizes
  it.each(['md', 'lg'] as const)('renders %s size', size => {
    const wrapper = mount(SearchField, { props: { size } });
    expect(wrapper.find('form').classes()).toContain(
      `gt-search-field--${size}`,
    );
  });

  it('has inputmode="search"', () => {
    const wrapper = mount(SearchField);
    expect(wrapper.find('input').attributes('inputmode')).toBe('search');
  });

  // Suggestions
  it('shows suggestions when provided and input has enough chars', async () => {
    const wrapper = mount(SearchField, {
      props: {
        modelValue: 'te',
        suggestions: [
          { value: 'test', label: 'Test' },
          { value: 'team', label: 'Team' },
        ],
        minChars: 2,
      },
    });
    await wrapper.find('input').trigger('focus');
    expect(wrapper.find('.gt-search-field__suggestions').exists()).toBe(true);
    expect(wrapper.findAll('.gt-search-field__suggestion')).toHaveLength(2);
  });

  it('does not show suggestions when input is too short', () => {
    const wrapper = mount(SearchField, {
      props: {
        modelValue: 't',
        suggestions: [{ value: 'test', label: 'Test' }],
        minChars: 2,
      },
    });
    expect(wrapper.find('.gt-search-field__suggestions').exists()).toBe(false);
  });

  it('does not show suggestions when none provided', () => {
    const wrapper = mount(SearchField, {
      props: { modelValue: 'test' },
    });
    expect(wrapper.find('.gt-search-field__suggestions').exists()).toBe(false);
  });
});
