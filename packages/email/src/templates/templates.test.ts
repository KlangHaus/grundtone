import { describe, it, expect } from 'vitest';
import { compileTemplate, renderTemplate } from '../template';
import { templates, BUILTIN_LOCALES } from './index';
import { invoice } from './invoice';
import { viesVerificationFailed } from './vies-verification-failed';

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

  it('vies-verification-failed renders vars and the billing deep link intact', async () => {
    const c = await compileTemplate(viesVerificationFailed, 'da');
    const r = renderTemplate(c, {
      fornavn: 'Allan',
      momsnummer: 'DK12345678',
      plan_navn: 'Studio',
      org_slug: 'klanghaus',
    });
    expect(r.html).not.toContain('{{');
    // Ruling-critical content (ToS §5.5): the 14-day window and the calm
    // "unchanged active" reassurance must survive compilation verbatim.
    expect(r.html).toContain('DK12345678');
    expect(r.html).toContain('14 dage');
    expect(r.html).toContain('uændret aktivt');
    // The deep link must not be HTML-escape-mangled (the #41 class of bug).
    expect(r.html).toContain('https://studio.grundtone.com/orgs/klanghaus/billing');
    expect(r.text).toContain('https://studio.grundtone.com/orgs/klanghaus/billing');
    expect(r.subject).toBe('Vi kunne ikke bekræfte dit momsnummer');
  });
});
