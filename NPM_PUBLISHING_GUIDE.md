# NPM Publishing Guide for Haspen UI

Komplet guide til at publicere Haspen UI packages til NPM.

## Forudsætninger ✅

- [x] NPM konto: `dubpirate`
- [x] Logget ind lokalt: `npm whoami` viser `dubpirate`
- [ ] NPM Access Token oprettet
- [ ] GitHub Secret konfigureret

## Trin 1: Opret NPM Access Token (Automation Token)

### 1.1 Log ind på npmjs.com

Gå til: https://www.npmjs.com/login

### 1.2 Generer Access Token

1. Klik på dit profilbillede (øverste højre hjørne)
2. Vælg **"Access Tokens"**
3. Klik **"Generate New Token"**
4. Vælg **"Automation"** (ikke "Publish" eller "Classic")
   - **Vigtigt:** Automation tokens bruges til CI/CD
   - De udløber ikke automatisk
   - Har publish rettigheder

### 1.3 Konfigurer Token

**Token navn:** `haspen-ui-github-actions`

**Rettigheder:**

- ✅ Read and write packages
- ✅ Publish packages

**Kopier tokenet** - du får kun én chance!

> ⚠️ **VIGTIGT:** Gem tokenet sikkert! Du kan ikke se det igen.

## Trin 2: Tilføj NPM Token til GitHub Secrets

### 2.1 Gå til GitHub Repository Settings

1. Gå til: https://github.com/allanasp/haspen-ui
2. Klik på **Settings** (repository settings, ikke profile)
3. I venstre menu, vælg **Secrets and variables** → **Actions**

### 2.2 Opret New Repository Secret

1. Klik **"New repository secret"**
2. **Name:** `NPM_TOKEN`
3. **Secret:** Indsæt dit NPM access token
4. Klik **"Add secret"**

### 2.3 Verificer Secret

Du skulle nu se `NPM_TOKEN` i listen over secrets. Den vises som `***`.

## Trin 3: Publicering (To Metoder)

## Metode A: Automatisk Publicering (Anbefalet) 🤖

### Sådan fungerer det:

1. **Du laver ændringer** og opretter en changeset
2. **Pusher til `main` branch**
3. **GitHub Actions opretter automatisk en "Version Packages" PR**
4. **Du reviewer PR'en** (tjek versioner og changelogs)
5. **Merger PR'en**
6. **GitHub Actions publicerer automatisk til NPM**

### Workflow Trin for Trin:

#### 1. Lav dine kodeændringer

```bash
# Arbejd på din feature
git checkout -b feature/new-component
# ... lav ændringer ...
```

#### 2. Opret en changeset

```bash
pnpm changeset:add
```

Følg prompten:

- Vælg hvilke packages der er ændret
- Vælg bump type (major/minor/patch)
- Skriv en beskrivelse af ændringerne

#### 3. Commit og push

```bash
git add .
git commit -m "feat(ui): add new Button variant"
git push origin feature/new-component
```

#### 4. Opret Pull Request til `main`

- Gå til GitHub
- Opret PR fra `feature/new-component` til `main`
- CI kører og tjekker at changeset findes
- Få PR approved og merge til `main`

#### 5. Vent på "Version Packages" PR

Efter merge til `main`:

- GitHub Actions kører automatisk (`.github/workflows/release.yml`)
- En PR med titlen **"chore(release): version packages"** oprettes automatisk
- Denne PR indeholder:
  - Opdaterede versioner i `package.json`
  - Genererede `CHANGELOG.md` filer
  - Opdateret `pnpm-lock.yaml`

#### 6. Review og Merge Version PR

**Tjek følgende:**

- ✅ Versionsnumre er korrekte
- ✅ CHANGELOGs indeholder alle ændringer
- ✅ Ingen uventede packages bliver publiceret

**Merge PR'en** → Packages publiceres automatisk til NPM!

#### 7. Verificer Publicering

Tjek at packages er publiceret:

```bash
npm view @haspen/core
npm view @haspen/ui
npm view @haspen/composables
npm view @haspen/shared
npm view @haspen/design-tokens
npm view @haspen/nuxt
```

## Metode B: Manuel Publicering (Backup) 🔧

Brug kun hvis automatisk publicering fejler.

### 1. Sikr dig at alt er bygget og testet

```bash
# Build alle packages
pnpm build:packages

# Kør tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint
```

### 2. Opret changeset (hvis ikke allerede gjort)

```bash
pnpm changeset:add
```

### 3. Tjek hvad der vil blive publiceret

```bash
pnpm changeset:status
```

Output viser:

- Hvilke packages der vil blive publiceret
- Nye versionsnumre
- Hvilke changesets der er pending

### 4. Version packages

```bash
pnpm version-packages
```

Dette:

- Opdaterer versionsnumre
- Genererer CHANGELOGs
- Opdaterer lockfile
- Konsumerer changesets

### 5. Review ændringer

```bash
git status
git diff
```

Tjek at:

- Versionsnumre er korrekte
- CHANGELOGs ser rigtige ud
- Ingen uventede filer er ændret

### 6. Commit version changes

```bash
git add .
git commit -m "chore(release): version packages"
```

### 7. Build og publish til NPM

```bash
pnpm release
```

Dette kommando:

- Bygger alle packages (`pnpm build:packages`)
- Publicerer til NPM (`changeset publish`)
- Opretter git tags for hver version

### 8. Push changes og tags

```bash
git push --follow-tags
```

### 9. Verificer på NPM

```bash
npm view @haspen/core
```

## Første Gang Publicering

Hvis dette er første gang du publicerer `@haspen` scope:

### Verificer du har adgang til `@haspen` scope

```bash
npm access ls-packages dubpirate
```

### Hvis scope ikke eksisterer, opret det:

Besøg: https://www.npmjs.com/org/create

Eller publicer første package - NPM opretter scope automatisk hvis du har rettigheder.

### Verificer package konfiguration

Alle packages skal have:

```json
{
  "name": "@haspen/package-name",
  "private": false,
  "publishConfig": {
    "access": "public"
  }
}
```

## Testing Før Første Publicering

### Dry-run Publish (Simulering)

Test publicering uden faktisk at publicere:

```bash
pnpm changeset publish --dry-run
```

Dette viser:

- Hvilke packages ville blive publiceret
- Til hvilke versioner
- Men publicerer IKKE faktisk

### Snapshot Release (Test Version)

Publicer en test-version først:

```bash
pnpm release:snapshot
```

Dette opretter en version som: `0.1.0-snapshot-20250131123045`

Test at installere den:

```bash
npm install @haspen/ui@snapshot
```

Hvis alt fungerer, kan du publicere rigtigt.

## Troubleshooting

### "You must be logged in to publish packages"

```bash
npm login
# Følg prompten
npm whoami  # Verificer du er logget ind
```

### "You do not have permission to publish @haspen/package"

Du skal være owner eller collaborator på `@haspen` scope.

Løsning:

1. Opret scope på npmjs.com
2. Eller brug et scope du ejer (f.eks. `@dubpirate/package`)

### "Cannot publish over existing version"

Du prøver at publicere en version der allerede eksisterer.

Løsning:

1. Bump version: `pnpm changeset:add`
2. Run: `pnpm version-packages`

### "EPUBLISHCONFLICT"

Anden proces publicerer samtidig.

Løsning: Vent et minut og prøv igen.

### GitHub Actions fejler med "401 Unauthorized"

NPM_TOKEN secret er ikke konfigureret eller er ugyldig.

Løsning:

1. Generer nyt token på npmjs.com
2. Opdater GitHub secret

### Packages bygges ikke

Tjek at `prepublishOnly` hook er defineret:

```json
{
  "scripts": {
    "prepublishOnly": "pnpm run build"
  }
}
```

## Verificer Publicering

### Tjek på npmjs.com

Besøg:

- https://www.npmjs.com/package/@haspen/core
- https://www.npmjs.com/package/@haspen/ui
- https://www.npmjs.com/package/@haspen/composables
- https://www.npmjs.com/package/@haspen/shared
- https://www.npmjs.com/package/@haspen/design-tokens
- https://www.npmjs.com/package/@haspen/nuxt

### Tjek via CLI

```bash
npm view @haspen/core version
npm view @haspen/core
npm info @haspen/ui
```

### Test installation

```bash
mkdir test-install
cd test-install
npm init -y
npm install @haspen/ui
```

## Sikkerhed Best Practices

### NPM Token Sikkerhed

- ✅ Brug **Automation** tokens til CI/CD
- ✅ Gem ALDRIG tokens i kode
- ✅ Brug GitHub Secrets
- ✅ Roter tokens regelmæssigt (hver 6-12 måned)
- ✅ Revoke tokens hvis de kompromitteres

### To-Factor Authentication (2FA)

Anbefalet at aktivere 2FA på NPM:

1. Gå til: https://www.npmjs.com/settings/dubpirate/tfa
2. Aktiver 2FA
3. Automation tokens virker stadig med 2FA aktiveret

## Næste Skridt

1. [ ] Opret NPM Access Token
2. [ ] Tilføj token til GitHub Secrets som `NPM_TOKEN`
3. [ ] Test med snapshot release: `pnpm release:snapshot`
4. [ ] Opret første changeset: `pnpm changeset:add`
5. [ ] Push til main branch
6. [ ] Vent på "Version Packages" PR
7. [ ] Review og merge PR
8. [ ] Verificer packages på npmjs.com

## Hurtig Reference

| Kommando                      | Formål                                |
| ----------------------------- | ------------------------------------- |
| `npm whoami`                  | Tjek hvem du er logget ind som        |
| `npm login`                   | Log ind på NPM                        |
| `pnpm changeset:add`          | Opret changeset                       |
| `pnpm changeset:status`       | Tjek hvad der vil blive publiceret    |
| `pnpm version-packages`       | Bump versioner og generer CHANGELOGs  |
| `pnpm release`                | Build og publicer til NPM             |
| `pnpm release:snapshot`       | Publicer test/snapshot version        |
| `npm view @haspen/core`       | Se package info på NPM                |
| `changeset publish --dry-run` | Simuler publicering uden at publicere |

## Support

Hvis du støder på problemer:

1. Tjek denne guide først
2. Læs CHANGESETS.md for detaljer om workflow
3. Se official Changesets docs: https://github.com/changesets/changesets
4. Opret et issue i dette repository

---

**Held og lykke med publiceringen! 🚀**
