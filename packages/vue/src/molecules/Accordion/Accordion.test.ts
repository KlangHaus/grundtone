import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Accordion from './Accordion.vue';
import AccordionItem from './AccordionItem.vue';

const BASE = 'gt-accordion';

function mountAccordion(props = {}, items = 3) {
  return mount(Accordion, {
    props,
    slots: {
      default: Array.from(
        { length: items },
        (_, i) => `<div data-item="${i}"></div>`,
      ).join(''),
    },
  });
}

describe('Accordion', () => {
  it('renders with base class', () => {
    const wrapper = mountAccordion();
    expect(wrapper.classes()).toContain(BASE);
  });

  it('defaults to default variant', () => {
    const wrapper = mountAccordion();
    expect(wrapper.classes()).toContain(`${BASE}--default`);
  });

  it('renders all variant classes', () => {
    for (const variant of ['default', 'bordered', 'card'] as const) {
      const wrapper = mountAccordion({ variant });
      expect(wrapper.classes()).toContain(`${BASE}--${variant}`);
    }
  });

  it('has role="region"', () => {
    const wrapper = mountAccordion();
    expect(wrapper.attributes('role')).toBe('region');
  });

  it('has default aria-label', () => {
    const wrapper = mountAccordion();
    expect(wrapper.attributes('aria-label')).toBe('Accordion');
  });

  it('renders toggle-all button by default', () => {
    const wrapper = mountAccordion();
    expect(wrapper.find(`.${BASE}__toggle-all`).exists()).toBe(true);
  });

  it('toggle-all shows "Vis alle" by default', () => {
    const wrapper = mountAccordion();
    expect(wrapper.find(`.${BASE}__toggle-all`).text()).toBe('Vis alle');
  });

  it('hides toggle-all when showToggleAll is false', () => {
    const wrapper = mountAccordion({ showToggleAll: false });
    expect(wrapper.find(`.${BASE}__toggle-all`).exists()).toBe(false);
  });

  it('uses custom toggle labels', () => {
    const wrapper = mountAccordion({
      toggleAllLabelOpen: 'Show all',
      toggleAllLabelClose: 'Hide all',
    });
    expect(wrapper.find(`.${BASE}__toggle-all`).text()).toBe('Show all');
  });
});

describe('AccordionItem', () => {
  it('renders with item class', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section' },
      slots: { default: 'Content' },
    });
    expect(wrapper.find(`.${BASE}__item`).exists()).toBe(true);
  });

  it('renders heading text', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'My Section' },
      slots: { default: 'Content' },
    });
    expect(wrapper.find(`.${BASE}__heading`).text()).toContain('My Section');
  });

  it('renders summary when provided', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section', summary: 'Short description' },
      slots: { default: 'Content' },
    });
    expect(wrapper.find(`.${BASE}__summary`).text()).toBe('Short description');
  });

  it('no summary when omitted', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section' },
      slots: { default: 'Content' },
    });
    expect(wrapper.find(`.${BASE}__summary`).exists()).toBe(false);
  });

  it('is closed by default', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section' },
      slots: { default: 'Content' },
    });
    expect(wrapper.find(`.${BASE}__item--open`).exists()).toBe(false);
    expect(wrapper.find(`.${BASE}__panel--open`).exists()).toBe(false);
  });

  it('starts open when prop is set', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section', open: true },
      slots: { default: 'Content' },
    });
    expect(wrapper.find(`.${BASE}__item--open`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}__panel--open`).exists()).toBe(true);
  });

  it('toggles on header click', async () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section' },
      slots: { default: 'Content' },
    });
    await wrapper.find(`.${BASE}__header`).trigger('click');
    expect(wrapper.find(`.${BASE}__panel--open`).exists()).toBe(true);
    await wrapper.find(`.${BASE}__header`).trigger('click');
    expect(wrapper.find(`.${BASE}__panel--open`).exists()).toBe(false);
  });

  it('header has aria-expanded', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section' },
      slots: { default: 'Content' },
    });
    expect(wrapper.find(`.${BASE}__header`).attributes('aria-expanded')).toBe(
      'false',
    );
  });

  it('aria-expanded updates on toggle', async () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section' },
      slots: { default: 'Content' },
    });
    await wrapper.find(`.${BASE}__header`).trigger('click');
    expect(wrapper.find(`.${BASE}__header`).attributes('aria-expanded')).toBe(
      'true',
    );
  });

  it('panel has role="region"', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section', open: true },
      slots: { default: 'Content' },
    });
    expect(wrapper.find(`.${BASE}__panel`).attributes('role')).toBe('region');
  });

  it('header has aria-controls linking to panel', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section', open: true },
      slots: { default: 'Content' },
    });
    const panelId = wrapper.find(`.${BASE}__panel`).attributes('id');
    expect(wrapper.find(`.${BASE}__header`).attributes('aria-controls')).toBe(
      panelId,
    );
  });

  it('panel has aria-labelledby linking to header', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section', open: true },
      slots: { default: 'Content' },
    });
    const headerId = wrapper.find(`.${BASE}__header`).attributes('id');
    expect(wrapper.find(`.${BASE}__panel`).attributes('aria-labelledby')).toBe(
      headerId,
    );
  });

  it('renders plus/minus icon', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section' },
      slots: { default: 'Content' },
    });
    const icon = wrapper.find(`.${BASE}__icon`);
    expect(icon.exists()).toBe(true);
    expect(icon.attributes('aria-hidden')).toBe('true');
  });

  it('renders slot content in body', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section', open: true },
      slots: { default: '<p>Body here</p>' },
    });
    expect(wrapper.find(`.${BASE}__body`).text()).toContain('Body here');
  });

  it('defaults to h3 heading level', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section' },
      slots: { default: 'Content' },
    });
    expect(wrapper.find('h3').exists()).toBe(true);
  });

  it('supports custom heading level', () => {
    const wrapper = mount(AccordionItem, {
      props: { heading: 'Section', headingLevel: 2 },
      slots: { default: 'Content' },
    });
    expect(wrapper.find('h2').exists()).toBe(true);
  });
});
