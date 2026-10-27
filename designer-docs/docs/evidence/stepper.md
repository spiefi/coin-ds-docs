# Stepper source evidence

Package, Figma, Storybook, and browser evidence for the Stepper guide (board ticket #17, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## dbe0e02 publish (28 October 2026, #235)

The docs now install mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October). Verified 27 October on dbe0e02 (Penny run run_beaf2324; closed by Marcin); published to the docs 28 October in Penny run run_92acfa9d. Where the sections below say otherwise, this section replaces them.

- Stepper is `ul role="list"` named by `accessibilityLabel`; each stage is `li role="listitem"` named by its title, supporting text of up to 80 characters, its date, and the outcome word, and the first unfinished stage has `aria-current`. Stepper.mdx says so.

Guide changes: Sources only: 28 October, 27 October build, and each stage's date is read (it said “never its date”).

Not changed in this publish: the agent pack's released guidance (`agent-pack/guidance/stepper.json`, release 0.1.78+2) still quotes the old copy that the date is never read. It is re-extracted through the pack's own pipeline (`agent-pack/README.md`), as after earlier publishes.

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

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2.

- #195 fixed. Stepper renders a `ul` (named by `accessibilityLabel`) and each Step an `li`. `aria-current="step"` is on the first incomplete step. Step labels read “Verify PAN, Completed”, “Payment failed, Failed”, and “Check details, Needs attention”. `status` alone now sets the colour (complete green, error red, warning orange); an explicit Step Status mode still overrides it, so the guide’s check-on-purple Don’t still renders. A `{false}` child keeps the title, Steps inside a Fragment number in order, and the last Step has no connector. `testID` works on Stepper, Step, and StepLabel.
- Regression #211 (Component Fix, Done, published 13 October 2026 with c1fa197): every Stepper logged a React “unique key” error in development builds. The production docs build does not log it.
- Still open: the check, cross, and alert glyphs are unnamed images.
- Guide: anatomy and sizing targets moved from `:scope > div > div:nth-child(n)` to `:scope > ul > li:nth-child(n)` (padding mark on `:scope > ul`). The States description, Content description, “Rely on the icon” caption, and Sources note now describe `status` setting the colour and the list, current-stage, and status-word semantics; the In context Stepper is named “KYC progress”.

## c1fa197 publish (13 October 2026)

Checked 13 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at c1fa197 (mirror tag `v0.1.78-c1fa197`, installed since the 13 October release) in headless Chrome with react-native-web 0.21.2, on the guide pages at 1280 and 390 px. The newer mirror build `v0.1.78-5990169` changes only `Tooltip.tsx` (#277, not approved), so it was not installed.

- #211 fixed (verified 12 October, published here): Stepper keeps a key on each flattened Step, so plain Steps, Steps in a Fragment, Steps with StepLabel children, and mapped Steps log no React “unique key” error in development builds. The production docs build never logged it.
- No designer-facing behaviour changed, so the guide copy stays; only the Sources check date and build are updated (13 October, 12 October build). The brief's checked line and note match.

## a116616 check (17 October 2026)

Re-checked against `jfs-components` 0.1.78 from mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October) in headless Chrome with react-native-web 0.21.2; `npm run coin:status` reports upstream, mirror, and docs in step. `Stepper.tsx`, `Step.tsx`, and `StepLabel.tsx` are unchanged since c1fa197. See `step.md` › a116616 check for each Step's name.

- Colour: with no `Step Status` mode, `status` sets it (complete green `rgb(38,171,33)`); an explicit `Step Status` wins, so `status="complete"` with `Step Status: active` renders a check on purple `rgb(93,0,181)`. The States description's "so a check is always green" contradicted the Sources note and the "Put a check on purple" Don't. It now says the status sets icon and colour, an upcoming stage needs `inactive`, and an explicit Step Status wins, so keep it matched (the Step guide's wording).
- Semantics: `ul role="list"` named by `accessibilityLabel`; each Step is `li role="listitem"` read as its title, its supporting text when it is at most 80 characters with no line break, and the status word, never its date (KYC sample: "Verify PAN, PAN details match your name, Completed" / "Add bank account, Link the account you'll invest from" with `aria-current="step"` / "eSign"). The Sources line "each stage is read with its title, plus 'Completed' …" left out the supporting text, which c1fa197 added; it now names the supporting text of up to 80 characters and says the date is never read.
- Unchanged and still true: the first unfinished stage is current; the glyphs have no names (they are exposed as unnamed images); the published Storybook Stepper docs page is the old stub.
- Sources: checked 17 October 2026, 16 October build. `stepper.brief.md` carries the same copy.
