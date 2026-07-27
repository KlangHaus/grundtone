import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ConfirmDialog from './ConfirmDialog.vue';

function mountDialog(props: Record<string, unknown> = {}) {
  return mount(ConfirmDialog, {
    props: { open: true, title: 'Slet nøgle?', ...props },
    global: { stubs: { Teleport: true } },
  });
}

function buttonByText(wrapper: ReturnType<typeof mountDialog>, text: string) {
  return wrapper.findAll('button').find(b => b.text().includes(text));
}

describe('ConfirmDialog', () => {
  it('renders title, message and both buttons when open', () => {
    const wrapper = mountDialog({ message: 'Handlingen kan ikke fortrydes.' });
    expect(wrapper.text()).toContain('Slet nøgle?');
    expect(wrapper.text()).toContain('Handlingen kan ikke fortrydes.');
    expect(buttonByText(wrapper, 'Bekræft')).toBeTruthy();
    expect(buttonByText(wrapper, 'Annuller')).toBeTruthy();
  });

  it('uses custom labels', () => {
    const wrapper = mountDialog({
      confirmLabel: 'Slet',
      cancelLabel: 'Behold',
    });
    expect(buttonByText(wrapper, 'Slet')).toBeTruthy();
    expect(buttonByText(wrapper, 'Behold')).toBeTruthy();
  });

  it('emits confirm (and does NOT close) on confirm click', async () => {
    const wrapper = mountDialog();
    await buttonByText(wrapper, 'Bekræft')!.trigger('click');
    expect(wrapper.emitted('confirm')).toBeTruthy();
    // Parent controls closing (e.g. after an async action) — no update:open here.
    expect(wrapper.emitted('update:open')).toBeFalsy();
  });

  it('emits cancel + update:open(false) on cancel click', async () => {
    const wrapper = mountDialog();
    await buttonByText(wrapper, 'Annuller')!.trigger('click');
    expect(wrapper.emitted('cancel')).toBeTruthy();
    expect(wrapper.emitted('update:open')![0]).toEqual([false]);
  });

  it('confirm button is negative variant when destructive', () => {
    const confirm = buttonByText(
      mountDialog({ destructive: true }),
      'Bekræft',
    )!;
    expect(confirm.classes()).toContain('gt-btn--negative');
  });

  it('confirm button is primary variant by default', () => {
    const confirm = buttonByText(mountDialog(), 'Bekræft')!;
    expect(confirm.classes()).toContain('gt-btn--primary');
  });

  it('does not render when closed', () => {
    expect(mountDialog({ open: false }).text()).not.toContain('Slet nøgle?');
  });
});
