import { describe, expect, it } from 'vitest';

import { Instrument, runCell, selfTestCells } from './secret-hygiene.mjs';

/**
 * In-process cells for the DECISION, per this repo's cut: scripts/lib is where the guard makes
 * its choices and is never excluded from coverage. These are the guard's own self-test cells —
 * CI also runs them without an install via `node scripts/secret-hygiene.mjs --self-test`, so
 * there is one list of cells and two runners, not two suites that can drift apart.
 */
describe('secret-hygiene self-test cells', () => {
  const cells = selfTestCells();

  // A list that silently shrank to a handful would still pass every `it.each` below.
  it('carries the full cell list', () => {
    expect(cells.length).toBeGreaterThanOrEqual(38);
  });

  it.each(cells.map(c => [c.label, c]))('%s', (_label, c) => {
    expect(runCell(c)).toBe(c.expect);
  });
});

describe('runCell', () => {
  it('reads an instrument error as INSTRUMENT, not as a verdict', () => {
    const fn = () => {
      throw new Instrument('cannot measure');
    };
    expect(runCell({ fn })).toBe('INSTRUMENT');
  });

  it('reports any other exception as THREW, so a crash cannot pass as a colour', () => {
    const fn = () => {
      throw new TypeError('boom');
    };
    expect(runCell({ fn })).toBe('THREW TypeError: boom');
  });
});
