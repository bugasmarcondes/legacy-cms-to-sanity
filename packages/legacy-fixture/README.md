# legacy-fixture

Simulates an export from the legacy CMS (Umbraco-shaped): a JSON array of
messy article records, generated deterministically so it can be regenerated
on demand during Phase 1–2. Consumed by Phase 3's ETL script, which reads
`fixture.json`, transforms `bodyHtml` into Portable Text, and imports into
Sanity.

## Usage

```bash
node generate.js          # writes fixture.json with 300 articles
node generate.js 500      # writes fixture.json with 500 articles
```

Each article has: `id, title, bodyHtml, author, tags, publishedAt`.

## When to regenerate

Regenerate freely while iterating on schemas or Studio config (Phase 1–2) —
the fixture has no relationship to anything in Sanity yet.

Do **not** regenerate after Phase 3's ETL has run against a given
`fixture.json`: article `id`s are used to derive deterministic Sanity
document `_id`s, so regenerating reshuffles which `id` maps to which content
and breaks idempotency (a re-run would create duplicates instead of
updating existing documents).

## Hard cases covered

Distributed across the set (not on every article) so each appears multiple
times:

| Case | Every Nth article | Expected count (300 articles) |
|---|---|---|
| Broken internal link (`<a href>` to a nonexistent legacy path) | 7 | ~42 |
| Nested `<table>` | 11 | ~27 |
| Video embed (`<iframe>`) | 13 | ~23 |
| Broken/missing image (`<img src="">`) | 9 | ~33 |
| Empty/missing `title` | 23 | ~13 |
| Empty/missing `bodyHtml` | 29 | ~10 |
| Missing `author` (`null`) | 31 | ~9 |
| Missing `publishedAt` (`null`) | 37 | ~8 |

## Verifying coverage (jq)

Run from this directory after generating:

```bash
# total row count
jq 'length' fixture.json

# broken internal link
jq '[.[] | select(.bodyHtml | test("/articles/legacy-\\d+"))] | length' fixture.json

# nested table
jq '[.[] | select(.bodyHtml | contains("<table"))] | length' fixture.json

# video embed
jq '[.[] | select(.bodyHtml | contains("<iframe"))] | length' fixture.json

# broken/missing image
jq '[.[] | select(.bodyHtml | contains("src=\"\""))] | length' fixture.json

# empty/missing title
jq '[.[] | select(.title == "")] | length' fixture.json

# empty/missing bodyHtml
jq '[.[] | select(.bodyHtml == "")] | length' fixture.json

# missing author
jq '[.[] | select(.author == null)] | length' fixture.json

# missing publishedAt
jq '[.[] | select(.publishedAt == null)] | length' fixture.json
```

Each hard-case count should be greater than 1 (proves the case repeats, not
a single lucky/unlucky row) and total length should be ≥300. Pair with a
manual glance at a sample in an editor to sanity-check the HTML actually
looks like the case it's meant to represent.
