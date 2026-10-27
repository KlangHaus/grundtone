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

🔴 TWO POSITIVE CONTROLS, because an empty answer is not a finding
([sikkerhed], #279 verdict; ClickUp 1amk32fku65). Without them, a scan that
saw nothing — no vulnerability database, a lockfile it could not parse, the
wrong directory — reported nothing, and this check read that as "every accept
is stale": loud, but naming the wrong cause.
  1. The CANARY must be reported: .github/osv-canary/ pins lodash@4.17.15, and
     the workflow scans a copy of it in the same invocation. Missing = the
     scanner did not work.
  2. The scanner's own log must say it scanned the repo's pnpm-lock.yaml and
     found packages in it. Missing = the scan looked somewhere else. Read from
     the LOG, not the JSON: the JSON lists only sources that have findings, so
     a clean lockfile would be absent and the check could never pass once the
     repo is clean (Cursor Bugbot on #290; measured on osv-scanner 1.9.2).
Only the repo's own results count toward the accepts, so the canary's
advisories can never keep an accept alive.

Exit: 0 = every accept is still reported · 1 = stale accept(s) ·
2 = the input could not be read, or a positive control failed (never a pass).
"""
import json
import re
import sys
import tomllib

if len(sys.argv) != 4:
    print('usage: assert-osv-accepts-still-needed.py <osv-scanner.toml> <scan.json> <scan.log>')
    sys.exit(2)

try:
    with open(sys.argv[1], 'rb') as handle:
        accepted = [e['id'] for e in tomllib.load(handle).get('IgnoredVulns', [])]
    with open(sys.argv[2], encoding='utf-8') as handle:
        scan = json.load(handle)
    with open(sys.argv[3], encoding='utf-8') as handle:
        scan_log = handle.read()
except (OSError, ValueError, KeyError) as error:
    print(f'::error::cannot read the input ({error}) — not measured, not a pass')
    sys.exit(2)

if not isinstance(scan, dict) or 'results' not in scan:
    print('::error::the scan JSON has no `results` — not measured, not a pass')
    sys.exit(2)

CANARY_ID = 'GHSA-p6mc-m468-83gw'
CANARY_DIR = '/osv-canary/'


def source_path(result):
    return ((result.get('source') or {}).get('path')) or ''


def ids_in(results):
    found = set()
    for result in results:
        for package in result.get('packages') or []:
            for vuln in package.get('vulnerabilities') or []:
                found.add(vuln['id'])
                found.update(vuln.get('aliases') or [])
    return found


results = scan['results'] or []
canary = [r for r in results if CANARY_DIR in source_path(r)]
repo = [r for r in results if CANARY_DIR not in source_path(r)]

# The cause travels with the exit ([sikkerhed], #290 verdict): an empty
# canary and a canary whose advisories moved are different events.
canary_ids = ids_in(canary)
if not canary_ids:
    print(
        '::error::the canary (lodash@4.17.15 in .github/osv-canary/) reported '
        'nothing — the scanner did not work, so "stale" cannot be told apart '
        'from "saw nothing". Not measured, not a pass.'
    )
    sys.exit(2)
if CANARY_ID not in canary_ids:
    print(
        f'::error::the canary reported {len(canary_ids)} id(s) but not {CANARY_ID} — '
        "the canary's own advisories moved; pick a new CANARY_ID from: "
        f'{", ".join(sorted(canary_ids))}. Not measured, not a pass.'
    )
    sys.exit(2)

# osv-scanner 1.9.2 logs "Scanned <path> file and found <n> package(s)".
scanned_repo = [
    m for m in re.finditer(r'^Scanned (\S+/pnpm-lock\.yaml) file and found (\d+) package', scan_log, re.M)
    if CANARY_DIR not in m.group(1)
]
if not any(int(m.group(2)) > 0 for m in scanned_repo):
    print(
        "::error::the scanner's log does not show the repo's pnpm-lock.yaml "
        'scanned with packages in it — the scan looked somewhere else. Not '
        'measured, not a pass.'
    )
    sys.exit(2)

reported = ids_in(repo)

stale = [ident for ident in accepted if ident not in reported]
for ident in stale:
    print(
        f'::error::{ident} is accepted in osv-scanner.toml but no longer reported '
        f'by a scan without accepts. Remove it here AND in pnpm-workspace.yaml, '
        f'and lower OSV_EXPECTED in the three workflows.'
    )
if stale:
    sys.exit(1)
print(
    f'{len(accepted)} accept(s), all still reported ({len(reported)} ids in the repo scan; '
    f'canary {CANARY_ID} reported).'
)
