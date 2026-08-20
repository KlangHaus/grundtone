import { describe, it, expect } from 'vitest';

import { lookupPublished } from './npm-dist-tag.mjs';

const fail = (props) => () => {
  throw Object.assign(new Error('npm failed'), props);
};

describe('lookupPublished', () => {
  it('læser versionen på tagget', () => {
    expect(lookupPublished('@grundtone/vue', 'latest', () => '2.23.3\n')).toEqual(
      { state: 'published', version: '2.23.3' },
    );
  });

  // Pakken findes, men tagget gør ikke: npm svarer tom linje med exit 0.
  it('tom linje betyder ikke udgivet på det tag', () => {
    expect(lookupPublished('@grundtone/mcp', 'next', () => '\n')).toEqual({
      state: 'unpublished',
    });
  });

  it('E404 betyder aldrig udgivet', () => {
    expect(
      lookupPublished('@grundtone/nyt', 'latest', fail({ stderr: 'npm ERR! E404 Not Found' })),
    ).toEqual({ state: 'unpublished' });
  });

  // 🔴 Filens hele eksistensberettigelse: "kunne ikke se efter" må ALDRIG
  // ende samme sted som "findes ikke". Denne kode er den hårde gate lige før
  // et publish, der ikke kan gøres om.
  it('KASTER på alt andet frem for at melde grønt på en umåling', () => {
    for (const err of [
      { stderr: 'npm ERR! code E429 Too Many Requests' },
      { stderr: 'npm ERR! network timeout' },
      { message: 'spawn npm ENOENT' },
    ]) {
      expect(() => lookupPublished('@grundtone/vue', 'latest', fail(err))).toThrow(
        /IKKE det samme som en pakke der ikke findes/,
      );
    }
  });

  // Bevaret fra assert-develop-ahead-of-latest.test.mjs, som lå ved siden af
  // scriptet og hed noget bredere end den målte. En fejltekst der tilfældigvis
  // indeholder cifrene 404 uden at VÆRE et 404-svar må ikke smutte igennem som
  // "findes ikke" — E404-genkendelsen er ordgrænse-bundet netop derfor.
  it('lader ikke et løst "404" i en anden fejl passere som uudgivet', () => {
    expect(() =>
      lookupPublished(
        '@grundtone/vue',
        'latest',
        fail({ message: 'npm error ECONNRESET after 404 ms' }),
      ),
    ).toThrow(/IKKE det samme som/);
  });
});
