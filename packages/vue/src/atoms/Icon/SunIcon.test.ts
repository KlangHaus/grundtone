import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SunIcon from './SunIcon.vue';

describe('SunIcon', () => {
  it('renders correctly', () => {
    const wrapper = mount(SunIcon);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('applies size prop correctly', () => {
    const wrapper = mount(SunIcon, {
      props: { size: 24 },
    });

    const svg = wrapper.find('svg');
    expect(svg.attributes('width')).toBe('24');
    expect(svg.attributes('height')).toBe('24');
  });

  it('applies default size when no size prop provided', () => {
    const wrapper = mount(SunIcon);

    const svg = wrapper.find('svg');
    expect(svg.attributes('width')).toBe('16');
    expect(svg.attributes('height')).toBe('16');
  });

  it('applies custom class when provided', () => {
    const wrapper = mount(SunIcon, {
      attrs: { class: 'custom-sun-icon' },
    });

    expect(wrapper.classes()).toContain('custom-sun-icon');
  });

  it('has proper accessibility attributes', () => {
    const wrapper = mount(SunIcon);

    const svg = wrapper.find('svg');
    expect(svg.attributes('role')).toBe('img');
    expect(svg.attributes('aria-label')).toBe('Sun');
  });

  it('renders all required SVG paths', () => {
    const wrapper = mount(SunIcon);

    const paths = wrapper.findAll('path, circle');
    expect(paths.length).toBeGreaterThan(0);
  });
});
