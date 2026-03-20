import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Spinner from './Spinner.vue';

const BASE = 'gt-spinner';

describe('Spinner', () => {
  it('renders with default props', () => {
    const wrapper = mount(Spinner);
    expect(wrapper.find(`.${BASE}`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}__circle`).exists()).toBe(true);
  });

  it('has role="status" and aria-live', () => {
    const wrapper = mount(Spinner);
    const root = wrapper.find(`.${BASE}`);
    expect(root.attributes('role')).toBe('status');
    expect(root.attributes('aria-live')).toBe('polite');
  });

  it('renders visually-hidden label by default', () => {
    const wrapper = mount(Spinner);
    const srOnly = wrapper.find('.sr-only');
    expect(srOnly.exists()).toBe(true);
    expect(srOnly.text()).toBe('Indlæser…');
  });

  it('renders custom ariaLabel', () => {
    const wrapper = mount(Spinner, { props: { ariaLabel: 'Loading data' } });
    expect(wrapper.find('.sr-only').text()).toBe('Loading data');
  });

  // Sizes
  it.each(['sm', 'lg'] as const)('renders %s size', size => {
    const wrapper = mount(Spinner, { props: { size } });
    expect(wrapper.find(`.${BASE}`).classes()).toContain(`${BASE}--${size}`);
  });

  // Variants
  it.each(['light', 'dark'] as const)('renders %s variant', variant => {
    const wrapper = mount(Spinner, { props: { variant } });
    expect(wrapper.find(`.${BASE}`).classes()).toContain(`${BASE}--${variant}`);
  });

  // Text
  it('renders text when provided', () => {
    const wrapper = mount(Spinner, { props: { text: 'Henter data…' } });
    const text = wrapper.find(`.${BASE}__text`);
    expect(text.exists()).toBe(true);
    expect(text.text()).toBe('Henter data…');
    // sr-only should not render when text is visible
    expect(wrapper.find('.sr-only').exists()).toBe(false);
  });

  it('does not render text element when not provided', () => {
    const wrapper = mount(Spinner);
    expect(wrapper.find(`.${BASE}__text`).exists()).toBe(false);
  });

  // Backdrop
  it('applies backdrop class when prop is true', () => {
    const wrapper = mount(Spinner, { props: { backdrop: true } });
    expect(wrapper.find(`.${BASE}`).classes()).toContain(`${BASE}--backdrop`);
  });

  it('does not apply backdrop class by default', () => {
    const wrapper = mount(Spinner);
    expect(wrapper.find(`.${BASE}`).classes()).not.toContain(
      `${BASE}--backdrop`,
    );
  });

  // Default values
  it('defaults to sm size and dark variant', () => {
    const wrapper = mount(Spinner);
    const classes = wrapper.find(`.${BASE}`).classes();
    expect(classes).toContain(`${BASE}--sm`);
    expect(classes).toContain(`${BASE}--dark`);
  });
});
