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
 *
 * Error reporting: Sentry (SENTRY_DSN, also optional/graceful-skip) captures
 * upload failures with tracing spans around each PUT and the overall publish
 * — this is a short-lived CI process, not a long-running service, so there's
 * no separate OpenTelemetry SDK here; Sentry's JS SDK v8+ tracing is itself
 * OTel-based and gives the same per-step timing/observability without a
 * second instrumentation stack for a script that runs a handful of times a
 * day.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, relative, join, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Sentry from '@sentry/node';

const here = dirname(fileURLToPath(import.meta.url));
const publishedRoot = resolve(here, '../published');

const zone = process.env.BUNNY_STORAGE_ZONE;
const apiKey = process.env.BUNNY_STORAGE_API_KEY;
const region = process.env.BUNNY_STORAGE_REGION?.trim();
const prefix = process.env.BUNNY_STORAGE_PATH_PREFIX?.trim().replace(
  /^\/+|\/+$/g,
  '',
);

const sentryEnabled = Boolean(process.env.SENTRY_DSN);
if (sentryEnabled) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT ?? 'ci',
    tracesSampleRate: 1.0,
    tags: { script: 'publish-cdn', package: '@grundtone/email' },
  });
} else {
  console.warn(
    'publish-cdn: SENTRY_DSN not set — upload failures will only surface as a failed CI job, not in Sentry.',
  );
}

if (!zone || !apiKey) {
  console.warn(
    'publish-cdn: BUNNY_STORAGE_ZONE / BUNNY_STORAGE_API_KEY not set — skipping CDN upload. ' +
      'Run `pnpm compile:templates` output stays local-only until the Bunny zone for ' +
      'email templates is provisioned (grundtone#6, pending [infra]).',
  );
  process.exit(0);
}

const host = region ? `${region}.storage.bunnycdn.com` : 'storage.bunnycdn.com';

/** Recursively list files under `dir`. Returns POSIX-style relative-safe absolute paths. */
function listFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listFiles(full));
    else out.push(full);
  }
  return out;
}

/** `path.relative` returns OS-native separators; Bunny (and our own path math) wants POSIX. */
function toPosixRelative(from: string, to: string): string {
  return relative(from, to).split(sep).join('/');
}

async function upload(localPath: string, remotePath: string): Promise<void> {
  await Sentry.startSpan(
    { name: `bunny.upload ${remotePath}`, op: 'http.client' },
    async () => {
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
        const retryable = res.status >= 500 || res.status === 429;
        if (!retryable || attempt === 3) break;
        await new Promise(r => setTimeout(r, attempt * 500));
      }
      throw lastErr;
    },
  );
}

async function main() {
  const versionManifestPath = resolve(publishedRoot, 'manifest.json');
  const manifest = JSON.parse(readFileSync(versionManifestPath, 'utf8')) as {
    version: string;
  };
  if (!manifest.version) {
    throw new Error(
      'publish-cdn: published/manifest.json has no "version" — run compile:templates first',
    );
  }

  const files = listFiles(publishedRoot);
  // Upload every immutable v{version}/... artifact before the "current"
  // manifest.json pointer, so a reader following `current` never observes a
  // version it flips to before that version's files exist.
  const versioned = files.filter(f =>
    toPosixRelative(publishedRoot, f).startsWith(`v${manifest.version}/`),
  );
  const currentManifest = files.find(
    f => toPosixRelative(publishedRoot, f) === 'manifest.json',
  );
  if (!currentManifest) {
    throw new Error(
      'publish-cdn: published/manifest.json missing — run compile:templates first',
    );
  }
  // A version with zero artifacts means the filter (or the compile step)
  // produced something unexpected — refuse to flip `current` to point at a
  // version with nothing behind it. Uploading only the pointer would make
  // every subsequent notifications fetch 404.
  if (versioned.length === 0) {
    throw new Error(
      `publish-cdn: no artifacts found under v${manifest.version}/ — refusing to publish an empty version`,
    );
  }

  await Sentry.startSpan(
    { name: `publish-cdn v${manifest.version}`, op: 'ci.publish' },
    async () => {
      for (const file of versioned) {
        const rel = toPosixRelative(publishedRoot, file);
        const remote = prefix ? `${prefix}/${rel}` : rel;
        await upload(file, remote);
        console.log(`  ✓ ${remote}`);
      }

      const rel = 'manifest.json';
      const remote = prefix ? `${prefix}/${rel}` : rel;
      await upload(currentManifest, remote);
      console.log(`  ✓ ${remote} (current pointer)`);
    },
  );

  console.log(
    `Published v${manifest.version} (${versioned.length} artifacts) + current pointer to zone "${zone}"${prefix ? ` under /${prefix}` : ''}.`,
  );
}

main().catch(async err => {
  console.error(
    'publish-cdn: upload failed —',
    err instanceof Error ? err.message : err,
  );
  if (sentryEnabled) {
    Sentry.captureException(err, {
      tags: { zone: zone ?? 'unset', region: region ?? 'default' },
    });
    // Sentry's transport is async; a script exiting immediately after
    // captureException would drop the event before it's sent.
    await Sentry.flush(2000);
  }
  process.exit(1);
});
