# Tailwind CSS v4 New Features

## Container Queries (Built-in)

Container queries are first-class in v4 — no plugin required.

```html
<!-- Define a container -->
<div class="@container">
  <!-- Respond to container width -->
  <div class="@sm:flex @lg:grid @lg:grid-cols-2">
    ...
  </div>
</div>

<!-- Named containers -->
<div class="@container/sidebar">
  <div class="@sm/sidebar:flex">...</div>
</div>
```

Available container breakpoints: `@3xs`, `@2xs`, `@xs`, `@sm`, `@md`, `@lg`,
`@xl`, `@2xl`, `@3xl`, `@4xl`, `@5xl`, `@6xl`, `@7xl`.

## 3D Transforms

New utilities for 3D transforms:

```html
<!-- Rotate in 3D -->
<div class="rotate-x-45 rotate-y-12 rotate-z-6">

<!-- Perspective -->
<div class="perspective-500">
  <div class="rotate-y-45">...</div>
</div>

<!-- Transform style -->
<div class="transform-3d">...</div>

<!-- Backface visibility -->
<div class="backface-hidden">...</div>
```

## Gradient Enhancements

### Radial and Conic Gradients

```html
<!-- Radial gradient -->
<div class="bg-radial from-blue-500 to-transparent">

<!-- Conic gradient -->
<div class="bg-conic from-red-500 via-yellow-500 to-green-500">
```

### Gradient Interpolation

```html
<!-- Interpolate in oklch for smoother gradients -->
<div class="bg-linear-to-r/oklch from-blue-500 to-red-500">

<!-- Other color spaces -->
<div class="bg-linear-to-r/srgb from-blue-500 to-red-500">
```

### Gradient Behavior in Variants

In v4, gradient stops are preserved across variants (unlike v3 which reset them):

```html
<!-- v4: via and to persist in dark mode -->
<div class="bg-linear-to-r from-red-500 via-orange-400 to-yellow-400
            dark:from-blue-500 dark:to-teal-400 dark:via-none">
```

Use `via-none` to explicitly remove a gradient stop.

## The @starting-style Variant

Create enter/exit CSS transitions without JavaScript:

```html
<div class="starting:opacity-0 starting:scale-95
            opacity-100 scale-100
            transition-all duration-300">
  Content that animates in
</div>
```

This is useful for elements that appear via `display: none` toggling,
dialog/popover animations, and dynamically inserted elements.

## The not-* Variant

Style elements that don't match a condition:

```html
<!-- Only style when NOT hovered -->
<div class="not-hover:opacity-50">

<!-- Only when NOT disabled -->
<button class="not-disabled:cursor-pointer">

<!-- Only when NOT a specific media query -->
<div class="not-dark:bg-white">

<!-- Negating custom selectors -->
<div class="not-[&.active]:hidden">
```

## Color Scheme

```html
<!-- Set color-scheme for native element styling -->
<html class="scheme-dark">
<html class="scheme-light">
<html class="scheme-light-dark">
```

Affects native form controls, scrollbars, and other browser-styled elements.

## Field Sizing

```html
<!-- Auto-resize textareas and inputs to fit content -->
<textarea class="field-sizing-content"></textarea>
<input class="field-sizing-content" />
```

## Inert

```html
<!-- Style inert elements -->
<div class="inert:opacity-50 inert:pointer-events-none" inert>
  Disabled section
</div>
```

## Complex Shadows (Inset Shadows)

```html
<!-- Combine inset and regular shadows -->
<div class="shadow-md inset-shadow-sm">

<!-- Colored inset shadows -->
<div class="inset-shadow-sm inset-shadow-black/10">
```

## oklch Color Palette

v4 uses oklch colors for more vivid, perceptually uniform colors. The default
palette (slate, gray, zinc, red, blue, etc.) is modernized but keeps the same
class names. Colors appear more vibrant on P3 displays.

## Anchor Positioning (Experimental)

```html
<!-- Anchor an element to another -->
<button class="anchor/my-anchor">Toggle</button>
<div class="anchor-target/my-anchor top-[anchor(bottom)] left-[anchor(left)]">
  Dropdown content
</div>
```

## Hover Behavior on Mobile

v4 wraps hover styles in `@media (hover: hover)` so they only apply on devices
with hover support (not touch). This prevents "sticky hover" on mobile.

If you need hover on all devices:
```css
@custom-variant hover (&:hover);
```

## Hidden Attribute Priority

In v4, the `hidden` attribute takes priority over display utilities:

```html
<!-- This stays hidden even with "block" -->
<div hidden class="block">...</div>

<!-- Remove the hidden attribute to show it -->
<div class="block">...</div>
```

## Transition Changes

`transition-colors` now includes `outline-color`. Be aware when using
`outline-*` with `transition`:

```html
<!-- If outline color shouldn't transition, use transition-[specific-props] -->
<button class="transition-[background-color,border-color,color] hover:bg-blue-500">
```
