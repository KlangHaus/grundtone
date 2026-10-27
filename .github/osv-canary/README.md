# OSV canary

`package-lock.json.canary` pins `lodash@4.17.15`, which OSV reports as GHSA-p6mc-m468-83gw
(CVE-2020-8203) among others.

It exists so `assert-osv-accepts-still-needed.py` can tell "every accept is stale" apart from "the
scan saw nothing". The workflow copies it to `/tmp/osv-canary/package-lock.json` and scans that
directory in the SAME invocation as the repo. If the canary is not reported, the scanner did not
work (no database, a parse failure, a wrong binary), and the check exits 2 instead of calling every
accept stale.

The `.canary` suffix keeps osv-scanner from treating this file as one of the repo's lockfiles, so
the repo's own scan never reports lodash. Do not rename it to `package-lock.json`.
