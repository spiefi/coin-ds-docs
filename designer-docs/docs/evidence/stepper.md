# Stepper source evidence

Package, Figma, Storybook, and browser evidence for the Stepper guide (board ticket #17, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 5 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). `Stepper.tsx`, `Step.tsx`, and `StepLabel.tsx` are identical to upstream.

- Figma: [Coin Components Library · Stepper](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3228-457), node `3228:457`. One component (not a set), 204 × 214, with a slot "Stepper Items" of four Step instances (188 × 52 each, 2 px apart, 8 px side padding). Rows 1–2 use the Step Status mode `active` (purple circle, white numeral), rows 3–4 `inactive` (lavender circle, purple numeral); the last row hides its connector. Every numeral reads "1"; text is "Stepper Item", "Supporting line text", "10 Mar 2026". Step, StepIndicator, and StepStatus live in Coin Subcomponents; there is no StepLabel component in Figma. In the token data the Step Status collection also holds a `stepStatus` string (active/inactive → number, complete → complete, …) that ties the glyph to the mode in Figma.
- Storybook (published `index.json`, built before the 0.1.78 release commit): `components-stepper--docs`; Stepper stories `--default`, `--with-step-label-slot`, `--three-steps`, `--order-tracking`, `--no-meta`; Step stories `components-step--default`, `--without-meta`, `--complete`, `--error-state`, `--warning-state`, `--last-step`, `--custom-slot`; StepLabel stories `components-steplabel--default`, `--title-only`, `--with-supporting-text`, `--with-meta`, `--long-text`. The ids are current, but the published docs pages are old generated stubs and the published Complete, Error, and Warning Step stories set only `status`, so they render purple. Upstream `Step.mdx` (not deployed) says to pair `status` with the matching `Step Status` mode and calls a check on active colours a don't; the upstream Stepper stories still set only `status`.
- Package: `Stepper` accepts `children`, `modes`, `style`; it is vertical only, not interactive, and owns no current step. It clones every element child with `index`, merged `modes` (the child's win), and `showLine` (false on the last child). `Step` accepts `status` (`number` | `complete` | `error` | `warning`, glyph only, default `number`), `index`, `showLine`, `connectorStyle`, `title`, `supportingText`, `metaText`, `subtitle`, `meta`, `children`, `modes`, `style`. Children replace the default StepLabel and receive Step's modes through `cloneChildrenWithModes`. `StepLabel` accepts `title` (default "Stepper Item"), `supportingText`, `metaText`, `subtitle`, `meta`, `modes`, `style`. No `testID` on any of the three.
- Colour comes from the `Step Status` mode on each Step: `active` (default), `inactive`, `complete`, `error`, `warning`. A Stepper-level `Step Status` colours every step the same.
- Tokens: circle 36 px (border 1, radius 9999), glyph box 18 px, connector 2 px with 2 px gap under the circle, row min height 52, 16 px between indicator and text, 2 px between text lines, Stepper gap 2 and side padding 8. Title 14/18 bold `#0d0d0f`; supporting 12/16 `#1c1c1c`; date 10/12 bold `#303338`. Values match Figma.

## Browser measurements (Chrome, react-native-web 0.21.2)

- In a 328 px host the Stepper is 328 wide with 8 px side padding; each Step row is 312 × 52. The indicator column is 36 wide, the text block starts 16 px after it (260 px wide).
- Light colours (circle, border, and connector share one colour): active `rgb(93,0,181)` with white number; inactive `rgb(237,231,255)` with purple number; complete `rgb(38,171,33)` with a white check; error `rgb(245,0,48)` with a white cross; warning `rgb(240,110,15)` with a white alert triangle. White glyphs on green and orange are about 3:1.
- `status="complete"` without `Step Status: complete` renders a check on purple; upcoming steps render solid purple unless set to `inactive`.
- The connector is 2 × 14 px in a 52 px row and grows when the text wraps or slot content is taller (a Button under the label made the row 78 px and the connector 40 px).
- DOM: plain `div`s and unnamed `svg`s. No role, list, `aria-current`, status text, or focusable element.

## Coin gaps

- #195 (Component Fix, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar): no list, current-step, or status semantics; status glyph and Step Status colour set separately (`stepStatus` ignored); `{false}` child blanks the label; Fragments not unwrapped; no `testID`; stale published Storybook.
- #197 (Components, To do; Marcin): in Dark mode complete and warning turn red and supporting text and dates stay near-black. The guide shows Light only.
