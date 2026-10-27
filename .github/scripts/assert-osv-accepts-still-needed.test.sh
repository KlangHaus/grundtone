#!/usr/bin/env bash
# Red-before-green for the anti-rot check. A guard that cannot fail proves
# nothing, so every exit code is provoked here.
set -euo pipefail

SCRIPT="$(dirname "$0")/assert-osv-accepts-still-needed.py"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

printf '[[IgnoredVulns]]\nid = "GHSA-aaaa-aaaa-aaaa"\nignoreUntil = 2099-01-01T00:00:00Z\n' > "$TMP/osv.toml"

# The two positive controls (see the script): the canary result in the JSON,
# and the scanner's LOG line for the repo's own pnpm-lock.yaml.
CANARY='{"source":{"path":"/tmp/osv-canary/package-lock.json","type":"lockfile"},"packages":[{"vulnerabilities":[{"id":"GHSA-p6mc-m468-83gw","aliases":["CVE-2020-8203"]}]}]}'
LOG_OK='Scanning dir ./
Scanned /src/pnpm-lock.yaml file and found 2384 packages
Scanned /tmp/osv-canary/package-lock.json file and found 1 package'
printf '%s\n' "$LOG_OK" > "$TMP/scan.log"

repo() { # $1 = id, $2 = aliases (JSON array)
  printf '{"source":{"path":"/src/pnpm-lock.yaml","type":"lockfile"},"packages":[{"vulnerabilities":[{"id":"%s","aliases":%s}]}]}' "$1" "$2"
}
scan() { # $1 = id, $2 = aliases (JSON array); repo result + canary
  printf '{"results":[%s,%s]}' "$(repo "$1" "$2")" "$CANARY" > "$TMP/scan.json"
}

expect() { # <expected exit> <description>
  set +e; python3 "$SCRIPT" "$TMP/osv.toml" "$TMP/scan.json" "$TMP/scan.log" >/dev/null 2>&1; local got=$?; set -e
  if [ "$got" -ne "$1" ]; then
    echo "  ✗ $2 — expected exit $1, got $got"; exit 1
  fi
  echo "  ✓ $2 (exit $got)"
}

scan "GHSA-aaaa-aaaa-aaaa" '[]';                    expect 0 "accepted id is reported"
scan "CVE-2026-0001" '["GHSA-aaaa-aaaa-aaaa"]';     expect 0 "accepted id is reported as an alias"
scan "GHSA-bbbb-bbbb-bbbb" '[]';                    expect 1 "accepted id is not reported (stale)"

# 🔴 A CLEAN repo: the JSON lists only sources with findings, so the repo's
# lockfile is absent from it — the log still shows it was scanned. This must
# be "stale", never exit 2 (Cursor Bugbot on #290).
printf '{"results":[%s]}' "$CANARY" > "$TMP/scan.json"
                                                    expect 1 "clean repo (absent from JSON, present in log): stale"

# The positive controls: an empty answer must not read as "stale".
printf '{"results":[]}' > "$TMP/scan.json";         expect 2 "nothing in the JSON at all: the canary did not run"
printf '{"results":[%s]}' "$(repo GHSA-aaaa-aaaa-aaaa '[]')" > "$TMP/scan.json"
                                                    expect 2 "canary missing: the scanner did not work"
printf '{"results":[%s,{"source":{"path":"/tmp/osv-canary/package-lock.json"},"packages":[{"vulnerabilities":[{"id":"GHSA-zzzz-zzzz-zzzz"}]}]}]}' "$(repo GHSA-aaaa-aaaa-aaaa '[]')" > "$TMP/scan.json"
                                                    expect 2 "canary reported, but not our id: its advisories moved"
scan "GHSA-aaaa-aaaa-aaaa" '[]'
printf 'Scanning dir /elsewhere\nScanned /tmp/osv-canary/package-lock.json file and found 1 package\n' > "$TMP/scan.log"
                                                    expect 2 "log without the repo lockfile: wrong target"
printf 'Scanned /src/pnpm-lock.yaml file and found 0 packages\nScanned /tmp/osv-canary/package-lock.json file and found 1 package\n' > "$TMP/scan.log"
                                                    expect 2 "repo lockfile with 0 packages: nothing was read"
printf '%s\n' "$LOG_OK" > "$TMP/scan.log"

# The canary's own advisories never count toward an accept.
printf '[[IgnoredVulns]]\nid = "GHSA-p6mc-m468-83gw"\nignoreUntil = 2099-01-01T00:00:00Z\n' > "$TMP/osv.toml"
printf '{"results":[%s]}' "$CANARY" > "$TMP/scan.json"
                                                    expect 1 "an accept kept alive only by the canary is stale"
printf '{"results":' > "$TMP/scan.json";            expect 2 "broken JSON is not a pass"
printf '{"other":1}' > "$TMP/scan.json";            expect 2 "JSON without results is not a pass"
