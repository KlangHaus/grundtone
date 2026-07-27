/**
 * Sync `.vitepress/dist/` (the built VitePress site) to Bunny Edge Storage,
 * replacing Vercel per the locked grundtone.com architecture: `docs.grundtone.com`
 * = Bunny Edge Storage + Pull Zone (see `infra/docs/BUNNY-SETUP.md` +
 * `infra/docs/MASTER-PLAN.md` #3 — "grundtone.com one-pager + docs.grundtone.com
 * — Bunny Edge Storage + pull-zones; docs væk fra Vercel").
 *
 * Unlike `packages/email`'s `publish-cdn.ts` (immutable, versioned artifacts),
 * a docs site is mutable — each deploy overwrites the previous one:
 *   1. Upload every local file, in parallel, retried, correctly content-typed.
 *   2. Best-effort: delete remote files no longer present locally, so removed
 *      pages don't linger forever on the CDN. A failure here logs a warning
 *      but does NOT fail the deploy — a stray orphaned file is much
 *      lower-severity than a failed publish, and is never confused with a
 *      file that still exists locally (the delete set is strictly
 *      remote-only paths).
 *
 * Requires BUNNY_DOCS_STORAGE_ZONE + BUNNY_DOCS_STORAGE_API_KEY. Optional:
 * BUNNY_DOCS_STORAGE_REGION, BUNNY_DOCS_STORAGE_PATH_PREFIX. Skips (exit 0,
 * warning) when the zone secrets aren't set — same optional-secret pattern as
 * `packages/email/scripts/publish-cdn.ts`.
 *
 * Error reporting: Sentry (SENTRY_DSN, also optional) with tracing spans
 * around the upload/delete phases — see publish-cdn.ts for why this doesn't
 * pull in a separate OpenTelemetry SDK.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, relative, join, dirname, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Sentry from '@sentry/node';

const here = dirname(fileURLToPath(import.meta.url));
const distRoot = resolve(here, '../.vitepress/dist');

const zone = process.env.BUNNY_DOCS_STORAGE_ZONE;
const apiKey = process.env.BUNNY_DOCS_STORAGE_API_KEY;
const region = process.env.BUNNY_DOCS_STORAGE_REGION?.trim();
const prefix = process.env.BUNNY_DOCS_STORAGE_PATH_PREFIX?.trim().replace(
  /^\/+|\/+$/g,
  '',
);

const sentryEnabled = Boolean(process.env.SENTRY_DSN);
if (sentryEnabled) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT ?? 'ci',
    tracesSampleRate: 1.0,
    tags: { script: 'publish-bunny', package: '@grundtone/docs' },
  });
} else {
  console.warn(
    'publish-bunny: SENTRY_DSN not set — upload failures will only surface as a failed CI job, not in Sentry.',
  );
}

if (!zone || !apiKey) {
  console.warn(
    'publish-bunny: BUNNY_DOCS_STORAGE_ZONE / BUNNY_DOCS_STORAGE_API_KEY not set — skipping deploy. ' +
      'docs.grundtone.com stays on its current host until the Bunny zone is provisioned (see infra/docs/BUNNY-SETUP.md, [infra]).',
  );
  process.exit(0);
}

const host = region ? `${region}.storage.bunnycdn.com` : 'storage.bunnycdn.com';
const zoneBase = `https://${host}/${zone}`;

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function contentTypeFor(path: string): string {
  return (
    CONTENT_TYPES[extname(path).toLowerCase()] ?? 'application/octet-stream'
  );
}

/** Recursively list local files. */
function listLocalFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listLocalFiles(full));
    else out.push(full);
  }
  return out;
}

/** `path.relative` returns OS-native separators; Bunny wants POSIX. */
function toPosixRelative(from: string, to: string): string {
  return relative(from, to).split(sep).join('/');
}

function remotePath(rel: string): string {
  return prefix ? `${prefix}/${rel}` : rel;
}

async function putWithRetry(
  url: string,
  body: Buffer,
  contentType: string,
): Promise<void> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: { AccessKey: apiKey!, 'Content-Type': contentType },
        body,
      });
      if (res.ok) return;
      lastErr = new Error(`PUT ${url} → ${res.status} ${await res.text()}`);
      const retryable = res.status >= 500 || res.status === 429;
      if (!retryable || attempt === 3) break;
    } catch (err) {
      // Transport-level failures (DNS, connection reset, TLS, timeout) never
      // reach the status-code check — they're inherently transient, so retry
      // them like a 5xx instead of failing the deploy on first attempt.
      lastErr = err;
      if (attempt === 3) break;
    }
    await new Promise(r => setTimeout(r, attempt * 500));
  }
  throw lastErr;
}

/** Run `items` through `fn` with at most `limit` in flight at once. */
async function mapLimit<T>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<void>,
): Promise<void> {
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const item = items[index++]!;
      await fn(item);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker),
  );
}

interface RemoteEntry {
  ObjectName: string;
  IsDirectory: boolean;
}

/** Recursively list everything currently on the zone under `remoteDir` ('' = zone root). */
async function listRemoteFiles(remoteDir: string): Promise<string[]> {
  const dir = remoteDir.replace(/\/+$/, '');
  const url = dir ? `${zoneBase}/${dir}/` : `${zoneBase}/`;
  const res = await fetch(url, { headers: { AccessKey: apiKey! } });
  if (res.status === 404) return []; // nothing published yet
  if (!res.ok)
    throw new Error(`list ${dir || '/'} → ${res.status} ${await res.text()}`);
  const entries = (await res.json()) as RemoteEntry[];

  const out: string[] = [];
  for (const entry of entries) {
    // Root-level entries must NOT get a leading slash — that both broke the
    // recursive list URLs (`…/zone//assets/` → 404 → empty list) and made the
    // orphan comparison skip everything nested (Bugbot medium on #49).
    const childPath = dir ? `${dir}/${entry.ObjectName}` : entry.ObjectName;
    if (entry.IsDirectory) out.push(...(await listRemoteFiles(childPath)));
    else out.push(childPath);
  }
  return out;
}

async function deleteRemote(path: string): Promise<void> {
  const res = await fetch(`${zoneBase}/${path}`, {
    method: 'DELETE',
    headers: { AccessKey: apiKey! },
  });
  if (!res.ok)
    throw new Error(`DELETE ${path} → ${res.status} ${await res.text()}`);
}

async function main() {
  const files = listLocalFiles(distRoot);
  if (files.length === 0) {
    throw new Error(
      'publish-bunny: .vitepress/dist is empty — run the docs build first',
    );
  }
  console.log(
    `Uploading ${files.length} files to zone "${zone}"${prefix ? ` under /${prefix}` : ''}...`,
  );

  await Sentry.startSpan(
    { name: 'publish-bunny upload', op: 'ci.publish' },
    async () => {
      let uploaded = 0;
      await mapLimit(files, 12, async file => {
        const rel = toPosixRelative(distRoot, file);
        const remote = remotePath(rel);
        await Sentry.startSpan(
          { name: `bunny.upload ${remote}`, op: 'http.client' },
          () =>
            putWithRetry(
              `${zoneBase}/${remote}`,
              readFileSync(file),
              contentTypeFor(file),
            ),
        );
        uploaded++;
      });
      console.log(`  ✓ uploaded ${uploaded}/${files.length} files`);
    },
  );

  // Best-effort cleanup — never touch a path that also exists locally, and
  // never let a cleanup failure fail the deploy that already succeeded above.
  try {
    await Sentry.startSpan(
      { name: 'publish-bunny cleanup', op: 'ci.cleanup' },
      async () => {
        const localRelPaths = new Set(
          files.map(f => remotePath(toPosixRelative(distRoot, f))),
        );
        const remoteRoot = prefix ?? '';
        const remoteFiles = await listRemoteFiles(remoteRoot);
        const orphaned = remoteFiles.filter(f => !localRelPaths.has(f));

        if (orphaned.length === 0) {
          console.log('  ✓ no orphaned remote files');
          return;
        }
        console.log(`Deleting ${orphaned.length} orphaned remote file(s)...`);
        await mapLimit(orphaned, 12, async path => {
          await deleteRemote(path);
          console.log(`  ✓ deleted ${path}`);
        });
      },
    );
  } catch (err) {
    console.warn(
      'publish-bunny: cleanup pass failed (deploy itself already succeeded) —',
      err instanceof Error ? err.message : err,
    );
    if (sentryEnabled)
      Sentry.captureException(err, { tags: { phase: 'cleanup' } });
  }

  console.log(
    `Published docs.grundtone.com (${files.length} files) to zone "${zone}".`,
  );
}

main().catch(async err => {
  console.error(
    'publish-bunny: deploy failed —',
    err instanceof Error ? err.message : err,
  );
  if (sentryEnabled) {
    Sentry.captureException(err, {
      tags: { zone: zone ?? 'unset', region: region ?? 'default' },
    });
    await Sentry.flush(2000);
  }
  process.exit(1);
});
