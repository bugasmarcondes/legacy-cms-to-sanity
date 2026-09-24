# Bootstrap

How this repository was set up, in order. Run every command from the repository root unless noted.

## Prerequisites

- Node.js 24 LTS (Next.js 16 requires ≥ 20.9). Corepack ships with Node up to v24; from v25 it must be installed with `npm install -g corepack`.
- Accounts: Sanity (free plan), Vercel (linked to GitHub).
- The GitHub repository created and cloned locally.

## 1. pnpm via Corepack

```bash
corepack enable pnpm
pnpm -v
```

Outside a project that pins a version, Corepack falls back to an old default (it downloaded pnpm 8.15.5 here). Step 2 pins the current version for this repo.

## 2. Workspace root

```bash
pnpm init
corepack use pnpm@latest              # writes "packageManager" (pnpm 12.6.0 at setup time)
npm pkg set private=true --json       # never publishable
```

```bash
cat > pnpm-workspace.yaml <<'EOF'
packages:
  - "apps/*"
  - "packages/*"
EOF
```

Check: `pnpm -v` and `grep packageManager package.json` report the same version.

## 3. Next.js app in `apps/web`

`create-next-app` fails with a misleading "application path is not writable" error when the parent folder doesn't exist, so create it first:

```bash
mkdir -p apps
npx create-next-app@latest apps/web --tailwind --ts --app --src-dir --eslint --import-alias "@/*" --turbopack --use-pnpm
```

Defaults accepted for unprovided options: no React Compiler, `AGENTS.md` generated (plus an `apps/web/CLAUDE.md` that imports it).

`create-next-app` scaffolds the app as a standalone project, with its own lockfile, workspace file and `node_modules`. In a monorepo these must exist only at the root:

```bash
cat apps/web/pnpm-workspace.yaml                      # build-dependency settings only, no "packages:" key
cat apps/web/pnpm-workspace.yaml >> pnpm-workspace.yaml   # merge those settings into the root file
rm apps/web/pnpm-lock.yaml apps/web/pnpm-workspace.yaml
rm -rf apps/web/node_modules
pnpm install
```

Check: `pnpm-lock.yaml` exists only at the root; `apps/web` has no `pnpm-*` files.

Root dev script, then verify at http://localhost:3000:

```bash
npm pkg set scripts.dev="pnpm --filter web dev"
pnpm dev
```

## 4. Claude Code mentor setup

```bash
cp ~/Downloads/CLAUDE.md .
mkdir -p .claude/agents
cp ~/Downloads/sanity-docs.md .claude/agents/

mkdir -p plans
echo "# STORIES" > plans/STORIES.md

mkdir -p packages
touch packages/.gitkeep

mkdir -p docs/sanity
curl -L https://www.sanity.io/learn/llms-full.txt -o docs/sanity/llms-full.txt
ls -lh docs/sanity/                   # confirm a full download, not a few bytes
```

- `CLAUDE.md`: mentor instructions (output budget, phase plans, Gate → Build → Review stages, `[learn]` / `[delegate]` split, docs-first lookups).
- `.claude/agents/sanity-docs.md`: subagent for broad Sanity documentation questions, so lookups don't fill the main session's context.
- `plans/`: one plan per project phase (created by the mentor) and `STORIES.md` for interview material.
- `docs/sanity/llms-full.txt`: local copy of the Sanity Learn content, grepped by section, never read whole. Not versioned.

## 5. `.gitignore` (root)

```gitignore
# dependencies
node_modules

# local copy of third-party docs (not versioned)
docs/sanity/

# secrets
.env
.env.*
```

Only `docs/sanity/` is ignored, so project documentation in `docs/` is versioned.

## 6. Block `.env` reads in Claude Code

```bash
cat > .claude/settings.json <<'EOF'
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./**/.env)",
      "Read(./**/.env.*)"
    ]
  }
}
EOF
```

Check: run `/permissions` inside Claude Code and confirm the deny rules are listed. Sanity write tokens used by the migration must never enter the agent's context.

## 7. README and first session

```bash
printf "# legacy-cms-to-sanity\n\nRamp project — in progress.\n" > README.md
git status        # docs/sanity/, node_modules/ and .env* must not appear
claude            # always from the repo root, never from apps/web
```

Typing `start` makes the mentor create `plans/phase-1-schemas.md` from the template and open the Gate with Q1.

## Resulting layout

```
legacy-cms-to-sanity/
├── apps/
│   └── web/                 Next.js 16 App Router (AGENTS.md, CLAUDE.md)
├── packages/                shared code (empty)
├── plans/                   phase plans + STORIES.md
├── docs/
│   ├── bootstrap.md         this file
│   └── sanity/              local Sanity docs copy (ignored)
├── .claude/
│   ├── agents/sanity-docs.md
│   └── settings.json
├── CLAUDE.md
├── package.json
├── pnpm-workspace.yaml
└── pnpm-lock.yaml
```

## Later: Vercel

When deploying, import the repository and set **Root Directory** to `apps/web`.
