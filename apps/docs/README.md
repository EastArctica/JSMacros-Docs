# @doc-gen/docs

This is the documentation website for JsMacros, built with VitePress.

## Features

*   **Static Site Generation**: Converts the JSON documentation from `@doc-gen/core` into a full static website.
*   **Search**: Full-text search for APIs, Classes, and Events.
*   **Responsive**: Mobile-friendly design.

## Usage

### Development

Start the development server:

```bash
pnpm dev
```

This command will:
1.  Read JSON files from `../../packages/doc-gen/json_docs-*`.
2.  Generate temporary markdown files in `docs/`.
3.  Start the VitePress server at http://localhost:5173.

### Build

Build the static site for production:

```bash
pnpm build
```

The output will be in `docs/.vitepress/dist`.

### Preview

Preview the production build:

```bash
pnpm preview
```

## Configuration

*   **VitePress Config**: `.vitepress/config.mjs`
*   **Sidebar Generation**: `generate-sidebar.mjs`
*   **Build Script**: `build-docs.mjs` (Converts JSON to Markdown for VitePress)
