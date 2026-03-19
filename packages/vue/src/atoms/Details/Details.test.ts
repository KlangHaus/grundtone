import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Details from './Details.vue';

const BASE = 'gt-details';

describe('Details', () => {
  it('renders with base class', () => {
    const wrapper = mount(Details, {
      props: { summary: 'More info' },
      slots: { default: 'Hidden content' },
    });
    expect(wrapper.classes()).toContain(BASE);
  });

  it('renders as details element', () => {
    const wrapper = mount(Details, {
      props: { summary: 'More info' },
      slots: { default: 'Content' },
    });
    expect(wrapper.element.tagName).toBe('DETAILS');
  });

  it('renders summary text', () => {
    const wrapper = mount(Details, {
      props: { summary: 'Click to expand' },
      slots: { default: 'Content' },
    });
    expect(wrapper.find(`.${BASE}__summary`).text()).toContain(
      'Click to expand',
    );
  });

  it('renders summary as native summary element', () => {
    const wrapper = mount(Details, {
      props: { summary: 'Label' },
      slots: { default: 'Content' },
    });
    expect(wrapper.find(`.${BASE}__summary`).element.tagName).toBe('SUMMARY');
  });

  it('renders slot content in body', () => {
    const wrapper = mount(Details, {
      props: { summary: 'Label' },
      slots: { default: '<p>Body content here</p>' },
    });
    expect(wrapper.find(`.${BASE}__body`).text()).toContain(
      'Body content here',
    );
  });

  it('defaults to default variant', () => {
    const wrapper = mount(Details, {
      props: { summary: 'Label' },
      slots: { default: 'Content' },
    });
    expect(wrapper.classes()).toContain(`${BASE}--default`);
  });

  it('renders all variant classes', () => {
    for (const variant of ['default', 'subtle', 'card'] as const) {
      const wrapper = mount(Details, {
        props: { summary: 'Label', variant },
        slots: { default: 'Content' },
      });
      expect(wrapper.classes()).toContain(`${BASE}--${variant}`);
    }
  });

  it('is closed by default', () => {
    const wrapper = mount(Details, {
      props: { summary: 'Label' },
      slots: { default: 'Content' },
    });
    expect(wrapper.attributes('open')).toBeUndefined();
  });

  it('starts open when prop is set', () => {
    const wrapper = mount(Details, {
      props: { summary: 'Label', open: true },
      slots: { default: 'Content' },
    });
    expect(wrapper.attributes('open')).toBeDefined();
  });

  it('renders arrow indicator', () => {
    const wrapper = mount(Details, {
      props: { summary: 'Label' },
      slots: { default: 'Content' },
    });
    const arrow = wrapper.find(`.${BASE}__arrow`);
    expect(arrow.exists()).toBe(true);
    expect(arrow.attributes('aria-hidden')).toBe('true');
  });

  it('applies aria-label when provided', () => {
    const wrapper = mount(Details, {
      props: { summary: 'Label', ariaLabel: 'Extra information' },
      slots: { default: 'Content' },
    });
    expect(wrapper.attributes('aria-label')).toBe('Extra information');
  });

  it('no aria-label by default', () => {
    const wrapper = mount(Details, {
      props: { summary: 'Label' },
      slots: { default: 'Content' },
    });
    expect(wrapper.attributes('aria-label')).toBeUndefined();
  });

  it('applies correct CSS prefix', () => {
    const wrapper = mount(Details, {
      props: { summary: 'Label' },
      slots: { default: 'Content' },
    });
    expect(wrapper.classes()).toContain(BASE);
  });
});
