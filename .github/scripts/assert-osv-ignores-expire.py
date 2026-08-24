#!/usr/bin/env python3
"""Fejler hvis en vuln-accept i osv-scanner.toml er udløbet ELLER mangler dato.

🔴 HVORFOR DETTE FINDES: `osv-scanner` HÅNDHÆVER IKKE `ignoreUntil`. Bevist ved
kørsel ([quality], v2.5.0, 2026-08-11): en ignore med en UDLØBET dato
undertrykker sårbarheden fuldstændigt og giver exit 0. Datoen i configen er
altså dekoration — uden dette eksterne tjek er hver "midlertidig" accept i
praksis PERMANENT, og gaten afvikler sig selv i stilhed.

🔴 LÆSNINGEN SKER MED `tomllib`, IKKE MED REGEX. Den kanoniske forms første
udgave splittede på `[[IgnoredVulns]]` som tekst. `[[ IgnoredVulns ]]` med
whitespace er GYLDIG TOML — og regex-formen fandt da NUL poster i en fil fulde
af poster og meldte grønt. Tre defekter blev fundet i regex-formen på én dag
([notifications] fandt dem); de to andre larmer, denne er tavs.

    En parser der kan narres af et mellemrum kan ikke bære en sikkerhedsaccept.

🔴 SAMMENLIGNINGEN SKER I DEADLINENS EGEN OPLØSNING. `ignoreUntil` er et
RFC3339-TIMESTAMP, og "ignorér indtil X" udløber PÅ instantet X — ikke ved
udgangen af X's dato. En tidligere udgave sammenlignede dato mod dato, så en
deadline `…T00:00:00Z` blev accepteret HELE den dag: en dags gratis blødhed, i
selve gaten mod blødhed. ([auth] fandt den.)

DEN DISKRIMINERENDE TEST for den fejl er ikke fortid/fremtid-parret — de to
udgaver er enige om begge. Den er en deadline på DAGENS DATO kl. 00:00Z.
Se `assert-osv-ignores-expire.test.sh`.
"""

import datetime
import os
import sys
import tomllib

TOML = sys.argv[1] if len(sys.argv) > 1 else 'osv-scanner.toml'

# Forventet antal accepter. 🔴 Et konkret tal, ikke "> 0": ved
# whitespace-varianten fandt den gamle form NUL, og "alle 0 accepter er i
# orden" ser plausibelt ud, hvis man ikke ved, hvad man forventer. Et tal der
# ikke stemmer, er i sig selv et fund — enten er en accept forsvundet, eller
# også er der tilføjet en uden at nogen opdaterede forventningen.
EXPECTED = int(os.environ.get('OSV_EXPECTED', '34'))


def parse_until(value: object) -> datetime.datetime | None:
    """RFC3339-timestamp eller ren dato → aware datetime i UTC."""
    if isinstance(value, datetime.datetime):
        # tomllib giver et ægte datetime for et RFC3339-felt uden anførselstegn.
        return (
            value
            if value.tzinfo
            else value.replace(tzinfo=datetime.timezone.utc)
        )
    if isinstance(value, datetime.date):
        return datetime.datetime.combine(
            value, datetime.time.min, tzinfo=datetime.timezone.utc
        )
    if isinstance(value, str):
        try:
            parsed = datetime.datetime.fromisoformat(value.replace('Z', '+00:00'))
        except ValueError:
            return None
        return (
            parsed
            if parsed.tzinfo
            else parsed.replace(tzinfo=datetime.timezone.utc)
        )
    return None


def main() -> int:
    with open(TOML, 'rb') as handle:
        config = tomllib.load(handle)

    now = datetime.datetime.now(datetime.timezone.utc)
    entries = config.get('IgnoredVulns', [])

    problems: list[str] = []
    counted = 0

    for entry in entries:
        ident = entry.get('id')
        if not isinstance(ident, str) or not ident:
            # En post uden id kan ikke tilskrives noget — tæl den ikke som
            # daekket, men sig at den er der.
            problems.append('(post uden id): kan ikke tilskrives en sårbarhed')
            continue
        counted += 1

        if 'ignoreUntil' not in entry:
            # En accept uden udløb er ikke en accept — det er en fjernelse.
            problems.append(f'{ident}: MANGLER ignoreUntil')
            continue

        until = parse_until(entry['ignoreUntil'])
        if until is None:
            problems.append(f'{ident}: ignoreUntil kan ikke læses som dato')
            continue

        if until <= now:
            problems.append(f'{ident}: UDLØBET {until.date().isoformat()}')

    if counted != EXPECTED:
        problems.append(
            f'FORVENTEDE {EXPECTED} accepter, fandt {counted} — enten er en '
            'accept forsvundet, eller også er der tilføjet en uden at '
            'EXPECTED blev opdateret'
        )

    if problems:
        print(f'{len(problems)} problem(er) i {TOML}:')
        for problem in problems:
            print(f'  {problem}')
        print(
            '\nEn accept uden udløb er permanent. Sæt en ignoreUntil, eller '
            'fjern accepten og luk sårbarheden.'
        )
        return 1

    print(f'{counted} vuln-accepter, alle med en dato der ikke er passeret.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
