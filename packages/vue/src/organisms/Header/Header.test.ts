import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from './Header.vue';

const BASE = 'gt-header';

describe('Header', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  it('renders with base class', () => {
    const wrapper = mount(Header);
    expect(wrapper.element.tagName).toBe('HEADER');
    expect(wrapper.classes()).toContain(BASE);
  });

  it('renders logo text when provided', () => {
    const wrapper = mount(Header, {
      props: { logo: 'My Site' },
    });
    const logo = wrapper.find(`.${BASE}__logo`);
    expect(logo.exists()).toBe(true);
    expect(logo.text()).toBe('My Site');
  });

  it('logo links to logoHref', () => {
    const wrapper = mount(Header, {
      props: { logo: 'My Site', logoHref: '/home' },
    });
    const logo = wrapper.find(`.${BASE}__logo`);
    expect(logo.attributes('href')).toBe('/home');
  });

  it('logo defaults to /', () => {
    const wrapper = mount(Header, {
      props: { logo: 'My Site' },
    });
    const logo = wrapper.find(`.${BASE}__logo`);
    expect(logo.attributes('href')).toBe('/');
  });

  it('renders nav items from prop', () => {
    const wrapper = mount(Header, {
      props: {
        nav: [
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
        ],
      },
    });
    const links = wrapper.findAll(`.${BASE}__nav a`);
    expect(links).toHaveLength(2);
    expect(links[0].text()).toBe('Home');
    expect(links[1].attributes('href')).toBe('/about');
  });

  it('renders external nav items with target blank', () => {
    const wrapper = mount(Header, {
      props: {
        nav: [{ label: 'GitHub', href: 'https://github.com', external: true }],
      },
    });
    const link = wrapper.find(`.${BASE}__nav a`);
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toBe('noopener noreferrer');
  });

  it('renders nav slot instead of nav prop', () => {
    const wrapper = mount(Header, {
      slots: { nav: '<a href="/custom">Custom</a>' },
    });
    const link = wrapper.find(`.${BASE}__nav a`);
    expect(link.text()).toBe('Custom');
  });

  it('renders logo slot instead of logo prop', () => {
    const wrapper = mount(Header, {
      props: { logo: 'Ignored' },
      slots: { logo: '<span class="custom-logo">Logo</span>' },
    });
    expect(wrapper.find('.custom-logo').exists()).toBe(true);
    expect(wrapper.find(`.${BASE}__logo`).exists()).toBe(false);
  });

  it('applies transparent class when prop is true', () => {
    const wrapper = mount(Header, {
      props: { transparent: true },
    });
    expect(wrapper.classes()).toContain(`${BASE}--transparent`);
  });

  it('does not apply transparent class by default', () => {
    const wrapper = mount(Header);
    expect(wrapper.classes()).not.toContain(`${BASE}--transparent`);
  });

  it('toggle opens mobile menu', async () => {
    const wrapper = mount(Header);
    const toggle = wrapper.find(`.${BASE}__toggle`);
    await toggle.trigger('click');
    expect(wrapper.find(`.${BASE}__nav--open`).exists()).toBe(true);
  });

  it('close button closes mobile menu', async () => {
    const wrapper = mount(Header);
    const toggle = wrapper.find(`.${BASE}__toggle`);
    await toggle.trigger('click');
    expect(wrapper.find(`.${BASE}__nav--open`).exists()).toBe(true);

    const close = wrapper.find(`.${BASE}__nav-close`);
    await close.trigger('click');
    expect(wrapper.find(`.${BASE}__nav--open`).exists()).toBe(false);
  });

  it('has aria-label on nav', () => {
    const wrapper = mount(Header, {
      props: { ariaLabel: 'Main nav' },
    });
    const nav = wrapper.find(`.${BASE}__nav`);
    expect(nav.attributes('aria-label')).toBe('Main nav');
  });

  it('uses default aria-label', () => {
    const wrapper = mount(Header);
    const nav = wrapper.find(`.${BASE}__nav`);
    expect(nav.attributes('aria-label')).toBe('Hovednavigation');
  });
});
