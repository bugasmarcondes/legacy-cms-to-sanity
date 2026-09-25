# PLAN — Phase 1: Schemas

**Status:** Build
**Next step:** Start Step 1

## Context

- Stack: Next.js 16.3.6, React 19.2.8, TS 5, Tailwind 4. No Sanity packages installed yet.
- Phase goal: Legacy fixture (300–1,000 seeded articles of messy HTML: images, internal links, tables, video embeds, broken cases), Sanity project, schemas (article, author, category, references, validation), Studio configuration.
- Starting point: pnpm workspace with `apps/web` (Next.js App Router, no pages yet) and empty `packages/`. No Studio, no fixture, no schemas.

## Gate — answer before coding

- [x] Q1 Done: (1) Sanity hands-on modules done (separate repo), (2) legacy fixture seed dataset ≥300 rows covering hard cases, (3) Studio lets an editor create/edit an article without touching JSON.
- [x] Q2 Model: Article — `publishedDate, lastUpdateDate, slug, title, subtitle, body, author (ref → author doc), tags (refs, many-to-many), relatedArticles (refs, manually curated)`. Author is its own document (bio, photo) for reuse. No reactions/comments in Sanity (user-generated, not editorial).
- [x] Q3 Edge cases: (1) broken internal links in legacy body HTML, (2) empty/missing title, (3) empty body.
- [x] Q4 Split: [learn] = schema fields/types/validation, Studio structure/preview config (interview core). [delegate] = Studio scaffolding, legacy fixture generator script (repetitive, already understood).
- [x] Q5 Verification: GROQ query counting docs with missing/broken references (author, tags, relatedArticles) and nulls, run across all seeded docs, not spot-checked.

## Steps

1. [ ] [delegate] Seed legacy fixture: JSON or SQLite, ≥300 rows, fields `id, title, bodyHtml, author, category/tags, publishedAt`; hard cases represented (broken img, dead internal link, nested table, video embed, empty title, empty body) — done when: row count ≥300 and a count-per-hard-case check confirms each case appears multiple times, not once.
2. [ ] [delegate] Install/scaffold Sanity Studio in the workspace — done when: Studio runs locally and connects to the project/dataset.
3. [ ] [learn] Design `article`, `author`, `tag` schemas with validation (required title/slug, slug uniqueness, reference fields) — done when: schemas deploy and Studio shows correctly typed fields for each.
4. [ ] [learn] Studio structure + preview config for `article`/`author` — done when: document list shows meaningful previews (title, author name), not just `Untitled`.
5. [ ] [learn] Write the GROQ orphan/broken-reference verification query — done when: it runs against the dataset and returns zero false negatives on a seeded bad doc.

## Decisions

- Legacy fixture is a seed dataset (JSON/SQLite), not files or a live Umbraco instance — mirrors a realistic export shape (Umbraco Content Delivery API / DB export), consumed by Phase 3's ETL, not written into Sanity directly.
- Author is a reference, not embedded — bio/photo reused across articles; editing one document updates everywhere instead of N.
- Tags over categories — many-to-many, lighter-weight than a hierarchical taxonomy.
- Single `author` field, no coauthors array — scoped out to keep schema simple for a study project.
- Reactions/comments excluded from Sanity schema — user-generated, high-write, no editorial value; belongs in app DB or a separate service, not the CMS.

## Agent log

-

## Review (after checks pass)

- [ ] Edge cases not covered:
- [ ] Accessibility
- [ ] 60-second explanation (English)
- [ ] Interview question this phase answers:
- [ ] At 10k documents:

## Parking lot

-
