import { describe, it, expect } from 'vitest';

import {
  referencedEnvironments,
  unprotectedReferences,
} from './environment-gates.mjs';

describe('referencedEnvironments', () => {
  it('finder objekt-formen', () => {
    const wf = `jobs:\n  deploy:\n    environment:\n      name: production\n      url: https://x\n`;

    expect([...referencedEnvironments(wf)]).toEqual(['production']);
  });

  it('finder den korte form', () => {
    expect([...referencedEnvironments('    environment: staging\n')]).toEqual([
      'staging',
    ]);
  });

  // 🔴 Regressionen fra den positive kontrol: `\s` matcher ogsaa newline, saa
  // `environment:\n  name: x` blev fanget som vaerdien "name: x". En parser
  // proevet mod input UDEN traeffere ser rigtig ud uanset.
  it('forveksler ikke objekt-formens næste linje med en værdi', () => {
    const wf = `    environment:\n      name: production\n`;

    expect([...referencedEnvironments(wf)]).toEqual(['production']);
  });

  // 🔴 [quality]s krav om kommentar-filtrering, efterproevet frem for antaget.
  // Linje-kommentarer virkede allerede; INLINE gjorde ikke — `production # x`
  // blev fanget med kommentaren, opslaget fejlede, og gaten meldte "kunne ikke
  // slås op": en falsk positiv paa en helt korrekt workflow.
  it('ignorerer udkommenterede referencer', () => {
    expect([...referencedEnvironments('  # environment: production\n')]).toEqual([]);
    expect(
      [...referencedEnvironments('  # environment:\n  #   name: production\n')],
    ).toEqual([]);
  });

  it('strippper inline-kommentar og anførselstegn fra værdien', () => {
    expect([...referencedEnvironments('  environment: production # midlertidig\n')]).toEqual(
      ['production'],
    );
    expect([...referencedEnvironments('  environment: "production"\n')]).toEqual([
      'production',
    ]);
    expect(
      [...referencedEnvironments('  environment:\n    name: production # x\n')],
    ).toEqual(['production']);
  });

  it('finder intet i en workflow uden environments', () => {
    expect([...referencedEnvironments('jobs:\n  a:\n    steps: []\n')]).toEqual(
      [],
    );
  });
});

describe('unprotectedReferences', () => {
  it('flager et environment uden regler', () => {
    const r = unprotectedReferences(
      new Set(['production']),
      new Map([['production', []]]),
    );

    expect(r).toEqual([
      { name: 'production', reason: 'protection_rules er tom — venter ikke på nogen' },
    ]);
  });

  it('accepterer et environment med regler', () => {
    expect(
      unprotectedReferences(
        new Set(['production']),
        new Map([['production', [{ type: 'required_reviewers' }]]]),
      ),
    ).toEqual([]);
  });

  // Fravaer af svar maa ikke laese som bekraeftelse: kan vi ikke se at det
  // gater, saa gater det ikke — for os.
  it('flager et environment vi ikke kunne slå op', () => {
    const r = unprotectedReferences(new Set(['ukendt']), new Map());

    expect(r).toEqual([{ name: 'ukendt', reason: 'kunne ikke slås op' }]);
  });
});
