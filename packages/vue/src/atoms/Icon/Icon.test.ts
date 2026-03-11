import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Icon from './Icon.vue';

const BASE = 'gt-icon';

describe('Icon', () => {
  // Rendering
  it('renders custom icon as SVG', () => {
    const wrapper = mount(Icon, { props: { name: 'check' } });
    const svg = wrapper.find('svg');
    expect(svg.exists()).toBe(true);
    expect(svg.classes()).toContain(BASE);
    expect(svg.html()).toContain('<path');
  });

  it('renders correct SVG body for known icon', () => {
    const wrapper = mount(Icon, { props: { name: 'close' } });
    expect(wrapper.html()).toContain('M18 6L6 18');
  });

  it('sets correct viewBox', () => {
    const wrapper = mount(Icon, { props: { name: 'check' } });
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 24 24');
  });

  // Sizes
  it('applies default size class (lg)', () => {
    const wrapper = mount(Icon, { props: { name: 'check' } });
    expect(wrapper.find('svg').classes()).toContain(`${BASE}--lg`);
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)(
    'applies %s size class',
    size => {
      const wrapper = mount(Icon, { props: { name: 'check', size } });
      expect(wrapper.find('svg').classes()).toContain(`${BASE}--${size}`);
    },
  );

  // Accessibility
  it('sets aria-hidden when no label', () => {
    const wrapper = mount(Icon, { props: { name: 'check' } });
    expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true');
  });

  it('does not set aria-hidden when label is provided', () => {
    const wrapper = mount(Icon, {
      props: { name: 'check', label: 'Checkmark' },
    });
    const svg = wrapper.find('svg');
    expect(svg.attributes('aria-hidden')).toBeUndefined();
    expect(svg.attributes('role')).toBe('img');
    expect(svg.attributes('aria-label')).toBe('Checkmark');
  });

  // SVG attributes
  it('sets stroke attributes for line icons', () => {
    const wrapper = mount(Icon, { props: { name: 'check' } });
    const svg = wrapper.find('svg');
    expect(svg.attributes('fill')).toBe('none');
    expect(svg.attributes('stroke')).toBe('currentColor');
    expect(svg.attributes('stroke-width')).toBe('1.5');
  });

  // Unknown icon
  it('warns and renders nothing for unknown icon', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(Icon, { props: { name: 'nonexistent-icon' } });
    expect(wrapper.find('svg').exists()).toBe(false);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('nonexistent-icon'),
    );
    warnSpy.mockRestore();
  });

  // All custom icons renderable
  it('renders all icons from registry', () => {
    const names = [
      'arrow-left',
      'arrow-right',
      'check',
      'close',
      'menu',
      'search',
    ];
    for (const name of names) {
      const wrapper = mount(Icon, { props: { name } });
      expect(wrapper.find('svg').exists()).toBe(true);
    }
  });
});
