# BUGBOT.md — grundtone

Project-specific review context for Cursor Bugbot. Bugbot includes this file when reviewing every PR in this repo. Hierarchical: subdirectories may have own BUGBOT.md that augment this root.

## Hvad dette repo er

[grundtone] er {{REPO_MISSION_ONE_SENTENCE}}.
Worker-ejer: **[grundtone]** (prompt: `klanghaus/.orchestration/prompts/grundtone.md`).
Stack: {{STACK_LINE}}.

## Standing rules (ALL repos)

- **INGEN `Co-Authored-By`** i commits eller PR-bodies (org-konvention).
- **Conventional commits** + commitlint scope-enum. Type-enum låst i `@klanghaus/quality-config`. Scope-enum udvides pr. repo i `commitlint.config.mjs`.
- **Issue-first (Beslutning M):** PR-body skal indeholde `Closes #N`. Branch-navn: `<type>/<issue#>-<slug>`.
- **No `--no-verify`.** Pre-commit/pre-push hooks må ikke bypasses.
- **Secrets:** ingen `.env`-filer committet. Brug 1Password vault `ops` + `op run -- <kommando>`.
- **Merge-gate:** grøn CI + Bugbot-verdict + [review]-verdict + Allan merger.

## Coverage-tier (Beslutning L2)

Dette repo er tier **{{TIER}}** ({{TIER_RATIONALE}}). Test-coverage-gate: **{{COVERAGE_PERCENT}}% branch-coverage**. PR-diff-coverage: 70% af nye linjer.

## Arkitektur-invarianter — disse må Bugbot flagge hvis brudt

{{INVARIANTS_LIST}}

## Cross-repo-grænser

Dette repo kalder / kaldes af:

{{CROSS_REPO_BOUNDARIES}}

Brud på disse kontrakter (fx ændret JWT-claim-form, ændret API-response-shape uden versioning) skal flag'es som **High Severity**.

## Known non-bugs (tavshed-zone)

Følgende mønstre er bevidste — Bugbot bør IKKE flagge:

{{KNOWN_NON_BUGS}}

## Kanonisk reference

- `klanghaus/.orchestration/PLAN.md` — Beslutninger A–T (læs `{{RELEVANT_BESLUTNINGER}}`)
- `klanghaus/.orchestration/QUALITY-GATES.md` — Beslutning L+M+N gate-detaljer
- `klanghaus/.orchestration/BUGBOT-RULES.md` — kanonisk indhold-source for denne fil
