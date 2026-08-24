#!/usr/bin/env bash
# Rød-før-grøn for udløbs-tjekket. En vagt der ikke KAN fejle beviser intet.
#
# 🔴 Den vigtigste case er DEN DISKRIMINERENDE: en deadline på dagens dato
# kl. 00:00Z. Fortid/fremtid-parret skiller IKKE den rettede form fra den
# fejlbehæftede — de er enige om begge. Kun midnat-i-dag afslører en
# sammenligning der sker på dato-niveau frem for på timestamp-niveau.
set -euo pipefail

SCRIPT="$(dirname "$0")/assert-osv-ignores-expire.py"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

TODAY="$(date -u +%Y-%m-%d)"
PAST="$(date -u -v-30d +%Y-%m-%d 2>/dev/null || date -u -d '30 days ago' +%Y-%m-%d)"
FUTURE="$(date -u -v+30d +%Y-%m-%d 2>/dev/null || date -u -d '30 days' +%Y-%m-%d)"

# $1 = felt-linje(r), $2 = valgfri blok-header (default uden whitespace)
fixture() {
  local header="${2:-[[IgnoredVulns]]}"
  printf '%s\nid = "TEST-1"\n%s\n' "$header" "$1" > "$TMP/osv.toml"
}

expect() { # <forventet-exit> <beskrivelse>
  set +e; OSV_EXPECTED=1 python3 "$SCRIPT" "$TMP/osv.toml" >/dev/null 2>&1; local got=$?; set -e
  if [ "$got" -ne "$1" ]; then
    echo "  ✗ $2 — forventede exit $1, fik $got"; exit 1
  fi
  echo "  ✓ $2 (exit $got)"
}

echo "── skal PASSERE"
fixture "ignoreUntil = \"${FUTURE}T00:00:00Z\""
expect 0 "fremtidig deadline"

echo "── skal FEJLE"
fixture "ignoreUntil = \"${PAST}T00:00:00Z\""
expect 1 "udløbet deadline"

fixture 'reason = "ingen dato"'
expect 1 "manglende ignoreUntil"

echo "── 🔴 DEN DISKRIMINERENDE: midnat i dag (UTC)"
# "Ignorér indtil i dag kl. 00:00Z" er udløbet i samme sekund dagen begynder.
# En dato-mod-dato-sammenligning ville kalde den gyldig hele dagen.
fixture "ignoreUntil = \"${TODAY}T00:00:00Z\""
expect 1 "deadline = i dag 00:00Z skal være UDLØBET"

echo "── ren dato uden klokkeslæt falder tilbage på midnat UTC"
fixture "ignoreUntil = \"${TODAY}\""
expect 1 "ren dato = i dag skal være UDLØBET"

echo "── 🔴 WHITESPACE I BLOK-HEADEREN (gyldig TOML)"
# [[ IgnoredVulns ]] er gyldig TOML. Regex-formen splittede paa teksten
# "[[IgnoredVulns]]" og fandt derfor NUL poster i en fil fuld af poster —
# og meldte groent. Den fejl er TAVS, og det er den vaerste slags.
fixture "ignoreUntil = \"${PAST}T00:00:00Z\"" "[[ IgnoredVulns ]]"
expect 1 "udløbet deadline SES ogsaa med whitespace i headeren"

echo "── udkommenteret ignoreUntil maa ikke taelle som en dato"
fixture "# ignoreUntil = \"${FUTURE}T00:00:00Z\""
expect 1 "kommenteret felt er ikke et felt"

echo "── udløbet dato i en KOMMENTAR over et gyldigt felt maa ikke give falsk roedt"
printf '[[IgnoredVulns]]\nid = "TEST-1"\n# gammel: ignoreUntil = "%sT00:00:00Z"\nignoreUntil = "%sT00:00:00Z"\n' \
  "$PAST" "$FUTURE" > "$TMP/osv.toml"
expect 0 "kommentaren ignoreres, det gyldige felt gaelder"

echo "── antallet SKAL stemme (et tavst nul ser plausibelt ud)"
printf '[[IgnoredVulns]]\nid = "A"\nignoreUntil = "%sT00:00:00Z"\n[[IgnoredVulns]]\nid = "B"\nignoreUntil = "%sT00:00:00Z"\n' \
  "$FUTURE" "$FUTURE" > "$TMP/osv.toml"
expect 1 "2 poster mod en forventning om 1 skal fejle"

echo
echo "alle cases bestået"
