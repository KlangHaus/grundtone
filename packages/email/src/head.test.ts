import { describe, it, expect } from 'vitest';
import { resolveEmailTheme } from './theme';
import { renderHead } from './head';

describe('renderHead', () => {
  const theme = resolveEmailTheme();
  const head = renderHead(theme);

  it('wires token colours into the MJML attribute defaults', () => {
    expect(head).toContain(theme.colors.primary);
    expect(head).toContain(theme.colors.onPrimary);
    expect(head).toContain(theme.colors.text);
  });

  it('registers the theme web fonts', () => {
    expect(head).toContain('<mj-font name="IBM Plex Sans"');
  });

  it('defines the named type styles', () => {
    expect(head).toMatch(/name="h1"/);
    expect(head).toMatch(/name="h2"/);
    expect(head).toMatch(/name="lead"/);
    expect(head).toMatch(/name="small"/);
  });

  it('emits inlinable utility classes from tokens', () => {
    expect(head).toContain(
      `.gt-text-secondary { color: ${theme.colors.textSecondary}; }`,
    );
  });

  it('omits font tags when web fonts are disabled', () => {
    const bare = renderHead(resolveEmailTheme(undefined, { webFonts: [] }));
    expect(bare).not.toContain('<mj-font');
  });
});
