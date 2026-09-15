/**
 * Decides whether a Release run can publish, and therefore whether the publish
 * gates must run (riff fklbe0cwm8fth7c9jj1tx3ca).
 *
 * `changesets/action` publishes only when it finds NO pending changesets; with
 * pending changesets it opens or updates the Version Packages PR instead. It
 * counts them with `@changesets/read`, minus the ids already recorded in pre
 * mode (`.changeset/pre.json`). This function mirrors that count.
 *
 * ── Why the gates may be skipped at all ─────────────────────────────────────
 * Measured 2026-09-15: the downgrade gate stood before the changesets step and
 * failed on `@grundtone/react-native`, the very package a pending changeset
 * would bump past `latest`. The Version PR that fixes the gate could never
 * open, and a security patch (GHSA-cp6q-959q-f8rh) waited 8 days behind it.
 * The gates protect the irreversible publish, not the reversible Version PR.
 *
 * ── Fail-closed ─────────────────────────────────────────────────────────────
 * Only a positive count of pending changesets returns `skip`. Malformed input
 * throws, the workflow step fails the job, and nothing happens in that run:
 * no Version PR and no publish. The workflow additionally gives the changesets
 * step no publish script when the gates are skipped, so a disagreement between
 * this count and the action's own cannot turn into a publish without gates.
 */
export function releaseMode({ changesets, preState }) {
  if (!Array.isArray(changesets)) {
    throw new TypeError('changesets must be an array of parsed changesets');
  }
  let recorded = null;
  if (preState?.mode === 'pre') {
    if (!Array.isArray(preState.changesets)) {
      throw new TypeError(
        'pre mode is active but .changeset/pre.json has no changesets list',
      );
    }
    recorded = new Set(preState.changesets);
  }

  const pending = changesets
    .filter(c => !recorded?.has(c.id))
    .map(c => c.id)
    .sort();

  return pending.length > 0
    ? {
        gates: 'skip',
        pending,
        reason: `${pending.length} pending changeset(s): this run opens or updates the Version Packages PR and cannot publish`,
      }
    : {
        gates: 'run',
        pending,
        reason: 'no pending changesets: this run may publish',
      };
}
