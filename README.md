# JsMacros Documentation Monorepo

This repository contains the documentation system for JsMacros, organized as a monorepo.

## 🏗️ Project Structure

```
doc-gen/
├── apps/
│   ├── docs/               # VitePress documentation site (@jsm-docs/docs)
│   └── cost-visualizer/    # LLM Cost Visualizer tool (@jsm-docs/cost-visualizer)
├── packages/
│   └── doc-gen/            # Core scripts and data (@jsm-docs/core)
├── package.json            # Workspace root
└── pnpm-workspace.yaml     # Workspace configuration
```

## 🚀 Quick Start

### Install Dependencies

```bash
pnpm install
```

### Run Documentation Site

```bash
pnpm --filter @jsm-docs/docs run dev
```

### Run Cost Visualizer

```bash
pnpm --filter @jsm-docs/cost-visualizer run dev
```

### Run Documentation Conversion

```bash
pnpm --filter @jsm-docs/core run convert
```

## 📦 Packages

- **@jsm-docs/docs**: The static documentation site built with VitePress.
- **@jsm-docs/cost-visualizer**: A React application to visualize the costs of LLM generation.
- **@jsm-docs/core**: Scripts for converting markdown to JSON using Google Generative AI, and the source documentation data.

## 🔧 Development

This project uses [pnpm workspaces](https://pnpm.io/workspaces).

- To add a dependency to a specific package: `pnpm add <package> --filter <workspace-name>`
- To run a script in a specific package: `pnpm --filter <workspace-name> run <script>`
