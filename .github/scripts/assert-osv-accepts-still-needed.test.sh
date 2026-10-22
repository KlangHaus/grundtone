#!/usr/bin/env bash
# Red-before-green for the anti-rot check. A guard that cannot fail proves
# nothing, so every exit code is provoked here.
set -euo pipefail

SCRIPT="$(dirname "$0")/assert-osv-accepts-still-needed.py"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

printf '[[IgnoredVulns]]\nid = "GHSA-aaaa-aaaa-aaaa"\nignoreUntil = 2099-01-01T00:00:00Z\n' > "$TMP/osv.toml"

scan() { # $1 = id, $2 = aliases (JSON array)
  printf '{"results":[{"packages":[{"vulnerabilities":[{"id":"%s","aliases":%s}]}]}]}' "$1" "$2" > "$TMP/scan.json"
}

expect() { # <expected exit> <description>
  set +e; python3 "$SCRIPT" "$TMP/osv.toml" "$TMP/scan.json" >/dev/null 2>&1; local got=$?; set -e
  if [ "$got" -ne "$1" ]; then
    echo "  ✗ $2 — expected exit $1, got $got"; exit 1
  fi
  echo "  ✓ $2 (exit $got)"
}

scan "GHSA-aaaa-aaaa-aaaa" '[]';                    expect 0 "accepted id is reported"
scan "CVE-2026-0001" '["GHSA-aaaa-aaaa-aaaa"]';     expect 0 "accepted id is reported as an alias"
scan "GHSA-bbbb-bbbb-bbbb" '[]';                    expect 1 "accepted id is not reported (stale)"
printf '{"results":[]}' > "$TMP/scan.json";         expect 1 "nothing reported at all (stale)"
printf '{"results":' > "$TMP/scan.json";            expect 2 "broken JSON is not a pass"
printf '{"other":1}' > "$TMP/scan.json";            expect 2 "JSON without results is not a pass"
