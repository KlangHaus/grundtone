# Deployment Configuration

This document describes the deployment setup for Grundtone.

## Vercel Deployment

The project uses Vercel for hosting the documentation site (VitePress). Deployments are automated
through GitHub Actions.

### Required GitHub Secrets

To enable Vercel deployments in GitHub Actions, you need to configure the following secrets in your
repository settings:

#### `VERCEL_TOKEN`

- **Description**: Vercel authentication token
- **How to get**:
  1. Go to https://vercel.com/account/tokens
  2. Create a new token with appropriate scope
  3. Copy the token

#### `VERCEL_ORG_ID`

- **Description**: Your Vercel organization/team ID
- **How to get**:
  1. Install Vercel CLI: `npm i -g vercel`
  2. Run `vercel link` in the project root
  3. Find the org ID in `.vercel/project.json` under `"orgId"`

#### `VERCEL_PROJECT_ID`

- **Description**: Your Vercel project ID
- **How to get**:
  1. Run `vercel link` in the project root (if not already done)
  2. Find the project ID in `.vercel/project.json` under `"projectId"`

### Setting Secrets in GitHub

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the name and value from above

### Deployment Workflows

#### Preview Deployments (Pull Requests)

- **Workflow**: `.github/workflows/ci.yml`
- **Trigger**: When a pull request is opened or updated
- **Action**: Deploys to Vercel preview environment
- **Result**: Adds a comment to the PR with the preview URL

#### Production Deployments (Main Branch)

- **Workflow**: `.github/workflows/release.yml`
- **Trigger**: When code is pushed to `main` branch
- **Action**: Deploys to Vercel production
- **Result**: Updates the live documentation site

### Manual Deployment

You can also deploy manually using Vercel CLI:

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

## NPM Publishing

NPM releases are automated through Changesets:

### Required GitHub Secrets

#### `NPM_TOKEN`

- **Description**: NPM authentication token for publishing packages
- **How to get**:
  1. Log in to https://www.npmjs.com/
  2. Go to **Account** → **Access Tokens**
  3. Generate a new token with **Automation** type
  4. Copy the token

### Release Workflow

1. Create changes and commit them
2. Run `pnpm changeset` to create a changeset file
3. Commit the changeset file
4. Push to `main` branch
5. GitHub Actions creates a "Version Packages" PR
6. Review and merge the PR
7. Packages are automatically published to NPM

## Vercel Configuration

The Vercel deployment is configured in `vercel.json`:

```json
{
  "buildCommand": "pnpm docs:build",
  "outputDirectory": "docs/.vitepress/dist",
  "framework": null,
  "installCommand": "pnpm install",
  "devCommand": "pnpm docs:dev",
  "ignoreCommand": "git diff HEAD^ HEAD --quiet . docs/ packages/"
}
```

### Ignore Command

The `ignoreCommand` ensures Vercel only deploys when there are changes to:

- Documentation (`docs/`)
- Packages (`packages/`)
- Root configuration files

This prevents unnecessary deployments for unrelated changes.
