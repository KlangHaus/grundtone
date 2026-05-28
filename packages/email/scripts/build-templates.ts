/**
 * Compile every built-in template × locale into a versioned, CDN-shaped
 * artifact tree — the same publish concept as design-tokens: when a token
 * changes you re-run this and re-publish, and the email design updates.
 *
 * Output (under dist/published/, which a deploy step would upload to the CDN):
 *   v{version}/{key}/{locale}.json   — the publishable artifact (placeholders intact)
 *   v{version}/manifest.json         — index of templates, locales and variables
 *   manifest.json                    — "current" pointer to the latest manifest
 *
 * This does NOT upload anything — it produces the artifact the studio publish
 * pipeline (and the Go notifications service) consume.
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
const outRoot = resolve(here, '../dist/published');
const versionDir = resolve(outRoot, `v${version}`);

rmSync(outRoot, { recursive: true, force: true });

interface ManifestEntry {
  key: string;
  variables: string[];
  locales: Record<string, string>;
}

const manifestTemplates: ManifestEntry[] = [];
let hadErrors = false;

for (const template of templates) {
  const locales: Record<string, string> = {};
  for (const locale of BUILTIN_LOCALES) {
    const compiled = compileTemplate(template, locale, {
      mjml: { validationLevel: 'strict' },
    });
    if (compiled.errors.length > 0) {
      hadErrors = true;
      console.error(`✗ ${template.key}/${locale}:`, compiled.errors);
    }
    const artifact = {
      key: compiled.key,
      locale: compiled.locale,
      version,
      subject: compiled.subject,
      preheader: compiled.preheader,
      variables: compiled.variables,
      html: compiled.html,
      text: compiled.text,
    };
    const dir = resolve(versionDir, template.key);
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      resolve(dir, `${locale}.json`),
      JSON.stringify(artifact, null, 2),
    );
    locales[locale] = `v${version}/${template.key}/${locale}.json`;
  }
  manifestTemplates.push({
    key: template.key,
    variables: template.variables ?? [],
    locales,
  });
}

const manifest = {
  version,
  templates: manifestTemplates,
};
writeFileSync(
  resolve(versionDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2),
);
writeFileSync(
  resolve(outRoot, 'manifest.json'),
  JSON.stringify(manifest, null, 2),
);

if (hadErrors) {
  console.error('Template compilation produced MJML errors — not publishing.');
  process.exit(1);
}

console.log(
  `Published ${templates.length} templates × ${BUILTIN_LOCALES.length} locales → ${outRoot}`,
);
