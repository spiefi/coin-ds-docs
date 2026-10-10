# Step source evidence

Package, Figma, Storybook, and browser evidence for the Step guide (board ticket #36, Design documentation — Marcin; Storybook coverage — Biscuit, done). The Stepper guide's evidence (`stepper.md`) covers the list as a whole.

## Checked

Checked 10 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5); `npm run coin:status` reports the mirror and the docs up to date. `Step.tsx`, `StepLabel.tsx`, and `Stepper.tsx` are identical to upstream.

## Sources

- Figma: [Coin Subcomponents · Step](https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=27-854) (the ticket's link), page `27:854` with the Step component `27:888`, 188 × 52: `badgeWrap` (a 36 px StepIndicator with an 18 px StepStatus glyph, then a 2 × 14 line 2 px below) and `textWrap` (Title 14/18 bold `#0d0d0f`, Subtitle 12/16 `#1c1c1c`, Meta 10/12 bold `#303338`, 2 px apart), 16 px between them, min height 52. Colour comes from the Step Status variable mode (active purple `#5d00b5`, inactive `#ede7ff`, complete green, error red, warning orange); the glyph is the StepStatus variant (number, complete, error, warning). Instance `451:5` shows a green date in the complete mode; the code's date stays `#303338`. The Components Library publishes only Stepper (`3228:457`), whose four rows are Step instances.
- Storybook (published `index.json`, built 1 October): `components-step--docs`, `--default`, `--without-meta`, `--complete`, `--error-state`, `--warning-state`, `--last-step`, `--custom-slot`; `components-steplabel--docs`, `--default`, `--title-only`, `--with-supporting-text`, `--with-meta`, `--long-text`. The published Step page is the old generated stub and its stories predate 0.1.78. Biscuit's `main` has a handwritten Step.mdx (1 October) that is not published and is now partly out of date: it says `status` doesn't set the colour and that Step sets no role or label, which 636f3f5 changed.

## Contract

- `Step` props: `title` (StepLabel shows “Stepper Item” when unset), `supportingText`, `metaText`, `subtitle` (true; false hides the supporting text), `meta` (true; false hides the date), `status` (`number` default, `complete`, `error`, `warning`: the glyph), `index` (0; the number shows index + 1), `showLine` (true), `connectorStyle`, `isCurrent` (false), `children`, `modes`, `style`, `testID`. No `onPress`.
- Colour: with no `Step Status` mode, `status` picks it (complete green, error red, warning orange, number purple); an explicit `Step Status` mode always wins. Upcoming lavender (`inactive`) only comes from the mode.
- `children` replace the default StepLabel and get Step's modes; the title, supporting text, and date props are then not shown. A `StepLabel` child gives the same text block (`title`, `supportingText`, `metaText`, `subtitle`, `meta`, `modes`, `style`, `testID`).
- Inside a Stepper, each Step gets its index, the Stepper's modes (its own win), `isCurrent` on the first step that isn't complete, and no connector on the last step. A standalone Step keeps index 0, a connector, and no current marker unless set.
- Web semantics: each Step is an `li` (`role="listitem"`) named `title` (or “Step N” when there is no title), plus “Completed”, “Failed”, or “Needs attention”; `aria-current="step"` when current. The supporting text and date aren't part of the name. With a StepLabel child and no `title`, it's read as “Step N” even though the screen shows the child's title. A standalone Step is a list item with no list.
- Tokens: row min height 52, indicator 36 (border 1), glyph 18, connector 2 wide, 2 px under the circle, 16 px to the text, text lines 2 px apart; title 14/18 700, supporting 12/16 400 (`#1a1c1f`; Figma `#1c1c1c`), date 10/12 700 `#303338`; numeral 12 px 500.
- Classification. Designer-configurable: the title, supporting text, and date, the state (glyph and Step Status), the connector on the last row, custom content in the slot. System-driven: numbering, connector length, the current marker inside a Stepper. Developer-only: `isCurrent`, `connectorStyle`, `style`, `testID`.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- Standalone `<Step title="Verify PAN" supportingText=… metaText=… />` in a 360 px column: 360 × 52; circle 36 × 36 `rgb(93,0,181)` with a white “1”; connector 2 × 14 at (17, 38); text block starts at x 52 (308 wide): title 18 tall at y 0, supporting 16 at y 20, date 12 at y 38.
- `<Step />`: “Stepper Item”, “1”, a connector, `aria-label="Step 1"`.
- States: complete green `rgb(38,171,33)` check, named “PAN verified, Completed”; number purple; `Step Status: inactive` lavender `rgb(237,231,255)` with a purple numeral; error red `rgb(245,0,48)` cross, “…, Failed”; warning orange `rgb(240,110,15)` alert, “…, Needs attention”.
- Long text in 280 px: title two lines (36), supporting three lines (48); row 100 tall, connector 62.
- Slot with a StepLabel and a size S Button: row 68 tall, connector 30; the Button stretches to the text column's width (308).
- In a Stepper the rows are 52 tall with a 2 px gap; the last row has no connector. Development builds log React's “unique key” error (#211).

## Accessibility (web)

- Each row is announced by its title and outcome word; the glyph itself has no name; supporting text and date are not in the name.
- Not interactive: no focus, no press.

## Limits

- Light only, as in the Stepper guide.
- Not shown: `connectorStyle`, `style`, `isCurrent` on a standalone Step, Dark.

## Coin gaps

- #235 (Component Fix, To do, Component Bug; Mr. Biscuit): a StepLabel child's title isn't used for the spoken name (“Step N” is read), and `title` still names the row when children replace the label; a standalone Step is a list item with no list; Step.mdx and StepLabel.mdx are out of date with 636f3f5 and the published Storybook still predates 0.1.78.
- Existing: #211 (React key error on every Stepper); #197 (Dark tokens, in Review).
