import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AnchorLinks from './AnchorLinks.vue';

const BASE = 'gt-anchor-links';

const items = [
  { label: 'Introduction', href: '#intro' },
  { label: 'Features', href: '#features' },
  { label: 'Getting Started', href: '#getting-started' },
];

describe('AnchorLinks', () => {
  it('renders with base class', () => {
    const wrapper = mount(AnchorLinks, { props: { items } });
    expect(wrapper.classes()).toContain(BASE);
  });

  it('renders as nav element', () => {
    const wrapper = mount(AnchorLinks, { props: { items } });
    expect(wrapper.element.tagName).toBe('NAV');
  });

  it('renders default heading', () => {
    const wrapper = mount(AnchorLinks, { props: { items } });
    const heading = wrapper.find(`.${BASE}__heading`);
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Indhold på siden');
  });

  it('renders custom heading', () => {
    const wrapper = mount(AnchorLinks, {
      props: { items, heading: 'On this page' },
    });
    expect(wrapper.find(`.${BASE}__heading`).text()).toBe('On this page');
  });

  it('renders all items', () => {
    const wrapper = mount(AnchorLinks, { props: { items } });
    const links = wrapper.findAll(`.${BASE}__link`);
    expect(links).toHaveLength(3);
  });

  it('renders correct labels', () => {
    const wrapper = mount(AnchorLinks, { props: { items } });
    const links = wrapper.findAll(`.${BASE}__link`);
    expect(links[0].text()).toBe('Introduction');
    expect(links[1].text()).toBe('Features');
    expect(links[2].text()).toBe('Getting Started');
  });

  it('renders correct hrefs', () => {
    const wrapper = mount(AnchorLinks, { props: { items } });
    const links = wrapper.findAll(`.${BASE}__link`);
    expect(links[0].attributes('href')).toBe('#intro');
    expect(links[1].attributes('href')).toBe('#features');
    expect(links[2].attributes('href')).toBe('#getting-started');
  });

  it('uses ordered list', () => {
    const wrapper = mount(AnchorLinks, { props: { items } });
    expect(wrapper.find(`.${BASE}__list`).element.tagName).toBe('OL');
  });

  it('has default aria-label', () => {
    const wrapper = mount(AnchorLinks, { props: { items } });
    expect(wrapper.attributes('aria-label')).toBe('Indholdsfortegnelse');
  });

  it('uses custom aria-label', () => {
    const wrapper = mount(AnchorLinks, {
      props: { items, ariaLabel: 'Table of contents' },
    });
    expect(wrapper.attributes('aria-label')).toBe('Table of contents');
  });

  it('emits navigate on link click', async () => {
    const wrapper = mount(AnchorLinks, { props: { items } });
    await wrapper.findAll(`.${BASE}__link`)[1].trigger('click');
    expect(wrapper.emitted('navigate')).toHaveLength(1);
    expect(wrapper.emitted('navigate')![0]).toEqual(['#features']);
  });

  it('applies correct CSS prefix', () => {
    const wrapper = mount(AnchorLinks, { props: { items } });
    expect(wrapper.classes()).toContain(BASE);
  });

  it('renders empty list when no items', () => {
    const wrapper = mount(AnchorLinks, { props: { items: [] } });
    expect(wrapper.findAll(`.${BASE}__link`)).toHaveLength(0);
  });

  it('no active class without IntersectionObserver', () => {
    const wrapper = mount(AnchorLinks, { props: { items } });
    const activeLinks = wrapper.findAll(`.${BASE}__link--active`);
    expect(activeLinks).toHaveLength(0);
  });
});
