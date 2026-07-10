import { describe, it, expect } from 'vitest';
import { compileTemplate, renderTemplate } from '../template';
import { templates, BUILTIN_LOCALES } from './index';
import { invoice } from './invoice';

describe('built-in templates', () => {
  // This is the publish gate: every template must compile cleanly under strict
  // MJML for every locale, or the CDN build refuses to publish it.
  for (const template of templates) {
    for (const locale of BUILTIN_LOCALES) {
      it(`${template.key}/${locale} compiles under strict MJML`, async () => {
        const c = await compileTemplate(template, locale, {
          mjml: { validationLevel: 'strict' },
        });
        expect(c.errors).toEqual([]);
        expect(c.subject.length).toBeGreaterThan(0);
        expect(c.html).toContain('<!doctype html>');
      });
    }
  }

  it('invoice expands its line-item loop when rendered', async () => {
    const c = await compileTemplate(invoice, 'da');
    const r = renderTemplate(c, {
      invoiceNumber: '2026-001',
      name: 'Allan',
      total: '1.250 kr',
      payUrl: 'https://pay/x',
      items: [
        { description: 'Design system', quantity: 1, amount: '1.000 kr' },
        { description: 'Support', quantity: 5, amount: '250 kr' },
      ],
    });
    expect(r.html).not.toContain('{{');
    expect(r.html).toContain('Design system');
    expect(r.html).toContain('Support');
    // Authored plain-text invoice lists each item on its own line.
    expect(r.text).toContain('- Design system (x1): 1.000 kr');
    expect(r.text).toContain('- Support (x5): 250 kr');
  });
});
