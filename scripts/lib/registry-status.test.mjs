import { describe, expect, it } from 'vitest';

import {
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
