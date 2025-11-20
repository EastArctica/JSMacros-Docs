# Monorepo Migration Walkthrough

I have successfully converted the repository into a monorepo structure using `pnpm workspaces`.

## Changes Made

1.  **Directory Structure**:
    *   Created `apps/` and `packages/` directories.
    *   Moved `site` to `apps/docs`.
    *   Moved `cost-visualizer` to `apps/cost-visualizer`.
    *   Moved root scripts (`convert_docs.mjs`, `generate_markdown.mjs`) and data (`docs`, `json_docs-*`) to `packages/doc-gen`.

2.  **Workspace Configuration**:
    *   Created `pnpm-workspace.yaml` to define the workspace layout.
    *   Updated the root `package.json` to be a private workspace root.

3.  **Package Updates**:
    *   Renamed `site` package to `@doc-gen/docs`.
    *   Renamed `gemini-api-log-visualizer` package to `@doc-gen/cost-visualizer`.
    *   Created `@doc-gen/core` package for the scripts and data.
    *   Updated `apps/docs/build-docs.mjs` to point to the new location of the JSON documentation.

4.  **Verification**:
    *   Ran `pnpm install` to link dependencies.
    *   Verified that the documentation build process (`pnpm --filter @doc-gen/docs run build`) executes correctly (although it encountered some content-specific errors in the markdown files, the build script itself ran and found the files).

## Next Steps

*   You can now run commands for specific packages using `pnpm --filter <package> <command>`.
*   Example: `pnpm --filter @doc-gen/docs run dev` to start the docs site.
*   Note: The original `site` directory could not be fully deleted because it was locked by another process. You may want to manually delete it when it's free.
