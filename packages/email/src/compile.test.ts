import { describe, it, expect, beforeAll } from 'vitest';
import { resolveEmailTheme } from './theme';
import { createBlocks } from './blocks';
import { baseLayout } from './layout';
import { compileMjml, toPlainText, type CompileResult } from './compile';

const theme = resolveEmailTheme();
const b = createBlocks(theme);

function sampleMjml(): string {
  return baseLayout({
    theme,
    preheader: 'Preview {{name}}',
    content: [
      b.heading({ text: 'Hi {{name}}' }),
      b.text({ text: 'Body copy', muted: true }),
      b.button({ label: 'Open', href: '{{url}}' }),
    ].join('\n'),
    footer: b.footer({ text: 'ACME' }),
    lang: 'en',
  });
}

describe('compileMjml', () => {
  let result: CompileResult;
  beforeAll(async () => {
    result = await compileMjml(sampleMjml(), { validationLevel: 'strict' });
  });

  it('compiles without MJML errors', () => {
    expect(result.errors).toEqual([]);
  });

  it('produces a full HTML document', () => {
    expect(result.html).toContain('<!doctype html>');
    expect(result.html.toLowerCase()).toContain('<html');
  });

  it('keeps handlebars placeholders intact in text and href', () => {
    expect(result.html).toContain('{{name}}');
    expect(result.html).toContain('{{url}}');
  });

  it('inlines token-derived styles', () => {
    expect(result.html).toContain(theme.colors.primary);
  });
});

describe('toPlainText', () => {
  let text: string;
  beforeAll(async () => {
    const { html } = await compileMjml(sampleMjml());
    text = toPlainText(html);
  });

  it('skips the hidden preheader', () => {
    expect(text).not.toContain('Preview {{name}}');
  });

  it('keeps body content and link placeholders', () => {
    expect(text).toContain('Hi {{name}}');
    expect(text).toContain('{{url}}');
  });

  it('never splits a handlebars expression across lines', async () => {
    const compiled = await compileMjml(
      baseLayout({
        theme,
        content: b.text({
          text: 'A very long sentence designed to force word wrapping near the placeholder {{someLongVariableName}} so we can assert it stays intact across the wrap boundary.',
        }),
      }),
    );
    const wrapped = toPlainText(compiled.html, { wordwrap: 40 });
    expect(wrapped).toContain('{{someLongVariableName}}');
  });
});
