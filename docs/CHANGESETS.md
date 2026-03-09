# Changeset Workflow Guide

Complete guide to using changesets in the Grundtone monorepo.

## Table of Contents

- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Basic Workflows](#basic-workflows)
- [Advanced Features](#advanced-features)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)

## Quick Start

### Creating a Changeset

When you make changes that should be published, create a changeset:

```bash
pnpm changeset:add
```

This will:

1. Prompt you to select which packages changed
2. Ask for the bump type (major, minor, patch)
3. Request a summary of changes for the changelog

### Creating an Empty Changeset

For changes that don't warrant a release (e.g., test updates, build config):

```bash
pnpm changeset:empty
```

### Checking Changeset Status

View current changesets and what will be released:

```bash
pnpm changeset:status
```

## Configuration

### Current Setup

Location: `.changeset/config.json`

**Key Features:**

- **Linked Packages**: All packages version together when any package changes
  - `@grundtone/core`
  - `@grundtone/shared`
  - `@grundtone/vue`
  - `@grundtone/composables`
  - `@grundtone/design-system`
  - `@grundtone/nuxt`
- **Base Branch**: `develop` - changesets compare against this branch
- **Access**: `public` - all packages publish publicly to npm
- **Changelog**: GitHub integration shows commit links and PR references
- **Ignored Packages**: `@grundtone/playground` never publishes

### What Are Linked Packages?

Linked packages maintain synchronized versions across the monorepo. When you:

1. Create a changeset for ANY linked package
2. Run `changeset version`
3. ALL linked packages bump to the highest version in the group + highest bump type

**Example:**

- Current state: All packages at `0.1.0`
- You change only `@grundtone/vue` with a `minor` bump
- After versioning: ALL packages become `0.2.0`

**Benefits:**

- Simplifies dependency management
- Ensures compatibility across packages
- Users always know which versions work together

## Basic Workflows

### Standard Release Process

1. **Make changes and create changesets:**

   ```bash
   # Make your code changes
   pnpm changeset:add
   ```

2. **Create PR and merge to develop:**

   - CI automatically checks for changesets
   - Merge when approved

3. **Version packages (automated via CI):**

   - GitHub Action creates a "Version Packages" PR
   - This PR updates versions and CHANGELOGs
   - Review and merge to develop

4. **Publish (automated via CI):**
   - After merging version PR, packages auto-publish to npm
   - Git tags created automatically

### Manual Release Process

If you need to release manually:

```bash
# 1. Version the packages
pnpm version-packages

# 2. Commit the changes
git add .
git commit -m "chore(release): version packages"

# 3. Build and publish
pnpm release

# 4. Push tags
git push --follow-tags
```

## Advanced Features

### Snapshot Releases

Test changes without bumping official versions. Creates temporary versions like:

`0.2.1-snapshot-20250131123045`

**Use cases:**

- Testing features before official release
- Sharing work-in-progress with team
- CI builds from feature branches

**Workflow:**

```bash
# Create snapshot versions
pnpm release:snapshot

# Or with a custom tag
pnpm changeset version --snapshot feature-xyz
pnpm build:packages
pnpm changeset publish --tag feature-xyz --no-git-tag
```

**Install snapshot:**

```bash
npm install @grundtone/vue@snapshot
# or
npm install @grundtone/vue@feature-xyz
```

**Configuration:**

- `useCalculatedVersion: true` - Uses real next version as base
- `prereleaseTemplate: "{tag}-{datetime}"` - Formats snapshot suffix

**Important:** Never merge snapshot version changes to main branches!

### Prerelease Versions

For alpha, beta, or next releases that users can opt into.

**Example versions:**

- `1.0.0-next.0`
- `2.0.0-beta.1`
- `3.0.0-alpha.2`

#### Creating Prereleases

**1. Enter prerelease mode:**

```bash
# For 'next' channel
pnpm prerelease:next

# For 'beta' channel
pnpm prerelease:beta

# For 'alpha' channel
pnpm prerelease:alpha

# Or custom tag
pnpm prerelease:enter rc
```

This creates `.changeset/pre.json` to track prerelease state.

**2. Add changesets normally:**

```bash
pnpm changeset:add
```

**3. Version and publish:**

```bash
pnpm version-packages
pnpm release
git push --follow-tags
```

**4. Iterate on prereleases:**

Repeat steps 2-3 for each prerelease iteration.

**5. Exit prerelease mode:**

```bash
pnpm prerelease:exit
pnpm version-packages  # Removes -next/-beta/-alpha tags
pnpm release
git push --follow-tags
```

#### Prerelease Best Practices

- Use a separate branch (e.g., `next`, `beta`) for prereleases
- Don't run prereleases from `develop` or `main`
- Users install with: `npm install @grundtone/vue@next`
- Document prerelease channels in README

### Internal Dependencies

Configuration: `"updateInternalDependencies": "patch"`

**What it does:**

When `@grundtone/vue` depends on `@grundtone/core` and `@grundtone/core` gets bumped,
`@grundtone/vue`'s dependency range updates with a `patch` bump.

**Example:**

```json
// Before: @grundtone/vue at 1.0.0
{
  "dependencies": {
    "@grundtone/core": "workspace:*"
  }
}

// @grundtone/core bumps from 1.0.0 to 1.1.0


// After: @grundtone/vue bumps to 1.0.1
```

### Experimental Options

**`onlyUpdatePeerDependentsWhenOutOfRange: true`**

Only updates peer dependencies when they fall outside the current range. Reduces unnecessary
dependency updates.

## CI/CD Integration

### Automatic Changeset Check

PR builds fail if no changeset exists (except for empty changesets). This ensures all changes are
documented.

**In CI (.github/workflows/ci.yml):**

```yaml
- name: Check for changesets
  run: pnpm changeset:status --since=origin/develop
```

**If you need to skip:** Create an empty changeset for non-release changes:

```bash
pnpm changeset:empty
```

### Automated Publishing

**Release workflow (.github/workflows/release.yml):**

1. **Triggers:** Push to `main` branch
2. **Creates PR:** "Version Packages" with updated versions/changelogs
3. **Auto-publishes:** When version PR merges, packages publish to npm
4. **Creates tags:** Git tags for each released version

**Required secrets:**

- `GITHUB_TOKEN` - Automatically provided
- `NPM_TOKEN` - Add to repository secrets

### GitHub Changeset Bot

**Recommended:** Install the changeset bot GitHub app

- Adds comments to PRs indicating changeset status
- Provides quick links to add changesets
- Non-blocking - informational only

**Install:** https://github.com/apps/changeset-bot

## Best Practices

### Writing Good Changeset Summaries

**Do:**

```md
- Add dark mode support to Button component
- Fix accessibility issue with keyboard navigation in Modal
- Improve TypeScript types for composable return values
```

**Don't:**

```md
- Fixed bug
- Updated component
- Changes
```

**Tips:**

- Start with a verb (Add, Fix, Update, Improve)
- Be specific about what changed
- Think about what users need to know
- Reference issue numbers: `Fix button focus ring (#123)`

### Semantic Versioning Guidelines

**Major (breaking changes):**

- Remove or rename public APIs
- Change function signatures
- Remove props or change prop types
- Behavioral changes that might break existing code

**Minor (new features):**

- Add new components or composables
- Add new props with defaults
- New optional functionality
- Deprecations (with warnings)

**Patch (bug fixes):**

- Fix bugs without changing APIs
- Update documentation
- Performance improvements
- Internal refactoring

### Common Workflows

**Working on multiple features:**

```bash
# Create separate changesets for each feature
pnpm changeset:add  # Feature 1
pnpm changeset:add  # Feature 2

# Both will be included in the next release
```

**Forgot to add changeset:**

```bash
# Before merging PR, add changeset
pnpm changeset:add

# Commit and push
git add .changeset/
git commit -m "docs(changeset): add changeset for feature"
git push
```

**Testing changes locally:**

```bash
# Version packages locally (don't commit)
pnpm changeset version

# Build and test
pnpm build:packages
pnpm test

# Reset to discard version changes
git reset --hard HEAD
```

**Need to make a hotfix:**

```bash
# 1. Create hotfix branch from main
git checkout -b hotfix/critical-bug main

# 2. Fix the bug
# ... make changes ...

# 3. Add changeset (patch)
pnpm changeset:add

# 4. Create PR to main (skipping develop)

# 5. After merge, create a backport PR to develop
```

### Troubleshooting

**"No changesets present" in CI:**

- Add a changeset: `pnpm changeset:add`
- Or add empty changeset: `pnpm changeset:empty`

**Accidentally committed snapshot versions:**

```bash
git reset --hard HEAD~1  # Undo the commit
git clean -fd .changeset/  # Clean up pre.json if exists
```

**Linked packages not versioning together:**

- Check `.changeset/config.json` has all packages in `linked` array
- Ensure package names match exactly

**Can't publish to npm:**

- Verify `NPM_TOKEN` secret is set
- Check package.json has `"publishConfig": {"access": "public"}`
- Ensure you're logged in: `npm whoami`

## Resources

- [Changesets Documentation](https://github.com/changesets/changesets/tree/main/docs)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Quick Reference

| Command                     | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| `pnpm changeset:add`        | Create a new changeset                    |
| `pnpm changeset:empty`      | Create empty changeset (no-op)            |
| `pnpm changeset:status`     | Check current changeset status            |
| `pnpm version-packages`     | Bump versions and update changelogs       |
| `pnpm release`              | Build and publish to npm                  |
| `pnpm release:snapshot`     | Create and publish snapshot version       |
| `pnpm prerelease:next`      | Enter next prerelease mode                |
| `pnpm prerelease:beta`      | Enter beta prerelease mode                |
| `pnpm prerelease:exit`      | Exit prerelease mode                      |
| `changeset pre enter <tag>` | Enter custom prerelease mode              |
| `changeset version`         | Version packages (run by version-packages |
| `changeset publish`         | Publish to npm (run by release)           |

---

For questions or issues with changesets, please refer to the
[main documentation](https://github.com/changesets/changesets) or create an issue in this
repository.
