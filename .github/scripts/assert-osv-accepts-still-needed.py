#!/usr/bin/env python3
"""Fails when an accept in osv-scanner.toml is no longer needed.

An accept that outlives its advisory is not harmless: it would silently
swallow the next report under the same id, and it keeps a reason in the repo
that is no longer true. On 2026-10-22 five of nine accepts were stale at once:
four simple-git ones left with @nuxt/devtools 3.4.4, and GHSA-hp3w was
withdrawn by GitHub. Nothing failed, because the expiry check only reads dates.

Input: osv-scanner.toml and the JSON of a scan made WITHOUT any accepts
(`--config` pointing at an empty file). An accepted id that this scan does not
report, as an id or an alias, is stale.

Exit: 0 = every accept is still reported · 1 = stale accept(s) ·
2 = the input could not be read (never a pass).
"""
import json
import sys
import tomllib

if len(sys.argv) != 3:
    print('usage: assert-osv-accepts-still-needed.py <osv-scanner.toml> <scan.json>')
    sys.exit(2)

try:
    with open(sys.argv[1], 'rb') as handle:
        accepted = [e['id'] for e in tomllib.load(handle).get('IgnoredVulns', [])]
    with open(sys.argv[2], encoding='utf-8') as handle:
        scan = json.load(handle)
except (OSError, ValueError, KeyError) as error:
    print(f'::error::cannot read the input ({error}) — not measured, not a pass')
    sys.exit(2)

if not isinstance(scan, dict) or 'results' not in scan:
    print('::error::the scan JSON has no `results` — not measured, not a pass')
    sys.exit(2)

reported = set()
for result in scan['results'] or []:
    for package in result.get('packages') or []:
        for vuln in package.get('vulnerabilities') or []:
            reported.add(vuln['id'])
            reported.update(vuln.get('aliases') or [])

stale = [ident for ident in accepted if ident not in reported]
for ident in stale:
    print(
        f'::error::{ident} is accepted in osv-scanner.toml but no longer reported '
        f'by a scan without accepts. Remove it here AND in pnpm-workspace.yaml, '
        f'and lower OSV_EXPECTED in the three workflows.'
    )
if stale:
    sys.exit(1)
print(f'{len(accepted)} accept(s), all still reported ({len(reported)} ids in the scan).')
