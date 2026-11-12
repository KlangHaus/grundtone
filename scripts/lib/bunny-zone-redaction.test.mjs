// @vitest-environment node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Sentry from '@sentry/node';
import { afterEach, describe, expect, it } from 'vitest';
import { redactZone, sentryZoneRedaction } from './bunny-deploy.mjs';

// 🔴 The Bunny zone name must not reach Sentry (ClickUp 869fbfz68). See
// redactZone() in bunny-deploy.mjs for every path it used to take.

const ZONE = 'example-zone-7f3a';
const repoRoot = fileURLToPath(new URL('../..', import.meta.url));

describe('redactZone', () => {
  it('replaces the zone in every string of a nested value, keys included', () => {
    const event = {
      message: `PUT https://storage.bunnycdn.com/${ZONE}/index.html → 401`,
      tags: { region: 'de' },
      breadcrumbs: [
        {
          category: 'fetch',
          data: { url: `https://storage.bunnycdn.com/${ZONE}/a.css` },
        },
        { category: 'console', message: `Uploading 3 files to zone "${ZONE}"` },
      ],
      extra: { [ZONE]: 1 },
      level: 'error',
      timestamp: 1,
    };
    const out = redactZone(event, ZONE);
    expect(JSON.stringify(out)).not.toContain(ZONE);
    expect(out.breadcrumbs[0].data.url).toBe(
      'https://storage.bunnycdn.com/<zone>/a.css',
    );
    expect(out.timestamp).toBe(1);
  });

  it('survives a cycle and leaves non-plain objects alone', () => {
    const event = { message: `to ${ZONE}`, when: new Date(0) };
    event.self = event;
    const out = redactZone(event, ZONE);
    expect(out.message).toBe('to <zone>');
    expect(out.self).toBe(out);
    expect(out.when).toBe(event.when);
  });

  it('leaves everything alone when no zone is set', () => {
    const event = { message: 'x' };
    expect(redactZone(event, undefined)).toBe(event);
    expect(redactZone(event, '  ')).toBe(event);
  });
});

/**
 * Runs the real SDK with a transport that records what would be sent.
 * @param {object} hooks extra Sentry.init options
 */
async function sendThroughSentry(redacted) {
  const sent = [];
  // Stands in for Sentry.makeNodeTransport: records what would leave the process.
  const recording = () => ({
    send: async envelope => {
      sent.push(JSON.stringify(envelope));
      return {};
    },
    flush: async () => true,
  });
  Sentry.init({
    dsn: 'https://public@o0.ingest.sentry.io/0',
    defaultIntegrations: false,
    tracesSampleRate: 1.0,
    transport: recording,
    ...(redacted ? sentryZoneRedaction(ZONE, recording) : {}),
  });
  Sentry.addBreadcrumb({
    category: 'fetch',
    data: {
      url: `https://storage.bunnycdn.com/${ZONE}/index.html`,
      method: 'PUT',
    },
  });
  Sentry.startSpan(
    { name: `PUT https://storage.bunnycdn.com/${ZONE}/x` },
    () => {},
  );
  Sentry.captureException(
    new Error(`PUT https://storage.bunnycdn.com/${ZONE}/x → 401`),
    {
      tags: { region: 'de' },
    },
  );
  await Sentry.flush(2000);
  return sent.join('\n');
}

describe('through the real Sentry SDK', () => {
  afterEach(async () => {
    await Sentry.close(2000);
    // Breadcrumbs live on the scopes, not on the client: without this the
    // control's unredacted breadcrumb rides into the next case.
    Sentry.getCurrentScope().clear();
    Sentry.getIsolationScope().clear();
    Sentry.getGlobalScope().clear();
  });

  it('negative control: without the hooks, the zone is in what Sentry sends', async () => {
    const sent = await sendThroughSentry(false);
    expect(sent.length).toBeGreaterThan(0);
    expect(sent).toContain(ZONE);
  });

  it('with sentryZoneRedaction, no event, breadcrumb or transaction carries it', async () => {
    const sent = await sendThroughSentry(true);
    expect(sent).toContain('<zone>');
    expect(sent).not.toContain(ZONE);
  });
});

describe('every Bunny publisher wires the redaction', () => {
  // Greps, so it says what it cannot see: that Sentry.init is reached. The
  // SDK cells above measure that the hooks work once they are passed.
  it.each([
    'apps/docs/scripts/publish-bunny.ts',
    'apps/web/scripts/publish-bunny.ts',
    'packages/email/scripts/publish-cdn.ts',
  ])('%s', path => {
    const source = readFileSync(join(repoRoot, path), 'utf8');
    expect(source).toContain(
      '...sentryZoneRedaction(zone, Sentry.makeNodeTransport),',
    );
    expect(source).not.toMatch(/tags:\s*\{[^}]*\bzone\b/);
    expect(source).not.toContain('to zone "${zone}"');
  });
});
