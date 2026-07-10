import { describe, it, expect, beforeAll } from 'vitest';
import {
  defineTemplate,
  compileTemplate,
  renderTemplate,
  renderEmail,
  type CompiledTemplate,
} from './template';

const demo = defineTemplate({
  key: 'demo',
  variables: ['name', 'url'],
  locales: {
    en: {
      subject: 'Hi {{name}}',
      preheader: 'Preview',
      build: b => ({
        content:
          b.heading({ text: 'Hi {{name}}' }) +
          b.button({ label: 'Open', href: '{{url}}' }),
      }),
    },
  },
});

describe('compileTemplate', () => {
  it('returns the publishable artifact with placeholders intact', async () => {
    const c = await compileTemplate(demo, 'en', {
      mjml: { validationLevel: 'strict' },
    });
    expect(c.errors).toEqual([]);
    expect(c.subject).toBe('Hi {{name}}');
    expect(c.html).toContain('{{name}}');
    expect(c.html).toContain('{{url}}');
    expect(c.variables).toEqual(['name', 'url']);
  });

  it('throws on an unknown locale', async () => {
    // @ts-expect-error — 'da' is not a locale of demo
    await expect(compileTemplate(demo, 'da')).rejects.toThrow(/no locale/);
  });
});

describe('renderTemplate', () => {
  let compiled: CompiledTemplate;
  beforeAll(async () => {
    compiled = await compileTemplate(demo, 'en');
  });

  it('fills placeholders and HTML-escapes recipient data in the body', () => {
    const r = renderTemplate(compiled, {
      name: "O'Brien & Co",
      url: 'https://x/a',
    });
    expect(r.html).not.toContain('{{');
    expect(r.html).toMatch(/O(&#x27;|&#39;)Brien &amp; Co/);
  });

  it('does not HTML-escape the subject', () => {
    const r = renderTemplate(compiled, { name: 'A & B' });
    expect(r.subject).toBe('Hi A & B');
  });
});

describe('renderEmail', () => {
  it('compiles and renders in one step', async () => {
    const r = await renderEmail(demo, 'en', {
      name: 'Allan',
      url: 'https://x/a',
    });
    expect(r.subject).toBe('Hi Allan');
    expect(r.html).toContain('Allan');
    expect(r.text).toContain('Allan');
  });
});
