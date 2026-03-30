import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Badge from './Badge.vue';
import { GT_ICON_REGISTRY_KEY } from '../Icon/types';
import { iconRegistry } from '@grundtone/icons';

const BASE = 'gt-badge';

describe('Badge', () => {
  it('renders with base class', () => {
    const wrapper = mount(Badge, { slots: { default: 'New' } });
    expect(wrapper.classes()).toContain(BASE);
  });

  it('renders as span element', () => {
    const wrapper = mount(Badge, { slots: { default: 'New' } });
    expect(wrapper.element.tagName).toBe('SPAN');
  });

  it('renders slot content', () => {
    const wrapper = mount(Badge, { slots: { default: 'Active' } });
    expect(wrapper.text()).toContain('Active');
  });

  it('defaults to neutral variant', () => {
    const wrapper = mount(Badge, { slots: { default: 'Tag' } });
    expect(wrapper.classes()).toContain(`${BASE}--neutral`);
  });

  it('defaults to md size', () => {
    const wrapper = mount(Badge, { slots: { default: 'Tag' } });
    expect(wrapper.classes()).toContain(`${BASE}--md`);
  });

  it('renders all variant classes', () => {
    for (const variant of [
      'info',
      'success',
      'warning',
      'error',
      'neutral',
    ] as const) {
      const wrapper = mount(Badge, {
        props: { variant },
        slots: { default: 'Status' },
      });
      expect(wrapper.classes()).toContain(`${BASE}--${variant}`);
    }
  });

  it('renders sm size', () => {
    const wrapper = mount(Badge, {
      props: { size: 'sm' },
      slots: { default: 'Small' },
    });
    expect(wrapper.classes()).toContain(`${BASE}--sm`);
  });

  it('renders dot when enabled', () => {
    const wrapper = mount(Badge, {
      props: { dot: true },
      slots: { default: 'Active' },
    });
    const dot = wrapper.find(`.${BASE}__dot`);
    expect(dot.exists()).toBe(true);
    expect(dot.attributes('aria-hidden')).toBe('true');
  });

  it('no dot by default', () => {
    const wrapper = mount(Badge, { slots: { default: 'Tag' } });
    expect(wrapper.find(`.${BASE}__dot`).exists()).toBe(false);
  });

  it('renders icon when provided', () => {
    const wrapper = mount(Badge, {
      props: { icon: 'check' },
      slots: { default: 'Done' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    expect(wrapper.find(`.${BASE}__icon`).exists()).toBe(true);
  });

  it('no icon when omitted', () => {
    const wrapper = mount(Badge, { slots: { default: 'Tag' } });
    expect(wrapper.find(`.${BASE}__icon`).exists()).toBe(false);
  });

  it('applies aria-label when provided', () => {
    const wrapper = mount(Badge, {
      props: { ariaLabel: 'Status: active' },
      slots: { default: 'Active' },
    });
    expect(wrapper.attributes('aria-label')).toBe('Status: active');
  });

  it('no aria-label by default', () => {
    const wrapper = mount(Badge, { slots: { default: 'Tag' } });
    expect(wrapper.attributes('aria-label')).toBeUndefined();
  });

  it('applies correct CSS prefix', () => {
    const wrapper = mount(Badge, { slots: { default: 'Tag' } });
    expect(wrapper.classes()).toContain(BASE);
  });

  it('has no interactive elements', () => {
    const wrapper = mount(Badge, { slots: { default: 'Tag' } });
    expect(wrapper.find('button').exists()).toBe(false);
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('dot and icon can coexist', () => {
    const wrapper = mount(Badge, {
      props: { dot: true, icon: 'check' },
      slots: { default: 'Done' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    expect(wrapper.find(`.${BASE}__dot`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}__icon`).exists()).toBe(true);
  });
});
