import { describe, expect, it } from 'vitest';

import {
  awaitOnRegistry,
  CAUSE,
  describeUnpublished,
  unpublishedVersions,
} from './registry-status.mjs';

const pkg = { name: '@grundtone/vue', version: '3.2.0' };

/** A registry that answers, with whatever `versions` map the cell needs. */
const serving = versions => async () => ({
  ok: true,
  status: 200,
  json: async () => versions,
});

describe('unpublishedVersions', () => {
  // 🔴 THE POSITIVE CONTROL, AND IT RUNS IN THE SAME FILE AS THE OUTAGE CELL
  // ([sikkerhed]). A cell that is always red proves the branch EXISTS, not
  // that it DISCRIMINATES. Without this one, a function that returned every
  // package unconditionally would pass every other cell here.
  it('says nothing when the registry has the version', async () => {
    const out = await unpublishedVersions({
      packages: [pkg],
      fetchImpl: serving({ versions: { '3.2.0': {} } }),
    });
    expect(out).toEqual([]);
  });

  it('reports a version the registry does not have', async () => {
    const out = await unpublishedVersions({
      packages: [pkg],
      fetchImpl: serving({ versions: { '3.1.0': {} } }),
    });
    expect(out).toHaveLength(1);
    expect(out[0].cause).toBe(CAUSE.MISSING);
  });

  // 🔴 `versions`, NOT `dist-tags.latest`. A version published under another
  // tag EXISTS without being latest. This cell exists so a later
  // "simplification" to dist-tags cannot pass — every green looks the same, so
  // only a cell can tell the two readings apart.
  it('counts a version that is published but is NOT dist-tags.latest', async () => {
    const out = await unpublishedVersions({
      packages: [pkg],
      fetchImpl: serving({
        'dist-tags': { latest: '4.0.0' },
        versions: { '3.2.0': {}, '4.0.0': {} },
      }),
    });
    expect(out).toEqual([]);
  });

  // 🔴 THE OUTAGE BRANCH, AND IT ASSERTS THE CAUSE, NOT THE COLOUR
  // ([sikkerhed]). 404 and "unreadable" both fail the release; if they
  // collapse into one string the outage path can rot while the guard stays
  // red — right colour, wrong reason.
  it('treats an unreachable registry as unreadable, not as published', async () => {
    const out = await unpublishedVersions({
      packages: [pkg],
      fetchImpl: async () => {
        throw new Error('getaddrinfo ENOTFOUND registry.invalid');
      },
    });
    expect(out).toHaveLength(1);
    expect(out[0].cause).toBe(CAUSE.UNREADABLE);
    expect(out[0].cause).not.toBe(CAUSE.MISSING);
    expect(out[0].detail).toContain('registry unreadable');
  });

  it('treats a 5xx as unreadable too, with the status in the reason', async () => {
    const out = await unpublishedVersions({
      packages: [pkg],
      fetchImpl: async () => ({
        ok: false,
        status: 503,
        json: async () => ({}),
      }),
    });
    expect(out[0].cause).toBe(CAUSE.UNREADABLE);
    expect(out[0].detail).toContain('503');
  });

  // 404 is a real answer: the package was never published. It must stay
  // DISTINCT from the outage case above.
  it('keeps "never published" distinct from "unreadable"', async () => {
    const out = await unpublishedVersions({
      packages: [pkg],
      fetchImpl: async () => ({
        ok: false,
        status: 404,
        json: async () => ({}),
      }),
    });
    expect(out[0].cause).toBe(CAUSE.MISSING);
    expect(out[0].detail).toBe('never published');
  });

  it('refuses to put a name that is not an npm name into a URL', async () => {
    const out = await unpublishedVersions({
      packages: [{ name: '../../etc/passwd', version: '1.0.0' }],
      fetchImpl: async () => {
        throw new Error('must not be called');
      },
    });
    expect(out[0].cause).toBe(CAUSE.REFUSED);
  });

  // The URL is built once and wrongly escaped once; this pins both halves.
  it('escapes EVERY slash in a scoped name', async () => {
    const seen = [];
    await unpublishedVersions({
      packages: [pkg],
      registryBase: 'https://r.test',
      fetchImpl: async url => {
        seen.push(url);
        return { ok: true, status: 200, json: async () => ({ versions: {} }) };
      },
    });
    expect(seen[0]).toBe('https://r.test/@grundtone%2fvue');
    expect(seen[0]).not.toContain('/vue');
  });

  it('describes each entry with its cause for a human reading a red job', () => {
    expect(
      describeUnpublished([
        {
          name: 'a',
          version: '1.0.0',
          cause: CAUSE.UNREADABLE,
          detail: 'registry unreadable: x',
        },
      ]),
    ).toEqual(['a@1.0.0 (registry unreadable: x)']);
  });
});

// 🔴 ONE END-TO-END CELL WITH A REAL SOCKET, because every cell above injects
// fetch — and an injected fetch cannot prove that the REAL one's failure mode
// is caught. `.invalid` is reserved by RFC 2606 and can never resolve, so this
// is deterministic rather than a network dependency.
describe('the outage branch against a real fetch', () => {
  it('is unreadable, not silently fine, when the host cannot resolve', async () => {
    const out = await unpublishedVersions({
      packages: [pkg],
      registryBase: 'https://registry.invalid',
    });
    expect(out).toHaveLength(1);
    expect(out[0].cause).toBe(CAUSE.UNREADABLE);
  }, 20000);
});

describe('awaitOnRegistry — bounded read-back after a publish (1amk32fku63)', () => {
  const vue = { name: '@grundtone/vue', version: '3.3.0' };
  const email = { name: '@grundtone/email', version: '0.3.5' };

  /**
   * A registry where each package APPEARS after a given number of reads of it,
   * and a clock that advances only when the guard sleeps — so the cells are
   * deterministic and measure the loop, not the wall clock.
   */
  function lagging(appearAfter) {
    const reads = {};
    let t = 0;
    const fetchImpl = async url => {
      const name = decodeURIComponent(url.split('/').pop());
      reads[name] = (reads[name] ?? 0) + 1;
      const pkgVersion = name === vue.name ? vue.version : email.version;
      const there = reads[name] > (appearAfter[name] ?? 0);
      return {
        ok: true,
        status: 200,
        json: async () => ({ versions: there ? { [pkgVersion]: {} } : {} }),
      };
    };
    return {
      fetchImpl,
      reads,
      sleeps: [],
      now: () => t,
      sleep(ms) {
        this.sleeps.push(ms);
        t += ms;
        return Promise.resolve();
      },
    };
  }

  const run = (reg, packages, timeoutMs = 60_000) =>
    awaitOnRegistry({
      packages,
      timeoutMs,
      intervalMs: 10_000,
      fetchImpl: reg.fetchImpl,
      now: reg.now,
      sleep: ms => reg.sleep(ms),
    });

  it('ACCEPT: returns [] at once when everything is already there — no sleep', async () => {
    const reg = lagging({});
    expect(await run(reg, [vue, email])).toEqual([]);
    expect(reg.sleeps).toEqual([]);
  });

  it('waits out a lag, and only re-reads what is still missing', async () => {
    // email appears on its 3rd read; vue is there from the start.
    const reg = lagging({ [email.name]: 2 });
    expect(await run(reg, [vue, email])).toEqual([]);
    expect(reg.sleeps).toEqual([10_000, 10_000]);
    expect(reg.reads[vue.name]).toBe(1);
    expect(reg.reads[email.name]).toBe(3);
  });

  it('🔴 gives up at the deadline and NAMES what never appeared', async () => {
    const reg = lagging({ [email.name]: 1_000 });
    const out = await run(reg, [vue, email], 30_000);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({ ...email, cause: CAUSE.MISSING });
    // bounded: 30 s / 10 s = 3 sleeps, then the deadline answers
    expect(reg.sleeps).toHaveLength(3);
  });

  it('does not wait on a name it refuses to query', async () => {
    const reg = lagging({});
    const out = await run(reg, [{ name: '../evil', version: '1.0.0' }]);
    expect(out[0].cause).toBe(CAUSE.REFUSED);
    expect(reg.sleeps).toEqual([]);
  });

  it('an unreadable registry is retried, and reported as unreadable at the deadline', async () => {
    let t = 0;
    const out = await awaitOnRegistry({
      packages: [vue],
      timeoutMs: 20_000,
      intervalMs: 10_000,
      fetchImpl: async () => {
        throw new Error('ECONNRESET');
      },
      now: () => t,
      sleep: async ms => {
        t += ms;
      },
    });
    expect(out[0].cause).toBe(CAUSE.UNREADABLE);
  });
});
