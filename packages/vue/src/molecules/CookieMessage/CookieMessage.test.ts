import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CookieMessage from './CookieMessage.vue';
import { GT_ICON_REGISTRY_KEY } from '../../atoms/Icon/types';
import { iconRegistry } from '@grundtone/icons';

const BASE = 'gt-cookie-message';

describe('CookieMessage', () => {
  it('renders with base class', () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: 'We use cookies.' },
    });
    expect(wrapper.classes()).toContain(BASE);
  });

  it('is fixed by default (no --static modifier)', () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: 'We use cookies.' },
    });
    expect(wrapper.classes()).not.toContain(`${BASE}--static`);
  });

  it('applies --static when persistent is false', () => {
    const wrapper = mount(CookieMessage, {
      props: { persistent: false },
      slots: { default: 'We use cookies.' },
    });
    expect(wrapper.classes()).toContain(`${BASE}--static`);
  });

  it('renders slot content', () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: '<p>Cookie info here</p>' },
    });
    expect(wrapper.text()).toContain('Cookie info here');
  });

  it('renders heading when provided', () => {
    const wrapper = mount(CookieMessage, {
      props: { heading: 'Cookies' },
      slots: { default: 'Body' },
    });
    const heading = wrapper.find(`.${BASE}__heading`);
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Cookies');
  });

  it('no heading when omitted', () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: 'Body' },
    });
    expect(wrapper.find(`.${BASE}__heading`).exists()).toBe(false);
  });

  it('renders icon when provided', () => {
    const wrapper = mount(CookieMessage, {
      props: { icon: 'check' },
      slots: { default: 'Body' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    expect(wrapper.find(`.${BASE}__icon`).exists()).toBe(true);
  });

  it('no icon when omitted', () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: 'Body' },
    });
    expect(wrapper.find(`.${BASE}__icon`).exists()).toBe(false);
  });

  it('renders accept button with default label', () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: 'Body' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    const actions = wrapper.find(`.${BASE}__actions`);
    expect(actions.text()).toContain('Acceptér');
  });

  it('renders accept button with custom label', () => {
    const wrapper = mount(CookieMessage, {
      props: { acceptLabel: 'OK' },
      slots: { default: 'Body' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    expect(wrapper.find(`.${BASE}__actions`).text()).toContain('OK');
  });

  it('emits accept on accept button click', async () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: 'Body' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    const buttons = wrapper.findAll(`.${BASE}__actions button`);
    await buttons[0].trigger('click');
    expect(wrapper.emitted('accept')).toHaveLength(1);
  });

  it('does not render reject button when rejectLabel is omitted', () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: 'Body' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    const actions = wrapper.find(`.${BASE}__actions`);
    expect(actions.text()).not.toContain('Afvis');
  });

  it('renders reject button when rejectLabel is set', () => {
    const wrapper = mount(CookieMessage, {
      props: { rejectLabel: 'Afvis' },
      slots: { default: 'Body' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    expect(wrapper.find(`.${BASE}__actions`).text()).toContain('Afvis');
  });

  it('emits reject on reject button click', async () => {
    const wrapper = mount(CookieMessage, {
      props: { rejectLabel: 'Afvis' },
      slots: { default: 'Body' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    const buttons = wrapper.findAll(`.${BASE}__actions button`);
    await buttons[1].trigger('click');
    expect(wrapper.emitted('reject')).toHaveLength(1);
  });

  it('renders settings button when settingsLabel is set', () => {
    const wrapper = mount(CookieMessage, {
      props: { settingsLabel: 'Indstillinger' },
      slots: { default: 'Body' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    expect(wrapper.find(`.${BASE}__actions`).text()).toContain('Indstillinger');
  });

  it('emits settings on settings button click', async () => {
    const wrapper = mount(CookieMessage, {
      props: { settingsLabel: 'Indstillinger' },
      slots: { default: 'Body' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    const buttons = wrapper.findAll(`.${BASE}__actions button`);
    await buttons[1].trigger('click');
    expect(wrapper.emitted('settings')).toHaveLength(1);
  });

  it('emits accept on close button click', async () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: 'Body' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    await wrapper.find(`.${BASE}__close`).trigger('click');
    expect(wrapper.emitted('accept')).toHaveLength(1);
  });

  it('close button has aria-label', () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: 'Body' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    expect(wrapper.find(`.${BASE}__close`).attributes('aria-label')).toBe(
      'Luk',
    );
  });

  it('has role="region"', () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: 'Body' },
    });
    expect(wrapper.attributes('role')).toBe('region');
  });

  it('has default aria-label', () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: 'Body' },
    });
    expect(wrapper.attributes('aria-label')).toBe('Cookiemeddelelse');
  });

  it('uses custom aria-label', () => {
    const wrapper = mount(CookieMessage, {
      props: { ariaLabel: 'Cookie consent' },
      slots: { default: 'Body' },
    });
    expect(wrapper.attributes('aria-label')).toBe('Cookie consent');
  });

  it('renders actions slot override', () => {
    const wrapper = mount(CookieMessage, {
      slots: {
        default: 'Body',
        actions: '<button>Custom action</button>',
      },
    });
    expect(wrapper.find(`.${BASE}__actions`).text()).toContain('Custom action');
  });

  it('settings slot is hidden by default', () => {
    const wrapper = mount(CookieMessage, {
      props: { settingsLabel: 'Indstillinger' },
      slots: { default: 'Body', settings: '<p>Cookie options</p>' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    expect(wrapper.find(`.${BASE}__settings`).exists()).toBe(false);
  });

  it('toggles settings slot on settings button click', async () => {
    const wrapper = mount(CookieMessage, {
      props: { settingsLabel: 'Indstillinger' },
      slots: { default: 'Body', settings: '<p>Cookie options</p>' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    const buttons = wrapper.findAll(`.${BASE}__actions button`);
    await buttons[1].trigger('click');
    expect(wrapper.find(`.${BASE}__settings`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}__settings`).text()).toContain(
      'Cookie options',
    );
  });

  it('closes settings panel on second click', async () => {
    const wrapper = mount(CookieMessage, {
      props: { settingsLabel: 'Indstillinger' },
      slots: { default: 'Body', settings: '<p>Cookie options</p>' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    const buttons = wrapper.findAll(`.${BASE}__actions button`);
    await buttons[1].trigger('click');
    expect(wrapper.find(`.${BASE}__settings`).exists()).toBe(true);
    await buttons[1].trigger('click');
    expect(wrapper.find(`.${BASE}__settings`).exists()).toBe(false);
  });

  it('settings button has aria-expanded when settings slot exists', async () => {
    const wrapper = mount(CookieMessage, {
      props: { settingsLabel: 'Indstillinger' },
      slots: { default: 'Body', settings: '<p>Options</p>' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    const buttons = wrapper.findAll(`.${BASE}__actions button`);
    expect(buttons[1].attributes('aria-expanded')).toBe('false');
    await buttons[1].trigger('click');
    expect(buttons[1].attributes('aria-expanded')).toBe('true');
  });

  it('emits settings event when no settings slot', async () => {
    const wrapper = mount(CookieMessage, {
      props: { settingsLabel: 'Indstillinger' },
      slots: { default: 'Body' },
      global: {
        provide: { [GT_ICON_REGISTRY_KEY as symbol]: iconRegistry },
      },
    });
    const buttons = wrapper.findAll(`.${BASE}__actions button`);
    await buttons[1].trigger('click');
    expect(wrapper.emitted('settings')).toHaveLength(1);
    expect(wrapper.find(`.${BASE}__settings`).exists()).toBe(false);
  });

  it('applies correct CSS prefix', () => {
    const wrapper = mount(CookieMessage, {
      slots: { default: 'Body' },
    });
    expect(wrapper.classes()).toContain(BASE);
  });
});
