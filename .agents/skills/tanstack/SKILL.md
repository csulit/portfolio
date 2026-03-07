---
name: tanstack
description: TanStack CLI tools for documentation, library discovery, ecosystem exploration, and project scaffolding. Use when the user asks about TanStack libraries (Router, Query, Start, Form, Table, etc.), wants to search TanStack docs, explore the TanStack ecosystem, or create a new TanStack project. Triggers include "tanstack", "tanstack docs", "tanstack start", "tanstack router", "tanstack query", "tanstack form", "tanstack table", "create tanstack app", "search tanstack", "tanstack ecosystem".
allowed-tools: Bash(npx:*)
---

# TanStack CLI

Wrapper skills for TanStack CLI commands, replacing the deprecated MCP server.

## Commands

### Search Documentation

```bash
npx -y @tanstack/cli search-docs "<query>" --json
npx -y @tanstack/cli search-docs "<query>" --library <library> --json
npx -y @tanstack/cli search-docs "<query>" --library <library> --framework react --json
```

Available libraries: `query`, `router`, `start`, `form`, `table`, `store`, `ranger`, `virtual`, `cli`

### Fetch a Documentation Page

```bash
npx -y @tanstack/cli doc <library> <path> --json
```

Examples:

```bash
npx -y @tanstack/cli doc query framework/react/overview --json
npx -y @tanstack/cli doc router framework/react/guide/routing --json
npx -y @tanstack/cli doc start framework/react/guide/server-functions --json
```

### List Libraries

```bash
npx -y @tanstack/cli libraries --json
```

### Explore Ecosystem

```bash
npx -y @tanstack/cli ecosystem --json
npx -y @tanstack/cli ecosystem --category <category> --json
```

Categories: `database`, `auth`, `hosting`, `styling`, `testing`, etc.

### Create a New Application

```bash
# List available add-ons
npx -y @tanstack/cli create --list-add-ons --framework React --json

# Get add-on details
npx -y @tanstack/cli create --addon-details <addon-name> --framework React --json

# Create app with add-ons
npx -y @tanstack/cli create <project-name> --framework React --add-ons <addon1>,<addon2>
```

## Workflow

1. **Searching docs** — Use `search-docs` with `--json` to find relevant documentation pages.
2. **Reading docs** — Use `doc <library> <path>` to fetch full content of a documentation page.
3. **Exploring ecosystem** — Use `ecosystem` to discover compatible tools and integrations.
4. **Scaffolding** — Use `create` to scaffold new TanStack Start applications with add-ons.

## Important Notes

- Always use `npx -y @tanstack/cli` to ensure the latest version.
- Use `--json` flag for structured output when parsing results programmatically.
- The old MCP server (`tanstack mcp`) has been removed and will not be restored.
