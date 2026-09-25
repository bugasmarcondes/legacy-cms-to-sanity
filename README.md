# legacy-cms-to-sanity

A ramp project to learn Sanity and content migrations from scratch, built in days on top of my Next.js and TypeScript experience. Not production work.

It simulates a legacy CMS → Sanity migration with a Next.js App Router front end: messy HTML source, content model, re-runnable migration, and verification across every document.

## Project layout

pnpm workspace. Run commands from the repo root.

| Path | What it is | Run |
|---|---|---|
| `apps/web` | Next.js App Router front end | `pnpm --filter web dev` (localhost:3000) |
| `apps/studio` | Sanity Studio (content editing UI) | `pnpm --filter studio dev` (localhost:3333) |
| `packages/legacy-fixture` | Generates the simulated legacy CMS export | `node packages/legacy-fixture/generate.js` |

## Worth a look

- `plans/` — per-phase design decisions made before coding, and an agent log of where Claude Code got it wrong and how it was caught.
- `git log --grep "Co-authored-by: Claude"` — commits delegated to the agent. Content modeling, transform rules and verification design are mine.

## Progress

- [ ] Legacy fixture, Sanity project, schemas
- [ ] Next.js front end
- [ ] Migration pipeline
- [ ] Verification at volume
- [ ] Write-up

Plan: [`docs/study-plan.md`](docs/study-plan.md) · Setup: [`docs/bootstrap.md`](docs/bootstrap.md)
