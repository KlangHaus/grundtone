/**
 * Upload the compiled `published/` tree (produced by `compile:templates`) to
 * Bunny Edge Storage, so the notifications service's CDN renderer
 * (KlangHaus/notifications internal/template/cdn.go, CDNRenderer) can fetch
 * it via TEMPLATE_CDN_BASE_URL. Layout on the storage zone mirrors the local
 * tree exactly:
 *
 *   {prefix}/v{version}/{key}/{locale}.json
 *   {prefix}/v{version}/manifest.json
 *   {prefix}/manifest.json            — "current" pointer, flipped last
 *
 * Requires BUNNY_STORAGE_ZONE + BUNNY_STORAGE_API_KEY. Optional:
 * BUNNY_STORAGE_REGION (empty = default/Falkenstein; otherwise a Bunny
 * storage region code, e.g. "ny", "la", "sg", "syd", "de") and
 * BUNNY_STORAGE_PATH_PREFIX (share a zone with other assets without
 * collision).
 *
 * Skips (exit 0, warning) rather than fails when the storage secrets are
 * absent — the Bunny zone for email templates is not provisioned yet
 * (grundtone#6, pending [infra]); CI must stay green on ordinary package
 * releases until it is. Once configured, a real upload failure DOES fail
 * the job — silently leaving `published/` un-published while claiming
 * success would strand notifications on the stub/inline renderer.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, relative, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const publishedRoot = resolve(here, '../published');

const zone = process.env.BUNNY_STORAGE_ZONE;
const apiKey = process.env.BUNNY_STORAGE_API_KEY;
const region = process.env.BUNNY_STORAGE_REGION?.trim();
const prefix = process.env.BUNNY_STORAGE_PATH_PREFIX?.trim().replace(
  /^\/+|\/+$/g,
  '',
);

if (!zone || !apiKey) {
  console.warn(
    'publish-cdn: BUNNY_STORAGE_ZONE / BUNNY_STORAGE_API_KEY not set — skipping CDN upload. ' +
      'Run `pnpm compile:templates` output stays local-only until the Bunny zone for ' +
      'email templates is provisioned (grundtone#6, pending [infra]).',
  );
  process.exit(0);
}

const host = region ? `${region}.storage.bunnycdn.com` : 'storage.bunnycdn.com';

function listFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listFiles(full));
    else out.push(full);
  }
  return out;
}

async function upload(localPath: string, remotePath: string): Promise<void> {
  const body = readFileSync(localPath);
  const url = `https://${host}/${zone}/${remotePath}`;

  let lastErr: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { AccessKey: apiKey!, 'Content-Type': 'application/json' },
      body,
    });
    if (res.ok) return;
    lastErr = new Error(
      `PUT ${remotePath} → ${res.status} ${await res.text()}`,
    );
    if (res.status < 500 && res.status !== 429) break; // permanent failure, don't retry
    await new Promise(r => setTimeout(r, attempt * 500));
  }
  throw lastErr;
}

async function main() {
  const versionManifestPath = resolve(publishedRoot, 'manifest.json');
  const manifest = JSON.parse(readFileSync(versionManifestPath, 'utf8')) as {
    version: string;
  };

  const files = listFiles(publishedRoot);
  // Upload every immutable v{version}/... artifact before the "current"
  // manifest.json pointer, so a reader following `current` never observes a
  // version it flips to before that version's files exist.
  const versioned = files.filter(f =>
    relative(publishedRoot, f).startsWith(`v${manifest.version}/`),
  );
  const currentManifest = files.find(
    f => relative(publishedRoot, f) === 'manifest.json',
  );
  if (!currentManifest)
    throw new Error(
      'publish-cdn: published/manifest.json missing — run compile:templates first',
    );

  for (const file of versioned) {
    const rel = relative(publishedRoot, file);
    const remote = prefix ? `${prefix}/${rel}` : rel;
    await upload(file, remote);
    console.log(`  ✓ ${remote}`);
  }

  const rel = 'manifest.json';
  const remote = prefix ? `${prefix}/${rel}` : rel;
  await upload(currentManifest, remote);
  console.log(`  ✓ ${remote} (current pointer)`);

  console.log(
    `Published v${manifest.version} (${versioned.length} artifacts) + current pointer to zone "${zone}"${prefix ? ` under /${prefix}` : ''}.`,
  );
}

main().catch(err => {
  console.error(
    'publish-cdn: upload failed —',
    err instanceof Error ? err.message : err,
  );
  process.exit(1);
});
