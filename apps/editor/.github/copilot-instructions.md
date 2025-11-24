# JsMacros Docs Editor – Copilot Instructions

## Architecture
- Single Next.js 16 App Router surface (`src/app/page.tsx`) composes the sidebar `FileExplorer` and the `ClassEditor`; both are client components using fetch to talk to local API routes.
- All file I/O happens server-side inside `src/app/api/*/route.ts`; keep business logic here so client bundles stay thin.
- JSON docs live under `packages/core/json_docs-*/*`; `DOCS_ROOT` is computed with `path.resolve(process.cwd(), '../../packages/core')`, so preserve this relative layout when moving code.
- `FileExplorer` only lists top-level dirs beginning with `json_docs-` and only `.json` leaves—mirror that filter if you add new tree features to avoid leaking other files.

## API Surfaces
- `GET/POST /api/content?path=` streams raw JSON for a single doc; responses expect valid JSON objects, and writes are re-serialized with 2-space indentation.
- `GET /api/files` recursively builds a lightweight `{name,path,type,children}` tree; avoid blocking ops or synchronous fs calls here because the UI renders it on load.
- `GET /api/ecosystem` lazily caches `.d.ts` files from `example-ecosystem/headers`; reset `cachedFiles` or add a cache-busting param whenever you need fresh typings.
- All routes guard against path traversal by verifying `fullPath.startsWith(DOCS_ROOT)`—retain that check if you refactor.

## Frontend Patterns
- Forms are managed with `react-hook-form` + `useFieldArray`; `dirtyFields` powers the change counters and yellow dots, so extend schemas by mirroring that pattern.
- `ClassEditor` drives save UX (Ctrl/Cmd+S trigger + toast); always call `reset(data, { keepValues: true })` after a successful save to clear dirty state.
- `MethodEditor`/`FieldEditor` expect nested names like `methods.${index}.parameters`; reuse those paths or helpers will not bind correctly.
- Examples are edited via `MonacoWrapper` and stored as arrays even though the editor works with a newline-delimited string—normalize inputs before persisting.

## Monaco & Typings
- `MonacoWrapper` installs shared strict JS compiler options and injects the ecosystem libs via `setExtraLibs`; if you add other editors, reuse this component instead of configuring Monaco manually.
- Extra lib URIs are prefixed with `file:///headers/`; match that convention or Monaco will not de-duplicate files between mounts.

## Styling & UI
- Tailwind CSS v4 is pulled through `src/app/globals.css` using CSS custom properties (`--bg-app`, `--text-primary`, etc.); prefer those tokens over raw hex values for consistency.
- Dark theme scrollbars and surfaces live in `globals.css`; update CSS variables there instead of scattering overrides across components.

## Workflows
- Use `npm run dev` (or `pnpm dev`) for local work, `npm run build` for production checks, and `npm run lint` to enforce `eslint.config.mjs`.
- Next.js React Compiler (`reactCompiler: true` in `next.config.ts`) is enabled—avoid unsupported React patterns (mutating hooks, custom schedulers) or builds will fail.
- The app assumes Node 18+ (Next 16 requirement) and filesystem access to `../../packages/core`; when running in isolation, stub those paths or mount the repo root.

## Gotchas
- `/api/files` and `/api/content` share the same `DOCS_ROOT`; if you relocate docs, update both constants together.
- `fetch('/api/ecosystem')` is memoized in module scope; hot reload does not invalidate it, so restart dev server if you change header files and don’t add an explicit bust.
- Layout sizing uses full-screen flex containers; new panes should preserve `h-screen`/`overflow-hidden` semantics to avoid double scrollbars.
