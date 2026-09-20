# ShipScore

**Lighthouse for the AI era.**

An open-source agent that audits any repository shipping AI features — scores it **0–100**
across **Design, Ship, Run, Secure, Test** — and posts a category-breakdown review on every
PR. Fix-PR authoring (guardrail middleware, eval harnesses, CI gates) is the v0.1 goal —
see [Status](#status-v0-skeleton).

Built by **Team Dash** for the
[WeAreDevelopers Hackathon](https://lablab.ai/ai-hackathons/wearedevelopers-hackathon)
(online build Sept 18–24, 2026 · on-site showcase Sept 23–25 at WeAreDevelopers World
Congress North America, San José).

## Why

Everyone is shipping AI features. Almost nobody is shipping them safely:

- Prompts are hardcoded in helper files — unreviewed, unversioned, owned by nobody.
- Agents get broad tool and MCP permissions no human ever reviewed.
- LLM code paths ship with **zero evals** — "tested" means a human shrugged at a demo.
- Prompt-injection surfaces never face an adversarial test before production traffic does.

The congress program says it out loud: the industry is still learning to *design, ship, run,
secure, and test* software in the AI era. **Those five verbs are the score.**

## The five categories

| Category | What it checks |
|---|---|
| 🧭 **Design** | Prompts, tools, and agent roles versioned, documented, and owned — model names not hardcoded |
| 🚀 **Ship** | AI changes ride the same pipeline as plain code — reviewed prompt diffs, gated model upgrades |
| 📈 **Run** | Production behavior observable — token budgets, retry/fallback paths, cost telemetry |
| 🛡️ **Secure** | Every tool call and external string hostile until proven safe — injection surfaces, least-privilege |
| 🧪 **Test** | Evals in CI, not vibes — golden sets, adversarial cases, regression gates |

All five categories are scored by the v0 scanner's filename/content heuristics (`action/main.mjs`); AST-based analysis (ts-morph) replaces them in v0.1 — see [Status](#status-v0-skeleton).

## Usage — one block of YAML

```yaml
name: ShipScore
on: [pull_request, push]

jobs:
  score:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4

      - uses: team-dash/shipscore@v0
        with:
          threshold: 60   # block merge below this score
          categories: design,ship,run,secure,test
          fix-prs: true   # accepted for forward compat; PR authoring ships in v0.1 (action/main.mjs)
```

ShipScore scans AI touchpoints with filename/content heuristics (`action/main.mjs`) and
posts the category-breakdown score as a PR comment; severity labels and fix-PR authoring
land in v0.1.
This repo **dogfoods itself**: the [`shipscore-dogfood`](.github/workflows/shipscore-dogfood.yml)
workflow runs the action on every push.

## Status: v0 skeleton

What works **today** (this commit):

- ✅ GitHub Action skeleton that scans the repo, detects AI touchpoints by
  filename/content heuristics, and posts a category-breakdown summary to every PR
- ✅ `shipscore-report.json` output contract (stable for the dashboard)
- ✅ Landing page (this repo's site) with the five-category scoring model

What lands during the online build phase (Sept 18–24):

- 🔜 AST-based touchpoint map (ts-morph) replacing filename heuristics
- 🔜 40+ scoring heuristics + LLM review pass
- 🔜 Fix-PR authoring agent (guardrail middleware, eval harnesses, CI gates)
- 🔜 Dashboard with per-repo score history

## The two-minute stage demo

1. **0:00** — paste a real open-source AI repo on stage
2. **0:15** — scanner maps prompts, tool permissions, eval gaps — live
3. **1:00** — score reveals with five-category breakdown
4. **1:20** — the agent opens a real fix PR on GitHub
5. **1:45** — audience repos submitted via QR join the live scoreboard

Wifi-proof: three pre-scanned fallback repos are cached locally in case venue wifi dies.

## Stack

TypeScript end to end · Next.js 16 (this landing page) · ts-morph AST analysis ·
LLM tool calling (GLM / OpenAI-compatible) · GitHub API + Actions · Docker · Vercel

## Repository layout

```
├── src/            # Next.js 16 landing page (App Router + Tailwind 4)
├── action/         # ShipScore action runtime (skeleton scanner)
├── action.yml      # GitHub Action definition (inputs: threshold, categories, fix-prs)
└── .github/
    └── workflows/  # dogfood workflow — ShipScore scans ShipScore
```

## Run locally

```bash
bun install        # or npm install
bun run dev        # http://localhost:3000

# run the skeleton scanner against any repo
node action/main.mjs
```

## Deploy

See [DEPLOY.md](DEPLOY.md) for GitHub push + Vercel deployment in under 5 minutes.

## License

MIT — open source from commit one.
