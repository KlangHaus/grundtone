import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Drawer from './Drawer.vue';

const BASE = 'gt-drawer';

function mountDrawer(props: Record<string, unknown> = {}) {
  return mount(Drawer, {
    props: { open: true, ...props },
    slots: { default: '<nav aria-label="Nav"><a href="#">Item</a></nav>' },
    global: { stubs: { Teleport: true } },
  });
}

describe('Drawer', () => {
  it('renders panel + scrim when open (modal default)', () => {
    const wrapper = mountDrawer();
    expect(wrapper.find(`.${BASE}`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}__panel`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}__scrim`).exists()).toBe(true);
  });

  it('does not render when closed', () => {
    const wrapper = mountDrawer({ open: false });
    expect(wrapper.find(`.${BASE}`).exists()).toBe(false);
  });

  it('is a modal dialog by default', () => {
    const panel = mountDrawer().find(`.${BASE}__panel`);
    expect(panel.attributes('role')).toBe('dialog');
    expect(panel.attributes('aria-modal')).toBe('true');
  });

  it('non-modal: no scrim, no aria-modal, page-through container', () => {
    const wrapper = mountDrawer({ modal: false });
    expect(wrapper.find(`.${BASE}__scrim`).exists()).toBe(false);
    expect(
      wrapper.find(`.${BASE}__panel`).attributes('aria-modal'),
    ).toBeUndefined();
    // container is not flagged modal → CSS lets clicks through to the page
    expect(wrapper.find(`.${BASE}`).classes()).not.toContain(`${BASE}--modal`);
  });

  it('applies the side modifier (default left)', () => {
    expect(mountDrawer().find(`.${BASE}`).classes()).toContain(`${BASE}--left`);
    expect(mountDrawer({ side: 'right' }).find(`.${BASE}`).classes()).toContain(
      `${BASE}--right`,
    );
  });

  it('applies the size as inline-size', () => {
    const panel = mountDrawer({ size: '28rem' }).find(`.${BASE}__panel`);
    expect(panel.attributes('style')).toContain('inline-size: 28rem');
  });

  it('forwards aria-label to the dialog', () => {
    const panel = mountDrawer({ ariaLabel: 'Navigation' }).find(
      `.${BASE}__panel`,
    );
    expect(panel.attributes('aria-label')).toBe('Navigation');
  });

  it('renders the default slot', () => {
    expect(mountDrawer().find(`.${BASE}__panel`).text()).toContain('Item');
  });

  it('emits update:open(false) + close on Escape', async () => {
    const wrapper = mountDrawer();
    await wrapper.find(`.${BASE}`).trigger('keydown', { key: 'Escape' });
    expect(wrapper.emitted('update:open')![0]).toEqual([false]);
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('emits close on scrim click', async () => {
    const wrapper = mountDrawer();
    await wrapper.find(`.${BASE}__scrim`).trigger('click');
    expect(wrapper.emitted('update:open')![0]).toEqual([false]);
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('does not close on other keys', async () => {
    const wrapper = mountDrawer();
    await wrapper.find(`.${BASE}`).trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('update:open')).toBeFalsy();
  });
});
