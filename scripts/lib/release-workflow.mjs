/**
 * Structural checks that keep the publish gates inside the publish command
 * (riff fklbe0cwm8fth7c9jj1tx3ca).
 *
 * `changesets/action` runs its `publish` input only in the run that publishes.
 * With the gates chained into that command before `changeset publish`, they
 * run exactly when a publish can happen and always before it. With pending
 * changesets the command never runs, so a gate cannot block the Version
 * Packages PR, and there is no step order through which a publish could go
 * around them.
 *
 * release.yml runs only on push to develop, so it cannot be executed before it
 * is merged. These properties are measured on the files instead:
 *
 * - the changesets step's `publish` input is exactly the release script
 * - the release script is an `&&` chain with the gates script before
 *   `changeset publish`
 * - the gates script is an `&&` chain containing each gate exactly once
 *   (`;`, `||` or a lone `&` would let a failing gate be followed by a publish)
 * - the scanner install step runs before the changesets step, unconditionally
 * - nothing in the job continues on error
 *
 * Read as text, like workflow-order.mjs, so the check has no YAML dependency.
 */

/** The text of one job: from `  <job>:` to the next job at the same indent. */
export function jobText(workflow, job) {
  const lines = workflow.split('\n');
  const start = lines.findIndex(l => l === `  ${job}:`);
  if (start === -1) return null;
  const end = lines.findIndex(
    (l, i) => i > start && /^ {2}[A-Za-z0-9_-]+:\s*$/.test(l),
  );
  return lines.slice(start, end === -1 ? undefined : end).join('\n');
}

/** Step blocks of a job text, split on the `      - ` step marker. */
export function stepBlocks(job) {
  return job.split(/\n(?= {6}- )/).slice(1);
}

/** Splits a package script on `&&`, or returns null if it uses anything else. */
function andChain(script) {
  if (typeof script !== 'string') return null;
  const withoutAnd = script.replaceAll('&&', '');
  if (/[;|&]/.test(withoutAnd)) return null;
  return script.split('&&').map(s => s.trim());
}

/**
 * @returns {string[]} violations; empty means the properties hold.
 */
export function releaseCommandViolations(
  { workflow, scripts },
  { job, releaseScript, gatesScript, gateMarkers, installMarker },
) {
  const violations = [];
  const text = jobText(workflow, job);
  if (text === null) return [`job "${job}" not found`];
  const steps = stepBlocks(text);

  const stepIndex = marker => {
    const hits = steps
      .map((s, i) => (s.includes(marker) ? i : -1))
      .filter(i => i !== -1);
    if (hits.length !== 1) {
      violations.push(
        `"${marker}" must occur in exactly one step of ${job}, found ${hits.length}`,
      );
      return -1;
    }
    return hits[0];
  };

  const publish = stepIndex('uses: changesets/action@');
  if (publish !== -1) {
    const inputs = steps[publish].match(/^\s+publish:.*$/gm) ?? [];
    const expected = `publish: pnpm ${releaseScript}`;
    if (inputs.length !== 1 || inputs[0].trim() !== expected) {
      violations.push(
        `the changesets step must have exactly \`${expected}\`, found ${JSON.stringify(inputs.map(s => s.trim()))}`,
      );
    }
  }

  const install = stepIndex(installMarker);
  if (install !== -1) {
    if (publish !== -1 && install > publish) {
      violations.push(
        'the scanner install step runs after the changesets step',
      );
    }
    if (/^\s+if:/m.test(steps[install])) {
      violations.push('the scanner install step must not be conditional');
    }
  }

  if (/continue-on-error/.test(text)) {
    violations.push(`${job} must not continue on error anywhere`);
  }

  const release = andChain(scripts?.[releaseScript]);
  if (release === null) {
    violations.push(
      `package.json "${releaseScript}" must be a plain && chain, found ${JSON.stringify(scripts?.[releaseScript])}`,
    );
  } else {
    const gates = release.indexOf(`pnpm ${gatesScript}`);
    const publishAt = release.indexOf('changeset publish');
    if (gates === -1) {
      violations.push(`"${releaseScript}" does not run "pnpm ${gatesScript}"`);
    }
    if (publishAt === -1) {
      violations.push(`"${releaseScript}" does not run "changeset publish"`);
    }
    if (gates !== -1 && publishAt !== -1 && gates > publishAt) {
      violations.push(`"${releaseScript}" publishes before its gates`);
    }
  }

  const gates = andChain(scripts?.[gatesScript]);
  if (gates === null) {
    violations.push(
      `package.json "${gatesScript}" must be a plain && chain, found ${JSON.stringify(scripts?.[gatesScript])}`,
    );
  } else {
    for (const marker of gateMarkers) {
      const n = gates.filter(g => g.includes(marker)).length;
      if (n !== 1) {
        violations.push(
          `gate "${marker}" must occur exactly once in "${gatesScript}", found ${n}`,
        );
      }
    }
  }
  return violations;
}
