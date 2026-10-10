# Step Label source evidence

Package, Figma, Storybook, and browser evidence for the Step Label guide (board ticket #162, Design documentation — Marcin; Storybook coverage — Biscuit, done). The Step guide's evidence (`step.md`) covers the row around it and the Stepper guide's (`stepper.md`) the list.

## Checked

Checked 10 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5); `npm run coin:status` reports the mirror and the docs up to date. `StepLabel.tsx` is byte-identical to upstream.

## Sources

- Figma: [Coin Subcomponents · Stepper Item](https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=27-854) (the ticket's link) is a page holding the Step component `27:888` (188 × 52) and a complete-mode instance `451:5`. There is no Step Label component in Figma (searched Coin Subcomponents and the Components Library). Step Label is Step's `textWrap` frame `27:892`, 124 × 50: Title (`27:893`, 18 tall, y 0), Subtitle (`27:894`, 16 tall, y 20), Meta (`448:301`, 12 tall, y 38). Step's properties that drive it: `title` (TEXT, “Stepper Item”), `supporting text` (TEXT, “Supporting line text”), `Meta` (TEXT, “10 Mar 2026”), `subtitle` (BOOLEAN), `meta` (BOOLEAN). Variables: `steperItem/title/*` 14/18/700 `#0d0d0f`, `steperItem/subtitle/*` 12/16/400 `#1c1c1c`, `steperItem/meta/*` 10/12/700 `#303338` (font token named `steperItem/meta/fontFamily Copy`), `steperItem/textWrap/gap` 2. Instance `451:5` shows a green date (`#26ab21`). The Components Library publishes only Stepper (`3228:457`).
- Storybook (published `index.json`, generated 15 September): `components-steplabel--docs`, `--default`, `--title-only`, `--with-supporting-text`, `--with-meta`, `--long-text`. The published build predates 636f3f5: old args (“Step Title”), no `testID`, the old generated docs page, and a Default story that passes `AppearanceBrand: Primary` (gold supporting text). Upstream `StepLabel.stories.tsx` (636f3f5) uses “Verify PAN” / “Name must match the PAN card” / “10 Mar 2026”, “Add address”, “Confirm nominee”, “Review and submit”, and a 240 px Long text story. Stepper's `--default` and `--with-step-label-slot` stories place StepLabel as a Step child.
- Upstream `StepLabel.mdx` (not published) is partly wrong for 636f3f5: its props list omits `testID` (`:449`), its modes table says AppearanceBrand colours the title and Emphasis changes the text (`:465-469`), and it says to prefer `JFSThemeProvider` for Light/Dark (`:457`).

## Contract

- Export: `StepLabel` and `StepLabelProps` from the package root (`src/components/index.ts:198`), also re-exported from `Stepper`.
- Props (`StepLabel.tsx:8-28`, no JSDoc): `title` (default “Stepper Item”, always rendered), `supportingText`, `metaText`, `subtitle` (true), `meta` (true), `modes`, `style` (a `ViewStyle` merged after `{ gap, flex: 1 }`), `testID` (on the container only). No children, icon, press, role, or accessibility props.
- A line shows only when its switch is on and its text is non-empty: supporting text needs `subtitle` and `supportingText`; the date needs `meta` and `metaText`. Hidden lines are not rendered.
- Renders a column (`gap` 2, `flex: 1`) of up to three texts: title 14/18 bold `#0d0d0f`, supporting 12/16 `#1a1c1f`, date 10/12 bold `#303338`, all JioType Var. No `numberOfLines`: text wraps, never truncates. No fixed width or height.
- Modes: only Color Mode (all three lines) and AppearanceBrand (supporting line only) change it. The supporting and date lines resolve with `AppearanceBrand: Neutral` unless the caller sets one (`StepLabel.tsx:44-45`); a caller's Primary turns supporting text gold `#cea15a` (2.4:1 on white), Secondary purple `#5d00b5`. Emphasis, Semantic Intent, and AppearanceSystem change nothing. Light contrast on white: title 19.4:1, supporting 17.1:1, date 12.7:1.
- No states. Step's `status` and Step Status mode never reach the label (Step passes its raw `modes`, not its status modes, `Step.tsx:223-232`): an error Step keeps the label's normal colours.
- Theme: StepLabel, Step, and Stepper never read `JFSThemeProvider` (no `useTokens`); modes arrive only through the `modes` prop or a parent Step/Stepper. About half of Coin's components do read the provider.
- Accessibility (web): the container is a plain `div` with no role; texts are `div[dir="auto"]`. The Step around it is announced by the Step's own `title` prop plus its outcome word; with a StepLabel child and no Step `title`, it's read “Step N” (#235).
- In a Step: children replace the default label, so a StepLabel child is how a custom-content Step keeps its text. Step's default label (from its title props) gets no `testID`.
- Classification. Designer-configurable: the title, supporting text, date, and their `subtitle`/`meta` switches; placing a Step Label beside custom content in a Step. System-driven: the width (fills its column) and height (its lines), the colours. Developer-only: `style`, `testID`, `modes` beyond Light.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- Standalone `<StepLabel title="Verify PAN" supportingText=… metaText=… />` at 280 px: 280 × 50; title 280 × 18 (14/18 700, `rgb(13,13,15)`), supporting 16 tall (12/16 400, `rgb(26,28,31)`), date 12 tall (10/12 700, `rgb(48,51,56)`), 2 px between lines. Heights by line: 18 (title), 36 (+ supporting), 32 (+ date), 50 (all).
- `AppearanceBrand: 'Primary'` on the label turns the supporting text `rgb(206,161,90)`. A parent Stepper's modes merge under the child's (`cloneChildrenWithModes`: parent first, child's explicit modes win), so Primary on the Stepper reaches a label whose own modes don't set AppearanceBrand.
- No `title`: shows “Stepper Item”. A Step with a StepLabel child and no `title` is named “Step 1”; with `title="Add nominee"` it's named “Add nominee”.
- Long text in a narrow host wraps on every line; nothing truncates.
- Not interactive; the container and texts have no role.

## Limits

- Light only, as in the Step and Stepper guides.
- Not shown: Dark, `style`, AppearanceBrand outside the Don't, Emphasis, Semantic Intent, AppearanceSystem.
- Not implied: that the label is pressable, is announced on its own, or changes colour with the stage.

## Coin gaps

- #235 (Component Fix, To do; Mr. Biscuit) already covers the “Step N” name with a StepLabel child, the green date in Figma, the supporting colour difference, and StepLabel.mdx's missing `testID` and wrong modes table. Added on 10 October: StepLabel.mdx tells developers to use `JFSThemeProvider`, which the Stepper family ignores.
- Existing: #211 (React key error on every Stepper); #197 (Dark token values). In 0.1.78 the label's own Dark tokens resolve to light text (title white, supporting `#ebebed`, date `#faf0fa`), so #197's point 3 no longer reproduces for StepLabel by token resolution.
