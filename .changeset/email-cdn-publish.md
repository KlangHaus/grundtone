---
'@grundtone/email': patch
---

Add the CDN publish step (`publish:cdn`, wired into `release.yml`): uploads the `compile:templates`
output tree to Bunny Edge Storage so notifications' `CDNRenderer` can fetch published templates via
`TEMPLATE_CDN_BASE_URL`. Skips cleanly until the Bunny zone secrets (`BUNNY_EMAIL_STORAGE_ZONE` /
`BUNNY_EMAIL_STORAGE_API_KEY`) are provisioned. Upload failures are captured to Sentry
(`SENTRY_DSN`, also optional) with tracing spans around each PUT; refuses to flip the "current"
manifest pointer if zero artifacts were found for the version being published. No change to the
package's public API or compiled artifact shape.
