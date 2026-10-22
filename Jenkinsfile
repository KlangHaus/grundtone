// grundtone · parallel-mode port of the required checks against KlangHaus/jenkins-library
//
// 🔴 DATA ONLY. Repo-specific pipeline LOGIC belongs in the library as a
//    parameterised facility — a PR to [quality] — never here (same rule as
//    grundtone-studio's and account's Jenkinsfiles).
//
// 🔴 PARALLEL, NOT FLIP. `checksPrefix` publishes `jenkins/<name>` next to the
//    Actions-produced `<name>`. GitHub takes the LATEST check run per name
//    regardless of app, so without the prefix a red Jenkins run would REPLACE
//    the Actions result on a required name.
//    The gate lives in the RULESET on `develop` (11 required contexts, every
//    one with integration_id null, measured 2026-10-22 on 9bca98e), not in
//    branch protection. `context` below is the EXACT required name.
//    FLIP is one operation in THIS order:
//      remove the prefix -> verify the names landed -> turn Actions off LAST.
//
// WAVE 1 — the four required names that need no new facility:
//    Secret scan · Security Audit · Lint PR title · Validate PR
//    None of them needs `pnpm install`, a GitHub token, a browser or docker.
//
// NOT IN WAVE 1 (each with its blocker; the plan is in the PR description):
//    Setup & Build      `assert-environment-gates.mjs` calls `gh api` with a
//                       token; `githubToken` is refused on PR builds by design.
//    Lint & Typecheck   needs the built packages and `origin/develop` for the
//                       changeset decision — after Setup & Build.
//    Test               Playwright `install --with-deps chromium` needs OS
//                       packages (sudo) the agent does not have.
//    Bundle Size Check  preactjs/compressed-size-action builds base and head
//                       and writes a PR comment — needs a redesign.
//    CodeQL / Analyze   produced by GitHub code scanning (SARIF upload) —
//                       needs a decision, not a port.
//    Closes-link + branch-name
//                       the Actions job only WARNS, so it can never fail;
//                       the library's `closesLink` cell ENFORCES and does not
//                       accept ClickUp ids — porting it would change the gate.
//
// ⚠️ DECLARED DIFFERENCES, so a disagreement in the parallel phase is not
//    attributed to the port:
//    * node: Actions reads `.nvmrc` (24.15.0); the agent's only node 24 is
//      24.20.0. `engines.node` is `>=24.15.0`, so engine-strict accepts both.
//    * pnpm: both sides run 10.14.0 (`packageManager`), asserted below.
//    * Security Audit: Actions runs `pnpm install` first; here it does not.
//      `pnpm audit` reads only pnpm-lock.yaml (measured 2026-10-22 on 9bca98e:
//      rc 0 at --audit-level=high without node_modules, rc 1 at moderate).
//    * Lint PR title / Validate PR: Actions re-runs on a title EDIT
//      (`types: [edited]`); a Jenkins build starts on a push, so after an edit
//      `jenkins/<name>` judges the title as it was at the last push.
@Library('klanghaus') _

klanghausPipeline(
  repo: 'KlangHaus/grundtone',

  // Measured, not assumed: grundtone's default branch is `develop`.
  defaultBranch: 'develop',

  checksPrefix: 'jenkins/',

  // The agent's default node is 22.23.2; `.npmrc` has `engine-strict=true`.
  toolchains: ['node': [exact: '24.20.0']],
  tools: [
    'node': [exact: '24.20.0', cmd: 'node --version'],
    'pnpm': [exact: '10.14.0', cmd: 'pnpm --version 2>/dev/null | tail -1'],
  ],

  checks: [
    // ─── Secret scan (twin of .github/workflows/gitleaks.yml) ──────────────
    [
      // 🔴 Needs FULL history: a shallow clone makes gitleaks find fewer
      //    secrets and report green. The library measures the clone.
      //    Version and sha256 are the ones gitleaks.yml pins.
      context: 'Secret scan',
      selfInstalls: ['gitleaks': '8.21.2'],
      cmd: '''
        set -euo pipefail
        version=8.21.2
        sha256=5bc41815076e6ed6ef8fbecc9d9b75bcae31f39029ceb55da08086315316e3ba
        mkdir -p .ci-tools
        curl -fsSL -o .ci-tools/gitleaks.tar.gz \
          "https://github.com/gitleaks/gitleaks/releases/download/v${version}/gitleaks_${version}_linux_x64.tar.gz"
        echo "${sha256}  .ci-tools/gitleaks.tar.gz" | sha256sum --check --strict -
        tar -xzf .ci-tools/gitleaks.tar.gz -C .ci-tools gitleaks
        got=$(.ci-tools/gitleaks version)
        [ "$got" = "$version" ] || { echo "gitleaks reports '$got', expected $version"; exit 1; }
        .ci-tools/gitleaks detect --no-banner --redact --verbose --exit-code 1
      ''',
    ],

    // ─── Security Audit (twin of ci.yml's `security` job) ──────────────────
    [
      context: 'Security Audit',
      cmd: '''
        set -euo pipefail
        pnpm audit --prod --audit-level=high
      ''',
    ],

    // ─── Lint PR title (twin of commitlint.yml) ────────────────────────────
    [
      // ⛔ PR only: a push build has no title, and an empty title would be
      //    judged rather than skipped.
      //
      // The title arrives through the environment (KH_PR_TITLE), never
      // interpolated into the script — it is attacker-controlled on a public
      // repo, the same reason commitlint.yml passes it through `env:`.
      //
      // commitlint is installed in a temp dir OUTSIDE the checkout, at the
      // lockfile's versions, and NODE_PATH points at it: commitlint resolves
      // `extends` from the CWD, not from its own install (account#161's
      // build 1 failed exactly so). The setup probe runs first, so a failure
      // after it is a title violation, not a broken install.
      context: 'Lint PR title',
      selfInstalls: ['@commitlint/cli': '21.2.3', '@commitlint/config-conventional': '21.2.3'],
      cmd: '''
        set -euo pipefail
        tools="$(mktemp -d)"
        # Outside the workspace, so Jenkins' workspace cleanup never reaches it.
        trap 'rm -rf -- "$tools"' EXIT
        ( cd "$tools" && echo '{}' > package.json \
          && npm install --no-save --no-package-lock --no-audit --no-fund \
               @commitlint/cli@21.2.3 @commitlint/config-conventional@21.2.3 >/dev/null )
        cl="$tools/node_modules/.bin/commitlint"
        export NODE_PATH="$tools/node_modules"
        got="$("$cl" --version)"
        [ "$got" = "@commitlint/cli@21.2.3" ] || { echo "commitlint reports '$got', expected 21.2.3"; exit 2; }
        echo 'chore(ci): probe' | "$cl" --config commitlint.config.js || {
          echo "commitlint could not pass a known-good title — SETUP failure, not a violation"; exit 2
        }
        printf '%s\\n' "${KH_PR_TITLE:?KH_PR_TITLE missing on a PR build}" \
          | "$cl" --config commitlint.config.js
      ''',
      when: { ctx -> ctx.isPR },
    ],

    // ─── Validate PR (twin of ci.yml's `validate-pr` job) ──────────────────
    [
      // The SAME judgement as `Lint PR title` under a second required name:
      // ci.yml's job pipes the title into commitlint exactly as commitlint.yml
      // does. Ported as-is; collapsing the two names is a ruleset decision,
      // not something a port should do silently.
      context: 'Validate PR',
      selfInstalls: ['@commitlint/cli': '21.2.3', '@commitlint/config-conventional': '21.2.3'],
      cmd: '''
        set -euo pipefail
        tools="$(mktemp -d)"
        # Outside the workspace, so Jenkins' workspace cleanup never reaches it.
        trap 'rm -rf -- "$tools"' EXIT
        ( cd "$tools" && echo '{}' > package.json \
          && npm install --no-save --no-package-lock --no-audit --no-fund \
               @commitlint/cli@21.2.3 @commitlint/config-conventional@21.2.3 >/dev/null )
        cl="$tools/node_modules/.bin/commitlint"
        export NODE_PATH="$tools/node_modules"
        got="$("$cl" --version)"
        [ "$got" = "@commitlint/cli@21.2.3" ] || { echo "commitlint reports '$got', expected 21.2.3"; exit 2; }
        echo 'chore(ci): probe' | "$cl" --config commitlint.config.js || {
          echo "commitlint could not pass a known-good title — SETUP failure, not a violation"; exit 2
        }
        printf '%s\\n' "${KH_PR_TITLE:?KH_PR_TITLE missing on a PR build}" \
          | "$cl" --config commitlint.config.js
      ''',
      when: { ctx -> ctx.isPR },
    ],
  ],
)
