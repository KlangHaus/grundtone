---
'@grundtone/email': patch
---

Add the CDN publish step (`publish:cdn`, wired into `release.yml`): uploads the `compile:templates`
output tree to Bunny Edge Storage so notifications' `CDNRenderer` can fetch published templates via
`TEMPLATE_CDN_BASE_URL`. Skips cleanly until the Bunny zone secrets (`BUNNY_EMAIL_STORAGE_ZONE` /
`BUNNY_EMAIL_STORAGE_API_KEY`) are provisioned. No change to the package's public API or compiled
artifact shape.
