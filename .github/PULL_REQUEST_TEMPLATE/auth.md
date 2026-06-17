## Hvad + hvorfor

<!-- Closes #N -->

## Tjekliste — baseline

- [ ] Issue linket (`Closes #N`)
- [ ] Tests added/updated (auth/permissions = 90% branch coverage, Beslutning L2)
- [ ] Typecheck/lint grøn lokalt
- [ ] Docs opdateret (JWT-claim-shape, RLS-policy, m.v.)
- [ ] Ingen secrets/keys i diff

## Tjekliste — auth/permissions-specifik

- [ ] JWT-claim-impact dokumenteret (hvilke felter ændrer sig, bagudkompat?)
- [ ] Tenant-isolation verificeret (tenant_id pass-through, BetterAuth org-claim respekteret — Beslutning K)
- [ ] RLS-policy-test added (hvis DB-rolle/tabel-adgang ændret)
- [ ] Multi-tenant smoke: org A kan ikke se org B's data
- [ ] Token-refresh-flow uændret eller eksplicit migration

## Test plan

## Risiko / rollback
