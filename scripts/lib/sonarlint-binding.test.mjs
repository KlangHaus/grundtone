// @vitest-environment node
//
// The editor binding must name the same Sonar project CI analyses.
//
// 🔴 WHY A CELL AND NOT A COMMENT (riff KH-915). `.sonarlint/connectedMode.json`
// is copied from repo to repo — that is how it is meant to spread — and the
// copy carries the previous repo's `projectKey`. The result looks configured
// and binds the editor to the WRONG project: findings appear, they are just
// someone else's. A warning in the README reaches whoever reads the README; it
// does not reach the person who copies the file, so the comparison is computed
// here instead.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const read = rel => readFileSync(repoRoot + rel, 'utf8');

/** `sonar.projectKey=…` from a Sonar properties file. */
function propertyKey(properties) {
  const line = properties
    .split('\n')
    .map(l => l.trim())
    .find(l => l.startsWith('sonar.projectKey='));
  return line?.slice('sonar.projectKey='.length).trim();
}

describe('the SonarQube for IDE binding', () => {
  it('names the same project as sonar-project.properties', () => {
    const binding = JSON.parse(read('.sonarlint/connectedMode.json'));
    const fromProperties = propertyKey(read('sonar-project.properties'));

    // Denominator: a parse that silently returned undefined would make the
    // comparison below pass whenever BOTH sides are undefined.
    expect(
      fromProperties,
      'sonar-project.properties has no projectKey',
    ).toBeTruthy();
    expect(binding.projectKey, 'the binding has no projectKey').toBeTruthy();

    expect(binding.projectKey).toBe(fromProperties);
  });

  it('points at our self-hosted server over https', () => {
    const binding = JSON.parse(read('.sonarlint/connectedMode.json'));
    expect(binding.sonarQubeUri).toBe('https://sonar.klanghaus.dk');
  });

  // 🔴 The binding is committed, so it must never carry a credential. Each
  // developer signs in with their own; that is what makes the file shareable.
  it('carries no token or other secret', () => {
    const raw = read('.sonarlint/connectedMode.json');
    expect(raw).not.toMatch(/token|password|secret/i);
    expect(Object.keys(JSON.parse(raw)).sort()).toEqual([
      'projectKey',
      'sonarQubeUri',
    ]);
  });

  // The parser itself, so the cells above cannot pass on a bug in it.
  it('reads the key from a properties file, ignoring comments and blanks', () => {
    expect(
      propertyKey('# sonar.projectKey=wrong\n\nsonar.projectKey=right\n'),
    ).toBe('right');
    expect(propertyKey('sonar.projectName=x\n')).toBeUndefined();
  });
});
