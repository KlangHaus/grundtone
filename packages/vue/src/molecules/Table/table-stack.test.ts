// @vitest-environment node
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { chromium, type Browser } from 'playwright';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import GTTable from './Table.vue';
import type { TableProps } from './types';

// 🔴 Where GTTable stacks its rows (ClickUp 869fbfz8n). `stackBelow` picks a
// named step of the breakpoint scale; the default stays 40rem (640px). Each
// case renders the real component and asks, at a width just below and just
// above its threshold, whether the header row is hidden (rows stacked).
//
// Measured against the BUILT CSS (dist/index.css), which is what consumers get.
// It needs dist/ (turbo builds before test; CI's test job downloads it).

const CSS = readFileSync(
  fileURLToPath(new URL('../../../dist/index.css', import.meta.url)),
  'utf8',
);

async function markup(props: Partial<TableProps>): Promise<string> {
  const app = createSSRApp({
    render: () =>
      h(GTTable, {
        columns: [
          { key: 'name', label: 'Name' },
          { key: 'role', label: 'Role' },
        ],
        rows: [{ name: 'Ada', role: 'Owner' }],
        ...props,
      }),
  });
  return renderToString(app);
}

type Case = {
  name: string;
  props: Partial<TableProps>;
  stackedAt: number;
  tableAt: number;
};

const CASES: Case[] = [
  {
    name: 'default (sm, 40rem)',
    props: { responsive: true },
    stackedAt: 640,
    tableAt: 641,
  },
  {
    name: 'md',
    props: { responsive: true, stackBelow: 'md' },
    stackedAt: 767,
    tableAt: 768,
  },
  {
    name: 'lg',
    props: { responsive: true, stackBelow: 'lg' },
    stackedAt: 1023,
    tableAt: 1024,
  },
  {
    name: 'xl',
    props: { responsive: true, stackBelow: 'xl' },
    stackedAt: 1279,
    tableAt: 1280,
  },
  {
    name: '2xl',
    props: { responsive: true, stackBelow: '2xl' },
    stackedAt: 1535,
    tableAt: 1536,
  },
];

/**
 * Without a browser: the media blocks of the built CSS that apply at `width`,
 * and whether one of them hides the header for the classes the markup carries.
 */
function stackedByCss(html: string, width: number): boolean {
  const wrapper =
    /<div class="([^"]*table-wrapper[^"]*)"/.exec(html)?.[1] ?? '';
  const classes = new Set(wrapper.split(/\s+/));
  const blocks = [
    ...CSS.matchAll(/@media \(width<=([\d.]+)(px|rem)\)\{([^@]*)\}/g),
  ];
  return blocks.some(([, value, unit, body]) => {
    const max = Number(value) * (unit === 'rem' ? 16 : 1);
    if (width > max) return false;
    const rules = [
      ...body!.matchAll(/((?:\.[\w-]+)+) \.table thead\{display:none\}/g),
    ];
    return rules.some(([, selector]) =>
      selector!
        .split('.')
        .filter(Boolean)
        .every(c => classes.has(c)),
    );
  });
}

describe('🔴 GTTable stacks below its breakpoint (built CSS, no browser)', () => {
  it('finds the stacking rules in the built CSS (the denominator)', () => {
    // One block for the default and one per named step above sm.
    const blocks = CSS.match(
      /@media \(width<=[\d.]+(px|rem)\)\{\.table-wrapper--responsive/g,
    );
    expect(blocks).toHaveLength(5);
  });

  it.each(CASES)('$name', async c => {
    const html = await markup(c.props);
    expect(stackedByCss(html, c.stackedAt), `${c.stackedAt}px`).toBe(true);
    expect(stackedByCss(html, c.tableAt), `${c.tableAt}px`).toBe(false);
  });

  it('does not stack without `responsive`, whatever stackBelow says', async () => {
    const html = await markup({ stackBelow: 'md' });
    expect(stackedByCss(html, 320)).toBe(false);
  });
});

// The same cases in a real browser. CI's test job installs chromium before the
// tests run; where it is not installed (sonar.yml's coverage run), this block
// is skipped and says so, and the cells above still run.
const hasChromium = existsSync(chromium.executablePath());
if (!hasChromium)
  console.warn(
    'table-stack.test.ts: chromium is not installed, the browser cells are SKIPPED ' +
      '(pnpm exec playwright install chromium).',
  );

describe.skipIf(!hasChromium)(
  '🔴 GTTable stacks below its breakpoint (chromium)',
  () => {
    let browser: Browser;
    beforeAll(async () => {
      browser = await chromium.launch();
    });
    afterAll(async () => {
      await browser?.close();
    });

    async function headerHidden(html: string, width: number): Promise<boolean> {
      const page = await browser.newPage({ viewport: { width, height: 600 } });
      await page.setContent(`<style>${CSS}</style>${html}`);
      const display = await page.$eval(
        'thead',
        el => getComputedStyle(el).display,
      );
      await page.close();
      return display === 'none';
    }

    it.each(CASES)('$name', async c => {
      const html = await markup(c.props);
      expect(await headerHidden(html, c.stackedAt), `${c.stackedAt}px`).toBe(
        true,
      );
      expect(await headerHidden(html, c.tableAt), `${c.tableAt}px`).toBe(false);
    });
  },
);
