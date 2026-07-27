/**
 * Compile every built-in template × locale into a versioned, CDN-shaped
 * artifact tree — the same publish concept as design-tokens: when a token
 * changes you re-run this and re-publish, and the email design updates.
 *
 * Output (under published/ at the package root — sibling to dist so the npm
 * tarball doesn't ship the CDN artifacts):
 *   v{version}/{key}/{locale}.json   — the publishable artifact (placeholders intact)
 *   v{version}/manifest.json         — index of templates, locales and variables
 *   manifest.json                    — "current" pointer to the latest manifest
 *
 * This does NOT upload anything — it produces the artifact the studio publish
 * pipeline (and the Go notifications service) consume. Everything is compiled
 * in memory and validated first; nothing on disk is touched until every
 * template compiles cleanly, so a bad template can never leave a partial tree.
 */
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { compileTemplate } from '../src/template';
import { templates, BUILTIN_LOCALES } from '../src/templates';

const require = createRequire(import.meta.url);
const { version } = require('../package.json') as { version: string };

const here = dirname(fileURLToPath(import.meta.url));
const outRoot = resolve(here, '../published');
const versionDir = resolve(outRoot, `v${version}`);

interface Artifact {
  key: string;
  locale: string;
  version: string;
  subject: string;
  preheader?: string;
  variables: string[];
  html: string;
  text: string;
}

interface ManifestEntry {
  key: string;
  variables: string[];
  locales: Record<string, string>;
}

const artifacts: Artifact[] = [];
const manifestTemplates: ManifestEntry[] = [];
let hadErrors = false;

// Phase 1 — compile + validate everything in memory.
for (const template of templates) {
  const locales: Record<string, string> = {};
  for (const locale of BUILTIN_LOCALES) {
    try {
      // `soft` renders AND reports validation errors (vs `strict`, which throws).
      const compiled = await compileTemplate(template, locale, {
        mjml: { validationLevel: 'soft' },
      });
      if (compiled.errors.length > 0) {
        hadErrors = true;
        console.error(`✗ ${template.key}/${locale}:`, compiled.errors);
      }
      artifacts.push({
        key: compiled.key,
        locale: compiled.locale,
        version,
        subject: compiled.subject,
        preheader: compiled.preheader,
        variables: compiled.variables,
        html: compiled.html,
        text: compiled.text,
      });
      locales[locale] = `v${version}/${template.key}/${locale}.json`;
    } catch (err) {
      hadErrors = true;
      console.error(`✗ ${template.key}/${locale} threw:`, err);
    }
  }
  manifestTemplates.push({
    key: template.key,
    variables: template.variables ?? [],
    locales,
  });
}

if (hadErrors) {
  console.error('Template compilation produced errors — not publishing.');
  process.exit(1);
}

// Phase 2 — only now touch disk, atomically (clean then write the full tree).
const manifest = { version, templates: manifestTemplates };
rmSync(outRoot, { recursive: true, force: true });
for (const artifact of artifacts) {
  const dir = resolve(versionDir, artifact.key);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    resolve(dir, `${artifact.locale}.json`),
    JSON.stringify(artifact, null, 2),
  );
}
writeFileSync(
  resolve(versionDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2),
);
writeFileSync(
  resolve(outRoot, 'manifest.json'),
  JSON.stringify(manifest, null, 2),
);

console.log(
  `Published ${templates.length} templates × ${BUILTIN_LOCALES.length} locales → ${outRoot}`,
);
