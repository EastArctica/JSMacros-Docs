# JsMacros Documentation Monorepo

This repository is the end-to-end toolchain for producing JsMacros documentation: markdown sources live under `packages/core`, LLM automation converts them into JSON, deterministic scripts turn JSON into VitePress pages, and supporting apps help edit data and analyze LLM spend.

## 🏗️ Workspace Layout

```
jsm-docs
├── AGENTS.md
├── apps/
│   ├── docs/             # VitePress site builder (@jsm-docs/docs)
│   ├── editor/           # JSON documentation editor (@jsm-docs/editor)
│   └── cost-visualizer/  # LLM cost dashboard (@jsm-docs/cost-visualizer)
├── packages/
│   └── core/             # Markdown sources + conversion scripts (@jsm-docs/core)
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## 📦 Apps & Packages

- **@jsm-docs/core (`packages/core`)** – Holds raw markdown (`docs/`), generated datasets (`json_docs-*`), and `convert_docs.mjs`, the Gemini-powered converter.
- **@jsm-docs/docs (`apps/docs`)** – Runs `build-docs.mjs` and `generate-sidebar.mjs` before starting VitePress to render the JSON datasets.
- **@jsm-docs/editor (`apps/editor`)** – Next.js app with a Monaco-powered UI for editing the JSON docs via secure API routes.
- **@jsm-docs/cost-visualizer (`apps/cost-visualizer`)** – Vite + React dashboard for exploring the `costs.txt` logs generated during conversion runs.

## ⚙️ Environment Setup

1. Install dependencies once at the repo root:
	```bash
	pnpm install
	```
2. Configure the converter by copying `.env.example` inside `packages/core` and setting:
	- `GOOGLE_API_KEY` – Required for Gemini access.
	- `MODEL_NAME` (optional) – Overrides the default `gemini-2.0-flash-thinking-exp-01-21` model name.

## 🔁 Core Workflows

### Convert Markdown → JSON (`@jsm-docs/core`)

```bash
pnpm --filter @jsm-docs/core run convert -- --threads 4
```

- Reads markdown from `packages/core/docs/**` and writes JSON into `packages/core/json_docs/` (rename the folder to `json_docs-<model>` after each run to archive snapshots).
- Automatically skips files whose JSON already exists so interrupted runs can resume.
- Appends per-file token, duration, and cost metrics to `packages/core/costs.txt` using Gemini usage metadata.

### Build or Preview the Docs Site (`@jsm-docs/docs`)

```bash
pnpm --filter @jsm-docs/docs run dev   # or run build
```

- `build-docs.mjs` converts the canonical dataset (`packages/core/json_docs-gemini-3-pro-preview` by default) into Markdown under `apps/docs/docs`.
- `generate-sidebar.mjs` scans the generated Markdown and emits `.vitepress/sidebar-config.json` for navigation.
- After the prebuild step, VitePress serves or builds the site from the regenerated docs folder.

### Visually Edit JSON Docs (`@jsm-docs/editor`)

```bash
pnpm --filter @jsm-docs/editor run dev
```

- Opens `http://localhost:3000` with a file explorer limited to `packages/core/json_docs-*` directories.
- `/api/content` guards read/write access, formatting saves with 2-space indents.
- Monaco editors load `.d.ts` headers from `apps/editor/example-ecosystem/headers` via `/api/ecosystem` to provide inline IntelliSense while editing examples.

### Inspect Conversion Costs (`@jsm-docs/cost-visualizer`)

```bash
pnpm --filter @jsm-docs/cost-visualizer run dev
```

- Upload `packages/core/costs.txt` or any archived `json_docs-*/costs.txt` to view total spend, per-model deltas, token efficiency, and generation timing charts.

## 🧰 PNPM Workspace Tips

- Add a dependency to a package: `pnpm add <pkg> --filter <workspace>`
- Run a script within a package: `pnpm --filter <workspace> run <script>`
- Use `pnpm -r run <script>` to execute the same script across every workspace when needed.
