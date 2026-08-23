import { describe, it, expect } from 'vitest';

import { composeAdditionalData } from './scss-options';

const TOKENS = '@use "/abs/lib.scss" as tokens;';

describe('composeAdditionalData', () => {
  it('bruger token-importen alene når forbrugeren ingen har', () => {
    expect(composeAdditionalData(TOKENS, undefined)).toBe(TOKENS);
  });

  // 🔴 Kernen: forbrugerens egen additionalData må ALDRIG forsvinde.
  it('sætter token-importen FORAN en eksisterende streng', () => {
    expect(composeAdditionalData(TOKENS, '@use "mine" as m;')).toBe(
      `${TOKENS}\n@use "mine" as m;`,
    );
  });

  it('bevarer en eksisterende FUNKTION og dens argumenter', async () => {
    const seen: Array<[string, string]> = [];
    const composed = composeAdditionalData(TOKENS, (source, filename) => {
      seen.push([source, filename]);
      return `/* ${filename} */`;
    });

    expect(typeof composed).toBe('function');
    const out = await (composed as (s: string, f: string) => Promise<string>)(
      '.a{}',
      'a.scss',
    );

    expect(out).toBe(`${TOKENS}\n/* a.scss */`);
    expect(seen).toEqual([['.a{}', 'a.scss']]);
  });

  it('venter på en asynkron eksisterende funktion', async () => {
    const composed = composeAdditionalData(TOKENS, async () => 'sent');
    const out = await (composed as (s: string, f: string) => Promise<string>)(
      '',
      '',
    );

    expect(out).toBe(`${TOKENS}\nsent`);
  });
});
