---
name: tailwind-v4
description: "Tailwind CSS v4 utility class reference and best practices. Use this skill whenever writing, reviewing, or modifying Tailwind CSS classes in HTML, JSX, or TSX files. Triggers on any task involving styling with Tailwind — adding classes, building UI components, fixing layout issues, or migrating from Tailwind v3. This skill ensures correct v4 syntax is used instead of deprecated v3 patterns. Use it even when the user doesn't mention Tailwind explicitly but the codebase uses Tailwind classes."
metadata:
  author: custom
  version: "1.0.0"
---

# Tailwind CSS v4 Skill

This project uses **Tailwind CSS v4** with CSS-first configuration. Tailwind v4
is a ground-up rewrite with significant changes from v3. Many class names,
defaults, and configuration patterns have changed. Always use v4 syntax.

## ⛔ STOP — CSS Variable Classes (Most Common Mistake)

**NEVER use `[var(--xxx)]` bracket syntax. This is v3. Use v4 syntax instead.**

### Theme-Registered Variables (use directly as utility class names)

These are defined in `@theme inline` in `globals.css` and generate real utility
classes. Use them WITHOUT any bracket/parenthesis syntax:

| ❌ WRONG (v3)                    | ✅ CORRECT (v4)   |
| -------------------------------- | ----------------- |
| `text-[var(--foreground)]`       | `text-foreground` |
| `bg-[var(--background)]`         | `bg-background`   |
| `text-[color:var(--foreground)]` | `text-foreground` |
| `bg-[color:var(--background)]`   | `bg-background`   |

### Non-Theme CSS Variables (use parentheses syntax)

For CSS variables defined in `:root` but NOT in `@theme`, use **parentheses**
`()` — never square brackets `[]`:

| ❌ WRONG (v3)                            | ✅ CORRECT (v4)               |
| ---------------------------------------- | ----------------------------- |
| `bg-[var(--card)]`                       | `bg-(--card)`                 |
| `text-[var(--primary)]`                  | `text-(--primary)`            |
| `border-[var(--border)]`                 | `border-(--border)`           |
| `bg-[var(--sidebar-bg)]`                 | `bg-(--sidebar-bg)`           |
| `text-[var(--muted)]`                    | `text-(--muted)`              |
| `bg-[var(--primary)]`                    | `bg-(--primary)`              |
| `text-[var(--primary-foreground)]`       | `text-(--primary-foreground)` |
| `bg-[var(--destructive)]`                | `bg-(--destructive)`          |
| `rounded-[var(--radius-sm)]`             | `rounded-(--radius-sm)`       |
| `bg-[var(--color-success)]`              | `bg-success`                  |
| `bg-[var(--color-error)]`                | `bg-error`                    |
| `bg-[var(--color-warning)]`              | `bg-warning`                  |
| `bg-[var(--color-info)]`                 | `bg-info`                     |
| `text-[var(--color-success-foreground)]` | `text-success-foreground`     |
| `text-[var(--color-error-foreground)]`   | `text-error-foreground`       |

**Rule:** Variables prefixed with `--color-*` in `:root` are auto-detected by
Tailwind v4 and generate utility classes (e.g., `--color-success` → `bg-success`,
`text-success`). Use them directly without brackets or parentheses.

### Arbitrary values with CSS variables (non-color properties)

For arbitrary values referencing CSS variables in non-color contexts, also use
parentheses:

```
❌ gap-[var(--spacing-lg)]
✅ gap-(--spacing-lg)

❌ p-[var(--spacing-sm)]
✅ p-(--spacing-sm)
```

## Critical Changes from v3

These are the most common mistakes. Internalize these before writing any classes.

### Renamed Utilities

| v3 Class           | v4 Class           | Notes                          |
| ------------------ | ------------------ | ------------------------------ |
| `shadow-sm`        | `shadow-xs`        | All shadow sizes shifted down  |
| `shadow`           | `shadow-sm`        |                                |
| `drop-shadow-sm`   | `drop-shadow-xs`   |                                |
| `drop-shadow`      | `drop-shadow-sm`   |                                |
| `blur-sm`          | `blur-xs`          |                                |
| `blur`             | `blur-sm`          |                                |
| `backdrop-blur-sm` | `backdrop-blur-xs` |                                |
| `backdrop-blur`    | `backdrop-blur-sm` |                                |
| `rounded-sm`       | `rounded-xs`       | All rounded sizes shifted down |
| `rounded`          | `rounded-sm`       |                                |
| `outline-none`     | `outline-hidden`   | `outline-none` now means 0     |
| `ring`             | `ring-3`           | Default ring is now 1px        |

### Removed Utilities (Use Opacity Modifier Instead)

These opacity utilities no longer exist. Use the `/` opacity modifier syntax:

```
bg-opacity-50    -> bg-black/50
text-opacity-50  -> text-black/50
border-opacity-50 -> border-black/50
ring-opacity-50  -> ring-black/50
placeholder-opacity-50 -> placeholder-black/50
```

Also removed:

- `flex-shrink-*` -> use `shrink-*`
- `flex-grow-*` -> use `grow-*`
- `overflow-ellipsis` -> use `text-ellipsis`
- `decoration-slice` -> use `box-decoration-slice`
- `decoration-clone` -> use `box-decoration-clone`

### Changed Defaults

1. **Border color**: defaults to `currentColor`, not `gray-200`. Always specify:

   ```html
   <div class="border border-gray-200"></div>
   ```

2. **Ring color**: defaults to `currentColor`, not `blue-500`

3. **Placeholder color**: uses current text color at 50% opacity, not `gray-400`

4. **Button cursor**: defaults to `cursor: default`, not `pointer`

### Syntax Changes

1. **Important modifier** — `!` goes at the end:

   ```
   v3: !bg-red-500
   v4: bg-red-500!
   ```

2. **CSS variables in arbitrary values** — use parentheses:

   ```
   v3: bg-[--brand-color]
   v4: bg-(--brand-color)
   ```

3. **Variant stacking** — left to right:

   ```
   v3: first:*:pt-0  (right to left)
   v4: *:first:pt-0  (left to right)
   ```

4. **Gradient utility renamed**:
   ```
   v3: bg-gradient-to-r
   v4: bg-linear-to-r
   ```

## When to Read Reference Files

For detailed guidance, read the appropriate reference file:

- `references/configuration.md` — CSS-first config with `@theme`, `@import`,
  `@utility`, `@custom-variant`. Read when setting up or modifying Tailwind
  configuration, theming, custom utilities, or breakpoints.

- `references/new-features.md` — Container queries, 3D transforms, `@starting-style`,
  `not-*` variant, color-scheme, field-sizing, inert, and more. Read when building
  components that use advanced v4 features.

- `references/migration-guide.md` — Complete mapping of all v3-to-v4 changes
  including selector changes, hover behavior, gradient behavior, hidden attribute
  priority, and other breaking changes. Read when migrating existing code or when
  unsure about a specific utility.

## Canonical Classes (Avoid Arbitrary Pixel Values)

**Use canonical Tailwind classes instead of arbitrary `[Xpx]` values** whenever
the value maps to a spacing-scale unit. Tailwind v4 spacing = `N * 4px`, so any
pixel value divisible by 4 (or by 2 for half-steps) has a canonical class.

| ❌ Arbitrary (flagged by linter) | ✅ Canonical (v4)   | Math          |
| -------------------------------- | ------------------- | ------------- |
| `h-[18px]` / `w-[18px]`          | `h-4.5` / `w-4.5`   | 18 ÷ 4 = 4.5  |
| `h-[72px]` / `min-h-[72px]`      | `h-18` / `min-h-18` | 72 ÷ 4 = 18   |
| `min-h-[90px]`                   | `min-h-22.5`        | 90 ÷ 4 = 22.5 |
| `gap-[32px]`                     | `gap-8`             | 32 ÷ 4 = 8    |
| `p-[24px]`                       | `p-6`               | 24 ÷ 4 = 6    |
| `w-[200px]`                      | `w-50`              | 200 ÷ 4 = 50  |

**Rule:** Divide the pixel value by 4. If the result is an integer or `.5`,
use the canonical class. Otherwise (e.g., `13px`, `10px`, `11px`) the arbitrary
bracket syntax is correct since no canonical equivalent exists.

**How to check:** `value ÷ 4` → integer or `.5` → canonical class exists.

## Quick Rules

1. **NEVER use `[var(--xxx)]` syntax** — use `(--xxx)` parentheses or direct class names
2. Use `text-foreground` and `bg-background` directly (defined in `@theme`)
3. Use `bg-(--card)`, `text-(--primary)`, etc. for non-theme `:root` variables
4. Variables starting with `--color-*` in `:root` generate direct utility classes (e.g., `bg-success`, `text-error`)
5. Never use deprecated v3 class names — check the rename table above
6. Never use `*-opacity-*` utilities — use the `/` modifier syntax
7. Always specify border colors explicitly
8. Use `ring-3` instead of `ring` for the old 3px ring
9. Put `!` at the end of classes, not the beginning
10. Stack variants left to right: `*:first:pt-0`
11. Use `bg-linear-to-r` instead of `bg-gradient-to-r`
12. Use `outline-hidden` instead of `outline-none` for visually hiding outlines
13. Use `@utility` blocks for custom utilities, not `@layer utilities`
14. **Prefer canonical classes over arbitrary pixel values** — if `px ÷ 4` is an integer or `.5`, use the canonical class (e.g., `h-4.5` not `h-[18px]`)
