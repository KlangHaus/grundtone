import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { iconRegistry } from '@grundtone/icons';
import Icon from './Icon.vue';
import { GT_ICON_REGISTRY_KEY } from './types';

const BASE = 'gt-icon';

/** Mount helper that provides icon registry */
function mountIcon(props: Record<string, unknown>) {
  return mount(Icon, {
    props,
    global: {
      provide: {
        [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry,
      },
    },
  });
}

describe('Icon', () => {
  // Rendering with registry (name prop)
  it('renders icon by name from registry', () => {
    const wrapper = mountIcon({ name: 'check' });
    const svg = wrapper.find('svg');
    expect(svg.exists()).toBe(true);
    expect(svg.classes()).toContain(BASE);
    expect(svg.html()).toContain('<path');
  });

  it('renders correct SVG body for known icon', () => {
    const wrapper = mountIcon({ name: 'close' });
    expect(wrapper.html()).toContain('M18 6L6 18');
  });

  it('sets correct viewBox', () => {
    const wrapper = mountIcon({ name: 'check' });
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 24 24');
  });

  // Direct icon prop
  it('renders icon from direct icon prop', () => {
    const wrapper = mount(Icon, {
      props: {
        icon: {
          body: '<circle cx="12" cy="12" r="10"/>',
          viewBox: '0 0 24 24',
        },
      },
    });
    const svg = wrapper.find('svg');
    expect(svg.exists()).toBe(true);
    expect(svg.html()).toContain('<circle');
  });

  it('icon prop takes precedence over name', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'check',
        icon: { body: '<rect width="10" height="10"/>', viewBox: '0 0 24 24' },
      },
      global: {
        provide: {
          [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry,
        },
      },
    });
    expect(wrapper.html()).toContain('<rect');
    expect(wrapper.html()).not.toContain('M20 6L9 17');
  });

  // Sizes
  it('applies default size class (lg)', () => {
    const wrapper = mountIcon({ name: 'check' });
    expect(wrapper.find('svg').classes()).toContain(`${BASE}--lg`);
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)(
    'applies %s size class',
    size => {
      const wrapper = mountIcon({ name: 'check', size });
      expect(wrapper.find('svg').classes()).toContain(`${BASE}--${size}`);
    },
  );

  // Accessibility
  it('sets aria-hidden when no label', () => {
    const wrapper = mountIcon({ name: 'check' });
    expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true');
  });

  it('does not set aria-hidden when label is provided', () => {
    const wrapper = mountIcon({ name: 'check', label: 'Checkmark' });
    const svg = wrapper.find('svg');
    expect(svg.attributes('aria-hidden')).toBeUndefined();
    expect(svg.attributes('role')).toBe('img');
    expect(svg.attributes('aria-label')).toBe('Checkmark');
  });

  // SVG attributes
  it('sets stroke attributes for line icons', () => {
    const wrapper = mountIcon({ name: 'check' });
    const svg = wrapper.find('svg');
    expect(svg.attributes('fill')).toBe('none');
    expect(svg.attributes('stroke')).toBe('currentColor');
    expect(svg.attributes('stroke-width')).toBe('1.5');
  });

  // Unknown icon
  it('warns and renders nothing for unknown icon name', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mountIcon({ name: 'nonexistent-icon' });
    expect(wrapper.find('svg').exists()).toBe(false);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('nonexistent-icon'),
    );
    warnSpy.mockRestore();
  });

  // No registry warning
  it('warns when name used without registry', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(Icon, { props: { name: 'check' } });
    expect(wrapper.find('svg').exists()).toBe(false);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('No icon registry provided'),
    );
    warnSpy.mockRestore();
  });

  // All icons renderable
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
      const wrapper = mountIcon({ name });
      expect(wrapper.find('svg').exists()).toBe(true);
    }
  });
});
