# Vendorede hero-ikoner — kilde og sha

Kilde: `KlangHaus/public` → `Grundtone logo/Iconic Mark/1x PNG/Icon-<variant>.png` (1281x1281).
Nedskaleret til 720x720 WebP q90 (2x for tile'ns 360 CSS-px) af
`apps/web/scripts/vendor-hero-icons.mjs` — se scriptets header for målingen der valgte formatet (en
naiv PNG-nedskalering blev STØRRE end kilden).

🔴 Vendoring fryser filer. Kør scriptet UDEN `--write` for at verificere at de stadig svarer til
kilden; med `--write` for at opdatere dem og dette manifest. Ret aldrig filerne i hånden.

| variant    | kilde-sha        | vendoret sha     | KB  |
| ---------- | ---------------- | ---------------- | --- |
| BlueGold   | a4baee43b4fbc1e7 | e997f425b496429b | 9   |
| BluePink   | 588c6e2f5b783b14 | 4f1a0f7ae3dd3f3b | 9   |
| BlueWhite  | 586f63f1f2d451b7 | c9f38b636159b340 | 7   |
| BlackWhite | 83c56ba24fb14610 | bec122d2b042be5e | 6   |
| GoldWhite  | f40dfecb07e9f681 | fc1c2a8f0c320884 | 7   |
| PinkGold   | 0a7268d532c4372f | c4f806b37ef18db7 | 7   |
| PinkWhite  | 1eb0ea7e157481d0 | 7a6bf1267c149f5a | 8   |

Samlet: 53 KB for 7 billeder.
