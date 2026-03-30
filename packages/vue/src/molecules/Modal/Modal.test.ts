import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Modal from './Modal.vue';

const BASE = 'gt-modal';

function mountModal(props: Record<string, unknown> = {}) {
  return mount(Modal, {
    props: { open: true, title: 'Test Modal', ...props },
    slots: {
      default: '<p>Body content</p>',
      footer: '<button>OK</button>',
    },
    global: { stubs: { Teleport: true } },
  });
}

describe('Modal', () => {
  it('renders when open', () => {
    const wrapper = mountModal();
    expect(wrapper.find(`.${BASE}`).exists()).toBe(true);
    expect(wrapper.find(`.${BASE}__dialog`).exists()).toBe(true);
  });

  it('does not render when closed', () => {
    const wrapper = mountModal({ open: false });
    expect(wrapper.find(`.${BASE}`).exists()).toBe(false);
  });

  it('renders title', () => {
    const wrapper = mountModal({ title: 'Confirm delete' });
    expect(wrapper.find(`.${BASE}__title`).text()).toBe('Confirm delete');
  });

  it('has role="dialog" and aria-modal', () => {
    const wrapper = mountModal();
    const dialog = wrapper.find(`.${BASE}__dialog`);
    expect(dialog.attributes('role')).toBe('dialog');
    expect(dialog.attributes('aria-modal')).toBe('true');
  });

  it('has aria-labelledby pointing to title', () => {
    const wrapper = mountModal();
    const dialog = wrapper.find(`.${BASE}__dialog`);
    const titleId = wrapper.find(`.${BASE}__title`).attributes('id');
    expect(dialog.attributes('aria-labelledby')).toBe(titleId);
  });

  it('renders body slot', () => {
    const wrapper = mountModal();
    expect(wrapper.find(`.${BASE}__body`).text()).toContain('Body content');
  });

  it('renders footer slot', () => {
    const wrapper = mountModal();
    const footer = wrapper.find(`.${BASE}__footer`);
    expect(footer.exists()).toBe(true);
    expect(footer.text()).toContain('OK');
  });

  it('hides footer when no footer slot', () => {
    const wrapper = mount(Modal, {
      props: { open: true, title: 'No footer' },
      slots: { default: '<p>Body</p>' },
      global: { stubs: { Teleport: true } },
    });
    expect(wrapper.find(`.${BASE}__footer`).exists()).toBe(false);
  });

  // Close button
  it('shows close button in standard variant', () => {
    const wrapper = mountModal();
    expect(wrapper.find(`.${BASE}__close`).exists()).toBe(true);
  });

  it('hides close button in persistent variant', () => {
    const wrapper = mountModal({ persistent: true });
    expect(wrapper.find(`.${BASE}__close`).exists()).toBe(false);
  });

  it('emits update:open and close on close button click', async () => {
    const wrapper = mountModal();
    await wrapper.find(`.${BASE}__close`).trigger('click');
    expect(wrapper.emitted('update:open')).toBeTruthy();
    expect(wrapper.emitted('update:open')![0]).toEqual([false]);
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  // Escape
  it('emits close on Escape key', async () => {
    const wrapper = mountModal();
    await wrapper.find(`.${BASE}`).trigger('keydown', { key: 'Escape' });
    expect(wrapper.emitted('update:open')![0]).toEqual([false]);
  });

  it('does not close on Escape when persistent', async () => {
    const wrapper = mountModal({ persistent: true });
    await wrapper.find(`.${BASE}`).trigger('keydown', { key: 'Escape' });
    expect(wrapper.emitted('update:open')).toBeFalsy();
  });

  // Backdrop click
  it('emits close on backdrop click', async () => {
    const wrapper = mountModal();
    // Click on the backdrop itself (not dialog)
    await wrapper.find(`.${BASE}`).trigger('click');
    expect(wrapper.emitted('update:open')![0]).toEqual([false]);
  });

  it('does not close on dialog click', async () => {
    const wrapper = mountModal();
    await wrapper.find(`.${BASE}__dialog`).trigger('click');
    expect(wrapper.emitted('update:open')).toBeFalsy();
  });

  it('does not close on backdrop click when persistent', async () => {
    const wrapper = mountModal({ persistent: true });
    await wrapper.find(`.${BASE}`).trigger('click');
    expect(wrapper.emitted('update:open')).toBeFalsy();
  });

  // CSS prefix
  it('uses gt- prefix', () => {
    const wrapper = mountModal();
    expect(wrapper.find(`.${BASE}`).exists()).toBe(true);
  });
});
