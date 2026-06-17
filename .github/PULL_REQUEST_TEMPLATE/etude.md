## Hvad + hvorfor

<!-- Closes #N -->

## Tjekliste — baseline

- [ ] Issue linket (`Closes #N`)
- [ ] Tests added/updated (money/Klippekort = 90% branch — Beslutning L2 + E)
- [ ] Typecheck/lint grøn lokalt
- [ ] Docs opdateret
- [ ] Ingen secrets/keys i diff

## Tjekliste — Etude-specifik

- [ ] Tenant-resolution-laget respekteret (ingen hardcoded tenant_id, ingen direkte DB-lookup uden resolution — Beslutning K)
- [ ] Per-tenant smoke-test added (pool-tenant + silo-tenant adfærd ens)
- [ ] Payment-flow: idempotent + persisteret state-machine (J2f) hvis money rør
- [ ] Stripe Payment Intent / wallet-mutation gennem motor-agnostisk lag

## Test plan

## Risiko / rollback
