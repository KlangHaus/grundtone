import { describe, expect, it } from 'vitest';

import {
  fetchEnvironments,
  Instrument,
  runCell,
  selfTestCells,
} from './secret-hygiene.mjs';

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

/**
 * A stand-in for `fetch` that serves the given pages in order and records the URLs it was asked
 * for. `pages` holds JSON bodies, or a number for an HTTP error status.
 */
function stubFetch(pages) {
  const urls = [];
  const fetchImpl = async url => {
    urls.push(url);
    const page = pages[urls.length - 1];
    if (typeof page === 'number') return { ok: false, status: page };
    return { ok: true, status: 200, json: async () => page };
  };
  return { fetchImpl, urls };
}

const env = name => ({ name, deployment_branch_policy: { custom: true } });
const opts = fetchImpl => ({
  token: 't',
  repo: 'o/r',
  apiUrl: 'https://api.example',
  fetchImpl,
});

describe('fetchEnvironments', () => {
  // 🔴 Bugbot on #291: v4 read one page and never compared it with total_count.
  it('reads every page until total_count is reached', async () => {
    const { fetchImpl, urls } = stubFetch([
      { total_count: 3, environments: [env('a'), env('b')] },
      { total_count: 3, environments: [env('c')] },
    ]);
    const envs = await fetchEnvironments(opts(fetchImpl));
    expect(envs.map(e => e.name)).toEqual(['a', 'b', 'c']);
    expect(urls).toEqual([
      'https://api.example/repos/o/r/environments?per_page=100&page=1',
      'https://api.example/repos/o/r/environments?per_page=100&page=2',
    ]);
  });

  it('refuses a list shorter than its own total_count', async () => {
    const { fetchImpl } = stubFetch([
      { total_count: 3, environments: [env('a')] },
      { total_count: 3, environments: [] },
    ]);
    await expect(fetchEnvironments(opts(fetchImpl))).rejects.toThrow(
      /read 1 but total_count says 3/,
    );
  });

  it('refuses a response without total_count', async () => {
    const { fetchImpl } = stubFetch([{ environments: [env('a')] }]);
    await expect(fetchEnvironments(opts(fetchImpl))).rejects.toThrow(
      Instrument,
    );
  });

  it('refuses an empty token before asking anything', async () => {
    const { fetchImpl, urls } = stubFetch([]);
    await expect(
      fetchEnvironments({ ...opts(fetchImpl), token: '' }),
    ).rejects.toThrow(/GITHUB_TOKEN is empty/);
    expect(urls).toEqual([]);
  });
});
