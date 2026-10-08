# Slider source evidence

Package, Figma, Storybook, and browser evidence for the Slider guide (board ticket #57, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 5 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). `Slider.tsx` is identical to upstream.

- Figma: [Coin Components Library · Slider](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5373-446), node `5373:446`. One component (not a set), 294 × 44: a 4 px track (pale `#fde8c9`) filled 85% in gold `#cea15a`, a 20 px gold handle, a black value bubble (97 × 34, radius 8, max width 280, white 14 px "10 000 000", 12 px above the handle with a tip), and min/max labels "0" and "10000" 16 px below the track. No disabled, size, or appearance variants. A `tooltip/boolean` variable (True/False) controls the bubble in Figma.
- Storybook (published `index.json`, built before the 0.1.78 release commit): `components-slider--docs`; stories `--default`, `--controlled`, `--currency-format`, `--tooltip-on-interaction`, `--without-labels`, `--disabled`, `--imperative-ref`. Upstream `--custom-labels` is not published, and the published docs page is the older generated one. The handwritten upstream `Slider.mdx` says the bubble never reserves layout space, there is no size or appearance prop, the unfilled track uses Emphasis Low, and typed exact amounts belong in AmountInput or TextInput.
- Package: public `Slider` (forwardRef) accepts `value`/`defaultValue`, `onChange` (while moving), `onChangeEnd` (on release and on every key press, even without a change), `minValue` (0), `maxValue` (100), `step` (1), `isDisabled`, `formatOptions`, `locale`, `formatValue`, `renderTooltip`, `alwaysShowTooltip` (default `true`; `false` shows the bubble only while dragging or hovering), `showLabels` (default `true`), `minLabel`/`maxLabel`, `width` (default `'100%'`), `modes`, `style`, `accessibilityLabel`, `disableTruncation`. Ref handle: `getValue`, `setValue`, `increment`, `decrement` (these work even when disabled). No `testID` or rest props. Single thumb, horizontal only, no ticks. `formatValue` and `formatOptions` format the bubble and both end labels.
- Tokens (Light): track 4 px, radius 999, `rgb(253,232,201)` (Emphasis Low baked in); fill and handle `rgb(206,161,90)`; handle 20 px; bubble background `rgb(15,13,10)`, padding 12/8, white 14/18 text, 12 px above the handle; labels 14 px weight 500, black. Slider takes colours only from its own `modes` (no `useTokens`).

## Browser measurements (Chrome, react-native-web 0.21.2)

- In a 328 px host the Slider is 328 × 61: 8 px top padding, a 20 px handle row, 16 px gap, a 17 px label row. Without labels it is 28 px tall. Figma's frame is 44 px because its track row is the 4 px track.
- The bubble reads tokens named `radius` and `maxWidth`, which are not in the package's token data, so it renders 24 × 34 px, square, with its white value text overflowing and invisible on light pages (ticket #193). It floats 46 px above the handle row (38 px above the Slider's top) and takes no layout space, so content directly above it is covered.
- Example: ₹500–₹50,000, step 500, `formatOptions` INR without decimals, `locale="en-IN"`: labels "₹500" and "₹50,000"; ArrowRight moved ₹5,000 to ₹5,500. `formatValue={v => `${v} years`}` also writes "1 years" on the minimum label, so the format function must handle singulars.
- Disabled: 50% opacity, `tabindex=-1`, no drag or key response.
- DOM: an outer `div` and the inner `div[role="slider"][tabindex=0]` both carry `aria-label`. No `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`, or `aria-disabled`. Arrow keys move one step, Page Up/Down 10% of the range, Home/End to the ends; tapping anywhere on the 20 px row jumps the handle there. The bubble and labels are loose text in the DOM.

## Coin gaps

- #193 (Component Fix, To do, Component Bug, high; Mr. Biscuit, Anagha Ghotkar): collapsed bubble; value and disabled state not exposed on the web; duplicate `aria-label`; `JFSThemeProvider` ignored; 61 px vs Figma 44 px; no `testID`; `onChangeEnd` on every key; ref methods work while disabled.
- #197 (Components, To do; Marcin): Slider labels resolve black in Dark mode. The guide shows Light only.

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2.

- #193 fixed. The bubble hugs its value (40 × 34 for "50"), radius 8, max width 280, with readable white text. `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and `aria-valuetext`, plus `aria-disabled` when disabled; only one element carries the name. `JFSThemeProvider` now matches the `modes` prop, and `testID` works. `onChangeEnd` no longer fires when a key can't change the value, and ref methods do nothing while disabled.
- Installed source: the track area keeps the same children (track, fill, handle, bubble), so the guide's `[role="slider"] > div:nth-child(n)` targets still hold. The bubble is still positioned 12 px above the 20 px handle row and takes no layout space, so the 48 px Room stays.
- Still open for a decision: the Slider is 61 px tall vs Figma's 44 (change code or Figma). Every render logs four "Variable not found" warnings for the tooltip radius and maxWidth lookups (console warnings, not errors).
- Guide: the Anatomy description now describes a rounded black bubble with the value (the "narrow black block" warning is gone); the Sources note gives the 5 October build, says the bubble matches Figma, and says the name, value, and disabled state are announced; the 61 vs 44 px note stays; `checked` is 8 October 2026. No example hid or worked around the bubble, so examples are unchanged. The brief's checked line, setup note, Anatomy, note, and Limits match.
