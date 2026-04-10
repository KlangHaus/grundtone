import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Footer from './Footer.vue';

const BASE = 'gt-footer';

describe('Footer', () => {
  it('renders as footer element', () => {
    const wrapper = mount(Footer);
    expect(wrapper.element.tagName).toBe('FOOTER');
    expect(wrapper.classes()).toContain(BASE);
  });

  it('renders copyright text', () => {
    const wrapper = mount(Footer, {
      props: { copyright: '© 2026 Test' },
    });
    const copy = wrapper.find(`.${BASE}__copy`);
    expect(copy.exists()).toBe(true);
    expect(copy.text()).toBe('© 2026 Test');
  });

  it('does not render copyright when not provided', () => {
    const wrapper = mount(Footer);
    expect(wrapper.find(`.${BASE}__copy`).exists()).toBe(false);
  });

  it('renders nav items', () => {
    const wrapper = mount(Footer, {
      props: {
        nav: [
          { label: 'Blog', href: '/blog' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    });
    const links = wrapper.findAll(`.${BASE}__links a`);
    expect(links).toHaveLength(2);
    expect(links[0].text()).toBe('Blog');
    expect(links[1].attributes('href')).toBe('/contact');
  });

  it('renders external nav items with target blank', () => {
    const wrapper = mount(Footer, {
      props: {
        nav: [{ label: 'GitHub', href: 'https://github.com', external: true }],
      },
    });
    const link = wrapper.find(`.${BASE}__links a`);
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toBe('noopener noreferrer');
  });

  it('does not render nav when empty', () => {
    const wrapper = mount(Footer, {
      props: { nav: [] },
    });
    expect(wrapper.find(`.${BASE}__links`).exists()).toBe(false);
  });

  it('renders nav slot instead of nav prop', () => {
    const wrapper = mount(Footer, {
      slots: { nav: '<div class="custom-nav">Custom</div>' },
    });
    expect(wrapper.find('.custom-nav').exists()).toBe(true);
  });

  it('renders copyright slot instead of copyright prop', () => {
    const wrapper = mount(Footer, {
      props: { copyright: 'Ignored' },
      slots: { copyright: '<span class="custom-copy">Custom ©</span>' },
    });
    expect(wrapper.find('.custom-copy').exists()).toBe(true);
  });

  it('renders center slot', () => {
    const wrapper = mount(Footer, {
      slots: { center: '<div class="center-content">Logo</div>' },
    });
    expect(wrapper.find('.center-content').exists()).toBe(true);
  });

  it('has aria-label on nav', () => {
    const wrapper = mount(Footer, {
      props: {
        ariaLabel: 'Site footer',
        nav: [{ label: 'Home', href: '/' }],
      },
    });
    const nav = wrapper.find(`.${BASE}__links`);
    expect(nav.attributes('aria-label')).toBe('Site footer');
  });
});
