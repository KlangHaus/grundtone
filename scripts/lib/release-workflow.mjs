/**
 * Structural checks that keep the publish gates fail-closed in release.yml
 * (riff fklbe0cwm8fth7c9jj1tx3ca).
 *
 * The workflow cannot be executed before it is merged — it runs only on push
 * to develop — so the properties that make "gates only in the run that
 * publishes" safe are measured on the file instead:
 *
 * - the release-mode step runs before every gate and before the changesets step
 * - each gate is skipped ONLY on an explicit `skip`: a missing or empty output
 *   (the step never ran, a typo in the id) must run the gate, not skip it
 * - the changesets step receives a publish script only when the gates ran, so
 *   the action cannot publish in a run whose gates were skipped
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

/**
 * @returns {string[]} violations; empty means the properties hold.
 */
export function releaseGateViolations(
  workflow,
  { job, modeStepId, gateMarkers, publishMarker, publishScript },
) {
  const violations = [];
  const text = jobText(workflow, job);
  if (text === null) return [`job "${job}" not found`];

  const steps = stepBlocks(text);
  const indexOf = marker => {
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

  const mode = indexOf(`id: ${modeStepId}`);
  const publish = indexOf(publishMarker);
  const skipOnlyOnExplicitSkip = `if: steps.${modeStepId}.outputs.gates != 'skip'`;

  if (mode !== -1 && /^\s+if:/m.test(steps[mode])) {
    violations.push(`the ${modeStepId} step must not be conditional`);
  }

  for (const marker of gateMarkers) {
    const i = indexOf(marker);
    if (i === -1) continue;
    if (mode !== -1 && i < mode) {
      violations.push(`gate "${marker}" runs before the ${modeStepId} step`);
    }
    if (publish !== -1 && i > publish) {
      violations.push(`gate "${marker}" runs after the publish step`);
    }
    const ifs = steps[i].match(/^\s+if:.*$/gm) ?? [];
    if (ifs.length !== 1 || ifs[0].trim() !== skipOnlyOnExplicitSkip) {
      violations.push(
        `gate "${marker}" must carry exactly \`${skipOnlyOnExplicitSkip}\`, found ${JSON.stringify(ifs.map(s => s.trim()))}`,
      );
    }
  }

  if (publish !== -1) {
    if (mode !== -1 && publish < mode) {
      violations.push(`the publish step runs before the ${modeStepId} step`);
    }
    const expected = `publish: \${{ steps.${modeStepId}.outputs.gates != 'skip' && '${publishScript}' || '' }}`;
    if (!steps[publish].split('\n').some(l => l.trim() === expected)) {
      violations.push(
        `the publish step must receive its script only when the gates ran: \`${expected}\``,
      );
    }
  }

  if (/continue-on-error/.test(text)) {
    violations.push(`${job} must not continue on error anywhere`);
  }
  return violations;
}
