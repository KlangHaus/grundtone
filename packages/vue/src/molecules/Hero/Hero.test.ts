import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Hero from './Hero.vue';

describe('GTHero', () => {
  it('renders the title as h1 and labels the section by it', () => {
    const w = mount(Hero, { props: { title: 'Ét designsystem' } });
    const h = w.find('h1.hero__title');
    expect(h.text()).toBe('Ét designsystem');
    expect(w.find('section').attributes('aria-labelledby')).toBe(
      h.attributes('id'),
    );
  });

  it('defaults to center alignment with no background modifier', () => {
    const w = mount(Hero, { props: { title: 't' } });
    expect(w.classes()).toContain('hero--center');
    expect(w.classes().some(c => c.startsWith('hero--bg-'))).toBe(false);
  });

  it('applies align and background modifiers', () => {
    const w = mount(Hero, {
      props: { title: 't', align: 'left', background: 'dot-grid' },
    });
    expect(w.classes()).toContain('hero--left');
    expect(w.classes()).toContain('hero--bg-dot-grid');
  });

  it('renders headingLevel 2 as h2 without an h1', () => {
    const w = mount(Hero, { props: { title: 't', headingLevel: 2 } });
    expect(w.find('h2.hero__title').exists()).toBe(true);
    expect(w.find('h1').exists()).toBe(false);
  });

  it('lets the title slot override the prop and keeps <mark> accent markup', () => {
    const w = mount(Hero, {
      props: { title: 'ignoreret' },
      slots: { title: 'Runtime <mark>tokens</mark>' },
    });
    expect(w.find('.hero__title').text()).toBe('Runtime tokens');
    expect(w.find('.hero__title mark').text()).toBe('tokens');
  });

  it('renders the subtitle from the prop and omits the element without one', () => {
    const withSub = mount(Hero, { props: { title: 't', subtitle: 'under' } });
    expect(withSub.find('.hero__subtitle').text()).toBe('under');
    const without = mount(Hero, { props: { title: 't' } });
    expect(without.find('.hero__subtitle').exists()).toBe(false);
  });

  it('renders eyebrow, actions and visual containers only when slotted', () => {
    const none = mount(Hero, { props: { title: 't' } });
    expect(none.find('.hero__eyebrow').exists()).toBe(false);
    expect(none.find('.hero__actions').exists()).toBe(false);
    expect(none.find('.hero__visual').exists()).toBe(false);

    const all = mount(Hero, {
      props: { title: 't' },
      slots: {
        eyebrow: '<span>Ny</span>',
        actions: '<button>CTA</button>',
        visual: '<img alt="" />',
      },
    });
    expect(all.find('.hero__eyebrow span').exists()).toBe(true);
    expect(all.find('.hero__actions button').exists()).toBe(true);
    expect(all.find('.hero__visual img').exists()).toBe(true);
  });
});
