# Connected Mode binding

`connectedMode.json` binds this repo to its project on our self-hosted SonarQube
(`sonar.klanghaus.dk`), so SonarQube for IDE shows the same findings in the editor that CI reports —
without every developer configuring it by hand.

## 🔴 The file is not the capability

The binding does nothing on its own. It is read by the **SonarQube for IDE** extension (formerly
SonarLint), and measured 2026-09-19 on this machine that extension was installed in **none** of the
three editors present (VS Code: 63 extensions, Cursor: 6, Kiro: 2 — zero Sonar in each). So:

1. install **SonarQube for IDE** in your editor;
2. sign in to `sonar.klanghaus.dk` with your own credentials — this file deliberately carries **no
   token**, only the server URI and the project key, which is why it is safe to commit;
3. reopen the repo; the extension offers to use this configuration.

Until step 1 happens, CI analyses and the editor stays blind — which was the whole point of riff
KH-915.

## Keep the key honest

`projectKey` must match `sonar.projectKey` in `sonar-project.properties`. A copied binding that
still names another repo's project is the failure this is most likely to have: it looks configured
and reports the wrong project. `scripts/lib/sonarlint-binding.test.mjs` compares the two files, so a
mismatch fails the test suite instead of quietly binding the wrong project.

Schema measured from the extension's own test fixture (`SonarSource/sonarlint-vscode`,
`test/suite/autobinding.test.ts`): the file is `.sonarlint/connectedMode.json` with `sonarQubeUri`
and `projectKey`.
