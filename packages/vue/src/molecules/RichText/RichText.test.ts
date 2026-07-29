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

  describe('roving tabindex toolbar (iteration 2)', () => {
    it('exactly one tab stop: first button 0, rest -1', async () => {
      const buttons = (await mountRT()).findAll(`.${BASE}__tool`);
      expect(buttons[0].attributes('tabindex')).toBe('0');
      for (const b of buttons.slice(1)) {
        expect(b.attributes('tabindex')).toBe('-1');
      }
    });

    it('ArrowRight moves the roving stop; Home returns it', async () => {
      const wrapper = await mountRT();
      const bar = wrapper.find(`.${BASE}__toolbar`);
      await bar.trigger('keydown', { key: 'ArrowRight' });
      let buttons = wrapper.findAll(`.${BASE}__tool`);
      expect(buttons[0].attributes('tabindex')).toBe('-1');
      expect(buttons[1].attributes('tabindex')).toBe('0');
      await bar.trigger('keydown', { key: 'Home' });
      buttons = wrapper.findAll(`.${BASE}__tool`);
      expect(buttons[0].attributes('tabindex')).toBe('0');
    });
  });

  describe('link popover (iteration 2)', () => {
    type EditorHandle = {
      commands: {
        setContent: (c: unknown) => boolean;
        selectAll: () => boolean;
        setTextSelection: (pos: number) => boolean;
      };
      getHTML: () => string;
    };

    async function mountWithSelection() {
      const wrapper = await mountRT();
      const ed = (wrapper.vm as unknown as { editor: EditorHandle }).editor;
      ed.commands.setContent('<p>Læs mere om Resonans</p>');
      ed.commands.selectAll();
      await flushPromises();
      return { wrapper, ed };
    }

    function linkButton(wrapper: Awaited<ReturnType<typeof mountRT>>) {
      return wrapper
        .findAll(`.${BASE}__tool`)
        .find(b => b.attributes('aria-label') === 'Link')!;
    }

    it('link tool is disabled without a selection, enabled with one', async () => {
      const wrapper = await mountRT();
      expect(linkButton(wrapper).attributes('disabled')).toBeDefined();
      const ed = (wrapper.vm as unknown as { editor: EditorHandle }).editor;
      ed.commands.setContent('<p>tekst</p>');
      ed.commands.selectAll();
      await flushPromises();
      expect(linkButton(wrapper).attributes('disabled')).toBeUndefined();
    });

    it('opens the popover instead of window.prompt and applies a valid link', async () => {
      const { wrapper, ed } = await mountWithSelection();
      await linkButton(wrapper).trigger('click');
      const popover = wrapper.find(`.${BASE}__popover`);
      expect(popover.exists()).toBe(true);

      await popover
        .find(`.${BASE}__popover-input`)
        .setValue('https://klanghaus.dk');
      await popover
        .findAll(`.${BASE}__popover-btn`)
        .find(b => b.text().includes('Tilføj link'))!
        .trigger('click');
      await flushPromises();

      expect(wrapper.find(`.${BASE}__popover`).exists()).toBe(false);
      expect(ed.getHTML()).toContain('href="https://klanghaus.dk"');
    });

    it('blocks javascript: URLs with an inline error — no link applied', async () => {
      const { wrapper, ed } = await mountWithSelection();
      await linkButton(wrapper).trigger('click');
      const popover = wrapper.find(`.${BASE}__popover`);
      await popover
        .find(`.${BASE}__popover-input`)
        .setValue('javascript:alert(1)');
      await popover
        .findAll(`.${BASE}__popover-btn`)
        .find(b => b.text().includes('Tilføj link'))!
        .trigger('click');
      await flushPromises();

      // Popover stays open with a visible error; document untouched.
      expect(wrapper.find(`.${BASE}__popover`).exists()).toBe(true);
      expect(wrapper.find(`.${BASE}__popover-error`).exists()).toBe(true);
      expect(ed.getHTML()).not.toContain('<a');
    });

    it('"open in new tab" adds target=_blank + rel=noopener', async () => {
      const { wrapper, ed } = await mountWithSelection();
      await linkButton(wrapper).trigger('click');
      const popover = wrapper.find(`.${BASE}__popover`);
      await popover
        .find(`.${BASE}__popover-input`)
        .setValue('https://klanghaus.dk');
      await popover.find('input[type="checkbox"]').setValue(true);
      await popover
        .findAll(`.${BASE}__popover-btn`)
        .find(b => b.text().includes('Tilføj link'))!
        .trigger('click');
      await flushPromises();

      const html = ed.getHTML();
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener"');
    });

    it('caret inside a link shows the bubble; unlink removes the mark', async () => {
      const wrapper = await mountRT();
      const ed = (wrapper.vm as unknown as { editor: EditorHandle }).editor;
      ed.commands.setContent('<p>Se <a href="https://x.dk">docs</a> her</p>');
      ed.commands.setTextSelection(6); // caret inside the link text
      await flushPromises();

      const bubble = wrapper.find(`.${BASE}__bubble`);
      expect(bubble.exists()).toBe(true);
      expect(bubble.text()).toContain('https://x.dk');

      await bubble.find('button[aria-label="Fjern link"]').trigger('click');
      await flushPromises();
      expect(ed.getHTML()).not.toContain('<a');
    });

    it('Escape closes the popover without applying', async () => {
      const { wrapper, ed } = await mountWithSelection();
      await linkButton(wrapper).trigger('click');
      const popover = wrapper.find(`.${BASE}__popover`);
      await popover.find(`.${BASE}__popover-input`).setValue('https://x.dk');
      await popover.trigger('keydown', { key: 'Escape' });
      await flushPromises();

      expect(wrapper.find(`.${BASE}__popover`).exists()).toBe(false);
      expect(ed.getHTML()).not.toContain('<a');
    });
  });
});
