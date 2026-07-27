import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CodeBlock from './CodeBlock.vue';

const BASE = 'gt-code-block';
const writeText = vi.fn(() => Promise.resolve());
vi.stubGlobal('navigator', { clipboard: { writeText } });

function mountCode(props: Record<string, unknown> = {}) {
  return mount(CodeBlock, {
    props: { code: 'npm install @grundtone/vue', ...props },
  });
}

describe('CodeBlock', () => {
  beforeEach(() => writeText.mockReset());

  it('renders the code', () => {
    expect(mountCode().find(`.${BASE}__code`).text()).toContain(
      'npm install @grundtone/vue',
    );
  });

  it('shows the label / language in the header', () => {
    expect(mountCode({ label: 'Install' }).find(`.${BASE}__label`).text()).toBe(
      'Install',
    );
    expect(mountCode({ language: 'bash' }).find(`.${BASE}__label`).text()).toBe(
      'bash',
    );
  });

  it('renders a copy button by default and copies the code', async () => {
    const wrapper = mountCode({ code: 'sk_live_x' });
    const btn = wrapper.find(`.${BASE}__copy`);
    expect(btn.exists()).toBe(true);
    await btn.trigger('click');
    expect(writeText).toHaveBeenCalledWith('sk_live_x');
    expect(btn.text()).toContain('Kopieret');
  });

  it('hides the copy button when copyable is false', () => {
    expect(mountCode({ copyable: false }).find(`.${BASE}__copy`).exists()).toBe(
      false,
    );
  });

  it('omits the header entirely when nothing to show', () => {
    // no label, no language, not copyable → no header
    expect(
      mountCode({ copyable: false }).find(`.${BASE}__header`).exists(),
    ).toBe(false);
  });
});
