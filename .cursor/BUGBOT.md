# BUGBOT.md — gt

Project-specific review context for Cursor Bugbot. Bugbot inkluderer denne fil
når den reviewer hver PR i dette repo. Hierarkisk: subdirektorier kan have egen
BUGBOT.md der augmenterer denne rod.

Worker-ejer: **[grundtone]** (prompt: `klanghaus/.orchestration/prompts/grundtone.md`).

## Standing rules (gælder ALLE KlangHaus-repos)

- **INGEN `Co-Authored-By`** i commits eller PR-bodies (org-konvention).
- **Conventional commits** + commitlint scope-enum. Type-enum låst i
  `@klanghaus/quality-config/commitlint`. Scope-enum udvides pr. repo i
  `commitlint.config.mjs`.
- **Issue-first (Beslutning M):** PR-body skal indeholde `Closes #N`.
  Branch-navn: `<type>/<issue#>-<slug>`. Soft-block-grace ind til 2026-06-26
  derefter required-check.
- **No `--no-verify`.** Pre-commit/pre-push hooks må IKKE bypasses.
- **Secrets:** ingen `.env`-filer committet. Brug 1Password vault
  `ops` + `op run -- <kommando>`.
- **Merge-gate:** grøn CI + Bugbot-verdict + [review]-verdict + Allan merger.
  Workers åbner PRs, men merger IKKE selv.

## Test-coverage gate (Beslutning L2 — tiered)

| Kode-lag                                    | Branch coverage                        |
| ------------------------------------------- | -------------------------------------- |
| Money / Ledger / Klippekort-wallet          | **90%**                                |
| Auth-flows + Permissions PDP                | **90%**                                |
| Data-isolation (RLS, tenant-resolution)     | **90%**                                |
| Default app-kode                            | **70%**                                |
| UI-leaf-komponenter                         | lavere (drevet af stories/visuel test) |
| Generated / types / fixtures / build-config | ekskluderet                            |

Repo-specifikke kritiske stier listet i `CLAUDE.md`. PR-diff-coverage gate:
70% af nye linjer.

## Sikkerheds-invarianter (gælder hele økosystemet)

Bugbot bør **flagge som High Severity** hvis disse brydes:

1. **Tenant-isolation (Beslutning K):** `tenant_id` derives fra JWT-`org`-claim,
   ALDRIG fra request body. RLS-policies kræver `app.tenant_id` session-GUC.
   Konsumenter kan ikke spoofe tenant.
2. **JWT-claim-kontrakt (Beslutning O):** `sub` + `org` claims. JWKS verificeres
   lokalt i hver klient via cached pubkey — ikke round-trip per request.
3. **`tenant_id ≡ org_id`** (Beslutning K): BetterAuth `organizations.create`
   accepterer klient-leveret UUID; tenant-resolution-lag oversætter ikke.
4. **Ingen secrets i diff:** `.env`-filer, API-tokens, JWT-secrets, DB-passwords.
   gitleaks + secret-scanning er sidste forsvar — code review er primært.
5. **Idempotente state-machines på money/long-running flows (Beslutning J2f):**
   payment/Klippekort/provisioning skal være restartbare. Manglende
   idempotency-key på money-rør = critical.
6. **License-allowlist (L3):** MIT, Apache-2.0, BSD-2/3, ISC, MPL-2.0, 0BSD.
   GPL/AGPL/LGPL/SSPL/BUSL = critical.

## Kvalitets-invarianter

Bugbot bør **flagge som Medium Severity** hvis disse brydes:

- **`z.string().X().optional()` uden empty-string-handling:** brug
  `@klanghaus/quality-config/zod-helpers`'s `createEmptyToUndefined(z)`
  for at undgå empty-string boot-crashes på optional env-vars.
- **OTel-initialisering AFTER static imports:** auto-instrumentations
  hooker ikke ind. Flyt OTel-init til separat bootstrap-fil + brug
  `NODE_OPTIONS='--import=...'`.
- **Manglende `tenant.id`-resource-attribut (Beslutning J2c):** alle OTel-spans
  skal bære `tenant.id` (eller `klanghaus` for KlangHaus' egne tjenester).
  Kardinalitet kan ikke backfilles.

## Kanonisk reference

- `klanghaus/.orchestration/PLAN.md` — alle Beslutninger A→
- `klanghaus/.orchestration/QUALITY-GATES.md` — Beslutning L+M+N gate-detaljer
- `klanghaus/.orchestration/GITHUB-RULES.md` — branch-protection + repo-konvention
- `klanghaus/.orchestration/BUGBOT-RULES.md` — [review]-tab kanonisk input til denne fil
- `CLAUDE.md` (root) — repo-specifik build/test/dev/secrets-konvention
