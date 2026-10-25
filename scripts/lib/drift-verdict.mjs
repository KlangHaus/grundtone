import { gt } from './semver-gt.mjs';

/**
 * The decision behind assert-develop-ahead-of-latest.mjs, without the network,
 * so it can be measured with a fake registry.
 *
 * `lookup(name)` returns `{ state: 'unpublished' }` or `{ version }`, and must
 * THROW when the registry cannot be read (see npm-dist-tag.mjs): an outage must
 * never turn this gate green.
 *
 * @param {object} input
 * @param {{name: string, version: string}[]} input.packages
 * @param {(name: string) => {state?: string, version?: string}} input.lookup
 * @param {boolean} input.allowEqual  "not behind" instead of "strictly ahead"
 */
export function driftVerdict({ packages, lookup, allowEqual }) {
  const rows = [];
  const failures = [];
  const failLabel = allowEqual ? 'BEHIND' : 'NOT AHEAD';
  for (const { name, version: local } of packages) {
    const result = lookup(name);
    if (result.state === 'unpublished') {
      rows.push([name, local, '(unpublished)', 'ok']);
      continue;
    }
    const ok = allowEqual
      ? !gt(result.version, local)
      : gt(local, result.version);
    rows.push([name, local, result.version, ok ? 'ok' : failLabel]);
    if (!ok) failures.push({ name, local, published: result.version });
  }
  return { rows, failures };
}
