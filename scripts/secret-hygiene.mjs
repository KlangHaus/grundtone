#!/usr/bin/env node
// secret-hygiene.mjs — a secret this repo consumes is gated by an environment, or it is named.
//
// WHY THIS EXISTS (Allan 2026-10-22: public repo = GitHub Actions, private = Jenkins)
//
// Public repos are now a SUPPORTED configuration, not a transitional state, so the thing that
// created today's drift will recur: a new environment can be made with 0 rules, and a new
// repo-level secret can be added, and nothing fails. Measured 2026-10-22, before this guard:
// `grundtone-com` held the Bunny apex key with 0 protection rules and no branch policy, while
// `docs-deploy`, `email-deploy` and `npmjs-publish` had both. The pattern existed; one was the
// outlier. Nobody noticed, because nothing was looking.
//
// 🔴 A workflow-file `if: github.ref == ...` is NOT the control. Any branch can carry its own
// workflow that reads a repo-level secret, so the control has to be the environment's deployment
// branch policy. The `if:` is a welcome second layer and protects nothing on its own.
//
// WHY IT MEASURES THE DECLARATION AND NOT THE LIVE SECRET LIST
//
// GITHUB_TOKEN has no `secrets: read` permission — the Actions secrets API needs collaborator
// access, so a workflow cannot enumerate its own repo's secret names. Adding a PAT here would mean
// adding a credential in order to audit credentials. So surface A reads the WORKFLOW FILES: a
// secret is only dangerous where it is CONSUMED, consumption is declarative and in the repo, and
// that makes the guard fire at PR time, before the secret is ever created.
//
// TWO SURFACES, aggregated so one red cannot silence the other:
//   A. static — every consumed `secrets.X` is allowlisted, or sits in a job with `environment:`.
//   B. api    — every environment has a deployment branch policy, except the named ones.
//
// 🔴 REVIEW HISTORY, because it is the reason half this file looks the way it does.
// [grundtone] provoked a hole in v1 with a fixture instead of arguing about it: surface A
// recognised a job only at exactly two-space indentation, so in a file with four-space job keys
// every secret was DROPPED WITHOUT A WORD — and the positive control (`seen > 0`) was satisfied by
// a DIFFERENT file, so the guard could not see its own miss. That is state ⑦: enforcing correctly
// on the files it can parse while blind to the one it cannot. v2 derives the job indentation from
// the file and, as a backstop, refuses to report at all if a secret appears under `jobs:` that it
// could not attribute to a job. A guard that silently parses less than it claims is worse than no
// guard, because it carries a verdict.
//
// Exit: 0 = clean · 1 = violation · 2 = the instrument could not measure (never a pass)

import process from 'node:process'

import {
  ENV_ALLOWLIST,
  fetchEnvironments,
  Instrument,
  readWorkflows,
  runCell,
  SECRET_ALLOWLIST,
  selfTestCells,
  surfaceA,
  surfaceB,
  WORKFLOW_DIR,
} from './lib/secret-hygiene.mjs'

const REPO = process.env.GITHUB_REPOSITORY ?? 'KlangHaus/grundtone'

const EXIT_OK = 0
const EXIT_VIOLATION = 1
const EXIT_INSTRUMENT = 2

// ───────────────────────────────────────────── self-test

function selfTest() {
  console.log('SELF-TEST: one axis per cell')
  let pass = 0
  const cells = selfTestCells()
  for (const c of cells) {
    const got = runCell(c)
    const ok = got === c.expect
    if (ok) pass += 1
    console.log(`  ${ok ? 'PASS' : 'FAIL'} ${c.label}: expected ${c.expect}, got ${got}`)
  }
  console.log(`result: ${pass} passed, ${cells.length - pass} failed`)
  return pass === cells.length ? EXIT_OK : EXIT_VIOLATION
}

// ───────────────────────────────────────────── live run

async function main(argv) {
  if (argv.includes('--self-test')) return selfTest()

  let a
  let b
  let files
  let envs
  try {
    files = readWorkflows()
    a = surfaceA(files)
    // Both surfaces are measured before either verdict prints: [sikkerhed]'s rule that independent
    // facts are AGGREGATED, because a known red above makes everything below dead and silent.
    envs = argv.includes('--no-api')
      ? null
      : await fetchEnvironments({
          token: process.env.GITHUB_TOKEN,
          repo: REPO,
          // Set by Actions on every runner; the e2e cells point it at a local stub.
          apiUrl: process.env.GITHUB_API_URL ?? 'https://api.github.com',
        })
    b = envs ? surfaceB(envs) : []
  } catch (e) {
    if (!(e instanceof Instrument)) throw e
    console.log(`INSTRUMENT: ${e.message}`)
    console.log('result: not measured — neither passed nor failed')
    return EXIT_INSTRUMENT
  }

  console.log(`measured ${new Date().toISOString()} against ${REPO}`)
  console.log(`  A ${WORKFLOW_DIR}: ${files.length} file(s)`)
  if (envs) console.log(`  B environments: ${envs.length} — ${envs.map((e) => e.name).join(', ')}`)
  else console.log('  B environments: NOT MEASURED (--no-api)')
  console.log(
    `  allowlists: ${Object.keys(SECRET_ALLOWLIST).length} secret(s), ` +
      `${Object.keys(ENV_ALLOWLIST).length} environment(s)`,
  )
  console.log()

  const bad = [...a, ...b]
  if (bad.length > 0) {
    for (const v of bad) console.log(`FAIL: ${v}`)
    console.log(`result: ${bad.length} violation(s)`)
    return EXIT_VIOLATION
  }
  console.log('every consumed secret is gated or named; every environment has a branch policy')
  console.log('NOT MEASURED by this guard: whether a secret EXISTS (GITHUB_TOKEN cannot read the')
  console.log('names), whether a branch policy allows the RIGHT branches, and org-level secrets')
  console.log('result: passed')
  return EXIT_OK
}

main(process.argv.slice(2)).then((c) => process.exit(c))