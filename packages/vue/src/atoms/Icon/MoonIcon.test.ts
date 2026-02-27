import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MoonIcon from './MoonIcon.vue';

describe('MoonIcon', () => {
  it('renders correctly', () => {
    const wrapper = mount(MoonIcon);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('applies size prop correctly', () => {
    const wrapper = mount(MoonIcon, {
      props: { size: 24 },
    });

    const svg = wrapper.find('svg');
    expect(svg.attributes('width')).toBe('24');
    expect(svg.attributes('height')).toBe('24');
  });

  it('applies default size when no size prop provided', () => {
    const wrapper = mount(MoonIcon);

    const svg = wrapper.find('svg');
    expect(svg.attributes('width')).toBe('16');
    expect(svg.attributes('height')).toBe('16');
  });

  it('applies custom class when provided', () => {
    const wrapper = mount(MoonIcon, {
      attrs: { class: 'custom-moon-icon' },
    });

    expect(wrapper.classes()).toContain('custom-moon-icon');
  });

  it('has proper accessibility attributes', () => {
    const wrapper = mount(MoonIcon);

    const svg = wrapper.find('svg');
    expect(svg.attributes('role')).toBe('img');
    expect(svg.attributes('aria-label')).toBe('Moon');
  });

  it('renders all required SVG paths', () => {
    const wrapper = mount(MoonIcon);

    const paths = wrapper.findAll('path, circle');
    expect(paths.length).toBeGreaterThan(0);
  });
});
