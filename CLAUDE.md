# CLAUDE.md — grundtone

Project-level instructions for any Claude session working in this repo.
Personal preferences live in your global memory; everything here is repo-wide.

## Worker-ejer

**[grundtone]** — prompt: `klanghaus/.orchestration/prompts/grundtone.md`

## Standing rules (link, ikke duplikat)

- Quality gates: `klanghaus/.orchestration/QUALITY-GATES.md`
- PLAN + låste beslutninger: `klanghaus/.orchestration/PLAN.md`
- **INGEN `Co-Authored-By` i commits** (org-konvention).
- **Conventional commits + commitlint.** Scope-enum udvides pr. repo i `commitlint.config.mjs`; type-enum er låst i `@klanghaus/quality-config/commitlint`.
- **Issue-first (Beslutning M):** PR-body skal indeholde `Closes #N`. Branch: `<type>/<issue#>-<slug>`.
- **Merge-gate:** grøn CI + [review]-verdict + Allan merger. **Brug aldrig `--no-verify`.**

## Hvordan man kører

| Action    | JS/TS (pnpm)     | Go                    |
| --------- | ---------------- | --------------------- |
| Setup     | `pnpm install`   | `go mod download`     |
| Lint      | `pnpm lint`      | `golangci-lint run`   |
| Typecheck | `pnpm typecheck` | `go vet ./...`        |
| Test      | `pnpm test`      | `go test -race ./...` |
| Build     | `pnpm build`     | `go build ./...`      |
| Dev       | `pnpm dev`       | `<service-specifik>`  |

## Secrets

1Password vault: **`ops`**. Ingen `.env`-filer i git.
Brug `op run -- <kommando>` for at injicere secrets ved kørsel.

## Hvor docs bor

- Arkitektur: `klanghaus/docs/infrastructure/`
- Produkt-brief: `klanghaus/docs/product-briefs/grundtone/`
- Worker-koordination: `klanghaus/.orchestration/STATUS.md` (append nyeste øverst)

## Coverage-tier (Beslutning L2)

Default = **70% branch coverage**. Stier markeret som kritiske skal nå **90% branch**:

- `packages/core`
- `packages/utils`
- `packages/icons`
- `packages/email`

Generated/types-only/fixtures/build-config er ekskluderet (se `@klanghaus/quality-config/vitest`).

## Quality-config

Dette repo bruger `@klanghaus/quality-config` som single source of truth.
Re-kør `pnpm dlx @klanghaus/quality-config init --upgrade` for at trække opdaterede
templates/workflows/hooks ind (idempotent; spørger før overskrivning).
