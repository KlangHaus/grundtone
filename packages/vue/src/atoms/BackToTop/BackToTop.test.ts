import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BackToTop from './BackToTop.vue';

describe('BackToTop', () => {
  it('renders as a button', () => {
    const wrapper = mount(BackToTop);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('has back-to-top class', () => {
    const wrapper = mount(BackToTop);
    expect(wrapper.find('.back-to-top').exists()).toBe(true);
  });

  it('is hidden by default (no visible class)', () => {
    const wrapper = mount(BackToTop);
    expect(wrapper.find('.back-to-top--visible').exists()).toBe(false);
  });

  it('renders default label', () => {
    const wrapper = mount(BackToTop);
    expect(wrapper.find('.back-to-top__label').text()).toBe('Til toppen');
  });

  it('renders custom label', () => {
    const wrapper = mount(BackToTop, { props: { label: 'Back to top' } });
    expect(wrapper.find('.back-to-top__label').text()).toBe('Back to top');
  });

  it('has aria-label', () => {
    const wrapper = mount(BackToTop, { props: { label: 'Scroll up' } });
    expect(wrapper.find('button').attributes('aria-label')).toBe('Scroll up');
  });

  it('renders chevron icon element', () => {
    const wrapper = mount(BackToTop);
    const icon = wrapper.find('.back-to-top__icon');
    expect(icon.exists()).toBe(true);
    expect(icon.attributes('aria-hidden')).toBe('true');
  });

  it('has type="button"', () => {
    const wrapper = mount(BackToTop);
    expect(wrapper.find('button').attributes('type')).toBe('button');
  });
});
