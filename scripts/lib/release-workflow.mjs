/**
 * Structural checks that keep the publish gates inside the publish command
 * (riff fklbe0cwm8fth7c9jj1tx3ca).
 *
 * `changesets/action` runs its publish input only in the run that publishes.
 * With the gates chained into that command before `changeset publish`, they
 * run exactly when a publish can happen and always before it. With pending
 * changesets the command never runs, so a gate cannot block the Version
 * Packages PR, and there is no step order through which a publish could go
 * around them.
 *
 * release.yml runs only on push to develop, so it cannot be executed before it
 * is merged. These properties are measured on the files instead:
 *
 * - the changesets step is pinned to a commit SHA whose contract is recorded
 *   below, every `with:` key is an input of that contract, its publish input
 *   is exactly the release script, and every `steps.<id>.outputs.<name>` the
 *   job reads is an output of that contract
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
 * The inputs and outputs of `changesets/action`, per pinned commit, copied from
 * that commit's action.yml. The runner only warns about a `with:` key the
 * action does not declare, and an output the action never sets reads as an
 * empty string, so a pin bump that keeps the old names passes every other
 * check here while the action ignores the release command.
 *
 * v2 renamed inputs and outputs (v2.0.0, changesets/action#681). A bump fails
 * this check until the new SHA's contract is added below: read its action.yml,
 * not the release notes.
 */
export const CHANGESETS_ACTION_CONTRACTS = {
  a45c4d594aa4e2c509dc14a9f2b3b67ba3780d0d: {
    version: 'v1.9.0',
    publishInput: 'publish',
    inputs: [
      'github-token',
      'publish',
      'version',
      'cwd',
      'commit',
      'title',
      'setupGitUser',
      'createGithubReleases',
      'commitMode',
      'branch',
      'prDraft',
    ],
    outputs: [
      'published',
      'publishedPackages',
      'hasChangesets',
      'pullRequestNumber',
    ],
    renamed: {},
  },
  ae32849d5ba541f9ae29e40e22a623bc13562f51: {
    version: 'v2.1.2',
    publishInput: 'publish-script',
    inputs: [
      'github-token',
      'publish-script',
      'version-script',
      'commit-message',
      'pr-title',
      'pr-draft',
      'pr-base-branch',
      'create-github-releases',
      'push-git-tags',
      'push-with-git-cli',
      'cwd',
    ],
    outputs: ['published', 'published-packages', 'has-changesets', 'pr-number'],
    // src/index.ts throwOnRenamedInputs at this commit, plus the output renames.
    renamed: {
      publish: 'publish-script',
      version: 'version-script',
      commit: 'commit-message',
      title: 'pr-title',
      branch: 'pr-base-branch',
      prDraft: 'pr-draft',
      createGithubReleases: 'create-github-releases',
      publishedPackages: 'published-packages',
      hasChangesets: 'has-changesets',
      pullRequestNumber: 'pr-number',
    },
  },
};

/** Direct child keys of a step's `with:` block. */
function withKeys(step) {
  const lines = step.split('\n');
  const at = lines.findIndex(l => /^\s+with:\s*$/.test(l));
  if (at === -1) return [];
  const indent = lines[at].search(/\S/);
  const keys = [];
  let childIndent = -1;
  for (const line of lines.slice(at + 1)) {
    if (/^\s*(#.*)?$/.test(line)) continue;
    const i = line.search(/\S/);
    if (i <= indent) break;
    if (childIndent === -1) childIndent = i;
    const key = i === childIndent && line.match(/^\s*([A-Za-z0-9_-]+):/);
    if (key) keys.push(key[1]);
  }
  return keys;
}

const unknownName = (kind, name, contract) => {
  const renamed = contract.renamed[name];
  return renamed
    ? `${kind} "${name}" is not read by changesets/action ${contract.version}: it was renamed to "${renamed}"`
    : `${kind} "${name}" is not an ${kind} of changesets/action ${contract.version}`;
};

function changesetsContractViolations(job, step) {
  const pin = step.match(/uses: changesets\/action@(\S+)/)[1];
  if (!/^[0-9a-f]{40}$/.test(pin)) {
    return [
      `changesets/action must be pinned to a full commit SHA, found "${pin}"`,
    ];
  }
  const contract = CHANGESETS_ACTION_CONTRACTS[pin];
  if (!contract) {
    return [
      `no recorded contract for changesets/action@${pin}: add its action.yml inputs and outputs to CHANGESETS_ACTION_CONTRACTS`,
    ];
  }
  const violations = [];
  for (const key of withKeys(step)) {
    if (!contract.inputs.includes(key)) {
      violations.push(unknownName('input', key, contract));
    }
  }

  const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const publishInputs =
    step.match(new RegExp(`^\\s+${escape(contract.publishInput)}:.*$`, 'gm')) ??
    [];
  const expected = `${contract.publishInput}: pnpm ${job.releaseScript}`;
  if (publishInputs.length !== 1 || publishInputs[0].trim() !== expected) {
    violations.push(
      `the changesets step must have exactly \`${expected}\`, found ${JSON.stringify(publishInputs.map(s => s.trim()))}`,
    );
  }

  const id = step.match(/^\s+id:\s*(\S+)\s*$/m)?.[1];
  if (id) {
    const refs = new RegExp(
      `steps\\.${escape(id)}\\.outputs(?:\\.([A-Za-z0-9_-]+)|\\[['"]([^'"]+)['"]\\])`,
      'g',
    );
    const names = new Map();
    for (const m of job.text.matchAll(refs)) {
      const name = m[1] ?? m[2];
      names.set(name, (names.get(name) ?? 0) + 1);
    }
    for (const [name, n] of names) {
      if (!contract.outputs.includes(name)) {
        violations.push(
          `${unknownName('output', name, contract)} (read ${n}x as steps.${id}.outputs)`,
        );
      }
    }
  }
  return violations;
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
    violations.push(
      ...changesetsContractViolations({ text, releaseScript }, steps[publish]),
    );
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
