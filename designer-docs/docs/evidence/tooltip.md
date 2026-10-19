# Tooltip source evidence

Package, Figma, and Storybook evidence for the Tooltip guide (board ticket #20, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 19 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348). `Tooltip.tsx` is the rewrite from 7020bf9 that fixes #277. It was already in the docs' previous build `v0.1.78-a116616` (the guide copy waited for #277's approval) and is unchanged in c7d3348. It was re-tested in headless Chrome (react-native-web 0.21.2) on 19 October, Penny run run_43afbe70.

First checked 12 October 2026 against mirror tag `v0.1.78-636f3f5`; those findings are kept below under "Before #277".

## Sources

- Package: `src/components/Tooltip/Tooltip.tsx` (691 lines); exports `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipPlacement` and the prop types (`components/index.ts:203-210`). A compound component; no Coin component uses it (Slider and AreaLineChart only reuse its `tooltip/*` tokens).
- Figma: [Coin Components Library · Tooltip](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=928-6036), node `928:6036`: variants Custom Width Off (72 × 34, `maxWidth` 280) and On (no `maxWidth`); a downward tip at the bottom left (Off) or right (On), 16 px from the edge; padding 12 × 8, radius 8, label 14/18 medium white on #0F0D0A, tip 16 × 8.
- Storybook (published `index.json`): docs `components-tooltip--docs`; stories `--default`, `--long-text`, `--slot`, `--edge-detection`. The published docs page is the old generated one (built 1 October), not c1fa197c's rewrite. Stories host it centred (minHeight 400, padding 20) with a plain grey RN `View` trigger and RN `Text` content; Default and Long Text start closed; Slot uses `defaultOpen` and placement bottom.
- Biscuit's #20 comment (“press-toggled label … not the trigger's accessible name”) matches the code.

## Contract

- `Tooltip`: `open` (controlled), `defaultOpen` (false), `onOpenChange` (also called when uncontrolled), `placement` (`top` default; `top|bottom|left|right` with optional `-start|-end`), `modes`.
- `TooltipTrigger`: `asChild` (clone the child as the trigger) or a wrapping Pressable, whose child gets `pointerEvents="none"`, so a nested Coin Button or IconButton opens it too. The trigger's and the child's `onPress` are chained after the toggle (lines 205-217). On the web the trigger has `aria-describedby` pointing at the bubble while it's open.
- `TooltipContent`: `sideOffset` (4), `gap` (4), `alignItems`, `width` (a set bubble width, Figma's Custom Width On; omit to hug up to 280 px). A string child becomes the white label; RN Text and Coin Text children get the label style (`isTooltipLabel`, line 277).
- Behaviour: opens and closes on press only (no hover, focus, or timer). On iOS and Android the bubble is a React Native Modal (`onRequestClose`, so Android back closes it); on the web it's a `position: fixed` layer portalled to `document.body`, with the bubble `role="tooltip"` and an id. Open, a transparent full-window layer catches the next press anywhere and closes it. On the web Escape no longer closes it (#349, regression from the rewrite). Placement flips to the opposite side when it doesn't fit; left/right with no room either way fall back to top or bottom (the side with more space); every bubble clamps 8 px inside the screen. Gap to the trigger 12 px (4 + 8 px arrow). Bubble hugs its text up to 280 px and wraps; the arrow follows the trigger's centre, at least 16 px from the bubble's corners. Radius 8 and max width 280 are constants now, so the four "Variable not found" warnings are gone.

## Checked in Chrome (19 October, v0.1.78-c7d3348)

From the #277 re-test (Penny run run_43afbe70) on this build:
- Coin Text inside `TooltipContent` is white on the #0F0D0A bubble.
- A Coin Button and a Coin IconButton wrapped in `TooltipTrigger` without `asChild` open it on press; the wrapped Button also opens it with Enter.
- `onPress` on `TooltipTrigger` runs, and the bubble opens.
- The bubble is `role="tooltip"` with an id; the trigger has `aria-describedby` while it's open. Nothing is `aria-modal`, and focus stays on the trigger.
- `TooltipContent width={200}` gives a 200 px bubble. No `tooltip/radius` or `maxWidth` warnings.
- `placement="right"` with the trigger at x 231 in a 390 px window falls back below the trigger: the bubble spans 102–382 px, 8 px inside the edge, and doesn't cover the trigger.
- Escape doesn't close an open bubble on the web: #349.

## Before #277: checked in Chrome (12 October, production build, v0.1.78-636f3f5)

- Trigger: `<TooltipTrigger asChild>` with a Coin `IconButton` or `Button` opens it, positioned on the trigger. A Coin `Button` or `IconButton` nested inside `TooltipTrigger` without `asChild` never opens it; a non-pressable Coin `Icon` inside it does.
- Coin `Text` in `TooltipContent`: `rgb(0, 0, 0)` on the #0F0D0A bubble (invisible); a plain string is white 14 px / 500.
- Open DOM: a body-level portal with `role="dialog" aria-modal="true"` and no name; no `role="tooltip"`, no `aria-describedby` on the trigger; focus moves to the full-window backdrop; Escape closes it.
- Side placement: `placement="right"` at 390 px has no room on either side, picks left (lines 336-342), and starts left of the window edge; for left/right only the vertical position is clamped (lines 416-420). Added to #277 as item 6.
- Four console warnings per render for `tooltip/radius`, `radius`, `tooltip/maxWidth`, `maxWidth` (fallbacks 8 and 280; see #193).

## Modes and tokens

Only Color Mode changes it (`FIGMA_COMPONENT_MODES.Tooltip = ['Color Mode']`): Light is a #0F0D0A bubble with white text. Padding, type, arrow, radius, and max width don't change with any mode. The `Tooltip` True/False collection (`tooltip/boolean`) is Slider's and isn't read here.

## Discrepancies

- Figma's Custom Width On is `TooltipContent width` in code (since #277).
- Figma shows only a downward tip near a corner; code centres the arrow on the trigger and supports 12 placements with flipping.
- Code adds a hard-coded drop shadow and the full-window dismiss layer; Figma shows neither.
- The published Storybook page was the old generated one when last checked (12 October), claiming screen readers announce the content on focus; the code has no focus handling (it now has a tooltip role on the web).

## Hosting

Like Popup, the bubble is drawn over the whole window (a React Native Modal on native, a body portal on the web), so it can't be framed. Every example is a closed trigger: a Coin `IconButton` (`ic_info`, Emphasis Low, Button / Size S) passed with `asChild`, next to the term it explains. Content is always a plain string, for consistency. The Sizing section's Custom width example passes `width={200}`.

## Limits

- Not shown: `sideOffset`, `gap`, `alignItems` (slot layout for children), `modes` beyond Light.
- Never start a tooltip open: its layer would cover the page.

## Coin gaps

- #277 (Component Fix, Component Bug; Mr. Biscuit): fixed on Biscuit's main (7020bf9), verified 19 October on c7d3348 and published to the docs on 19 October. It covered: Coin Text invisible inside; nested Coin buttons never opening it; TooltipTrigger `onPress` replacing the toggle; an unnamed modal with no tooltip semantics; no Custom Width; side placements running off the screen.
- #349 (Component Bug, regression from the #277 rewrite): Escape no longer closes an open bubble on the web.
- From the code, not tested: `Tooltip.tsx` imports `createPortal` from `react-dom` at the top, and `react-dom` is only a devDependency (raised on #277, 16 October).
