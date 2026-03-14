import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Alert from './Alert.vue';
import { GT_ICON_REGISTRY_KEY } from '../../atoms/Icon/types';
import { iconRegistry } from '@grundtone/icons';

const BASE = 'gt-alert';

describe('Alert', () => {
  it('renders with variant class', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info' },
      slots: { default: 'Message' },
    });
    expect(wrapper.classes()).toContain(`${BASE}--info`);
  });

  it('renders all variant classes', () => {
    for (const variant of ['info', 'success', 'warning', 'error'] as const) {
      const wrapper = mount(Alert, {
        props: { variant },
        slots: { default: 'Message' },
      });
      expect(wrapper.classes()).toContain(`${BASE}--${variant}`);
    }
  });

  it('renders slot content', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info' },
      slots: { default: '<p>Hello world</p>' },
    });
    expect(wrapper.text()).toContain('Hello world');
  });

  it('renders heading when provided', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info', heading: 'Important' },
      slots: { default: 'Message' },
    });
    const heading = wrapper.find(`.${BASE}__heading`);
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Important');
  });

  it('no heading when omitted', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info' },
      slots: { default: 'Message' },
    });
    expect(wrapper.find(`.${BASE}__heading`).exists()).toBe(false);
  });

  it('renders icon when provided', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info', icon: 'info-circle' },
      slots: { default: 'Message' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    expect(wrapper.find(`.${BASE}__icon`).exists()).toBe(true);
  });

  it('no icon when omitted', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info' },
      slots: { default: 'Message' },
    });
    expect(wrapper.find(`.${BASE}__icon`).exists()).toBe(false);
  });

  it('renders close button when dismissible', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info', dismissible: true },
      slots: { default: 'Message' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    expect(wrapper.find(`.${BASE}__close`).exists()).toBe(true);
  });

  it('emits dismiss on close click', async () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info', dismissible: true },
      slots: { default: 'Message' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    await wrapper.find(`.${BASE}__close`).trigger('click');
    expect(wrapper.emitted('dismiss')).toHaveLength(1);
  });

  it('no close button by default', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info' },
      slots: { default: 'Message' },
    });
    expect(wrapper.find(`.${BASE}__close`).exists()).toBe(false);
  });

  it('uses role="alert" for error', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'error' },
      slots: { default: 'Message' },
    });
    expect(wrapper.attributes('role')).toBe('alert');
  });

  it('uses role="status" for info/success/warning', () => {
    for (const variant of ['info', 'success', 'warning'] as const) {
      const wrapper = mount(Alert, {
        props: { variant },
        slots: { default: 'Message' },
      });
      expect(wrapper.attributes('role')).toBe('status');
    }
  });

  it('applies correct CSS prefix', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info' },
      slots: { default: 'Message' },
    });
    expect(wrapper.classes()).toContain(BASE);
  });

  it('heading and body are siblings inside content', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info', heading: 'Title' },
      slots: { default: 'Message' },
    });
    const content = wrapper.find(`.${BASE}__content`);
    expect(content.exists()).toBe(true);
    expect(content.find(`.${BASE}__heading`).exists()).toBe(true);
    expect(content.find(`.${BASE}__body`).exists()).toBe(true);
  });

  it('renders footer slot when provided', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info' },
      slots: { default: 'Message', footer: '<p>Footer content</p>' },
    });
    const footer = wrapper.find(`.${BASE}__footer`);
    expect(footer.exists()).toBe(true);
    expect(footer.text()).toContain('Footer content');
  });

  it('no footer when slot is empty', () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info' },
      slots: { default: 'Message' },
    });
    expect(wrapper.find(`.${BASE}__footer`).exists()).toBe(false);
  });
});
