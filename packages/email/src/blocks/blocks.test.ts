import { describe, it, expect } from 'vitest';
import { resolveEmailTheme } from '../theme';
import { createBlocks } from './index';

const theme = resolveEmailTheme();
const b = createBlocks(theme);

describe('blocks', () => {
  it('heading uses the named type style', () => {
    expect(b.heading({ text: 'Hi', level: 2 })).toContain('mj-class="h2"');
  });

  it('text supports lead/small sizes and muted colour', () => {
    expect(b.text({ text: 'x', size: 'lead' })).toContain('mj-class="lead"');
    expect(b.text({ text: 'x', muted: true })).toContain(
      `color="${theme.colors.textSecondary}"`,
    );
  });

  it('button carries the href and a secondary variant', () => {
    expect(b.button({ label: 'Go', href: '{{url}}' })).toContain(
      'href="{{url}}"',
    );
    const secondary = b.button({
      label: 'Go',
      href: '#',
      variant: 'secondary',
    });
    expect(secondary).toContain(`color="${theme.colors.primary}"`);
  });

  it('header renders a logo image', () => {
    const h = b.header({ logoUrl: 'https://x/logo.png', logoAlt: 'Logo' });
    expect(h).toContain('<mj-image');
    expect(h).toContain('src="https://x/logo.png"');
  });

  it('spacer sizes from the spacing scale', () => {
    expect(b.spacer({ size: 'xl' })).toContain(`height="${theme.spacing.xl}"`);
  });

  it('infobox themes from the matching status tokens', () => {
    const warn = b.infobox({ tone: 'warning', text: 'careful' });
    expect(warn).toContain(`background-color="${theme.colors.warningLight}"`);
    expect(warn).toContain(`color="${theme.colors.warningDark}"`);
  });

  it('invoiceTable leaves a handlebars each-loop and themes cells from tokens', () => {
    const table = b.invoiceTable({
      each: 'items',
      columns: [
        { header: 'Item', cell: '{{this.name}}' },
        { header: 'Amount', cell: '{{this.amount}}', align: 'right' },
      ],
      total: { label: 'Total', value: '{{total}}' },
    });
    expect(table).toContain('{{#each items}}');
    expect(table).toContain('{{/each}}');
    expect(table).toContain('{{this.name}}');
    expect(table).toContain(theme.colors.border);
    expect(table).toContain('{{total}}');
  });

  it('footer can include an unsubscribe link', () => {
    const f = b.footer({
      text: 'ACME',
      unsubscribeUrl: '{{u}}',
      unsubscribeLabel: 'Off',
    });
    expect(f).toContain('href="{{u}}"');
    expect(f).toContain('Off');
  });
});
