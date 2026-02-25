---
name: react-doctor
description: React Doctor - static analysis and optimization tool. Use when the user asks to optimize, audit, or improve their React app's health, find dead code, check for performance issues, lint for React best practices, or get a health score. Triggers include "optimize", "audit the app", "find dead code", "health check", "check performance", "best practices", "what can I improve", "scan for issues", "react doctor", or any React optimization/quality task.
allowed-tools: Bash(npx:*)
---

# react-doctor

Static analyzer that scans React codebases and outputs a 0-100 health score with actionable recommendations. Powered by Rust-based tooling (Oxlint), it checks 60+ rules across performance, architecture, bundle size, security, correctness, accessibility, and framework-specific categories.

## Core Workflow

1. **Run the scan** — `npx -y react-doctor@latest .` on the project root.
2. **Review diagnostics** — check the health score and rule violations.
3. **Fix issues** — address errors and warnings by priority (errors first).
4. **Re-scan** — verify improvements by running again.

## Commands

```bash
# Basic scan
npx -y react-doctor@latest .

# Verbose output (shows affected files and line numbers)
npx -y react-doctor@latest . --verbose

# Score only (for CI or quick checks)
npx -y react-doctor@latest . --score

# Skip specific passes
npx -y react-doctor@latest . --no-lint
npx -y react-doctor@latest . --no-dead-code

# Scan only changed files vs base branch
npx -y react-doctor@latest . --diff main

# Auto-fix issues
npx -y react-doctor@latest . --fix
```

## CLI Flags

| Flag | Description |
|------|-------------|
| `--verbose` | Show file details and line numbers per rule |
| `--score` | Output only the numeric score |
| `--no-lint` | Skip linting checks |
| `--no-dead-code` | Skip dead code detection |
| `--diff [base]` | Scan only files changed vs base branch |
| `--fix` | Auto-fix all issues |
| `-y, --yes` | Skip prompts, scan all workspace projects |
| `--project <name>` | Select workspace project (comma-separated) |
| `--no-ami` | Skip Ami-related prompts |

## What It Checks

### Analysis Passes (run in parallel)

1. **Lint** — 60+ rules across:
   - State & effects
   - Performance
   - Architecture
   - Bundle size
   - Security
   - Correctness
   - Accessibility
   - Framework-specific (Next.js, React Native)

2. **Dead Code Detection** — unused files, exports, types, and duplicates.

Rules toggle automatically based on detected framework, React version, and compiler setup.

## Health Score

| Score | Label |
|-------|-------|
| 75-100 | Great |
| 50-74 | Needs work |
| 0-49 | Critical |

Errors weigh more heavily than warnings in the score calculation.

## Configuration

Create `react-doctor.config.json` in the project root or add a `"reactDoctor"` key to `package.json`:

```json
{
  "ignore": {
    "rules": ["react/no-danger", "jsx-a11y/no-autofocus", "knip/exports"],
    "files": ["src/generated/**"]
  },
  "lint": true,
  "deadCode": true,
  "verbose": false,
  "diff": false
}
```

CLI flags override config values.

## Diagnostic Output Format

Each diagnostic includes:
- `filePath` — affected file
- `rule` — rule ID (`plugin/rule` format)
- `severity` — `error` or `warning`
- `message` — what's wrong
- `help` — how to fix it
- `line` / `column` — exact location

## Common Patterns

### Full optimization audit

```bash
npx -y react-doctor@latest . --verbose
```

Review the output, fix errors first, then warnings. Re-scan to verify.

### Pre-PR check on changed files

```bash
npx -y react-doctor@latest . --diff main --verbose
```

### Suppress false positives

Add rules to `react-doctor.config.json`:

```json
{
  "ignore": {
    "rules": ["rule-id-to-suppress"]
  }
}
```

## Important Rules

- **Always use `npx -y react-doctor@latest`** to ensure the latest version.
- **Use `--verbose`** when you need to see specific files and line numbers for fixing issues.
- **Use `--score`** for quick health checks without full output.
- **Dead code detection** is especially useful for finding unused exports and files that bloat bundle size.
