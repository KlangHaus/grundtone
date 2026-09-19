// @vitest-environment node
//
// node, ikke rod-configens jsdom: cellen spawner rigtige processer og finder
// repo-roden via `import.meta.url`, som under jsdom er en http-URL.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * 🔴 Kører de RIGTIGE publish-scripts, ikke kun hjælpefunktionen.
 *
 * Det, der gik galt (riff ua771kpb), var ikke en forkert beslutning i en ren
 * funktion — det var, at et deploy-trin med tomme secrets blev **success**.
 * Målt i release-kørsel 35459568087: GitHub maskerer et sat secret som `***`,
 * og i loggen stod der ingenting efter `BUNNY_DOCS_STORAGE_ZONE:`. Derfor
 * spørger cellen scriptet om præcis dét: hvad er exit-koden, når værdien er tom?
 *
 * Begge scripts afgør deploy/skip/fejl FØR de rører build-output, så cellen
 * behøver hverken et bygget site eller en netværksforbindelse.
 */

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));

/**
 * 🔴 spawnSync og BEGGE strømme. Første udgave brugte execFileSync, som kun
 * giver stdout — skip-beskeden skrives med console.warn til stderr, så cellen
 * så en tom streng og faldt på en besked, scriptet faktisk havde skrevet.
 *
 * @returns {{status: number, output: string}}
 */
function run(script, env) {
  const r = spawnSync('node', ['--import', 'tsx', script], {
    cwd: repoRoot,
    encoding: 'utf8',
    // Kun de secrets, cellen handler om, sættes eksplicit; resten af miljøet
    // (PATH osv.) arves, ellers kan node ikke starte.
    env: { ...process.env, BUNNY_DEPLOY_OPTIONAL: '', SENTRY_DSN: '', ...env },
  });
  if (r.error) throw r.error;
  return {
    status: r.status ?? 1,
    output: `${r.stdout ?? ''}${r.stderr ?? ''}`,
  };
}

const SCRIPTS = [
  {
    label: 'publish-bunny (docs)',
    path: 'apps/docs/scripts/publish-bunny.ts',
    zone: 'BUNNY_DOCS_STORAGE_ZONE',
    key: 'BUNNY_DOCS_STORAGE_API_KEY',
  },
  {
    label: 'publish-cdn (email)',
    path: 'packages/email/scripts/publish-cdn.ts',
    zone: 'BUNNY_STORAGE_ZONE',
    key: 'BUNNY_STORAGE_API_KEY',
  },
];

describe.each(SCRIPTS)('$label fejler lukket', ({ path, zone, key }) => {
  it('exit != 0 når begge secrets er tomme (dét, der var grønt)', () => {
    const r = run(path, { [zone]: '', [key]: '' });
    expect(r.status).not.toBe(0);
    expect(r.output).toContain(zone);
    expect(r.output).toContain(key);
  });

  it('exit != 0 når kun den ene mangler', () => {
    const r = run(path, { [zone]: 'en-zone', [key]: '' });
    expect(r.status).not.toBe(0);
    expect(r.output).toContain(key);
    // Navne, ikke værdier — zonen er sat, så den må ikke stå i beskeden.
    expect(r.output).not.toContain('en-zone');
  });

  it('exit 0 kun når skip er erklæret positivt', () => {
    const r = run(path, { [zone]: '', [key]: '', BUNNY_DEPLOY_OPTIONAL: '1' });
    expect(r.status).toBe(0);
    expect(r.output).toContain('BUNNY_DEPLOY_OPTIONAL');
  });
});
