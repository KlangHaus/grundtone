import { describe, it, expect } from 'vitest';
import { resolveEmailTheme } from './theme';
import { createBlocks } from './blocks';
import { baseLayout } from './layout';
import { compileMjml, toPlainText } from './compile';

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
  const { html, errors } = compileMjml(sampleMjml(), {
    validationLevel: 'strict',
  });

  it('compiles without MJML errors', () => {
    expect(errors).toEqual([]);
  });

  it('produces a full HTML document', () => {
    expect(html).toContain('<!doctype html>');
    expect(html.toLowerCase()).toContain('<html');
  });

  it('keeps handlebars placeholders intact in text and href', () => {
    expect(html).toContain('{{name}}');
    expect(html).toContain('{{url}}');
  });

  it('inlines token-derived styles', () => {
    expect(html).toContain(theme.colors.primary);
  });
});

describe('toPlainText', () => {
  const { html } = compileMjml(sampleMjml());
  const text = toPlainText(html);

  it('skips the hidden preheader', () => {
    expect(text).not.toContain('Preview {{name}}');
  });

  it('keeps body content and link placeholders', () => {
    expect(text).toContain('Hi {{name}}');
    expect(text).toContain('{{url}}');
  });

  it('never splits a handlebars expression across lines', () => {
    const wrapped = toPlainText(
      compileMjml(
        baseLayout({
          theme,
          content: b.text({
            text: 'A very long sentence designed to force word wrapping near the placeholder {{someLongVariableName}} so we can assert it stays intact across the wrap boundary.',
          }),
        }),
      ).html,
      { wordwrap: 40 },
    );
    expect(wrapped).toContain('{{someLongVariableName}}');
  });
});
