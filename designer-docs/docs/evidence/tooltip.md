# Tooltip source evidence

Package, Figma, and Storybook evidence for the Tooltip guide (board ticket #20, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 12 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5). Biscuit's newer `main` (c1fa197c, a463361) changes only `Tooltip.mdx` (handwritten rewrite) and `Tooltip.stories.tsx` (docs control exclude); `Tooltip.tsx` and the tokens are identical.

## Sources

- Package: `src/components/Tooltip/Tooltip.tsx` (600 lines); exports `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipPlacement` and the prop types (`components/index.ts:203-210`). A compound component; no Coin component uses it (Slider and AreaLineChart only reuse its `tooltip/*` tokens).
- Figma: [Coin Components Library · Tooltip](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=928-6036), node `928:6036`: variants Custom Width Off (72 × 34, `maxWidth` 280) and On (no `maxWidth`); a downward tip at the bottom left (Off) or right (On), 16 px from the edge; padding 12 × 8, radius 8, label 14/18 medium white on #0F0D0A, tip 16 × 8.
- Storybook (published `index.json`): docs `components-tooltip--docs`; stories `--default`, `--long-text`, `--slot`, `--edge-detection`. The published docs page is the old generated one (built 1 October), not c1fa197c's rewrite. Stories host it centred (minHeight 400, padding 20) with a plain grey RN `View` trigger and RN `Text` content; Default and Long Text start closed; Slot uses `defaultOpen` and placement bottom.
- Biscuit's #20 comment (“press-toggled label … not the trigger's accessible name”) matches the code.

## Contract

- `Tooltip`: `open` (controlled), `defaultOpen` (false), `onOpenChange` (also called when uncontrolled), `placement` (`top` default; `top|bottom|left|right` with optional `-start|-end`), `modes`.
- `TooltipTrigger`: `asChild` (clone the child as the trigger) or a wrapping Pressable; Pressable props spread last, so an `onPress` on it replaces the toggle (#277).
- `TooltipContent`: `sideOffset` (4), `gap` (4), `alignItems`; a string child becomes the white label; only React Native Text children are restyled, so Coin Text renders black (#277). No width prop.
- Behaviour: opens and closes on press only (no hover, focus, or timer). Open, a transparent full-window layer catches the next press anywhere and closes it; Escape and Android back close it too. Placement flips to the opposite side when it doesn't fit; top/bottom bubbles clamp 8 px inside the screen, left/right ones only vertically (#277). Gap to the trigger 12 px (4 + 8 px arrow). Bubble hugs its text up to 280 px and wraps; the arrow follows the trigger's centre, at least 16 px from the bubble's corners.

## Checked in Chrome (12 October, production build)

- Trigger: `<TooltipTrigger asChild>` with a Coin `IconButton` or `Button` opens it, positioned on the trigger. A Coin `Button` or `IconButton` nested inside `TooltipTrigger` without `asChild` never opens it; a non-pressable Coin `Icon` inside it does.
- Coin `Text` in `TooltipContent`: `rgb(0, 0, 0)` on the #0F0D0A bubble (invisible); a plain string is white 14 px / 500.
- Open DOM: a body-level portal with `role="dialog" aria-modal="true"` and no name; no `role="tooltip"`, no `aria-describedby` on the trigger; focus moves to the full-window backdrop; Escape closes it.
- Side placement: `placement="right"` at 390 px has no room on either side, picks left (lines 336-342), and starts left of the window edge; for left/right only the vertical position is clamped (lines 416-420). Added to #277 as item 6.
- Four console warnings per render for `tooltip/radius`, `radius`, `tooltip/maxWidth`, `maxWidth` (fallbacks 8 and 280; see #193).

## Modes and tokens

Only Color Mode changes it (`FIGMA_COMPONENT_MODES.Tooltip = ['Color Mode']`): Light is a #0F0D0A bubble with white text. Padding, type, arrow, radius, and max width don't change with any mode. The `Tooltip` True/False collection (`tooltip/boolean`) is Slider's and isn't read here.

## Discrepancies

- Figma's Custom Width On has no code equivalent; code always caps at 280 px (#277).
- Figma shows only a downward tip near a corner; code centres the arrow on the trigger and supports 12 placements with flipping.
- Code adds a hard-coded drop shadow and the full-window dismiss layer; Figma shows neither.
- The rewritten Storybook FAQ says a nested button “fires twice”; in Chrome it never opens (#277).
- The published Storybook page is the old generated one and claims screen readers announce the content on focus; the code has no focus handling or tooltip role.

## Hosting

Like Popup, the bubble is a React Native Modal drawn over the whole window, so it can't be framed. Every example is a closed trigger: a Coin `IconButton` (`ic_info`, Emphasis Low, Button / Size S) passed with `asChild`, next to the term it explains. Content is always a plain string.

## Limits

- Not shown: `sideOffset`, `gap`, `alignItems` (slot layout for RN Text children), `modes` beyond Light.
- Never start a tooltip open: its layer would cover the page.

## Coin gaps

- #277 (Component Fix, To do, Component Bug; Mr. Biscuit): Coin Text invisible inside; nested Coin buttons never open it; TooltipTrigger `onPress` replaces the toggle; opens as an unnamed modal with no tooltip semantics; no Custom Width in code; side placements run off the screen.
