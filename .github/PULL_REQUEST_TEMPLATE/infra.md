## Hvad + hvorfor

<!-- Closes #N -->

## Tjekliste — baseline

- [ ] Issue linket (`Closes #N`)
- [ ] Typecheck/lint grøn (`tofu fmt`, `tofu validate`, `tflint`, `tfsec`)
- [ ] `actionlint` + `hadolint` grøn på workflow-/Dockerfile-ændringer
- [ ] Ingen secrets/keys i diff (gitleaks grøn)

## Tjekliste — infra-specifik

- [ ] `tofu plan` output paste'et i PR (eller link til CI-artefakt)
- [ ] Secret-mount verificeret (1Password vault-sti dokumenteret)
- [ ] DNS-record review (hvis Cloudflare-ændring)
- [ ] Backup/restore-path uændret eller eksplicit dokumenteret hvis ændret
- [ ] Rollback-plan dokumenteret nedenfor

## Test plan

<!-- compose up / staging-apply / dry-run / restore-drill -->

## Risiko / rollback
