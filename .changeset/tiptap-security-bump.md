---
'@grundtone/vue': patch
---

Løft `@tiptap/*`-afhængighederne fra `^3.29.1` til `^3.31.3`.

Rettelsen gælder GHSA-cp6q-959q-f8rh: `@tiptap/core`s `mergeAttributes()` behandler en egen
`__proto__`-nøgle som en prototype-write. Fixet ligger i `@tiptap/core` 3.30.4.

`@tiptap/core` er ikke en direkte afhængighed her — den kommer via de seks `@tiptap/*`-pakker, som
peer-pinner den EKSAKT til deres egen version. Et gulv på `core` alene ville derfor bryde tre
eksakte peer-pins; vejen er at løfte søskendepakkerne, hvorefter core følger med.

Ingen API-ændring i `@grundtone/vue`. 809 tests uændret grønne.
