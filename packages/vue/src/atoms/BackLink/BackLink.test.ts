import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BackLink from './BackLink.vue';

describe('BackLink', () => {
  it('renders as an anchor', () => {
    const wrapper = mount(BackLink, {
      props: { href: '/blog', label: 'All posts' },
    });
    expect(wrapper.find('a').exists()).toBe(true);
  });

  it('has back-link class', () => {
    const wrapper = mount(BackLink, {
      props: { href: '/blog', label: 'Back' },
    });
    expect(wrapper.find('a').classes()).toContain('gt-back-link');
  });

  it('renders href', () => {
    const wrapper = mount(BackLink, {
      props: { href: '/settings', label: 'Settings' },
    });
    expect(wrapper.find('a').attributes('href')).toBe('/settings');
  });

  it('renders label text', () => {
    const wrapper = mount(BackLink, {
      props: { href: '/', label: 'Alle indlæg' },
    });
    expect(wrapper.find('a').text()).toBe('Alle indlæg');
  });

  it('works with any language', () => {
    const wrapper = mount(BackLink, {
      props: { href: '/', label: 'Zurück zu Einstellungen' },
    });
    expect(wrapper.text()).toBe('Zurück zu Einstellungen');
  });
});
