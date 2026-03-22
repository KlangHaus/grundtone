import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FileUpload from './FileUpload.vue';

const BASE = 'gt-file-upload';
const stubs = { GTIcon: true };

function mountUpload(props = {}) {
  return mount(FileUpload, { props, global: { stubs } });
}

describe('FileUpload', () => {
  it('renders dropzone', () => {
    const wrapper = mountUpload();
    expect(wrapper.find(`.${BASE}__dropzone`).exists()).toBe(true);
  });

  it('renders hidden file input', () => {
    const wrapper = mountUpload();
    const input = wrapper.find('input[type="file"]');
    expect(input.exists()).toBe(true);
  });

  it('renders label', () => {
    const wrapper = mountUpload({ label: 'Vedhæft fil' });
    expect(wrapper.find('.gt-input-label').text()).toBe('Vedhæft fil');
  });

  it('renders help text', () => {
    const wrapper = mountUpload({ helpText: 'PDF eller billeder' });
    expect(wrapper.find('.gt-input-hint').text()).toBe('PDF eller billeder');
  });

  it('renders error text', () => {
    const wrapper = mountUpload({ errorText: 'Fil er påkrævet' });
    const error = wrapper.find('.gt-input-error');
    expect(error.text()).toBe('Fil er påkrævet');
    expect(error.attributes('role')).toBe('alert');
  });

  it('applies error class on dropzone', () => {
    const wrapper = mountUpload({ errorText: 'Error' });
    expect(
      wrapper.find(`.${BASE}__dropzone`).classes(),
    ).toContain(`${BASE}__dropzone--error`);
  });

  it('applies disabled class', () => {
    const wrapper = mountUpload({ disabled: true });
    expect(
      wrapper.find(`.${BASE}__dropzone`).classes(),
    ).toContain(`${BASE}__dropzone--disabled`);
  });

  it('sets accept attribute', () => {
    const wrapper = mountUpload({ accept: 'image/*,.pdf' });
    expect(wrapper.find('input[type="file"]').attributes('accept')).toBe(
      'image/*,.pdf',
    );
  });

  it('sets multiple attribute', () => {
    const wrapper = mountUpload({ multiple: true });
    expect(
      wrapper.find('input[type="file"]').attributes('multiple'),
    ).toBeDefined();
  });

  it('no file list initially', () => {
    const wrapper = mountUpload();
    expect(wrapper.find(`.${BASE}__files`).exists()).toBe(false);
  });

  it('shows drop text', () => {
    const wrapper = mountUpload();
    expect(wrapper.find(`.${BASE}__text`).text()).toContain('Træk filer');
  });

  it('shows max size hint', () => {
    const wrapper = mountUpload({ maxSize: 2 * 1024 * 1024 });
    expect(wrapper.find(`.${BASE}__hint`).text()).toContain('2.0 MB');
  });
});
