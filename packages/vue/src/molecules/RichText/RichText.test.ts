import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import RichText from './RichText.vue';
import type { JSONContent } from '@tiptap/vue-3';

const BASE = 'gt-rich-text';

const DOC: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Hej ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'verden' },
      ],
    },
  ],
};

async function mountRT(props: Record<string, unknown> = {}) {
  const wrapper = mount(RichText, { props });
  await flushPromises();
  return wrapper;
}

describe('RichText', () => {
  describe('readonly (SSR-static path)', () => {
    it('renders static HTML from the JSON doc — no toolbar', async () => {
      const wrapper = await mountRT({ readonly: true, modelValue: DOC });
      expect(wrapper.classes()).toContain(`${BASE}--readonly`);
      // generateHTML ran the schema: bold mark → <strong>, text preserved.
      expect(wrapper.html()).toContain('verden');
      expect(wrapper.html()).toContain('<strong>');
      expect(wrapper.find(`.${BASE}__toolbar`).exists()).toBe(false);
    });

    it('renders empty when no model', async () => {
      const wrapper = await mountRT({ readonly: true, modelValue: null });
      expect(wrapper.find(`.${BASE}__toolbar`).exists()).toBe(false);
    });
  });

  describe('editable toolbar', () => {
    it('shows the full toolbar by default', async () => {
      const labels = (await mountRT())
        .findAll(`.${BASE}__tool`)
        .map(b => b.attributes('aria-label'));
      expect(labels).toEqual(
        expect.arrayContaining([
          'Fed',
          'Kursiv',
          'Kode',
          'Overskrift 2',
          'Overskrift 3',
          'Punktliste',
          'Nummereret liste',
          'Link',
        ]),
      );
    });

    it('honours the features allow-list', async () => {
      const labels = (await mountRT({ features: ['bold', 'italic'] }))
        .findAll(`.${BASE}__tool`)
        .map(b => b.attributes('aria-label'));
      expect(labels).toEqual(['Fed', 'Kursiv']);
    });

    it('toolbar has role=toolbar + aria-controls', async () => {
      const bar = (await mountRT()).find(`.${BASE}__toolbar`);
      expect(bar.attributes('role')).toBe('toolbar');
      expect(bar.attributes('aria-controls')).toBeTruthy();
    });

    it('tool buttons expose aria-pressed', async () => {
      const b = (await mountRT()).find(`.${BASE}__tool`);
      expect(b.attributes('aria-pressed')).toBe('false');
    });
  });

  describe('states', () => {
    it('error (string) sets the error modifier', async () => {
      const wrapper = await mountRT({ error: 'err-msg-id' });
      expect(wrapper.classes()).toContain(`${BASE}--error`);
    });

    it('disabled sets the modifier and disables tools', async () => {
      const wrapper = await mountRT({ disabled: true });
      expect(wrapper.classes()).toContain(`${BASE}--disabled`);
      expect(
        wrapper.find(`.${BASE}__tool`).attributes('disabled'),
      ).toBeDefined();
    });
  });
});
