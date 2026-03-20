import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SkipLink from './SkipLink.vue';

describe('SkipLink', () => {
  it('renders as an anchor element', () => {
    const wrapper = mount(SkipLink, { slots: { default: 'Skip' } });
    expect(wrapper.find('a').exists()).toBe(true);
  });

  it('has skip-link class', () => {
    const wrapper = mount(SkipLink, { slots: { default: 'Skip' } });
    expect(wrapper.find('a').classes()).toContain('skip-link');
  });

  it('defaults href to #main', () => {
    const wrapper = mount(SkipLink, { slots: { default: 'Skip' } });
    expect(wrapper.find('a').attributes('href')).toBe('#main');
  });

  it('accepts custom href', () => {
    const wrapper = mount(SkipLink, {
      props: { href: '#search' },
      slots: { default: 'Skip to search' },
    });
    expect(wrapper.find('a').attributes('href')).toBe('#search');
  });

  it('renders slot content', () => {
    const wrapper = mount(SkipLink, {
      slots: { default: 'Spring til indhold' },
    });
    expect(wrapper.find('a').text()).toBe('Spring til indhold');
  });

  it('focuses target element on click', async () => {
    const target = document.createElement('main');
    target.id = 'main';
    target.focus = vi.fn();
    document.body.appendChild(target);

    const wrapper = mount(SkipLink, { slots: { default: 'Skip' } });
    await wrapper.find('a').trigger('click');

    expect(target.focus).toHaveBeenCalled();
    expect(target.getAttribute('tabindex')).toBe('-1');

    document.body.removeChild(target);
  });

  it('does not set tabindex if target already has one', async () => {
    const target = document.createElement('main');
    target.id = 'main';
    target.setAttribute('tabindex', '0');
    target.focus = vi.fn();
    document.body.appendChild(target);

    const wrapper = mount(SkipLink, { slots: { default: 'Skip' } });
    await wrapper.find('a').trigger('click');

    expect(target.getAttribute('tabindex')).toBe('0');

    document.body.removeChild(target);
  });
});
