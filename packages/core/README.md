# @jsm-docs/core

This package contains the core scripts and data for the JsMacros documentation generator.

## Purpose

*   **Data Storage**: Holds the source markdown documentation (`docs/`) and the generated JSON documentation (`json_docs-*/`).
*   **Conversion**: Provides the `convert_docs.mjs` script to convert markdown documentation into structured JSON using Google Generative AI.
*   **Utilities**: Contains legacy scripts and helper functions for documentation processing.

## Usage

### Convert Documentation

To convert the markdown documentation in `docs/` to JSON:

```bash
pnpm convert
```

This script uses the Google Generative AI SDK. Ensure you have the `GOOGLE_API_KEY` environment variable set in a `.env` file in the root of the monorepo or in this package.

### Configuration

*   **Input Directory**: `docs/`
*   **Output Directory**: `json_docs-gemini-3-pro-preview/` (or similar, depending on the model used)
*   **Model**: Configurable via `MODEL_NAME` environment variable (defaults to `gemini-2.0-flash-thinking-exp-01-21` or similar).

## Directory Structure

*   `docs/`: The original markdown documentation files.
*   `json_docs-*/`: The generated JSON documentation files.
*   `convert_docs.mjs`: The main conversion script.
*   `clean_docs/`: Intermediate cleaned markdown files.