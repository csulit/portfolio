# Tailwind CSS v3 to v4 Migration Reference

## Complete Renamed Utilities Table

### Shadow Scale Shift

| v3              | v4               |
| --------------- | ---------------- |
| `shadow-sm`     | `shadow-xs`      |
| `shadow`        | `shadow-sm`      |
| `shadow-md`     | `shadow-md`      |
| `shadow-lg`     | `shadow-lg`      |
| `shadow-xl`     | `shadow-xl`      |
| `shadow-2xl`    | `shadow-2xl`     |
| `drop-shadow-sm`| `drop-shadow-xs` |
| `drop-shadow`   | `drop-shadow-sm` |

### Blur Scale Shift

| v3               | v4                |
| ---------------- | ----------------- |
| `blur-sm`        | `blur-xs`         |
| `blur`           | `blur-sm`         |
| `backdrop-blur-sm`| `backdrop-blur-xs`|
| `backdrop-blur`  | `backdrop-blur-sm`|

### Border Radius Scale Shift

| v3           | v4            |
| ------------ | ------------- |
| `rounded-sm` | `rounded-xs`  |
| `rounded`    | `rounded-sm`  |

### Outline

| v3             | v4              | What it does                    |
| -------------- | --------------- | ------------------------------- |
| `outline-none` | `outline-hidden`| Visually hides outline          |
| (new)          | `outline-none`  | `outline-style: none` (removed) |

### Ring

| v3     | v4      | Notes                 |
| ------ | ------- | --------------------- |
| `ring` | `ring-3`| Default ring is 1px   |

### Gradient

| v3                   | v4                  |
| -------------------- | ------------------- |
| `bg-gradient-to-r`   | `bg-linear-to-r`   |
| `bg-gradient-to-l`   | `bg-linear-to-l`   |
| `bg-gradient-to-t`   | `bg-linear-to-t`   |
| `bg-gradient-to-b`   | `bg-linear-to-b`   |
| `bg-gradient-to-tr`  | `bg-linear-to-tr`  |
| `bg-gradient-to-tl`  | `bg-linear-to-tl`  |
| `bg-gradient-to-br`  | `bg-linear-to-br`  |
| `bg-gradient-to-bl`  | `bg-linear-to-bl`  |

## Removed Opacity Utilities

All per-property opacity utilities are removed. Use modifier syntax:

| v3 Pattern                       | v4 Replacement          |
| -------------------------------- | ----------------------- |
| `bg-blue-500 bg-opacity-50`     | `bg-blue-500/50`        |
| `text-red-500 text-opacity-75`  | `text-red-500/75`       |
| `border-gray-300 border-opacity-50` | `border-gray-300/50`|
| `ring-blue-500 ring-opacity-50` | `ring-blue-500/50`      |
| `divide-gray-200 divide-opacity-50` | `divide-gray-200/50`|
| `placeholder-gray-400 placeholder-opacity-50` | `placeholder-gray-400/50` |

## Other Removed/Renamed Utilities

| v3                   | v4                     |
| -------------------- | ---------------------- |
| `flex-shrink`        | `shrink`               |
| `flex-shrink-0`      | `shrink-0`             |
| `flex-grow`          | `grow`                 |
| `flex-grow-0`        | `grow-0`               |
| `overflow-ellipsis`  | `text-ellipsis`        |
| `decoration-slice`   | `box-decoration-slice` |
| `decoration-clone`   | `box-decoration-clone` |
| `transform-none`     | `scale-none` / `rotate-none` / `translate-none` |

## Default Value Changes

### Border Color

```html
<!-- v3: border defaults to gray-200 -->
<div class="border"></div>

<!-- v4: border defaults to currentColor — always specify -->
<div class="border border-gray-200"></div>
```

### Ring Color

```html
<!-- v3: ring defaults to blue-500 with 50% opacity -->
<button class="focus:ring"></button>

<!-- v4: ring defaults to currentColor — always specify -->
<button class="focus:ring-3 focus:ring-blue-500"></button>
```

### Placeholder Color

```html
<!-- v3: placeholder defaults to gray-400 -->
<!-- v4: placeholder uses current text color at 50% opacity -->
<!-- Specify explicitly if you want a specific color -->
<input class="placeholder-gray-400" />
```

### Divide Color

```html
<!-- v3: divide defaults to gray-200 -->
<div class="divide-y"></div>

<!-- v4: divide defaults to currentColor — always specify -->
<div class="divide-y divide-gray-200"></div>
```

## Selector Changes

### Space Utilities

```css
/* v3: targets siblings after hidden-aware selector */
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1rem;
}

/* v4: targets all children except last */
.space-y-4 > :not(:last-child) {
  margin-bottom: 1rem;
}
```

### Divide Utilities

```css
/* v3 */
.divide-y > :not([hidden]) ~ :not([hidden]) {
  border-top-width: 1px;
}

/* v4 */
.divide-y > :not(:last-child) {
  border-bottom-width: 1px;
}
```

## Syntax Changes

### Important Modifier Position

```html
<!-- v3: ! at the beginning -->
<div class="!flex !bg-red-500 hover:!bg-red-600"></div>

<!-- v4: ! at the end -->
<div class="flex! bg-red-500! hover:bg-red-600!"></div>
```

### CSS Variables in Arbitrary Values

```html
<!-- v3: square brackets -->
<div class="bg-[--brand-color]"></div>

<!-- v4: parentheses -->
<div class="bg-(--brand-color)"></div>
```

### Variant Stacking Order

```html
<!-- v3: right to left -->
<ul class="first:*:pt-0 last:*:pb-0"></ul>

<!-- v4: left to right -->
<ul class="*:first:pt-0 *:last:pb-0"></ul>
```

### Grid Arbitrary Values

```html
<!-- v3: commas for separators -->
<div class="grid-cols-[max-content,auto]"></div>

<!-- v4: underscores for spaces -->
<div class="grid-cols-[max-content_auto]"></div>
```

## Transform Utilities

Individual transform properties are now separate in v4.

### Resetting Transforms

```html
<!-- v3 -->
<button class="scale-150 focus:transform-none"></button>

<!-- v4: reset individual properties -->
<button class="scale-150 focus:scale-none"></button>
```

### Transitioning Transforms

```html
<!-- v3: use "transform" -->
<button class="transition-[opacity,transform] hover:scale-150"></button>

<!-- v4: list individual transform properties -->
<button class="transition-[opacity,scale] hover:scale-150"></button>
```

## Hover Variant

v4 wraps hover in `@media (hover: hover)` — only applies on devices that
support hover. This prevents "sticky hover" on touch devices.

Override for all devices:
```css
@custom-variant hover (&:hover);
```

## Button Cursor

v4 uses browser default `cursor: default` for buttons.

Restore v3 behavior globally:
```css
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

## Hidden Attribute Priority

In v4, the HTML `hidden` attribute always wins over display utilities:

```html
<!-- v4: hidden attribute takes priority — element stays hidden -->
<div hidden class="block">Won't be visible</div>

<!-- Remove hidden attribute to show -->
<div class="block">Visible</div>
```

## Outline Changes

```html
<!-- v3: outline sets style + width separately -->
<input class="outline outline-2 outline-blue-500" />

<!-- v4: outline-2 alone sets width (style defaults to solid) -->
<input class="outline-2 outline-blue-500" />
```

## Dialog Margins

v4 resets dialog margins to 0 (v3 used auto-centering).

Restore centering:
```css
@layer base {
  dialog {
    margin: auto;
  }
}
```
