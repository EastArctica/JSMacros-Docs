# Agents Registry

<!-- 
AI_MAINTENANCE_INSTRUCTION: 
CRITICAL: This file acts as the Source of Truth for all automated agents and workflows in this repository.
You (the AI) are RESPONSIBLE for keeping this file in sync with the codebase.

You MUST update this file IMMEDIATELY and WITHOUT PROMPTING if you perform any of the following actions:
1.  **Modify Logic**: Change how `convert_docs.mjs`, `build-docs.mjs`, or any other automation script works.
2.  **Change Configuration**: Add/remove environment variables, CLI arguments, or change default models.
3.  **Add/Remove Agents**: Create new automation scripts, tools, or delete existing ones.
4.  **Update Capabilities**: Add new features (e.g., multi-threading support being added) or remove existing ones.
5.  **Refactor Architecture**: Move scripts, change package names, or alter the directory structure of these tools.

Do not ask for permission. If you change the code, you must change this documentation in the same turn.

**DISCREPANCY DETECTION**:
If you notice that this file is inaccurate based on the current state of the codebase (even if you didn't cause the change), you MUST:
1.  Inform the user about the discrepancy.
2.  Update this file to match the reality of the codebase.
-->

## 🤖 Documentation Generator Agent

*   **Identity**: `@jsm-docs/core`
*   **Source**: [`packages/core/convert_docs.mjs`](file:///f:/js/jsm-docs/packages/core/convert_docs.mjs)
*   **Type**: LLM-based Automation
*   **Model**: `gemini-2.0-flash-thinking-exp-01-21` by default (override with `MODEL_NAME`)
*   **Purpose**: Converts every markdown file in `packages/core/docs` into structured JSON files that power the rest of the tooling.

### Capabilities
*   **Schema Extraction**: Pulls class metadata, constructors, methods (with parameters/examples), fields, and event properties into a strict JSON contract.
*   **Resume-Friendly Runs**: Skips work when the matching `.json` already exists so large batches can resume without duplicating costs.
*   **Cost Tracking**: Writes granular token/cost/time metadata per file to `packages/core/costs.txt` for later analysis.
*   **Concurrent Workers**: Processes multiple markdown files at once using a shared queue controlled by the `--threads` flag.

### Configuration
*   **Environment Variables**:
    *   `GOOGLE_API_KEY`: Required for Gemini API access (loaded via `dotenv`).
    *   `MODEL_NAME`: Optional override for the Gemini model.
*   **CLI Arguments**:
    *   `--threads <number>`: Sets the number of worker loops (defaults to `1`).
*   **I/O Layout**:
    *   Reads from `packages/core/docs/**.md`.
    *   Writes JSON to `packages/core/json_docs/` (run directories are later copied/renamed to `json_docs-<model>/` for archival).
    *   Appends aggregate pricing data to `packages/core/costs.txt`.

---

## 🏗️ Site Builder Agent

*   **Identity**: `site-builder`
*   **Sources**: [`apps/docs/build-docs.mjs`](file:///f:/js/core/apps/docs/build-docs.mjs) and [`apps/docs/generate-sidebar.mjs`](file:///f:/js/core/apps/docs/generate-sidebar.mjs)
*   **Type**: Deterministic Scripts
*   **Purpose**: Converts the generated JSON docs into Markdown that VitePress can render, then produces a sidebar tree for navigation.

### Capabilities
*   **Markdown Generation**: Builds metadata blocks, constructor/method tables, parameter tables, and example code fences for each JSON file.
*   **Dataset Targeting**: Currently reads from `packages/core/json_docs-gemini-3-pro-preview` (update `JSON_DOCS_DIR` when a new snapshot becomes canonical).
*   **Navigation Output**: `generate-sidebar.mjs` scans the freshly-written Markdown in `apps/docs/docs` and emits `.vitepress/sidebar-config.json` used by VitePress.
*   **Safe Markdown Output**: Automatically escapes raw `<`/`>` characters outside of code blocks to keep Vue's compiler from interpreting generic type declarations as HTML tags.
*   **Clean Builds**: Clears and recreates `apps/docs/docs` on every run to avoid stale content before invoking VitePress `dev` or `build`.

---

## 📊 Cost Visualizer

*   **Identity**: `cost-viz`
*   **Source**: [`apps/cost-visualizer`](file:///f:/js/core/apps/cost-visualizer)
*   **Type**: React Application
*   **Purpose**: Provides a human-readable dashboard for the Gemini usage data captured by `@jsm-docs/core`.

### Capabilities
*   **Log Parsing**: Uploads or reads `costs.txt` output from `packages/core/costs.txt` or the archived `json_docs-*/costs.txt` files.
*   **Analytics**: Visualizes spending trends, per-model cost deltas, token efficiency, and processing duration.

---

## 📝 Documentation Editor

*   **Identity**: `docs-editor`
*   **Source**: [`apps/editor`](file:///f:/js/jsm-docs/apps/editor)
*   **Type**: Next.js + API tooling
*   **Purpose**: Provides a structured UI for reviewing and editing the generated JSON docs without hand-editing files.

### Capabilities
*   **File Explorer**: `/api/files` only exposes `packages/core/json_docs-gemini-3-pro-preview` and lists its `apis/`, `classes/`, and `events/` JSON descendants.
*   **Schema-Aware Editing**: React Hook Form editors for overview metadata, constructors, methods, fields, and inline Monaco-powered code example blocks.
*   **Safe Read/Write APIs**: `/api/content` now pins edits to `packages/core/json_docs-gemini-3-pro-preview`, validates payloads against the doc schema, enforces basic rate limits (60 req/min/IP) and tracks a 1 GB per-IP write quota (24h) before writing prettified JSON.
*   **Type Context**: `/api/ecosystem` streams `.d.ts` headers from `apps/editor/example-ecosystem/headers` into Monaco for IntelliSense during example editing.

### Usage
*   Run with `pnpm --filter @jsm-docs/editor dev` and open `http://localhost:3000`.
*   Requires local access to the workspace (no extra environment variables at this time).
*   Containerized option: `docker compose up --build editor` runs the production build on port `3000` (or override with `PORT`).

---

## 🌐 Docs Pages Publisher

*   **Identity**: `docs-site`
*   **Source**: [`.github/workflows/docs-site.yml`](file:///c:/Users/Easta/src/js/JSMacros-Docs/.github/workflows/docs-site.yml)
*   **Type**: GitHub Actions Workflow
*   **Purpose**: Regenerates the VitePress site from the `packages/core/json_docs-gemini-3-pro-preview` snapshot and deploys the static output to GitHub Pages.

### Capabilities
*   **Automated Builds**: Runs `pnpm --filter @jsm-docs/docs build`, which invokes `build-docs.mjs`/`generate-sidebar.mjs` before executing `vitepress build`.
*   **Artifact Publishing**: Uploads `apps/docs/.vitepress/dist` via `actions/upload-pages-artifact@v3` to hand off to the Pages deployment pipeline.
*   **Safe Deployments**: Uses `actions/deploy-pages@v4` with concurrency control to ensure only the latest run publishes to the `github-pages` environment.

### Configuration
*   **Triggers**:
    *   `push` to the `main` branch.
    *   Manual `workflow_dispatch` events.
*   **Environment**:
    *   Node.js `20.x` with `pnpm@10.13.1`.
    *   Requires repository Pages to use the “GitHub Actions” source.
*   **Permissions**:
    *   `contents: read`, `pages: write`, `id-token: write` (set at the workflow level; deploy job repeats the Pages-specific permissions).
