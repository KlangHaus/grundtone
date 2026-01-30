# Deployment Guide

This guide covers how to deploy and publish the Haspen UI Design System across different
environments and platforms.

## 📦 Package Publishing

### NPM Publishing Workflow

Haspen UI uses automated publishing via GitHub Actions and Changesets. Here's how it works:

#### Automated Release Process

1. **Create a changeset** when making changes:

```bash
# Make your code changes
git add .

# Create a changeset (interactive prompt)
pnpm changeset
# or
pnpm changeset:add
```

The changeset prompt will ask you to:

- Select which packages have changed
- Choose version bump type (major/minor/patch)
- Write a summary of the changes (becomes the changelog entry)

2. **Commit the changeset**:

```bash
git commit -m "feat(ui): add new Button component variant"
git push origin main
```

3. **Changesets analyzes version bumps**:

   - `patch` → Patch version (0.1.0 → 0.1.1) - Bug fixes
   - `minor` → Minor version (0.1.0 → 0.2.0) - New features
   - `major` → Major version (0.1.0 → 1.0.0) - Breaking changes

4. **GitHub Actions workflow** (`.github/workflows/release.yml`) automatically:

   - Detects changesets on push to `main` branch
   - Creates/updates a "Version Packages" PR
   - Generates CHANGELOGs with GitHub integration:
     - Links to commits and pull requests
     - Credits to all contributors
     - Full git history integration
   - Consumes changesets and updates versions

5. **Review the Version Packages PR** to verify:

   - Version bumps are correct
   - Changelogs include all changes
   - No unintended packages are being published

6. **Merge the Version Packages PR** to trigger:
   - Automated build of all packages
   - Publishing to NPM registry
   - Git tags for each released version

#### Manual Release Process

If you need to publish manually (emergency use only):

```bash
# 1. Ensure everything is built and tested
pnpm build:packages
pnpm test
pnpm typecheck
pnpm lint

# 2. Create a changeset for your changes
pnpm changeset

# 3. Check what will be published
pnpm changeset:status

# 4. Update versions (consumes all changesets and updates lockfile)
pnpm version-packages

# 5. Commit the version changes
git add .
git commit -m "chore(release): version packages"

# 6. Publish to npm (requires NPM_TOKEN)
pnpm release

# 7. Push changes and tags
git push --follow-tags
```

#### Checking Release Status

Before publishing, verify what changes will be released:

```bash
# See detailed status of pending changesets
pnpm changeset:status

# Output shows:
# - Which packages will be published
# - What version bumps will occur
# - Which changesets are pending
```

#### Snapshot Releases

For testing pre-release versions without affecting published versions:

```bash
# Create and publish snapshot versions
pnpm release:snapshot

# Generates versions like: 0.0.0-snapshot-20231231120000
# Published with @snapshot tag on NPM
# Useful for testing in other projects before official release
```

Install snapshot versions in consuming projects:

```bash
npm install @haspen/ui@snapshot
```

### Package Configuration

Each package is configured for optimal distribution:

```json
{
  "name": "@haspen/ui",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.umd.cjs",
  "module": "./dist/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.umd.cjs"
    },
    "./dist/style.css": "./dist/index.css"
  },
  "files": ["dist"],
  "sideEffects": false,
  "publishConfig": {
    "access": "public"
  }
}
```

**Key points**:

- **Dual format**: ESM and CommonJS for maximum compatibility
- **Type declarations**: Generated TypeScript definitions
- **Tree-shaking**: `sideEffects: false` enables optimization
- **CSS exports**: Separate CSS imports available

## 📚 Storybook Deployment

### Static Site Generation

Build Storybook for deployment to static hosting:

```bash
# Build static Storybook site
pnpm build-storybook

# Output directory: ./storybook-static/
# Contains: index.html, assets/, and all stories
```

### Deployment Platforms

#### Netlify

1. **Connect repository** to Netlify
2. **Configure build settings**:

   - Build command: `pnpm build-storybook`
   - Publish directory: `storybook-static`
   - Node version: `20`

3. **Environment variables**:

```
NODE_VERSION=20
NPM_VERSION=latest
```

4. **netlify.toml** configuration:

```toml
[build]
  command = "pnpm build-storybook"
  publish = "storybook-static"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--prefix=/opt/buildhome/.pnpm"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Vercel

1. **Import project** in Vercel dashboard
2. **Configure settings**:

   - Framework Preset: Other
   - Build Command: `pnpm build-storybook`
   - Output Directory: `storybook-static`
   - Install Command: `pnpm install`

3. **vercel.json** configuration:

```json
{
  "buildCommand": "pnpm build-storybook",
  "outputDirectory": "storybook-static",
  "installCommand": "pnpm install",
  "framework": null,
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

#### GitHub Pages

1. **GitHub Actions workflow** (`.github/workflows/storybook.yml`):

```yaml
name: Deploy Storybook
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: corepack enable
      - run: pnpm install
      - run: pnpm build
      - run: pnpm build-storybook
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

2. **Enable GitHub Pages** in repository settings
3. **Configure source** to use GitHub Actions

### Custom Domain Setup

For custom domains, add a `CNAME` file to the storybook static output:

```bash
# .storybook/public/CNAME
design-system.yourcompany.com
```

Or configure in your hosting platform's settings.

## 🏗️ Application Integration

### Vue 3 Applications

#### Installation

```bash
npm install @haspen/ui @haspen/design-tokens
# or
pnpm add @haspen/ui @haspen/design-tokens
```

#### Global Setup

```typescript
// main.ts
import { createApp } from 'vue';
import HaspenUI from '@haspen/ui';
import '@haspen/ui/dist/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(HaspenUI);
app.mount('#app');
```

#### Component-level Usage

```vue
<script setup lang="ts">
  import { Button } from '@haspen/ui';
</script>

<template>
  <Button variant="primary" size="lg"> Click me </Button>
</template>

<style lang="scss">
  @use '@haspen/design-tokens' as tokens;

  .custom-component {
    color: tokens.color('primary');
    padding: tokens.units(2);
  }
</style>
```

### Nuxt 3 Applications

#### Module Installation

```bash
npm install @haspen/nuxt
```

#### Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@haspen/nuxt'],

  // Optional: Configure module options
  haspenUI: {
    // Auto-import components (default: true)
    components: true,

    // Auto-import composables (default: true)
    composables: true,

    // Include CSS (default: true)
    css: true,

    // Prefix for auto-imported components (default: 'Haspen')
    prefix: 'Haspen',
  },
});
```

#### Usage in Nuxt

```vue
<script setup lang="ts">
  // Composables are auto-imported
  const { isOpen, toggle } = useToggle();
</script>

<template>
  <!-- Components are auto-imported with prefix -->
  <HaspenButton @click="toggle">
    {{ isOpen ? 'Close' : 'Open' }}
  </HaspenButton>

  <HaspenModal :show="isOpen">
    <p>Modal content</p>
  </HaspenModal>
</template>
```

### Server-Side Rendering (SSR)

The design system is fully compatible with SSR:

#### Vue SSR

```typescript
// entry-server.js
import { createSSRApp } from 'vue';
import HaspenUI from '@haspen/ui';
import App from './App.vue';

export function createApp() {
  const app = createSSRApp(App);
  app.use(HaspenUI);
  return { app };
}
```

#### Nuxt 3 (Built-in SSR)

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@haspen/nuxt'],
  ssr: true, // Default in Nuxt 3
});
```

### Build Integration

#### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@haspen/design-tokens' as tokens;`,
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
```

#### Webpack Configuration

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      '@haspen': path.resolve(__dirname, 'node_modules/@haspen'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@use '@haspen/design-tokens' as tokens;`,
            },
          },
        ],
      },
    ],
  },
};
```

## 🐳 Docker Deployment

### Dockerfile Example

```dockerfile
# Build stage
FROM node:20-alpine AS builder

# Enable pnpm
RUN corepack enable

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY packages/ ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build packages
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built Storybook
COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name _;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  haspen-ui-docs:
    build: .
    ports:
      - '3000:80'
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow

Complete CI/CD pipeline example:

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '10.14.0'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        run: corepack enable

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run linting
        run: pnpm lint

      - name: Run type checking
        run: pnpm typecheck

      - name: Run tests
        run: pnpm test

      - name: Build packages
        run: pnpm build

  release:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          registry-url: 'https://registry.npmjs.org'

      - name: Setup pnpm
        run: corepack enable

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build packages
        run: pnpm build

      - name: Release
        run: pnpm release
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  deploy-storybook:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        run: corepack enable

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build packages
        run: pnpm build

      - name: Build Storybook
        run: pnpm build-storybook

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

## 🔐 Security Considerations

### NPM Token Management

1. **Generate NPM token** with publish permissions
2. **Add to GitHub Secrets** as `NPM_TOKEN`
3. **Use automation tokens** for CI/CD (not user tokens)
4. **Rotate tokens** regularly
5. **Restrict token scope** to specific packages

### Package Security

```json
{
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/haspen-ui.git"
  }
}
```

### Content Security Policy

For Storybook deployments, configure CSP headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;
```

## 📊 Monitoring and Analytics

### Bundle Analysis

Monitor bundle sizes and performance:

```bash
# Install bundle analyzer
pnpm add -D vite-bundle-analyzer

# Analyze bundles
pnpm build
npx vite-bundle-analyzer packages/ui/dist
```

### Performance Monitoring

Track key metrics:

- **Bundle size**: Keep under reasonable limits
- **Load time**: Monitor initial page load
- **Tree-shaking**: Verify unused code elimination
- **Cache hit rates**: Optimize for CDN caching

### Usage Analytics

For Storybook sites, consider adding analytics:

```html
<!-- .storybook/preview-head.html -->
<!-- Google Analytics, Plausible, or other analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🏆 Best Practices

### Release Strategy

1. **Feature branches** → **develop** → **main**
2. **Semantic versioning** with conventional commits
3. **Automated testing** before releases
4. **Staged rollouts** for major changes
5. **Rollback plans** for critical issues

### Documentation Deployment

1. **Version documentation** with code releases
2. **Migration guides** for breaking changes
3. **Changelog maintenance** with auto-generation
4. **API documentation** synchronized with code

### Performance Optimization

1. **Tree-shaking** enabled in all packages
2. **Code splitting** for large components
3. **CSS optimization** with critical path extraction
4. **CDN deployment** for static assets
5. **Compression** (gzip/brotli) enabled

---

This deployment guide ensures your Haspen UI design system reaches developers efficiently and
reliably across all platforms and environments. 🚀
