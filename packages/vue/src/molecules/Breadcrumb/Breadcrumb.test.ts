import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Breadcrumb from './Breadcrumb.vue';

const BASE = 'gt-breadcrumb';

const threeItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Current Post' },
];

describe('Breadcrumb', () => {
  it('renders nav with default aria-label', () => {
    const wrapper = mount(Breadcrumb, { props: { items: threeItems } });
    const nav = wrapper.find('nav');
    expect(nav.exists()).toBe(true);
    expect(nav.attributes('aria-label')).toBe('Breadcrumb');
  });

  it('renders ordered list', () => {
    const wrapper = mount(Breadcrumb, { props: { items: threeItems } });
    expect(wrapper.find('ol').exists()).toBe(true);
  });

  it('renders items with links', () => {
    const wrapper = mount(Breadcrumb, { props: { items: threeItems } });
    const links = wrapper.findAll('a');
    expect(links).toHaveLength(2);
    expect(links[0].attributes('href')).toBe('/');
    expect(links[0].text()).toBe('Home');
    expect(links[1].attributes('href')).toBe('/blog');
    expect(links[1].text()).toBe('Blog');
  });

  it('marks last item as current page', () => {
    const wrapper = mount(Breadcrumb, { props: { items: threeItems } });
    const current = wrapper.find('[aria-current="page"]');
    expect(current.exists()).toBe(true);
    expect(current.text()).toBe('Current Post');
  });

  it('current item is not a link', () => {
    const wrapper = mount(Breadcrumb, { props: { items: threeItems } });
    const items = wrapper.findAll('li');
    const lastItem = items[items.length - 1];
    expect(lastItem.find('a').exists()).toBe(false);
  });

  it('renders separator between items', () => {
    const wrapper = mount(Breadcrumb, { props: { items: threeItems } });
    const separators = wrapper.findAll('[aria-hidden="true"]');
    expect(separators).toHaveLength(2);
    expect(separators[0].text()).toBe('/');
  });

  it('no separator before first item', () => {
    const wrapper = mount(Breadcrumb, { props: { items: threeItems } });
    const firstItem = wrapper.findAll('li')[0];
    expect(firstItem.find('[aria-hidden="true"]').exists()).toBe(false);
  });

  it('supports custom separator', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: threeItems, separator: '→' },
    });
    const separators = wrapper.findAll('[aria-hidden="true"]');
    expect(separators[0].text()).toBe('→');
  });

  it('supports custom aria-label', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: threeItems, ariaLabel: 'Navigation' },
    });
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Navigation');
  });

  it('item without href or to renders as current', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'No link' },
      { label: 'Last', href: '/last' },
    ];
    const wrapper = mount(Breadcrumb, { props: { items } });
    const currentItems = wrapper.findAll('[aria-current="page"]');
    // "No link" (no href/to) and "Last" (last item) both render as current
    expect(currentItems).toHaveLength(2);
  });

  it('renders router-link for to prop', () => {
    const items = [
      { label: 'Home', to: '/' },
      { label: 'Blog', to: { name: 'blog' } },
      { label: 'Current' },
    ];
    const wrapper = mount(Breadcrumb, {
      props: { items },
      global: {
        stubs: {
          'router-link': { template: '<a><slot /></a>', props: ['to'] },
        },
      },
    });
    // router-link stubs render as <a> tags
    const links = wrapper.findAll('a');
    expect(links).toHaveLength(2);
  });

  it('single item renders as current with no links', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: [{ label: 'Home' }] },
    });
    expect(wrapper.findAll('a')).toHaveLength(0);
    expect(wrapper.find('[aria-current="page"]').text()).toBe('Home');
    expect(wrapper.findAll('[aria-hidden="true"]')).toHaveLength(0);
  });

  it('applies correct CSS class prefix', () => {
    const wrapper = mount(Breadcrumb, { props: { items: threeItems } });
    expect(wrapper.find('nav').classes()).toContain(BASE);
    expect(wrapper.find('ol').classes()).toContain(`${BASE}__list`);
    expect(wrapper.findAll('li')[0].classes()).toContain(`${BASE}__item`);
  });
});
