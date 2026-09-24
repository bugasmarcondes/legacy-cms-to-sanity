# Study plan

Five phases, one per day. Each phase has its own execution plan in `plans/` and closes only when its "done when" checks pass.

## Day 0 — Videos

Watch only; redo hands-on on Day 1.

1. [Content-driven web application foundations](https://www.sanity.io/learn/course/content-driven-web-application-foundations/building-a-content-editable-website) — 13 videos, ~18 min
2. [Between GROQ and a hard place](https://www.sanity.io/learn/course/between-groq-and-a-hard-place/your-new-favourite-query-language) — 9 videos, ~14 min
3. [Studio excellence](https://www.sanity.io/learn/course/studio-excellence/excellent-editorial-experiences) — 10 videos, ~14 min
4. [Handling schema changes confidently](https://www.sanity.io/learn/course/handling-schema-changes-confidently/introduction-to-schema-change-management) — 9 videos, ~5 min
5. Optional: [Day one content operations](https://www.sanity.io/learn/course/day-one-with-sanity-studio/prerequisites) — 14 videos, ~43 min

## Day 1 — Legacy fixture, Sanity project, schemas

- **Reading:** redo *Content-driven web application foundations* hands-on, up to "Fetch Sanity Content".
- **Deliverables:** seeded legacy CMS fixture (300–1,000 articles of messy HTML: images, internal links, tables, video embeds, broken cases); Sanity project; `article`, `author` and `category` schemas with references and validation; Studio configuration.
- **Done when:** Studio shows the three types, validations fire, and the fixture regenerates identical data from a seed.
- **Split:** delegate the fixture generator; content modeling is yours.

## Day 2 — Next.js front end

- **Reading:** [Controlling cached content in Next.js](https://www.sanity.io/learn/course/controlling-cached-content-in-next-js/introduction), [Typed content with Sanity TypeGen](https://www.sanity.io/learn/course/typescripted-content/introduction).
- **Deliverables:** App Router list and detail pages; typed GROQ via TypeGen; Portable Text components for image, table and internal link; on-demand revalidation via webhook and `revalidateTag`; landmarks, heading hierarchy, alt text from content.
- **Done when:** editing an article in Studio updates only the affected pages, without a rebuild.

## Day 3 — Migration pipeline

- **Reading:** [Migrating content from WordPress to Sanity](https://www.sanity.io/learn/course/migrating-content-from-wordpress-to-sanity/introduction-to-wp-migration), [Refactoring content for migration](https://www.sanity.io/learn/course/refactoring-content/introduction-to-content-migrations).
- **Deliverables:** re-runnable ETL with deterministic ids and dry-run mode; HTML → Portable Text with rules for images, tables, links and embeds; asset upload with dedupe; redirect map.
- **Done when:** two consecutive runs create no duplicates, and dry-run lists exactly what would be written.
- **Split:** transform rules for the hard cases are yours.

## Day 4 — Verification at volume

- **Reading:** [Re-platforming to Sanity](https://www.sanity.io/learn/course/re-platforming-to-sanity/introduction-to-re-platforming).
- **Deliverables:** automated report (source vs target counts, orphan references, broken links, fallback blocks, text diff sampling); Playwright suite over every route and redirect, with axe.
- **Done when:** a defect planted in the fixture shows up in the report.
- **Split:** verification design is yours.

## Day 5 — README and narrative

- **Reading:** skim [AI-powered Sanity development](https://www.sanity.io/learn/course/code-with-ai/the-present-future-of-sanity-development).
- **Deliverables:** README covering decisions, what was delegated to the agent and why, where the agent failed and how verification caught it; `plans/STORIES.md` reviewed.
- **Done when:** the project can be explained in English in 60 seconds without notes.
