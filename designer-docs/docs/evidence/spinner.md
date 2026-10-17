# Spinner source evidence

Package, Figma, and Storybook evidence for the Spinner guide (board ticket #73, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 12 October 2026; re-checked 13 October 2026 for the review below. Installed `jfs-components` is now `0.1.78` from mirror tag `v0.1.78-c1fa197` (Biscuit's `main` at c1fa197); `Spinner.tsx` is identical to 636f3f5's. Biscuit's newest `main` 7020bf9 (13 October, not in the mirror or the docs) sets `STROKE_RATIO = 12.8 / 72` and corrects the `durationMs` JSDoc to 1500 (#276); it is not installed, so the guide still shows 11%.

Re-checked 17 October 2026 for the #276 publish: the docs now install mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October), which carries 7020bf9's `Spinner.tsx`: stroke = size × 12.8 / 72, and the `durationMs` JSDoc (and `Spinner.d.ts`) says "Defaults to 1500". Measured on the guide in headless Chrome: stroke-width 12.8 at 72, 5.69 at 32, 9.96 at 56, 15.64 at 88. The guide's anatomy, sizing and Sources copy now give these numbers.

## Sources

- Package: `src/components/Spinner/Spinner.tsx` (274 lines); exports `Spinner`, `SpinnerProps`, `SpinnerColors` (`components/index.ts:195`). No Coin component uses it; Button's `loading` draws a Skeleton (`Button.tsx:19-20, 527`).
- Figma: [Coin Components Library · Spinner](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2729-1039), node `2729:1039`: one 72 × 72 component, three ellipse arcs `arc-teal`, `arc-purple`, `arc-gold`; no variants or properties; variables `spiner/primary/bg` #d0a259, `spiner/secondary/bg` #5b00b5, `spiner/tertiary/bg` #066b99.
- Storybook (published `index.json`): docs `components-spinner--docs`; stories `--default`, `--sizes`, `--heavy`, `--weightless`, `--custom-colors`, `--resting`. The published docs page is the old generated one, not c1fa197c's rewrite (its chunk has none of the rewrite's sections). Stories: `layout: 'centered'`, no frame; args size 72, durationMs 1500, gravity 0.45, animating true. Sizes = 32/56/88/128 in a row; Heavy = gravity 0.85, durationMs 2800, size 120; Weightless = gravity 0, durationMs 1600, size 120; Resting = animating false.
- Biscuit's #73 comment (“indeterminate three-arc indicator and the 1500ms duration default”) matches the code.

## Contract

- Props: `size` (72, diameter in px, no clamp), `durationMs` (1500, one turn; the JSDoc said 2400 until a116616, #276), `gravity` (0.45, clamped 0–0.9; 0 = even speed), `animating` (true), `colors` ({ primary, secondary, tertiary } overrides), `accessibilityLabel` ('Loading'), `modes`, `style`, View props (`testID` lands on the root).
- Geometry: three 100° arcs with round caps, stroke = 12.8/72 × size since a116616 (12.8 px at 72, measured in Chrome; 0.11 × size, 7.92 px, before #276), outer edge on the box edge, no track. Leading arc gold (primary) is drawn on top, then purple, then teal.
- Motion: one linear clock warped by gravity: fastest over the top, slowest at the bottom (at 0.45: 1.45× and 0.55× the mean speed). The gap between arc heads breathes from 10° at the top to 84° and back.
- Resting (`animating={false}` or reduced motion): a fixed, evenly spaced fan (heads at 0°, 240°, 120°), not a frame of the spin. Reduced motion comes from `prefers-reduced-motion` on the web; no prop overrides it.

## Modes and tokens

The only tokens are the three `spiner/*/bg` colours in collection `Spinner / Output` (one mode, `Default`). No mode collection (Color Mode, AppearanceBrand, Semantic Intent, sizes) changes the output; only `colors` does. Not in `FIGMA_COMPONENT_MODES`.

## Web render

`div role="progressbar" aria-label="Loading"` (size × size, `data-testid` from `testID`) › three absolutely filled `div`s rotated per frame, each with one `svg › path` (`stroke-linecap="round"`). Root children are in the order teal, purple, gold. No value, `aria-busy`, or live region. On the docs site Reanimated is the `src/web-stubs/reanimated.ts` stand-in (rAF + re-render); Storybook runs real Reanimated.

## Discrepancies

- Ring weight: Figma's ring measures radius ≈ 23 → 36 on its 72 × 72 render, about 12.8 px (≈ 0.17); code drew 7.92 px (0.11) until a116616 and now draws 12.8 px. Filed as #276, fixed.
- Figma is one static pose (contiguous arcs, a ~69° gap); code's resting pose is three separate arcs 120° apart, and the live spin starts bunched at the top.
- `durationMs` JSDoc said 2400; the default is 1500 (#276, item 2; fixed in a116616).
- The published Storybook page is the old generated one.

## Hosting

Storybook hosts it centred on the canvas with no frame; the guide does the same in its example cards and the playground stage. In context, a ScreenFrame screen built with VStack, Title, Text, and a full-width Button.

## Limits

- Not shown as designer settings: `colors` (would need hardcoded colours; designers keep gold, purple, teal), `modes` (no effect), `style`.
- No progress value, track, label text, or size variants; sizes are free numbers.

## Review, 13 October 2026

Marcin's #73 comment (12 October): “what is weight? Whatever it is do not work on the documentation page”, on the playground's “Weight” segment (None / Default / Heavy → `gravity` 0 / 0.45 / 0.85).

- “Weight” was the guide's own name; the prop is `gravity` (`Spinner.tsx:45-50`, default 0.45, clamped 0–0.9). Storybook calls the stories Heavy and Weightless and the prop gravity (7020bf9 `Spinner.mdx:172-182, 247`). The published Storybook docs page is still the old generated one (headings: Example, Available Collections and Modes, Usage, Sizes, Weight, Custom colours, Resting state, Props, Design Tokens).
- The control did work. Leading-arc speed, fastest ÷ slowest over 3.2 s (60 ms windows, headless Chrome, 13 October):
  - Storybook, real Reanimated: default 2.71 (1509 ms turn), heavy 12.58, weightless 1.39 (sampling noise; 0 is even by code).
  - Docs preview playground (docs stand-in): None 1.37, Default 2.70, Heavy 12.12, all at a ~1500 ms turn.
- Verdict: docs mistake (an unexplained, invented label for a subtle effect), not a component bug. Fix: no gravity control in the playground; Configuration names gravity and its value on each card (Default 0.45, Heavy 0.85, Weightless 0), side by side.
