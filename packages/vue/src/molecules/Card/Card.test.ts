import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from './Card.vue';
import { GT_ICON_REGISTRY_KEY } from '../../atoms/Icon/types';
import { iconRegistry } from '@grundtone/icons';

const BASE = 'gt-card';

const iconProvide = {
  global: {
    provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
  },
};

describe('Card', () => {
  it('renders as article by default', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test' },
    });
    expect(wrapper.element.tagName).toBe('ARTICLE');
  });

  it('renders as anchor when nav', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test', nav: true, href: '/page' },
      ...iconProvide,
    });
    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('/page');
  });

  it('applies raised variant class by default', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test' },
    });
    expect(wrapper.classes()).toContain(`${BASE}--raised`);
  });

  it('applies variant class', () => {
    for (const variant of ['raised', 'bordered', 'flat'] as const) {
      const wrapper = mount(Card, {
        props: { title: 'Test', variant },
      });
      expect(wrapper.classes()).toContain(`${BASE}--${variant}`);
    }
  });

  it('renders image with alt', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test', image: '/img.jpg', imageAlt: 'Photo' },
    });
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('/img.jpg');
    expect(img.attributes('alt')).toBe('Photo');
  });

  it('renders subheading', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test', subheading: 'Category' },
    });
    const sub = wrapper.find(`.${BASE}__subheading`);
    expect(sub.exists()).toBe(true);
    expect(sub.text()).toBe('Category');
  });

  it('renders title', () => {
    const wrapper = mount(Card, {
      props: { title: 'My Title' },
    });
    const title = wrapper.find(`.${BASE}__title`);
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('My Title');
  });

  it('renders body slot', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test' },
      slots: { default: '<p>Body text</p>' },
    });
    const body = wrapper.find(`.${BASE}__body`);
    expect(body.exists()).toBe(true);
    expect(body.text()).toContain('Body text');
  });

  it('renders footer slot', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test' },
      slots: { footer: '<a href="#">Link</a>' },
    });
    const footer = wrapper.find(`.${BASE}__footer`);
    expect(footer.exists()).toBe(true);
    expect(footer.text()).toContain('Link');
  });

  it('renders media slot overriding image', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test', image: '/img.jpg' },
      slots: { media: '<video src="/vid.mp4"></video>' },
    });
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('video').exists()).toBe(true);
  });

  it('nav card has arrow icon', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test', nav: true, href: '#' },
      ...iconProvide,
    });
    expect(wrapper.find(`.${BASE}__arrow`).exists()).toBe(true);
  });

  it('external nav has external-link icon', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test', nav: true, href: '#', external: true },
      ...iconProvide,
    });
    expect(wrapper.attributes('target')).toBe('_blank');
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer');
  });

  it('no media section when no image or slot', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test' },
    });
    expect(wrapper.find(`.${BASE}__media`).exists()).toBe(false);
  });

  it('horizontal class applied', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test', horizontal: true },
    });
    expect(wrapper.classes()).toContain(`${BASE}--horizontal`);
  });

  it('applies correct CSS prefix', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test' },
    });
    expect(wrapper.classes()).toContain(BASE);
  });

  it('no body section when slot is empty', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test' },
    });
    expect(wrapper.find(`.${BASE}__body`).exists()).toBe(false);
  });

  it('no footer when slot is empty', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test' },
    });
    expect(wrapper.find(`.${BASE}__footer`).exists()).toBe(false);
  });
});
