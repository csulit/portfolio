# Tailwind CSS v4 Configuration

## CSS-First Setup

Tailwind v4 uses CSS-based configuration instead of `tailwind.config.js`.
There is no JavaScript config file.

### Import Syntax

```css
/* v3 (DO NOT USE) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 (CORRECT) */
@import "tailwindcss";
```

### PostCSS Setup (This Project)

This project uses `@tailwindcss/postcss`:

```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

## The @theme Directive

Use `@theme` to define design tokens as CSS custom properties. These replace
what was in `tailwind.config.js` under `theme.extend`.

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-brand: #3b82f6;
  --color-brand-light: #60a5fa;
  --color-brand-dark: #1d4ed8;

  /* Fonts */
  --font-display: "Inter", sans-serif;
  --font-body: "Inter", sans-serif;

  /* Breakpoints */
  --breakpoint-3xl: 120rem;

  /* Spacing */
  --spacing-128: 32rem;

  /* Border Radius */
  --radius-pill: 9999px;

  /* Shadows */
  --shadow-card: 0 2px 8px rgb(0 0 0 / 0.08);

  /* Animations */
  --animate-fade-in: fade-in 0.3s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

Theme values generate corresponding utility classes automatically:
- `--color-brand` -> `text-brand`, `bg-brand`, `border-brand`, etc.
- `--font-display` -> `font-display`
- `--breakpoint-3xl` -> `3xl:` variant
- `--shadow-card` -> `shadow-card`
- `--animate-fade-in` -> `animate-fade-in`

### Namespace Conventions

The `@theme` directive uses specific prefixes to map to utility categories:

| Prefix             | Generates                                      |
| ------------------ | ---------------------------------------------- |
| `--color-*`        | Color utilities (text, bg, border, ring, etc.)  |
| `--font-*`         | Font family utilities                           |
| `--font-size-*`    | Font size utilities                             |
| `--font-weight-*`  | Font weight utilities                           |
| `--tracking-*`     | Letter spacing utilities                        |
| `--leading-*`      | Line height utilities                           |
| `--breakpoint-*`   | Responsive variants                             |
| `--spacing-*`      | Spacing utilities (p, m, gap, etc.)             |
| `--radius-*`       | Border radius utilities                         |
| `--shadow-*`       | Box shadow utilities                            |
| `--inset-shadow-*` | Inset shadow utilities                          |
| `--drop-shadow-*`  | Drop shadow utilities                           |
| `--animate-*`      | Animation utilities                             |
| `--ease-*`         | Transition timing functions                     |
| `--width-*`        | Width utilities                                 |
| `--min-width-*`    | Min-width utilities                             |
| `--max-width-*`    | Max-width utilities                             |
| `--blur-*`         | Blur filter utilities                           |

### Using CSS Variables in Code

All theme values are available as CSS variables throughout your code:

```css
.custom-element {
  color: var(--color-brand);
  font-family: var(--font-display);
}
```

```tsx
// In inline styles
<div style={{ color: 'var(--color-brand)' }} />
```

### Overriding Default Theme Values

To override defaults, redefine them in `@theme`:

```css
@theme {
  /* Override default blue */
  --color-blue-500: oklch(0.6 0.2 260);

  /* Remove a default color entirely */
  --color-slate-*: initial;
}
```

## Custom Utilities

```css
/* v3 (DO NOT USE) */
@layer utilities {
  .tab-4 {
    tab-size: 4;
  }
}

/* v4 (CORRECT) */
@utility tab-4 {
  tab-size: 4;
}
```

Custom utilities defined with `@utility` support variants, `!important`, etc.
automatically.

For component-level styles, continue using `@layer`:

```css
@layer components {
  .btn {
    border-radius: var(--radius-sm);
    padding: 0.5rem 1rem;
    font-weight: 600;
  }
}
```

## Custom Variants

```css
@custom-variant hover (&:hover);
@custom-variant theme-dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

## The theme() Function

In v4, use CSS variable names with `theme()`:

```css
/* v3 */
@media (width >= theme(screens.xl)) { }

/* v4 */
@media (width >= theme(--breakpoint-xl)) { }

/* Or even better, use CSS variables directly */
@media (width >= var(--breakpoint-xl)) { }
```

## Using @apply

`@apply` still works in v4. In CSS Modules or scoped styles, use `@reference`
to access theme variables:

```css
/* In a CSS Module or Vue <style> block */
@reference "../../app.css";

h1 {
  @apply text-2xl font-bold text-red-500;
}
```

Prefer CSS variables over `@apply` when possible:

```css
h1 {
  color: var(--color-red-500);
  font-size: var(--font-size-2xl);
}
```

## Prefixes

If using a prefix, it works like a variant:

```html
<div class="tw:flex tw:bg-red-500 tw:hover:bg-red-600"></div>
```

Configure in CSS:
```css
@import "tailwindcss" prefix(tw);
```

## Removed Configuration Options

These v3 config options no longer exist in v4:
- `corePlugins` — all utilities are always available
- `safelist` — use CSS `@source` directive instead
- `separator` — always uses `:`
- `resolveConfig` — use CSS variables instead
- JavaScript config auto-detection — use `@theme` in CSS
- Sass/Less/Stylus preprocessing — use native CSS
