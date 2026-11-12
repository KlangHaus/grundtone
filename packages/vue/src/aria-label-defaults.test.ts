import { afterEach, describe, expect, it, vi } from 'vitest';
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import { h, nextTick, type Component } from 'vue';
import Alert from './molecules/Alert/Alert.vue';
import CookieMessage from './molecules/CookieMessage/CookieMessage.vue';
import Modal from './molecules/Modal/Modal.vue';
import Toast from './molecules/Toast/Toast.vue';
import DatePicker from './molecules/DatePicker/DatePicker.vue';
import RichText from './molecules/RichText/RichText.vue';
import CodeBlock from './atoms/CodeBlock/CodeBlock.vue';
import Carousel from './molecules/Carousel/Carousel.vue';
import CarouselSlide from './molecules/Carousel/CarouselSlide.vue';
import Table from './molecules/Table/Table.vue';
import Tag from './atoms/Tag/Tag.vue';
import FileUpload from './atoms/FileUpload/FileUpload.vue';
import Slider from './atoms/Slider/Slider.vue';
import ErrorPage from './molecules/ErrorPage/ErrorPage.vue';

// 🔴 The aria-labels that used to be template literals are props now
// (ClickUp 869fbfz74), released as a minor: a consumer who passes nothing must
// get exactly the text they got before. Each case renders the component with
// its defaults and finds the OLD text, then renders it with the prop set and
// finds the new text in its place. The old texts below are copied from the
// templates as they were, not from the new defaults.

const mounted: VueWrapper[] = [];
afterEach(() => {
  mounted.splice(0).forEach(w => w.unmount());
  document.body.innerHTML = '';
});

/** Every aria-label in the document (Modal teleports to body). */
function labels(): string[] {
  return [...document.querySelectorAll('[aria-label]')].map(el =>
    el.getAttribute('aria-label')!,
  );
}

async function render(
  component: Component,
  props: Record<string, unknown>,
  options: { slots?: Record<string, () => unknown> } = {},
) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const w = mount(component, {
    props,
    attachTo: host,
    global: { stubs: { GTIcon: true } },
    ...options,
  });
  mounted.push(w);
  await flushPromises();
  await nextTick();
  return w;
}

type Case = {
  name: string;
  component: Component;
  props: Record<string, unknown>;
  slots?: Record<string, () => unknown>;
  /** Puts the component in the state where the labels render. */
  act?: (w: VueWrapper) => Promise<void>;
  /** prop name -> [text before this change, override] */
  labels: Record<string, [string, unknown, string]>;
};

type EditorHandle = {
  commands: {
    setContent: (c: unknown) => boolean;
    setTextSelection: (pos: number) => boolean;
  };
};

/** Same steps as RichText.test.ts: a link in the text, caret inside it. */
async function caretInLink(w: VueWrapper) {
  const ed = (w.vm as unknown as { editor: EditorHandle }).editor;
  ed.commands.setContent('<p>Se <a href="https://x.dk">docs</a> her</p>');
  ed.commands.setTextSelection(6);
  await flushPromises();
}

const slides = () =>
  [0, 1, 2].map(i => h(CarouselSlide, { key: i }, () => `Slide ${i + 1}`));

const CASES: Case[] = [
  {
    name: 'GTAlert',
    component: Alert,
    props: { variant: 'info', dismissible: true },
    labels: { closeLabel: ['Close', 'Dismiss', 'Dismiss'] },
  },
  {
    name: 'GTCookieMessage',
    component: CookieMessage,
    props: {},
    labels: { closeLabel: ['Luk', 'Close', 'Close'] },
  },
  {
    name: 'GTModal',
    component: Modal,
    props: { open: true, title: 'T' },
    labels: { closeLabel: ['Luk', 'Close', 'Close'] },
  },
  {
    name: 'GTToast',
    component: Toast,
    props: { message: 'm', dismissible: true },
    labels: { closeLabel: ['Luk', 'Close', 'Close'] },
  },
  {
    name: 'GTDatePicker',
    component: DatePicker,
    props: {},
    labels: { openCalendarLabel: ['Åbn kalender', 'Open', 'Open'] },
  },
  {
    name: 'GTDatePicker (open)',
    component: DatePicker,
    props: {},
    act: async w => {
      await w.find('button[class*="__icon-btn"]').trigger('click');
      await flushPromises();
    },
    labels: {
      closeCalendarLabel: ['Luk kalender', 'Close', 'Close'],
      previousMonthLabel: ['Forrige måned', 'Previous', 'Previous'],
      nextMonthLabel: ['Næste måned', 'Next', 'Next'],
    },
  },
  {
    name: 'GTRichText',
    component: RichText,
    props: {},
    labels: { toolbarLabel: ['Formatering', 'Formatting', 'Formatting'] },
  },
  {
    name: 'GTRichText (caret in a link)',
    component: RichText,
    props: {},
    act: caretInLink,
    labels: {
      openLinkLabel: [
        'Åbn link i nyt faneblad',
        'Open in new tab',
        'Open in new tab',
      ],
      editLinkLabel: ['Redigér link', 'Edit link', 'Edit link'],
      removeLinkLabel: ['Fjern link', 'Remove link', 'Remove link'],
    },
  },
  {
    name: 'GTRichText (link editor)',
    component: RichText,
    props: {},
    act: async w => {
      await caretInLink(w);
      // The bubble's edit button opens the link editor; found by position,
      // because its label is one of the props under test.
      await w.findAll('button[class*="__bubble-action"]')[0]!.trigger('click');
      await flushPromises();
    },
    labels: { linkInputLabel: ['Link', 'Web address', 'Web address'] },
  },
  {
    name: 'GTCodeBlock',
    component: CodeBlock,
    props: { code: 'x' },
    labels: { copyLabel: ['Kopiér kode', 'Copy', 'Copy'] },
  },
  {
    name: 'GTCodeBlock (copied)',
    component: CodeBlock,
    props: { code: 'x' },
    act: async w => {
      await w.find('button').trigger('click');
      await flushPromises();
    },
    labels: { copiedLabel: ['Kopieret', 'Copied', 'Copied'] },
  },
  {
    name: 'GTCarousel',
    component: Carousel,
    props: {},
    slots: { default: slides },
    labels: {
      previousSlideLabel: ['Forrige slide', 'Previous', 'Previous'],
      nextSlideLabel: ['Næste slide', 'Next', 'Next'],
      goToSlideLabel: [
        'Gå til slide 2',
        (n: number) => `Slide ${n}`,
        'Slide 2',
      ],
    },
  },
  {
    name: 'GTTable',
    component: Table,
    props: {
      columns: [{ key: 'a', label: 'A' }],
      rows: [{ a: 1 }, { a: 2 }],
      selectable: true,
    },
    labels: {
      selectAllLabel: ['Vælg alle rækker', 'Select all', 'Select all'],
      selectRowLabel: ['Vælg række 2', (n: number) => `Row ${n}`, 'Row 2'],
    },
  },
  {
    name: 'GTTag',
    component: Tag,
    props: { label: 'Design', dismissible: true },
    labels: {
      removeLabel: [
        'Fjern Design',
        (l: string) => `Remove ${l}`,
        'Remove Design',
      ],
    },
  },
  {
    name: 'GTFileUpload',
    component: FileUpload,
    props: {},
    act: async w => {
      const files = [new File(['x'], 'a.pdf', { type: 'application/pdf' })];
      await w
        .find('[class*="__dropzone"]')
        .trigger('drop', { dataTransfer: { files } });
      await flushPromises();
    },
    labels: {
      removeFileLabel: [
        'Fjern a.pdf',
        (n: string) => `Remove ${n}`,
        'Remove a.pdf',
      ],
    },
  },
  {
    name: 'GTSlider (range)',
    component: Slider,
    props: { range: true, label: 'Pris', modelValue: [10, 90] },
    labels: {
      minimumThumbLabel: [
        'Pris minimum',
        (l?: string) => `${l} from`,
        'Pris from',
      ],
      maximumThumbLabel: ['Pris maximum', (l?: string) => `${l} to`, 'Pris to'],
    },
  },
  {
    name: 'GTSlider (range, no label)',
    component: Slider,
    props: { range: true, modelValue: [10, 90] },
    labels: {
      minimumThumbLabel: ['Slider minimum', () => 'Low', 'Low'],
      maximumThumbLabel: ['Slider maximum', () => 'High', 'High'],
    },
  },
  {
    name: 'GTErrorPage',
    component: ErrorPage,
    props: { code: 404 },
    labels: {
      illustrationLabel: [
        'Fejl 404',
        (c?: number) => `Error ${c}`,
        'Error 404',
      ],
    },
  },
];

describe('🔴 aria-label props keep the old text as their default', () => {
  // Only clipboard: tiptap reads navigator.platform, so the object stays.
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn(async () => {}) },
    configurable: true,
  });

  it('covers every label prop (the denominator)', () => {
    // 25 strings became props: 19 literal labels and 6 interpolated ones.
    // Counted per component, since closeLabel exists on four of them.
    const covered = new Set(
      CASES.flatMap(c =>
        Object.keys(c.labels).map(prop => `${c.name.split(' ')[0]}.${prop}`),
      ),
    );
    expect(covered.size).toBe(25);
  });

  // One test per case, both renders: an old text can also occur elsewhere on
  // the component (RichText's toolbar has its own "Link" button, an existing
  // overridable default), so the override must REMOVE an occurrence, not
  // leave none.
  it.each(CASES)('$name: old text by default, the prop when set', async c => {
    const count = (all: string[], text: string) =>
      all.filter(l => l === text).length;

    const plain = await render(c.component, c.props, { slots: c.slots });
    await c.act?.(plain);
    const byDefault = labels();
    plain.unmount();
    mounted.splice(mounted.indexOf(plain), 1);
    document.body.innerHTML = '';

    const overrides = Object.fromEntries(
      Object.entries(c.labels).map(([prop, [, value]]) => [prop, value]),
    );
    const set = await render(
      c.component,
      { ...c.props, ...overrides },
      { slots: c.slots },
    );
    await c.act?.(set);
    const withProps = labels();

    for (const [before, , after] of Object.values(c.labels)) {
      expect(byDefault, `default: ${before}`).toContain(before);
      expect(withProps, `override: ${after}`).toContain(after);
      expect(count(withProps, before), `"${before}" replaced`).toBeLessThan(
        count(byDefault, before),
      );
    }
  });
});
