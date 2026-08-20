import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

// Default prefix is 'gt', so base class is 'gt-btn'
const BASE = 'gt-btn';

describe('Button', () => {
  // Rendering
  it('renders with default props', () => {
    const wrapper = mount(Button, { slots: { default: 'Click me' } });
    expect(wrapper.text()).toBe('Click me');
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.classes()).toContain(BASE);
    expect(wrapper.classes()).toContain(`${BASE}--primary`);
    expect(wrapper.classes()).toContain(`${BASE}--md`);
  });

  // Variants
  it.each([
    'primary',
    'secondary',
    'outlined',
    'negative',
    'unstyled',
  ] as const)('renders %s variant', variant => {
    const wrapper = mount(Button, { props: { variant } });
    expect(wrapper.classes()).toContain(`${BASE}--${variant}`);
  });

  // Sizes
  it.each(['sm', 'md', 'lg'] as const)('renders %s size', size => {
    const wrapper = mount(Button, { props: { size } });
    expect(wrapper.classes()).toContain(`${BASE}--${size}`);
  });

  // Events
  it('emits click event on click', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
    expect(wrapper.emitted('click')![0][0]).toBeInstanceOf(MouseEvent);
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('does not emit click when loading', async () => {
    const wrapper = mount(Button, { props: { loading: true } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  // Disabled state
  it('sets disabled and aria-disabled when disabled', () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.attributes('aria-disabled')).toBe('true');
    expect(wrapper.classes()).toContain(`${BASE}--disabled`);
  });

  // Loading state
  it('shows spinner and sets aria-busy when loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Save' },
    });
    expect(wrapper.attributes('aria-busy')).toBe('true');
    expect(wrapper.find(`.${BASE}__spinner`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}__content--hidden`).exists()).toBe(true);
  });

  it('hides spinner when not loading', () => {
    const wrapper = mount(Button);
    expect(wrapper.find(`.${BASE}__spinner`).exists()).toBe(false);
  });

  // Block
  it('applies block class when block prop is true', () => {
    const wrapper = mount(Button, { props: { block: true } });
    expect(wrapper.classes()).toContain(`${BASE}--block`);
  });

  // Rounded
  it('applies border-radius style when rounded prop is set', () => {
    const wrapper = mount(Button, { props: { rounded: 'full' } });
    expect(wrapper.attributes('style')).toContain(
      'border-radius: var(--radius-full)',
    );
  });

  it('does not apply inline border-radius when rounded is not set', () => {
    const wrapper = mount(Button);
    expect(wrapper.attributes('style')).toBeUndefined();
  });

  // Polymorphic rendering
  it('renders as an anchor when as="a"', () => {
    const wrapper = mount(Button, {
      props: { as: 'a' },
      attrs: { href: '/test' },
    });
    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('/test');
  });

  // Slots
  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: { default: '<span class="icon">★</span> Star' },
    });
    expect(wrapper.find('.icon').exists()).toBe(true);
    expect(wrapper.text()).toContain('Star');
  });

  // Accessibility
  it('is not aria-disabled when enabled', () => {
    const wrapper = mount(Button);
    expect(wrapper.attributes('aria-disabled')).toBe('false');
  });

  it('is not aria-busy when not loading', () => {
    const wrapper = mount(Button);
    expect(wrapper.attributes('aria-busy')).toBe('false');
  });

  // 🔴 GTButton erklaerer ingen `type`-prop, saa den naar knappen som
  // gennemfaldende attribut. Den vej er BAERENDE: taktart bruger den i ~20
  // kaldesteder, og [backstage]s login-formular afhaenger af, at deres
  // `type="submit"` faktisk giver en submit-knap og ikke en tavs no-op.
  //
  // Kontrakten er hverken deklareret eller dokumenteret, saa intet ville have
  // stoppet en senere `inheritAttrs: false` — en rimelig aendring i sig selv —
  // i at goere alle de knapper virkningsloese paa en gang, i to andre repoer,
  // uden en eneste roed test. Denne test er det eneste, der siger det hoejt.
  describe('the type attribute falls through', () => {
    it('passes an explicit type on to the button', () => {
      for (const type of ['submit', 'button', 'reset']) {
        const wrapper = mount(Button, { attrs: { type } });
        expect(wrapper.find('button').attributes('type')).toBe(type);
      }
    });

    it('sets no type of its own, leaving the HTML default in place', () => {
      const wrapper = mount(Button);

      expect(wrapper.find('button').attributes('type')).toBeUndefined();
    });

    it('still falls through when rendered as another element', () => {
      const wrapper = mount(Button, {
        props: { as: 'a' },
        attrs: { href: '#x' },
      });

      expect(wrapper.find('a').attributes('href')).toBe('#x');
    });
  });
});
